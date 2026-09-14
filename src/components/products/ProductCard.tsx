'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '../../lib/commerce/types';
import { useCart } from '../../context/CartContext';
import { Plus, Check } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, isAdding } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || 'M');

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants[0];

    await addItem({
      productId: product.id,
      variantId: defaultVariant?.id || `${product.id}_${selectedSize}`,
      title: product.title,
      variantTitle: `${product.colors?.[0] || 'Core'} / ${selectedSize}`,
      quantity: 1,
      price: product.price,
      image: product.images[0]?.url,
      size: selectedSize,
      color: product.colors?.[0],
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group relative flex flex-col space-y-4 select-none">
      {/* Product Image Frame */}
      <Link
        href={`/products/${product.handle}`}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200/80 transition-all duration-500 group-hover:border-[#580D1A]/40 group-hover:shadow-[0_12px_35px_rgba(88,13,26,0.08)] block"
      >
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3.5 left-3.5 z-10 px-3 py-1 rounded-full bg-[#580D1A] text-white text-[9px] font-mono uppercase tracking-[0.2em] font-semibold shadow-md">
            {product.badge}
          </div>
        )}

        {/* Image with subtle zoom */}
        <img
          src={product.images[0]?.url}
          alt={product.images[0]?.altText || product.title}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover Quick Add Overlay */}
        <div className="absolute inset-x-3.5 bottom-3.5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="w-full py-3.5 px-4 bg-[#580D1A] hover:bg-[#3F0712] text-white text-xs font-semibold uppercase tracking-[0.18em] rounded-xl shadow-xl flex items-center justify-center space-x-2 transition-transform active:scale-95"
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add &bull; ${product.price.amount}</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex flex-col space-y-1.5 px-1">
        <div className="flex justify-between items-baseline">
          <Link href={`/products/${product.handle}`}>
            <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-neutral-900 group-hover:text-[#580D1A] transition-colors">
              {product.title}
            </h3>
          </Link>
          <span className="text-xs font-mono font-bold text-[#580D1A]">
            ${product.price.amount} {product.price.currencyCode}
          </span>
        </div>

        {product.subtitle && (
          <p className="text-[11px] font-mono text-neutral-500 tracking-wide">
            {product.subtitle}
          </p>
        )}

        {/* Available Sizes / Colors Preview */}
        <div className="flex items-center justify-between pt-1.5 text-[10px] font-mono text-neutral-500">
          <div className="flex items-center space-x-1.5">
            {product.sizes?.map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`px-2 py-0.5 rounded-md border transition-colors ${
                  selectedSize === size
                    ? 'border-[#580D1A] text-[#580D1A] bg-[#580D1A]/10 font-bold'
                    : 'border-neutral-200 hover:border-[#580D1A]/40 text-neutral-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <span className="text-neutral-500">{product.colors?.[0]}</span>
        </div>
      </div>
    </div>
  );
}
