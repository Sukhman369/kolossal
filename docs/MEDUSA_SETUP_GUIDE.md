# Beyond Humans — MedusaJS v2 Backend Setup Guide

This guide details how to launch and connect a **Medusa v2** backend to the **Beyond Humans** Next.js storefront.

---

## 1. Quick Architecture Overview

The Beyond Humans storefront features a pluggable commerce architecture:
- **`src/lib/commerce/medusa-client.ts`**: Initialized `@medusajs/js-sdk` v2 client.
- **`src/lib/commerce/medusa-adapter.ts`**: Implements `CommerceAdapter` interfacing with Medusa v2 store endpoints:
  - Products & Catalog: `sdk.store.product.list(...)`
  - Cart Operations: `sdk.store.cart.create()`, `createLineItem()`, `deleteLineItem()`, `updateLineItem()`
  - Headless Checkout: `sdk.store.cart.update()` (address & email), `addShippingMethod()`, `complete()`
- **Resilient Fallbacks**: If the Medusa server is booting or offline, the adapter falls back cleanly to the built-in mock catalog and local cart without crashing.

---

## 2. Booting a Medusa v2 Backend

To spin up a new Medusa v2 backend server (e.g., in a separate folder or repository `beyond-humans-backend`):

```bash
# In your repos directory (outside the frontend):
npx create-medusa-app@latest beyond-humans-backend
```

Follow the interactive prompts:
1. Choose your database (PostgreSQL is recommended for production; local development can use PostgreSQL or SQLite).
2. Enter your admin email & password.
3. Allow Medusa to run migrations and seed demo products (optional).

Navigate into your backend and start it:
```bash
cd beyond-humans-backend
npm run dev
```

By default:
- **Backend API**: `http://localhost:9000`
- **Admin Dashboard**: `http://localhost:9000/app`

---

## 3. Creating a Publishable API Key

Medusa v2 requires a **Publishable API Key** to scope storefront queries to sales channels.

1. Open your Medusa Admin at `http://localhost:9000/app`.
2. Navigate to **Settings** > **Publishable API Keys**.
3. Click **Create API Key** (e.g. name it `Beyond Humans Storefront`).
4. Click into the new key and link it to your **Default Sales Channel**.
5. Copy the generated key (starts with `pk_...`).

---

## 4. Configuring CORS in Medusa Backend

In your Medusa project's `medusa-config.ts` (or `medusa-config.js`), ensure your Next.js storefront URL is allowed in `storeCors`:

```ts
module.exports = defineConfig({
  projectConfig: {
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:3000,https://your-production-domain.com",
      adminCors: process.env.ADMIN_CORS || "http://localhost:9000,http://localhost:5173",
      authCors: process.env.AUTH_CORS || "http://localhost:3000,http://localhost:9000",
    },
  },
});
```

---

## 5. Connecting the Storefront

In the Beyond Humans storefront root (`kolossal`), edit `.env.local`:

```env
# Switch active provider to medusa
NEXT_PUBLIC_COMMERCE_PROVIDER=medusa

# Medusa Backend URL
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000

# Your Publishable Key from Step 3
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Now start the storefront development server:
```bash
npm run dev
```

Visit `http://localhost:3000`:
- Products will now load directly from your Medusa catalog!
- Adding items to the bag interacts with Medusa v2 Cart APIs.
- The checkout page at `/checkout` will sync addresses and complete orders into Medusa Admin.

---

## 6. Verifying In Medusa Admin

When an order is placed through the `/checkout` page:
1. Open `http://localhost:9000/app/orders`.
2. You will see the new order with:
   - Order ID and Display ID
   - Customer shipping details
   - Line items and total paid
   - Payment status
