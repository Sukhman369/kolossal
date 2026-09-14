'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '../../lib/commerce/types';
import { useCart } from '../../context/CartContext';
import ProductCard from './ProductCard';
import {
  ChevronRight,
  Plus,
  Minus,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  ChevronDown
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const { addItem, isAdding } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || 'Core');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Accordion state
  const [openSection, setOpenSection] = useState<string | null>('fabric');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleAddToBag = async () => {
    const selectedVariant = product.variants[0];

    await addItem({
      productId: product.id,
      variantId: selectedVariant?.id || `${product.id}_${selectedSize}`,
      title: product.title,
      variantTitle: `${selectedColor} / ${selectedSize}`,
      quantity,
      price: product.price,
      image: product.images[selectedImageIndex]?.url || product.images[0]?.url,
      size: selectedSize,
      color: selectedColor,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const images = product.images.length > 0 ? product.images : [
    { url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop', altText: product.title }
  ];

  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-6 sm:mb-10">
        <Link href="/" className="hover:text-[#580D1A] transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <Link href="/collections" className="hover:text-[#580D1A] transition-colors">Catalog</Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-neutral-900 font-medium truncate max-w-[200px]">{product.title}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Left Column: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 sm:gap-5">
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex md:flex-col gap-2.5 sm:gap-3.5 overflow-x-auto md:overflow-y-auto max-h-[640px] flex-shrink-0 pb-2 md:pb-0 overscroll-x-contain">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-18 sm:w-16 sm:h-20 md:w-20 md:h-24 rounded-xl overflow-hidden border transition-all duration-300 flex-shrink-0 relative ${
                    selectedImageIndex === idx
                      ? 'border-[#580D1A] ring-2 ring-[#580D1A]/30 shadow-md'
                      : 'border-neutral-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.altText || `View ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Selected Image */}
          <div className="flex-1 relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-neutral-200/90 shadow-xl">
            {product.badge && (
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1 rounded-full bg-[#580D1A] text-white text-[10px] font-mono uppercase tracking-[0.2em] shadow-md font-semibold">
                {product.badge}
              </div>
            )}
            <img
              src={images[selectedImageIndex]?.url}
              alt={images[selectedImageIndex]?.altText || product.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Right Column: Sticky Product Purchase Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8 lg:sticky lg:top-32">
          {/* Title & Price */}
          <div className="space-y-3 border-b border-neutral-200/80 pb-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#580D1A] font-semibold">
              DROP 001 // {product.category.toUpperCase()}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-neutral-950 leading-tight">
              {product.title}
            </h1>
            {product.subtitle && (
              <p className="text-xs font-mono text-neutral-500 tracking-wide">
                {product.subtitle}
              </p>
            )}
            <div className="flex items-baseline space-x-3 pt-2">
              <span className="text-2xl font-mono font-bold text-[#580D1A]">
                ${product.price.amount} {product.price.currencyCode}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm font-mono line-through text-neutral-400">
                  ${product.compareAtPrice.amount}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-600 font-light leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-neutral-600">
                <span>Color</span>
                <span className="text-[#580D1A] font-semibold">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase border transition-all duration-200 ${
                      selectedColor === color
                        ? 'border-[#580D1A] bg-[#580D1A] text-white font-semibold shadow-sm'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-[#580D1A]/50'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider text-neutral-600">
                <span>Select Size</span>
                <Link
                  href="/size-guide"
                  className="flex items-center space-x-1 text-[11px] text-[#580D1A] hover:underline underline-offset-4 font-medium transition-colors"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Matrix</span>
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-xl text-xs font-mono uppercase tracking-wider border transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-[#580D1A] bg-[#580D1A] text-white font-bold shadow-md shadow-[#580D1A]/20'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-[#580D1A]/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Bag */}
          <div className="space-y-4 pt-2">
            <div className="flex gap-4">
              {/* Quantity Selector */}
              <div className="inline-flex items-center border border-neutral-300 rounded-full bg-white px-3 py-2 shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-neutral-500 hover:text-[#580D1A] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-mono font-semibold text-neutral-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-neutral-500 hover:text-[#580D1A] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Primary Add Button */}
              <button
                onClick={handleAddToBag}
                disabled={isAdding}
                className="flex-1 py-4 px-6 bg-[#580D1A] text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:bg-[#430913] hover:shadow-lg hover:shadow-[#580D1A]/25 active:scale-98 flex items-center justify-center space-x-2"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <span>Add to Bag &bull; ${(product.price.amount * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Micro Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-mono text-neutral-500">
              <div className="flex items-center space-x-2">
                <Truck className="w-3.5 h-3.5 text-[#580D1A]" />
                <span>Complimentary Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-3.5 h-3.5 text-[#580D1A]" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Detailed Accordions */}
          <div className="border-t border-neutral-200 divide-y divide-neutral-200 pt-4">
            {/* Fabric & Technical Specs */}
            <div>
              <button
                onClick={() => toggleSection('fabric')}
                className="w-full py-4 flex items-center justify-between text-left text-xs uppercase font-mono tracking-wider text-neutral-950 font-semibold"
              >
                <span>Material Architecture & Craft</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${
                    openSection === 'fabric' ? 'rotate-180 text-[#580D1A]' : ''
                  }`}
                />
              </button>
              {openSection === 'fabric' && (
                <div className="pb-5 space-y-2 text-xs text-neutral-600 leading-relaxed font-light">
                  <p>• Custom 500 GSM double-faced combed organic cotton French Terry.</p>
                  <p>• Pre-shrunk via Japanese low-tension washing to preserve drape for life.</p>
                  <p>• Finished with reinforced tonal bar-tacks and blind hem stitching.</p>
                </div>
              )}
            </div>

            {/* Sizing & Model Fit */}
            <div>
              <button
                onClick={() => toggleSection('fit')}
                className="w-full py-4 flex items-center justify-between text-left text-xs uppercase font-mono tracking-wider text-neutral-950 font-semibold"
              >
                <span>Pattern & Oversized Fit</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${
                    openSection === 'fit' ? 'rotate-180 text-[#580D1A]' : ''
                  }`}
                />
              </button>
              {openSection === 'fit' && (
                <div className="pb-5 space-y-2 text-xs text-neutral-600 leading-relaxed font-light">
                  <p>• Engineered with a deliberate wide boxy cut and dropped shoulder seams.</p>
                  <p>• Model is 6'1" (185cm), 78kg wearing size Large for an oversized drape.</p>
                  <p>• For a closer silhouette, size down one measurement.</p>
                </div>
              )}
            </div>

            {/* Shipping & Customs */}
            <div>
              <button
                onClick={() => toggleSection('shipping')}
                className="w-full py-4 flex items-center justify-between text-left text-xs uppercase font-mono tracking-wider text-neutral-950 font-semibold"
              >
                <span>Worldwide Delivery & DDP</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${
                    openSection === 'shipping' ? 'rotate-180 text-[#580D1A]' : ''
                  }`}
                />
              </button>
              {openSection === 'shipping' && (
                <div className="pb-5 space-y-2 text-xs text-neutral-600 leading-relaxed font-light">
                  <p>• Dispatched via DHL Express within 24 hours of drop allocation.</p>
                  <p>• Duties Delivered Paid (DDP) — no unexpected import fees at customs.</p>
                  <p>• Recyclable matte archival garment packaging.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products / "Complete the Look" */}
      {relatedProducts.length > 0 && (
        <section className="mt-32 pt-20 border-t border-neutral-200">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#580D1A] uppercase font-semibold">
                CURATED PAIRINGS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950">
                COMPLETE THE SILHOUETTE
              </h2>
            </div>
            <Link
              href="/collections"
              className="text-xs font-mono uppercase tracking-widest text-[#580D1A] hover:underline underline-offset-4 transition-colors font-medium"
            >
              View Full Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.slice(0, 3).map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
