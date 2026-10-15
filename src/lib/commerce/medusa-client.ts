import Medusa from '@medusajs/js-sdk';

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'pk_d1d4eb809e191e41c5af08410e2e8b11214cdf8876e907fe3db4ed1cbd58c5d0';

export const medusaSdk = new Medusa({
  baseUrl: BACKEND_URL,
  publishableKey: PUBLISHABLE_KEY,
  debug: process.env.NODE_ENV === 'development',
});
