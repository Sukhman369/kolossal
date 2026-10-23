import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowUpRight, SlidersHorizontal, Sparkles } from 'lucide-react';
import { commerce } from '../../lib/commerce';
import CollectionsProductGrid from '../../components/products/CollectionsProductGrid';

export const metadata: Metadata = {
  title: 'Collections | BEYOND HUMANS',
  description: 'Explore all architectural apparel collections by Beyond Humans. Double-faced French terry hoodies, technical outerwear, relaxed trousers, and sterling silver jewelry.',
};

const CURATED_STORIES = [
  {
    handle: 'outerwear',
    title: 'Outerwear',
    subtitle: 'High-Volume Down & Technical Wool',
    description: 'Engineered for sub-zero climates with Japanese waterproof ripstop and 90/10 goose down insulation.',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1200&auto=format&fit=crop',
    itemCount: '2 Styles',
  },
  {
    handle: 'hoodies',
    title: 'Heavyweight Hoodies',
    subtitle: '500 GSM French Terry Architecture',
    description: 'Custom milled double-faced organic cotton with structural non-collapsing boxy drape and drop shoulders.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
    itemCount: '3 Styles',
  },
  {
    handle: 'pants',
    title: 'Cargo & Relaxed Pants',
    subtitle: 'Origami Cargo & Gabardine Pleats',
    description: 'Double-pleated waistbands with 3D articulated bellows and adjustable bungee conversion cuffs.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop',
    itemCount: '2 Styles',
  },
  {
    handle: 'tees',
    title: 'Sculpted Tees',
    subtitle: '300 GSM Ring-Spun Cotton',
    description: 'High-density ribbed collars and reinforced boxy drape that maintains architectural form.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
    itemCount: '3 Styles',
  },
  {
    handle: 'accessories',
    title: 'Hardware & Jewelry',
    subtitle: 'Solid 925 Sterling Silver',
    description: 'Industrial curb chains and oxidized monogram signet rings hand-finished in Industrial Area, Chandigarh, India.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
    itemCount: '1 Style',
  },
];

export default async function CollectionsPage() {
  const products = await commerce.getProducts({ limit: 100 });

  // Dynamically extract categories present in current Medusa products
  const categoryCounts: Record<string, number> = {};
  products.forEach((p) => {
    const cat = p.category || 'Apparel';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const categories = Object.keys(categoryCounts);

  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="border-b border-neutral-200/80 pb-8 sm:pb-12 mb-8 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#580D1A] block font-semibold">
              BEYOND HUMANS ARCHIVES
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-950">
              ALL COLLECTIONS
            </h1>
            <p className="text-xs sm:text-sm font-light text-neutral-600 max-w-xl leading-relaxed">
              Every garment and artifact engineered by Beyond Humans. Designed with architectural proportions, 
              custom-milled textiles, and zero seasonal obsolescence.
            </p>
          </div>

          {/* Stats Badge */}
          <div className="flex items-center space-x-3 text-xs font-mono">
            <div className="flex items-center space-x-2 px-4 py-2.5 rounded-full border border-[#580D1A]/20 bg-[#580D1A]/5 text-[#580D1A] font-semibold shadow-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#580D1A]" />
              <span>{products.length} Total Pieces Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Live Products Grid with Real-Time Search Bar */}
      <section className="mb-20 sm:mb-28">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#580D1A] block mb-1 font-semibold">
              CURRENT ALLOCATION
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-neutral-900">
              The Catalog
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-500">
            Live Medusa Catalog
          </span>
        </div>

        <CollectionsProductGrid initialProducts={products} />
      </section>

      {/* Curated Silhouette Stories */}
      <section className="border-t border-neutral-200/80 pt-16 sm:pt-20">
        <div className="mb-10 space-y-2">
          <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-[#580D1A] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CURATED SILHOUETTE DROPS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950">
            Explore By Series
          </h2>
          <p className="text-xs sm:text-sm font-light text-neutral-500 max-w-xl">
            Deep-dive into specific textile developments, fit philosophies, and design narratives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {CURATED_STORIES.map((col) => (
            <Link
              key={col.handle}
              href={`/collections/${col.handle}`}
              className="group relative flex flex-col space-y-4 rounded-2xl overflow-hidden bg-white border border-neutral-200/90 hover:border-[#580D1A]/40 transition-all duration-500 hover:shadow-xl shadow-xs"
            >
              {/* Image Aspect */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Item Count Pill */}
                <div className="absolute top-4 right-4 px-3.5 py-1 rounded-full bg-white/95 border border-[#580D1A]/20 backdrop-blur-md text-[10px] font-mono text-[#580D1A] font-semibold shadow-sm">
                  {col.itemCount}
                </div>

                {/* Title & Arrow in Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 block mb-1">
                      {col.subtitle}
                    </span>
                    <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                      {col.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 group-hover:bg-[#580D1A] text-white flex items-center justify-center transition-colors duration-300 backdrop-blur-md shadow-md">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Description footer */}
              <div className="p-6 pt-2 text-xs font-light text-neutral-600 leading-relaxed">
                {col.description}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
