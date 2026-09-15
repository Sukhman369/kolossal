import HeroSection from '../components/hero/HeroSection';
import ModelComparisonLab from '../components/preview/ModelComparisonLab';
import FeaturedDrop from '../components/products/FeaturedDrop';
import BrandManifesto from '../components/editorial/BrandManifesto';
import { commerce } from '../lib/commerce';

export default async function HomePage() {
  const products = await commerce.getProducts({ limit: 12 });

  return (
    <div className="w-full">
      {/* 3D Hero Banner: Exclusively on the homepage */}
      <HeroSection />

      {/* 3D Model Comparison & Preview Lab: Side-by-side interactive elements */}
      <ModelComparisonLab />

      {/* Curated Drop Catalog Grid */}
      <FeaturedDrop products={products} />

      {/* Brand Manifesto Editorial */}
      <BrandManifesto />
    </div>
  );
}
