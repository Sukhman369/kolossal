'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown, RotateCcw, Check } from 'lucide-react';
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

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

    const results = initialProducts.filter((p) => {
      if (selectedCategory !== 'all' && (p.category || 'Apparel').toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      if (selectedSize !== 'all' && !(p.sizes || []).some((s) => s.toLowerCase() === selectedSize.toLowerCase())) {
        return false;
      }

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

    return results.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price.amount - b.price.amount;
      if (sortBy === 'price-desc') return b.price.amount - a.price.amount;
      if (sortBy === 'name-asc') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [initialProducts, searchQuery, selectedCategory, selectedSize, sortBy]);

  const activeFilterCount = (selectedCategory !== 'all' ? 1 : 0) + (selectedSize !== 'all' ? 1 : 0);
  const hasActiveFilters = searchQuery !== '' || activeFilterCount > 0 || sortBy !== 'featured';

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

  return (
    <div className="w-full space-y-8">
      {/* 1. Ultra-Compact Top Toolbar (Search Bar + Sort + Slide-out Filter Button) */}
      <div className="w-full space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Minimalist White Search Bar */}
          <div className="relative flex-1 group rounded-2xl bg-white p-1.5 sm:p-2 border border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-neutral-300 focus-within:border-[#580D1A] focus-within:ring-4 focus-within:ring-[#580D1A]/10">
            <div className="flex items-center gap-3 px-3 py-1">
              <div className="w-7 h-7 rounded-lg bg-[#580D1A]/5 border border-[#580D1A]/15 flex items-center justify-center text-[#580D1A] flex-shrink-0 group-focus-within:bg-[#580D1A]/10 transition-colors">
                <Search className="w-3.5 h-3.5" />
              </div>

              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search archive... (e.g. Hoodie, 500 GSM, Down, Obsidian)"
                className="w-full bg-transparent text-neutral-950 placeholder-neutral-400 text-xs sm:text-sm font-mono tracking-wide focus:outline-none focus:ring-0 selection:bg-[#580D1A] selection:text-white"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="px-2 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-colors flex-shrink-0"
                  aria-label="Clear search"
                >
                  <span>Clear</span>
                  <X className="w-3 h-3 text-[#580D1A]" />
                </button>
              )}
            </div>
          </div>

          {/* Right Controls: Sort Dropdown + Filter Drawer Toggle Button */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* Sort Dropdown */}
            <div className="relative flex items-center flex-1 sm:flex-initial">
              <div className="absolute left-3 text-neutral-400 pointer-events-none">
                <ArrowUpDown className="w-3.5 h-3.5" />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full sm:w-auto appearance-none bg-white hover:bg-neutral-50/80 border border-neutral-200/90 hover:border-neutral-300 focus:border-[#580D1A] focus:ring-4 focus:ring-[#580D1A]/10 rounded-2xl pl-9 pr-8 py-2.5 sm:py-3 text-xs font-mono tracking-wider uppercase text-neutral-800 font-medium cursor-pointer transition-all shadow-2xs outline-none"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Alphabetical: A–Z</option>
              </select>
              <div className="absolute right-3 text-neutral-400 pointer-events-none text-[9px]">
                ▼
              </div>
            </div>

            {/* Filter Drawer Toggle Button */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 sm:py-3 rounded-2xl text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-2xs border ${
                activeFilterCount > 0
                  ? 'bg-[#580D1A] text-white border-[#580D1A] shadow-xs'
                  : 'bg-white hover:bg-neutral-50/80 text-neutral-800 border-neutral-200/90 hover:border-neutral-300'
              }`}
              aria-label="Open filter drawer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-white text-[#580D1A] text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Discreet Active Filter Chips & Counter (Only appears when active) */}
        <div className="flex flex-wrap items-center justify-between px-1 gap-2 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-neutral-500">
              Showing <span className="font-semibold text-neutral-950">{filteredProducts.length}</span> of {initialProducts.length} pieces
            </span>

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#580D1A]/10 text-[#580D1A] text-[11px] font-semibold border border-[#580D1A]/20">
                <span>Category: {selectedCategory}</span>
                <button type="button" onClick={() => setSelectedCategory('all')} aria-label="Remove category filter">
                  <X className="w-3 h-3 hover:text-black" />
                </button>
              </span>
            )}

            {selectedSize !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#580D1A]/10 text-[#580D1A] text-[11px] font-semibold border border-[#580D1A]/20">
                <span>Size: {selectedSize}</span>
                <button type="button" onClick={() => setSelectedSize('all')} aria-label="Remove size filter">
                  <X className="w-3 h-3 hover:text-black" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-semibold border border-neutral-200">
                <span>&ldquo;{searchQuery}&rdquo;</span>
                <button type="button" onClick={handleClearSearch} aria-label="Remove search query">
                  <X className="w-3 h-3 text-[#580D1A]" />
                </button>
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-1 text-[11px] text-[#580D1A] hover:underline font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Slide-out Filter Drawer (Overlay + Drawer Sheet) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop Blur */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Side Drawer Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200/80">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#580D1A]" />
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-neutral-950 font-mono">
                  FILTER ARCHIVE
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
                aria-label="Close filters"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none">
              {/* Category Filter Section */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold">
                    Categories
                  </span>
                  {selectedCategory !== 'all' && (
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('all')}
                      className="text-[10px] font-mono uppercase tracking-wider text-[#580D1A] hover:underline font-semibold"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border ${
                      selectedCategory === 'all'
                        ? 'bg-[#580D1A] text-white border-[#580D1A] font-semibold shadow-xs'
                        : 'bg-neutral-50/70 hover:bg-neutral-100 border-neutral-200/80 text-neutral-700 font-medium'
                    }`}
                  >
                    <span>All Silhouettes</span>
                    <span className="text-[11px] opacity-80">{initialProducts.length}</span>
                  </button>

                  {allCategories.map((cat) => {
                    const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(isSelected ? 'all' : cat)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border ${
                          isSelected
                            ? 'bg-[#580D1A] text-white border-[#580D1A] font-semibold shadow-xs'
                            : 'bg-neutral-50/70 hover:bg-neutral-100 border-neutral-200/80 text-neutral-700 font-medium'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                          <span>{cat}</span>
                        </span>
                        <span className="text-[11px] opacity-80">{categoryStats[cat]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Filter Section */}
              {allSizes.length > 0 && (
                <div className="space-y-3.5 pt-6 border-t border-neutral-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold">
                      Available Sizes
                    </span>
                    {selectedSize !== 'all' && (
                      <button
                        type="button"
                        onClick={() => setSelectedSize('all')}
                        className="text-[10px] font-mono uppercase tracking-wider text-[#580D1A] hover:underline font-semibold"
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSize('all')}
                      className={`col-span-4 px-3 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border ${
                        selectedSize === 'all'
                          ? 'bg-neutral-950 text-white border-neutral-950 font-semibold'
                          : 'bg-neutral-50/70 hover:bg-neutral-100 border-neutral-200/80 text-neutral-700 font-medium'
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
                          className={`h-11 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all border flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#580D1A] text-white border-[#580D1A] shadow-xs'
                              : 'bg-neutral-50/70 hover:bg-neutral-100 border-neutral-200/80 text-neutral-700'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-neutral-200/80 bg-neutral-50 flex items-center gap-3">
              <button
                type="button"
                onClick={handleClearAll}
                className="w-1/3 py-3.5 rounded-full border border-neutral-300 text-xs font-mono uppercase tracking-wider text-neutral-700 font-semibold hover:bg-white transition-colors text-center"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="w-2/3 py-3.5 rounded-full bg-[#580D1A] hover:bg-[#430913] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-md text-center"
              >
                View {filteredProducts.length} {filteredProducts.length === 1 ? 'Piece' : 'Pieces'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Product Catalog Grid */}
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
