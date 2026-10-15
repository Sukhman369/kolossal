-- Beyond Humans: Migration to Indian Standard (INR / India Region)

BEGIN;

-- 1. Store currency: Set INR as default
INSERT INTO store_currency (id, currency_code, is_default, store_id, created_at, updated_at)
SELECT 'stocur_inr_default', 'inr', true, id, NOW(), NOW()
FROM store
LIMIT 1
ON CONFLICT (id) DO UPDATE SET is_default = true;

UPDATE store_currency 
SET is_default = false 
WHERE currency_code != 'inr';

-- 2. Region: Update primary region to India with INR currency
UPDATE region 
SET name = 'India', currency_code = 'inr', updated_at = NOW() 
WHERE id = (SELECT id FROM region LIMIT 1);

-- 3. Link India (in) to the region
UPDATE region_country 
SET region_id = (SELECT id FROM region LIMIT 1) 
WHERE iso_2 = 'in';

-- 4. Tax Region for India
INSERT INTO tax_region (id, provider_id, country_code, created_at, updated_at)
VALUES ('txreg_india_default', 'tp_system', 'in', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 5. Service Zone / Geo Zone for India shipping
INSERT INTO geo_zone (id, type, country_code, service_zone_id, created_at, updated_at)
SELECT 'fgz_india_default', 'country', 'in', id, NOW(), NOW()
FROM service_zone
LIMIT 1
ON CONFLICT (id) DO NOTHING;

-- 6. Stock Location update to India Hub
UPDATE stock_location 
SET name = 'India Fulfillment Hub (Mumbai)', updated_at = NOW() 
WHERE name = 'European Warehouse';

UPDATE stock_location_address 
SET city = 'Mumbai', country_code = 'IN', updated_at = NOW() 
WHERE city = 'Copenhagen';

-- 7. Product Variant Prices in INR
UPDATE price pr
SET currency_code = 'inr',
    amount = CASE 
      WHEN p.handle = 't-shirt' THEN 2990
      WHEN p.handle = 'shorts' THEN 4490
      WHEN p.handle = 'sweatshirt' THEN 5490
      WHEN p.handle = 'sweatpants' THEN 5990
      ELSE 2990
    END,
    raw_amount = jsonb_build_object(
      'value', (CASE 
        WHEN p.handle = 't-shirt' THEN '2990'
        WHEN p.handle = 'shorts' THEN '4490'
        WHEN p.handle = 'sweatshirt' THEN '5490'
        WHEN p.handle = 'sweatpants' THEN '5990'
        ELSE '2990'
      END),
      'precision', 20
    ),
    updated_at = NOW()
FROM product_variant_price_set pvps
JOIN product_variant pv ON pv.id = pvps.variant_id
JOIN product p ON p.id = pv.product_id
WHERE pr.price_set_id = pvps.price_set_id
  AND pr.currency_code = 'eur';

-- 8. Shipping Option Prices in INR
UPDATE price pr
SET currency_code = 'inr',
    amount = 199,
    raw_amount = jsonb_build_object('value', '199', 'precision', 20),
    updated_at = NOW()
FROM shipping_option_price_set sops
JOIN shipping_option so ON so.id = sops.shipping_option_id
WHERE pr.price_set_id = sops.price_set_id
  AND so.name = 'Standard Shipping'
  AND pr.currency_code = 'eur';

UPDATE price pr
SET currency_code = 'inr',
    amount = 499,
    raw_amount = jsonb_build_object('value', '499', 'precision', 20),
    updated_at = NOW()
FROM shipping_option_price_set sops
JOIN shipping_option so ON so.id = sops.shipping_option_id
WHERE pr.price_set_id = sops.price_set_id
  AND so.name = 'Express Shipping'
  AND pr.currency_code = 'eur';

COMMIT;
