'use client';

import React, { useState } from 'react';
import { Product } from '../../lib/commerce/types';
import ProductCard from './ProductCard';

export default function FeaturedDrop({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'OUTERWEAR', 'HOODIES', 'PANTS', 'TEES', 'ACCESSORIES'];

  const filteredProducts = activeCategory === 'ALL'
    ? products
    : products.filter(
        (p) => p.category.toUpperCase() === activeCategory.toUpperCase()
      );

  return (
    <section id="featured-drop" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto bg-[#FAF9F7]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-neutral-200/80 gap-6">
        <div className="space-y-2">
          <div className="text-[11px] font-mono tracking-[0.25em] text-[#580D1A] uppercase font-semibold">
            CURATED CATALOG // DROP 001
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-neutral-950">
            ARCHITECTURAL ESSENTIALS
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-full text-[11px] font-mono uppercase tracking-[0.2em] transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#580D1A] text-white font-semibold shadow-md shadow-[#580D1A]/20'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:border-[#580D1A] hover:text-[#580D1A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
