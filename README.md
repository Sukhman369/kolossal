# Beyond Humans — Luxury Brutalist Streetwear Storefront

High-performance, luxury brutalist e-commerce storefront engineered with Next.js App Router, Tailwind CSS, Three.js 3D brand experiences, and an adapter-based commerce engine supporting **MedusaJS v2**, **Shopify Storefront API**, and **Mock/Offline mode**.

---

## ⚡ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS, PostCSS, Framer Motion
- **3D Graphics**: Three.js procedural brutalist monogram intro
- **Commerce Engine**: Pluggable Commerce Adapter Pattern:
  - **MedusaJS v2**: `@medusajs/js-sdk` v2 with real-time cart, catalog sync, and headless checkout.
  - **Shopify**: Storefront API GraphQL with hosted checkout redirect.
  - **Mock Engine**: Offline-capable demo catalog for fast local iteration.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Select your desired provider in `.env.local`:

```env
# Options: 'medusa' | 'shopify' | 'mock'
NEXT_PUBLIC_COMMERCE_PROVIDER=medusa

# When using Medusa v2:
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_medusa_publishable_key
```

> For full instructions on launching a Medusa v2 backend and connecting it, see [`docs/MEDUSA_SETUP_GUIDE.md`](./docs/MEDUSA_SETUP_GUIDE.md).

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

```bash
npm run build
npm run start
```
