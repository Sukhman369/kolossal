-- Beyond Humans: Migration to Indian Standard (Strictly India / INR / GST)

BEGIN;

-- 1. Store currency: strictly INR only
INSERT INTO store_currency (id, currency_code, is_default, store_id, created_at, updated_at)
SELECT 'stocur_inr_default', 'inr', true, id, NOW(), NOW()
FROM store
LIMIT 1
ON CONFLICT (id) DO UPDATE SET is_default = true;

DELETE FROM store_currency WHERE currency_code != 'inr';

-- 2. Region: Update primary region to India with INR currency
UPDATE region 
SET name = 'India', currency_code = 'inr', updated_at = NOW() 
WHERE id = (SELECT id FROM region LIMIT 1);

-- 3. Countries: Disassociate all foreign countries, link ONLY India (in)
UPDATE region_country 
SET region_id = NULL 
WHERE iso_2 != 'in';

UPDATE region_country 
SET region_id = (SELECT id FROM region LIMIT 1) 
WHERE iso_2 = 'in';

-- 4. Tax Region: Strictly India only
DELETE FROM tax_rate_rule WHERE tax_rate_id IN (SELECT id FROM tax_rate WHERE tax_region_id IN (SELECT id FROM tax_region WHERE country_code != 'in'));
DELETE FROM tax_rate WHERE tax_region_id IN (SELECT id FROM tax_region WHERE country_code != 'in');
DELETE FROM tax_region WHERE country_code != 'in';

INSERT INTO tax_region (id, provider_id, country_code, created_at, updated_at)
VALUES ('txreg_india_default', 'tp_system', 'in', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Add standard Indian GST (18%) tax rate if not present
INSERT INTO tax_rate (id, rate, code, name, is_default, is_combinable, tax_region_id, created_at, updated_at)
SELECT 'txrate_in_gst18', 18, 'GST_18', 'GST 18% (Standard Rate)', true, false, id, NOW(), NOW()
FROM tax_region 
WHERE country_code = 'in' 
LIMIT 1
ON CONFLICT (id) DO NOTHING;

-- 5. Service Zone & Geo Zone: Strictly India Pan-India Delivery
UPDATE service_zone 
SET name = 'All India Delivery (Pan-India)', updated_at = NOW();

UPDATE fulfillment_set 
SET name = 'India Central Fulfillment & Dispatch', updated_at = NOW();

DELETE FROM geo_zone WHERE country_code != 'in';

INSERT INTO geo_zone (id, type, country_code, service_zone_id, created_at, updated_at)
SELECT 'fgz_india_default', 'country', 'in', id, NOW(), NOW()
FROM service_zone
LIMIT 1
ON CONFLICT (id) DO NOTHING;

-- 6. Stock Location: Central Atelier & Dispatch in Chandigarh, India
UPDATE stock_location 
SET name = 'India Central Fulfillment Center (Chandigarh)', updated_at = NOW();

UPDATE stock_location_address 
SET address_1 = 'Plot No. 182/40, Industrial Area Phase 1',
    address_2 = 'Atelier & Dispatch Facility',
    company = 'Beyond Humans Collective',
    city = 'Chandigarh',
    province = 'Chandigarh',
    country_code = 'IN',
    postal_code = '160017',
    phone = '+91 98765 43210',
    updated_at = NOW();

-- 7. Shipping Options: Indian domestic courier naming & INR pricing
UPDATE shipping_option 
SET name = 'Standard Domestic Delivery (India Post / Delhivery)' 
WHERE name ILIKE '%Standard%';

UPDATE shipping_option 
SET name = 'Express Air Delivery (Blue Dart)' 
WHERE name ILIKE '%Express%';

-- 8. Prices: Strictly INR
-- Delete non-INR prices where an INR price exists
DELETE FROM price 
WHERE currency_code != 'inr' 
  AND price_set_id IN (SELECT price_set_id FROM price WHERE currency_code = 'inr');

-- For any remaining non-INR prices, convert them to INR
UPDATE price 
SET currency_code = 'inr',
    amount = CASE WHEN amount <= 100 THEN amount * 250 ELSE amount END,
    raw_amount = jsonb_build_object('value', (CASE WHEN amount <= 100 THEN (amount * 250)::text ELSE amount::text END), 'precision', 20),
    updated_at = NOW() 
WHERE currency_code != 'inr';

COMMIT;
