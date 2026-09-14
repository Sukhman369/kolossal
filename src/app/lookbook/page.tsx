import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Campaign Lookbook | KOLOSSAL',
  description: 'Editorial lookbook for Kolossal Drop 001. Photographed on location in Tokyo and Milan.',
};

const LOOKS = [
  {
    id: 'look_01',
    number: 'LOOK 01',
    title: 'The Monolith Trench & Origami Cargo',
    location: 'Shinjuku, Tokyo // 03:00 AM',
    modelNote: 'Model is 186cm wearing Trench (Size 50) and Cargo (Size 32)',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1400&auto=format&fit=crop',
    products: [
      {
        title: 'Monolith Tailored Trench Coat',
        handle: 'monolith-oversized-wool-overcoat',
        price: '$580',
      },
      {
        title: 'Architectural Pleated Cargo Pant',
        handle: 'architectural-wide-pleated-cargo',
        price: '$240',
      },
    ],
  },
  {
    id: 'look_02',
    number: 'LOOK 02',
    title: '500 GSM Monolith Hoodie & Silver Link',
    location: 'Ginza Underground // 05:30 AM',
    modelNote: 'Model is 182cm wearing Hoodie (Size Large) and Chain (50cm)',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1400&auto=format&fit=crop',
    products: [
      {
        title: 'Monolith Heavyweight Hoodie',
        handle: 'kolossal-monolith-heavyweight-hoodie',
        price: '$185',
      },
      {
        title: 'Brutalist Monogram Signet Chain',
        handle: 'kolossal-sterling-chain',
        price: '$290',
      },
    ],
  },
  {
    id: 'look_03',
    number: 'LOOK 03',
    title: 'Tactical Matte Puffer & Pleated Cargo',
    location: 'Roppongi Crossing // 01:15 AM',
    modelNote: 'Model is 188cm wearing Matte Puffer (Size Large)',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1400&auto=format&fit=crop',
    products: [
      {
        title: 'Tactical Matte Puffer Jacket',
        handle: 'tactical-down-oversized-puffer',
        price: '$395',
      },
    ],
  },
  {
    id: 'look_04',
    number: 'LOOK 04',
    title: 'Sculpted Boxy Drop-Tee & Raw Denim',
    location: 'Aoyama Concrete Studio // 11:00 AM',
    modelNote: 'Model is 180cm wearing Sculpted Drop-Tee (Size Medium)',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1400&auto=format&fit=crop',
    products: [
      {
        title: 'Sculpted Boxy Drop-Tee',
        handle: 'sculpted-monogram-tee',
        price: '$95',
      },
    ],
  },
];

export default function LookbookPage() {
  return (
    <div className="pt-36 pb-36 px-6 lg:px-12 max-w-7xl mx-auto space-y-28">
      {/* Header */}
      <div className="border-b border-neutral-200/80 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#580D1A] font-semibold">
            EDITORIAL CAMPAIGN // DROP 001
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-950">
            TOKYO MONOLITH
          </h1>
          <p className="text-xs sm:text-sm font-light text-neutral-600 max-w-lg leading-relaxed">
            Photographed between Shinjuku and Aoyama under low-ambient neon. An exploration of heavy drapery against raw concrete geometry.
          </p>
        </div>

        <div className="text-xs font-mono text-[#580D1A] uppercase tracking-wider font-semibold bg-[#580D1A]/5 px-4 py-2 rounded-full border border-[#580D1A]/20">
          4 CURATED ENSEMBLES &bull; LIMITED RUN
        </div>
      </div>

      {/* Editorial Looks Grid */}
      <div className="space-y-32">
        {LOOKS.map((look, index) => (
          <div
            key={look.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image (7 cols) */}
            <div className={`lg:col-span-7 aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/90 relative group shadow-xl ${
              index % 2 === 1 ? 'lg:order-2' : ''
            }`}>
              <img
                src={look.image}
                alt={look.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/95 border border-[#580D1A]/20 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-[#580D1A] font-bold shadow-md">
                {look.number}
              </div>
            </div>

            {/* Look Details (5 cols) */}
            <div className={`lg:col-span-5 space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-[#580D1A] uppercase tracking-widest font-semibold">
                  {look.location}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-neutral-950">
                  {look.title}
                </h2>
                <p className="text-xs font-mono text-neutral-500 pt-1">
                  {look.modelNote}
                </p>
              </div>

              {/* Featured Pieces in this look */}
              <div className="space-y-3 pt-6 border-t border-neutral-200">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                  Featured Garments
                </span>
                <div className="space-y-3">
                  {look.products.map((item) => (
                    <Link
                      key={item.handle}
                      href={`/products/${item.handle}`}
                      className="p-4 rounded-xl bg-white border border-neutral-200/90 hover:border-[#580D1A]/40 flex items-center justify-between group transition-all shadow-xs hover:shadow-md"
                    >
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-950 group-hover:text-[#580D1A] transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-[11px] font-mono font-semibold text-[#580D1A]">
                          {item.price} USD
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-[#580D1A] text-neutral-600 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
