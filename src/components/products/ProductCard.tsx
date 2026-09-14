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
        className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-900 border border-white/[0.08] transition-all duration-500 group-hover:border-white/25 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.8)] block"
      >
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-200">
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
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="w-full py-3 px-4 bg-white/95 hover:bg-white text-black text-xs font-semibold uppercase tracking-[0.18em] rounded-lg backdrop-blur-md flex items-center justify-center space-x-2 transition-transform active:scale-95 shadow-xl"
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
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
      <div className="flex flex-col space-y-1.5 px-0.5">
        <div className="flex justify-between items-baseline">
          <Link href={`/products/${product.handle}`}>
            <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-white hover:text-neutral-300 transition-colors">
              {product.title}
            </h3>
          </Link>
          <span className="text-xs font-mono font-medium text-neutral-300">
            ${product.price.amount} {product.price.currencyCode}
          </span>
        </div>

        {product.subtitle && (
          <p className="text-[11px] font-mono text-neutral-500 tracking-wide">
            {product.subtitle}
          </p>
        )}

        {/* Available Sizes / Colors Preview */}
        <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-neutral-500">
          <div className="flex items-center space-x-2">
            {product.sizes?.map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`px-1.5 py-0.5 rounded border transition-colors ${
                  selectedSize === size
                    ? 'border-white text-white bg-white/10'
                    : 'border-white/10 hover:border-white/30 text-neutral-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <span>{product.colors?.[0]}</span>
        </div>
      </div>
    </div>
  );
}
