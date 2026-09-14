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
    <div className="pt-28 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/collections" className="hover:text-white transition-colors">Catalog</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-neutral-300 truncate max-w-[200px]">{product.title}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[640px] flex-shrink-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden border transition-all duration-300 flex-shrink-0 relative ${
                    selectedImageIndex === idx
                      ? 'border-white ring-2 ring-white/20'
                      : 'border-white/10 opacity-60 hover:opacity-100'
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
          <div className="flex-1 relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl">
            {product.badge && (
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-200">
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
        <div className="lg:col-span-5 space-y-8 sticky top-28">
          {/* Title & Price */}
          <div className="space-y-3 border-b border-white/[0.08] pb-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
              DROP 001 // {product.category.toUpperCase()}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              {product.title}
            </h1>
            {product.subtitle && (
              <p className="text-xs font-mono text-neutral-400 tracking-wide">
                {product.subtitle}
              </p>
            )}
            <div className="flex items-baseline space-x-3 pt-2">
              <span className="text-2xl font-mono font-bold text-white">
                ${product.price.amount} {product.price.currencyCode}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm font-mono line-through text-neutral-500">
                  ${product.compareAtPrice.amount}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-400 font-light leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-neutral-400">
                <span>Color</span>
                <span className="text-white font-semibold">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase border transition-all ${
                      selectedColor === color
                        ? 'border-white bg-white text-black font-semibold'
                        : 'border-white/15 bg-white/[0.03] text-neutral-300 hover:border-white/40'
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
              <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider text-neutral-400">
                <span>Select Size</span>
                <Link
                  href="/size-guide"
                  className="flex items-center space-x-1 text-[11px] text-neutral-400 hover:text-white transition-colors underline underline-offset-4"
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
                    className={`py-3 rounded-lg text-xs font-mono uppercase tracking-wider border transition-all ${
                      selectedSize === size
                        ? 'border-white bg-white text-black font-bold shadow-lg shadow-white/10'
                        : 'border-white/15 bg-white/[0.02] text-neutral-300 hover:border-white/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Bag */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-4">
              {/* Quantity Selector */}
              <div className="inline-flex items-center border border-white/20 rounded-full bg-white/[0.03] px-3 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-neutral-400 hover:text-white transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-mono font-semibold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-neutral-400 hover:text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Primary Add Button */}
              <button
                onClick={handleAddToBag}
                disabled={isAdding}
                className="flex-1 py-4 px-6 bg-white text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-98 flex items-center justify-center space-x-2"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
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
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-mono text-neutral-400">
              <div className="flex items-center space-x-2">
                <Truck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Complimentary Express Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
                <span>30-Day Hassle-Free Returns</span>
              </div>
            </div>
          </div>

          {/* Detailed Accordions */}
          <div className="border-t border-white/[0.08] divide-y divide-white/[0.08] pt-4">
            {/* Fabric & Technical Specs */}
            <div>
              <button
                onClick={() => toggleSection('fabric')}
                className="w-full py-4 flex items-center justify-between text-left text-xs uppercase font-mono tracking-wider text-white"
              >
                <span>Material Architecture & Craft</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
                    openSection === 'fabric' ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>
              {openSection === 'fabric' && (
                <div className="pb-5 space-y-2 text-xs text-neutral-400 leading-relaxed font-light">
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
                className="w-full py-4 flex items-center justify-between text-left text-xs uppercase font-mono tracking-wider text-white"
              >
                <span>Pattern & Oversized Fit</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
                    openSection === 'fit' ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>
              {openSection === 'fit' && (
                <div className="pb-5 space-y-2 text-xs text-neutral-400 leading-relaxed font-light">
                  <p>• Engineered with a deliberate wide boxy cut and dropped shoulder seams.</p>
                  <p>• Model is 6'1" (185cm), 78kg wearing size Large for an oversized drape.</p>
                  <p>• For a closer tailored silhouette, size down one measurement.</p>
                </div>
              )}
            </div>

            {/* Shipping & Customs */}
            <div>
              <button
                onClick={() => toggleSection('shipping')}
                className="w-full py-4 flex items-center justify-between text-left text-xs uppercase font-mono tracking-wider text-white"
              >
                <span>Worldwide Delivery & DDP</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
                    openSection === 'shipping' ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>
              {openSection === 'shipping' && (
                <div className="pb-5 space-y-2 text-xs text-neutral-400 leading-relaxed font-light">
                  <p>• Dispatched via DHL Express within 24 hours of drop allocation.</p>
                  <p>• Duties Delivered Paid (DDP) — no unexpected import fees at customs.</p>
                  <p>• Recyclable matte black archival garment packaging.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products / "Complete the Look" */}
      {relatedProducts.length > 0 && (
        <section className="mt-28 pt-16 border-t border-white/[0.08]">
          <div className="flex justify-between items-end mb-10">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
                CURATED PAIRINGS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                COMPLETE THE SILHOUETTE
              </h2>
            </div>
            <Link
              href="/collections"
              className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
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
