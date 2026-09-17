/**
 * Shopify Customer / Subscriber Sync Utility
 * Automatically synchronizes early access reservations and waitlist subscribers
 * directly to your Shopify Admin Customers database.
 */

interface SyncCustomerParams {
  name?: string;
  email: string;
  phone?: string;
  vipCode: string;
  queueNumber: number;
}

export async function syncSubscriberToShopify({
  name,
  email,
  phone,
  vipCode,
  queueNumber,
}: SyncCustomerParams): Promise<{ synced: boolean; message?: string }> {
  const domain =
    process.env.SHOPIFY_STORE_DOMAIN ||
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

  // Gracefully skip if Shopify credentials have not yet been provided in environment
  if (!domain || !adminToken) {
    return {
      synced: false,
      message: 'Shopify credentials not yet configured in environment variables.',
    };
  }

  const nameParts = (name || '').trim().split(' ');
  const firstName = nameParts[0] || 'VIP';
  const lastName = nameParts.slice(1).join(' ') || 'Subscriber';

  try {
    const res = await fetch(`https://${domain}/admin/api/2024-01/customers.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken,
      },
      body: JSON.stringify({
        customer: {
          first_name: firstName,
          last_name: lastName,
          email,
          phone: phone || undefined,
          tags: 'Drop 002 VIP, Early Access, Pre-Register, Waitlist',
          note: `Drop 002 Allocation Passcode: ${vipCode} | Queue #${queueNumber}`,
          verified_email: true,
          email_marketing_consent: {
            state: 'subscribed',
            opt_in_level: 'single_opt_in',
          },
        },
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.warn('Shopify customer create notice:', errorText);
      return { synced: false, message: errorText };
    }

    return { synced: true, message: 'Synchronized to Shopify Customers' };
  } catch (err) {
    console.error('Failed to sync customer to Shopify:', err);
    return { synced: false, message: String(err) };
  }
}
