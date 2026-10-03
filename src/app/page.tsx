import HeroBannerPlaceholder from '../components/hero/HeroBannerPlaceholder';
import FeaturedDrop from '../components/products/FeaturedDrop';
import BrandManifesto from '../components/editorial/BrandManifesto';
import { commerce } from '../lib/commerce';

export default async function HomePage() {
  const products = await commerce.getProducts({ limit: 12 });

  return (
    <div className="w-full">
      {/* Hero Banner Slider — Awaiting final artwork from graphic designer */}
      <HeroBannerPlaceholder />

      {/* Curated Drop Catalog Grid */}
      <FeaturedDrop products={products} />

      {/* Brand Manifesto Editorial */}
      <BrandManifesto />
    </div>
  );
}
