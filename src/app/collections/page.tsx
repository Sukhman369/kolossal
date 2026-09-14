import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Collections | KOLOSSAL',
  description: 'Explore curated architectural apparel collections by Kolossal. Heavyweight organic cottons, tailored outerwear, and sterling silver accessories.',
};

const COLLECTIONS = [
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
    title: 'Tailored Pants',
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
    description: 'Industrial curb chains and oxidized monogram signet rings hand-finished in Milan.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
    itemCount: '1 Style',
  },
];

export default function CollectionsPage() {
  return (
    <div className="pt-28 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-10 mb-12">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 block mb-2">
          COLLECTIONS INDEX
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
          THE ARCHIVES
        </h1>
        <p className="text-sm font-light text-neutral-400 max-w-xl mt-3 leading-relaxed">
          Architectural garments segmented by silhouette and textile weight. Small-batch milled with zero seasonal obsolescence.
        </p>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COLLECTIONS.map((col) => (
          <Link
            key={col.handle}
            href={`/collections/${col.handle}`}
            className="group relative flex flex-col space-y-4 rounded-2xl overflow-hidden bg-neutral-900/50 border border-white/[0.08] hover:border-white/25 transition-all duration-500 hover:shadow-2xl hover:shadow-black/80"
          >
            {/* Image Aspect */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-950">
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              {/* Item Count Pill */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[10px] font-mono text-neutral-300">
                {col.itemCount}
              </div>

              {/* Title & Arrow in Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                    {col.subtitle}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                    {col.title}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-black flex items-center justify-center transition-colors duration-300 backdrop-blur-md">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Description footer */}
            <div className="p-6 pt-0 text-xs font-light text-neutral-400 leading-relaxed">
              {col.description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
