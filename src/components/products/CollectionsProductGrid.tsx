'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown, Check, RotateCcw } from 'lucide-react';
import { Product } from '../../lib/commerce';
import ProductCard from './ProductCard';

interface CollectionsProductGridProps {
  initialProducts: Product[];
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

export default function CollectionsProductGrid({ initialProducts }: CollectionsProductGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const inputRef = useRef<HTMLInputElement>(null);

  // Extract all dynamic categories and their piece counts
  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    initialProducts.forEach((p) => {
      const cat = p.category || 'Apparel';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [initialProducts]);

  const allCategories = useMemo(() => Object.keys(categoryStats), [categoryStats]);

  // Extract all distinct available sizes across all products
  const allSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    initialProducts.forEach((p) => {
      (p.sizes || []).forEach((s) => sizeSet.add(s));
    });
    // Natural apparel sort if standard
    const standardOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', 'OS'];
    return Array.from(sizeSet).sort((a, b) => {
      const idxA = standardOrder.indexOf(a.toUpperCase());
      const idxB = standardOrder.indexOf(b.toUpperCase());
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [initialProducts]);

  // Combined Search + Category + Size + Sort Filtering
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    // 1. Filter
    const results = initialProducts.filter((p) => {
      // Category match
      if (selectedCategory !== 'all' && (p.category || 'Apparel').toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Size match
      if (selectedSize !== 'all' && !(p.sizes || []).some((s) => s.toLowerCase() === selectedSize.toLowerCase())) {
        return false;
      }

      // Search match
      if (query) {
        const titleMatch = p.title?.toLowerCase().includes(query);
        const subtitleMatch = p.subtitle?.toLowerCase().includes(query);
        const categoryMatch = p.category?.toLowerCase().includes(query);
        const descMatch = p.description?.toLowerCase().includes(query);
        const tagMatch = p.tags?.some((t) => t.toLowerCase().includes(query));
        const colorMatch = p.colors?.some((c) => c.toLowerCase().includes(query));
        const badgeMatch = p.badge?.toLowerCase().includes(query);

        if (!titleMatch && !subtitleMatch && !categoryMatch && !descMatch && !tagMatch && !colorMatch && !badgeMatch) {
          return false;
        }
      }

      return true;
    });

    // 2. Sort
    return results.sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.price.amount - b.price.amount;
      }
      if (sortBy === 'price-desc') {
        return b.price.amount - a.price.amount;
      }
      if (sortBy === 'name-asc') {
        return a.title.localeCompare(b.title);
      }
      return 0; // featured/default order
    });
  }, [initialProducts, searchQuery, selectedCategory, selectedSize, sortBy]);

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedSize !== 'all' || sortBy !== 'featured';

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSize('all');
    setSortBy('featured');
    inputRef.current?.focus();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClearSearch();
    }
  };

  return (
    <div className="w-full space-y-8 sm:space-y-10">
      {/* Control Console (Search Bar + Category Pills + Sorting + Size Strip) */}
      <div className="w-full space-y-5 bg-white p-5 sm:p-7 rounded-3xl border border-neutral-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
        
        {/* Top Row: Search Input + Sort Dropdown */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3.5">
          {/* Real-Time Search Bar */}
          <div className="relative flex-1 group rounded-2xl bg-neutral-50/80 p-1.5 sm:p-2 border border-neutral-200/90 shadow-2xs transition-all duration-300 hover:border-neutral-300 focus-within:border-[#580D1A] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#580D1A]/10">
            <div className="flex items-center gap-3 px-3 py-1">
              <div className="w-8 h-8 rounded-xl bg-[#580D1A]/5 border border-[#580D1A]/15 flex items-center justify-center text-[#580D1A] flex-shrink-0 group-focus-within:bg-[#580D1A]/10 group-focus-within:border-[#580D1A]/30 transition-colors">
                <Search className="w-4 h-4" />
              </div>

              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search by silhouette, textile, color, or drop... (e.g. Hoodie, 500 GSM, Down, Obsidian)"
                className="w-full bg-transparent text-neutral-950 placeholder-neutral-400 text-xs sm:text-sm font-mono tracking-wide focus:outline-none focus:ring-0 selection:bg-[#580D1A] selection:text-white"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="px-2 py-1 rounded-md bg-neutral-200/70 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-950 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-colors flex-shrink-0"
                  aria-label="Clear search"
                >
                  <span>Clear</span>
                  <X className="w-3 h-3 text-[#580D1A]" />
                </button>
              )}
            </div>
          </div>

          {/* Sort Selector Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto flex-shrink-0">
            <div className="relative flex items-center">
              <div className="absolute left-3 text-neutral-400 pointer-events-none">
                <ArrowUpDown className="w-3.5 h-3.5" />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-neutral-50/80 hover:bg-white border border-neutral-200/90 hover:border-neutral-300 focus:border-[#580D1A] focus:ring-4 focus:ring-[#580D1A]/10 rounded-2xl pl-9 pr-9 py-2.5 sm:py-3 text-xs font-mono tracking-wider uppercase text-neutral-800 font-medium cursor-pointer transition-all shadow-2xs outline-none"
              >
                <option value="featured">Sort: Featured Drops</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Alphabetical: A–Z</option>
              </select>
              <div className="absolute right-3.5 text-neutral-400 pointer-events-none text-[10px]">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="space-y-2 pt-2 border-t border-neutral-100">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-semibold">
              Category Allocation
            </span>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="text-[10px] font-mono uppercase tracking-wider text-[#580D1A] hover:underline font-semibold"
              >
                Reset Category
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap shadow-2xs ${
                selectedCategory === 'all'
                  ? 'bg-[#580D1A] text-white font-semibold shadow-xs'
                  : 'bg-white border border-neutral-200/90 text-neutral-600 hover:border-neutral-300 hover:text-neutral-900 font-medium'
              }`}
            >
              All Pieces ({initialProducts.length})
            </button>
            {allCategories.map((cat) => {
              const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(isSelected ? 'all' : cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap shadow-2xs ${
                    isSelected
                      ? 'bg-[#580D1A] text-white font-semibold shadow-xs'
                      : 'bg-white border border-neutral-200/90 text-neutral-600 hover:border-neutral-300 hover:text-neutral-900 font-medium'
                  }`}
                >
                  {cat} ({categoryStats[cat]})
                </button>
              );
            })}
          </div>
        </div>

        {/* Size Filter Pills (if available) */}
        {allSizes.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-semibold">
                Filter by Size
              </span>
              {selectedSize !== 'all' && (
                <button
                  type="button"
                  onClick={() => setSelectedSize('all')}
                  className="text-[10px] font-mono uppercase tracking-wider text-[#580D1A] hover:underline font-semibold"
                >
                  Clear Size
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedSize('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all shadow-2xs ${
                  selectedSize === 'all'
                    ? 'bg-neutral-950 text-white font-semibold'
                    : 'bg-white border border-neutral-200/90 text-neutral-600 hover:border-neutral-300 hover:text-neutral-950'
                }`}
              >
                All Sizes
              </button>
              {allSizes.map((size) => {
                const isSelected = selectedSize.toLowerCase() === size.toLowerCase();
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(isSelected ? 'all' : size)}
                    className={`min-w-[40px] px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all text-center shadow-2xs ${
                      isSelected
                        ? 'bg-[#580D1A] text-white font-semibold shadow-xs'
                        : 'bg-white border border-neutral-200/90 text-neutral-600 hover:border-neutral-300 hover:text-neutral-950'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Status Bar / Active Filters Row */}
        <div className="flex flex-wrap items-center justify-between pt-3 border-t border-neutral-100 gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-neutral-500">
              Showing <span className="font-semibold text-neutral-950">{filteredProducts.length}</span> of {initialProducts.length} garments
            </span>

            {/* Active Pills */}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#580D1A]/10 text-[#580D1A] text-[11px] font-semibold border border-[#580D1A]/20">
                <span>{selectedCategory}</span>
                <button type="button" onClick={() => setSelectedCategory('all')} aria-label="Remove category filter">
                  <X className="w-3 h-3 hover:text-black" />
                </button>
              </span>
            )}

            {selectedSize !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#580D1A]/10 text-[#580D1A] text-[11px] font-semibold border border-[#580D1A]/20">
                <span>Size: {selectedSize}</span>
                <button type="button" onClick={() => setSelectedSize('all')} aria-label="Remove size filter">
                  <X className="w-3 h-3 hover:text-black" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-semibold border border-neutral-200">
                <span>&ldquo;{searchQuery}&rdquo;</span>
                <button type="button" onClick={handleClearSearch} aria-label="Remove search query">
                  <X className="w-3 h-3 text-[#580D1A]" />
                </button>
              </span>
            )}
          </div>

          {/* Reset All Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 text-xs text-[#580D1A] hover:text-[#3f0812] font-semibold transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Filtered Products */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 px-6 text-center space-y-4 rounded-3xl bg-white border border-dashed border-neutral-300 shadow-xs max-w-2xl mx-auto my-8">
          <div className="w-12 h-12 rounded-full bg-[#580D1A]/10 text-[#580D1A] flex items-center justify-center mx-auto">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-neutral-900">
            No silhouettes match your current criteria
          </h3>
          <p className="text-xs sm:text-sm font-light text-neutral-500 max-w-md mx-auto leading-relaxed">
            Try adjusting your category selection, clearing the size filter, or searching with broader keywords.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleClearAll}
              className="px-6 py-3 rounded-full bg-[#580D1A] text-white text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#430913] transition-colors shadow-md"
            >
              Reset All Filters
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
