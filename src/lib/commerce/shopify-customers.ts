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

export interface CreatorApplicationParams {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  customCode: string;
  seedingSize?: string;
  socials: {
    instagram: string;
    youtube?: string;
    facebook?: string;
    linkedin?: string;
  };
  portfolioUrl?: string;
  note?: string;
  applicationId: string;
}

export async function syncCreatorApplicationToShopify(
  params: CreatorApplicationParams
): Promise<{ synced: boolean; message?: string }> {
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

  const nameParts = params.name.trim().split(' ');
  const firstName = nameParts[0] || 'Creator';
  const lastName = nameParts.slice(1).join(' ') || 'Applicant';

  const noteLines = [
    `=== KOLOSSAL CREATOR AFFILIATE APPLICATION ===`,
    `Application Ref: ${params.applicationId}`,
    `Requested Custom Code: ${params.customCode.trim().toUpperCase()}`,
    `Seeding Garment Size: ${params.seedingSize || 'Not specified'}`,
    ``,
    `SOCIAL CHANNELS:`,
    `• Instagram: ${params.socials.instagram}`,
    params.socials.youtube ? `• YouTube: ${params.socials.youtube}` : null,
    params.socials.facebook ? `• Facebook: ${params.socials.facebook}` : null,
    params.socials.linkedin ? `• LinkedIn: ${params.socials.linkedin}` : null,
    params.portfolioUrl ? `• Portfolio: ${params.portfolioUrl}` : null,
    ``,
    `SHIPPING DESTINATION:`,
    `${params.address.street}`,
    `${params.address.city}, ${params.address.state || ''} ${params.address.postalCode}`,
    `${params.address.country}`,
    params.note ? `\nCREATOR NOTE: "${params.note}"` : null,
  ]
    .filter(Boolean)
    .join('\n');

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
          email: params.email.trim().toLowerCase(),
          phone: params.phone.trim() || undefined,
          tags: 'Creator Affiliate, Affiliate Applicant, Drop 001 Affiliate',
          note: noteLines,
          verified_email: true,
          email_marketing_consent: {
            state: 'subscribed',
            opt_in_level: 'single_opt_in',
          },
          addresses: [
            {
              first_name: firstName,
              last_name: lastName,
              address1: params.address.street,
              city: params.address.city,
              province: params.address.state || undefined,
              zip: params.address.postalCode,
              country: params.address.country,
              phone: params.phone.trim() || undefined,
            },
          ],
        },
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.warn('Shopify creator create notice:', errorText);
      return { synced: false, message: errorText };
    }

    return { synced: true, message: 'Synchronized creator to Shopify Customers' };
  } catch (err) {
    console.error('Failed to sync creator to Shopify:', err);
    return { synced: false, message: String(err) };
  }
}
