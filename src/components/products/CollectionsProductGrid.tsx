'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Product } from '../../lib/commerce';
import ProductCard from './ProductCard';

interface CollectionsProductGridProps {
  initialProducts: Product[];
}

export default function CollectionsProductGrid({ initialProducts }: CollectionsProductGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return initialProducts;

    return initialProducts.filter((p) => {
      const titleMatch = p.title?.toLowerCase().includes(query);
      const subtitleMatch = p.subtitle?.toLowerCase().includes(query);
      const categoryMatch = p.category?.toLowerCase().includes(query);
      const descMatch = p.description?.toLowerCase().includes(query);
      const tagMatch = p.tags?.some((t) => t.toLowerCase().includes(query));
      const colorMatch = p.colors?.some((c) => c.toLowerCase().includes(query));
      const badgeMatch = p.badge?.toLowerCase().includes(query);

      return (
        titleMatch ||
        subtitleMatch ||
        categoryMatch ||
        descMatch ||
        tagMatch ||
        colorMatch ||
        badgeMatch
      );
    });
  }, [initialProducts, searchQuery]);

  const handleClear = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className="w-full space-y-8 sm:space-y-10">
      {/* White-Fill Luxury Search Bar Matching Site */}
      <div className="w-full">
        <div className="relative group rounded-2xl bg-white p-2 sm:p-2.5 border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-neutral-300 focus-within:border-[#580D1A] focus-within:ring-4 focus-within:ring-[#580D1A]/10">
          <div className="flex items-center gap-3 px-3 py-1.5 sm:px-4 sm:py-2">
            {/* Search Icon */}
            <div className="w-9 h-9 rounded-xl bg-[#580D1A]/5 border border-[#580D1A]/15 flex items-center justify-center text-[#580D1A] flex-shrink-0 group-focus-within:bg-[#580D1A]/10 group-focus-within:border-[#580D1A]/30 transition-colors">
              <Search className="w-4 h-4" />
            </div>

            {/* Input field */}
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search the archive by silhouette, textile, or drop... (e.g., Hoodie, 500 GSM, Down, Obsidian)"
              className="w-full bg-transparent text-neutral-950 placeholder-neutral-400 text-xs sm:text-sm font-mono tracking-wide focus:outline-none focus:ring-0 selection:bg-[#580D1A] selection:text-white"
            />

            {/* Clear Button / Counter */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-950 text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors border border-neutral-200"
                  aria-label="Clear search"
                >
                  <span>Clear</span>
                  <X className="w-3.5 h-3.5 text-[#580D1A]" />
                </button>
              ) : (
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-50 border border-neutral-200/80 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                  <span>ESC to clear</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Search Status Bar */}
        <div className="flex items-center justify-between mt-3 px-1 text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-500">
            {searchQuery ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#580D1A] animate-pulse" />
                <span>
                  Filtering for &ldquo;<span className="text-neutral-900 font-semibold">{searchQuery}</span>&rdquo;
                </span>
              </>
            ) : (
              <span className="text-neutral-400">All available pieces in current allocation</span>
            )}
          </div>

          <div className="text-neutral-600">
            <span className="font-semibold text-neutral-950 font-mono">
              {filteredProducts.length}
            </span>
            <span className="text-neutral-400"> of </span>
            <span className="font-mono">{initialProducts.length}</span>
            <span className="text-neutral-400"> styles</span>
          </div>
        </div>
      </div>

      {/* Grid of Products */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 px-6 text-center space-y-4 rounded-3xl bg-white border border-dashed border-neutral-300 shadow-xs max-w-2xl mx-auto my-8">
          <div className="w-12 h-12 rounded-full bg-[#580D1A]/10 text-[#580D1A] flex items-center justify-center mx-auto">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-neutral-900">
            No silhouettes matching &ldquo;{searchQuery}&rdquo;
          </h3>
          <p className="text-xs sm:text-sm font-light text-neutral-500 max-w-md mx-auto leading-relaxed">
            We couldn&apos;t find any garments matching this query in the current allocation. Try searching by category like <span className="font-mono text-neutral-800 font-medium">Hoodie</span>, <span className="font-mono text-neutral-800 font-medium">Down</span>, <span className="font-mono text-neutral-800 font-medium">Outerwear</span>, or <span className="font-mono text-neutral-800 font-medium">Tees</span>.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-3 rounded-full bg-[#580D1A] text-white text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#430913] transition-colors shadow-md"
            >
              Reset Search Filter
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
