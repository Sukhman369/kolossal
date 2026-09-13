import { CommerceAdapter } from './types';
import { MockCommerceAdapter } from './mock-adapter';
import { ShopifyCommerceAdapter } from './shopify-adapter';
import { MedusaCommerceAdapter } from './medusa-adapter';

export * from './types';
export * from './mock-data';

export function getCommerceAdapter(): CommerceAdapter {
  const provider = (process.env.NEXT_PUBLIC_COMMERCE_PROVIDER || 'mock').toLowerCase();

  switch (provider) {
    case 'shopify':
      return new ShopifyCommerceAdapter();
    case 'medusa':
      return new MedusaCommerceAdapter();
    case 'mock':
    default:
      return new MockCommerceAdapter();
  }
}

export const commerce = getCommerceAdapter();
