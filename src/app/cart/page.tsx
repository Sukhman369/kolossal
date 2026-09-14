'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  ChevronRight
} from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeItem } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const freeShippingThreshold = 250;
  const progressPercent = Math.min(
    100,
    Math.round((cart.subtotal.amount / freeShippingThreshold) * 100)
  );
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cart.subtotal.amount);

  const discountAmount = discountApplied ? Math.round(cart.subtotal.amount * 0.1) : 0;
  const finalTotal = Math.max(0, cart.subtotal.amount - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ARCHIVE10' || promoCode.trim().length > 2) {
      setDiscountApplied(true);
    }
  };

  return (
    <div className="pt-32 pb-32 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-10">
        <Link href="/" className="hover:text-[#580D1A] transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-neutral-900 font-medium">Shopping Bag</span>
      </nav>

      {/* Header */}
      <div className="border-b border-neutral-200/80 pb-6 mb-12 flex justify-between items-end">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#580D1A] font-semibold">
            YOUR SELECTION
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-neutral-950 mt-1">
            SHOPPING BAG ({cart.itemCount})
          </h1>
        </div>
        <Link
          href="/collections"
          className="hidden sm:inline-flex items-center text-xs font-mono uppercase tracking-widest text-[#580D1A] hover:underline underline-offset-4 font-medium transition-colors"
        >
          Continue Shopping →
        </Link>
      </div>

      {cart.items.length === 0 ? (
        <div className="py-28 text-center space-y-6 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full border border-[#580D1A]/20 bg-[#580D1A]/5 flex items-center justify-center mx-auto text-2xl text-[#580D1A] font-serif">
            ∅
          </div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-neutral-950">
            Your Bag is Empty
          </h2>
          <p className="text-xs font-light text-neutral-600 leading-relaxed">
            There are currently no items in your shopping bag. Explore our curated drop of architectural garments.
          </p>
          <Link
            href="/collections"
            className="inline-block px-8 py-4 bg-[#580D1A] text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#430913] transition-all shadow-md active:scale-95"
          >
            Explore Drop 001
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Items Table / List (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Free Shipping Meter Banner */}
            <div className="p-5 rounded-2xl border border-neutral-200 bg-white shadow-xs space-y-2.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-700">
                  {remainingForFreeShipping > 0
                    ? `Add $${remainingForFreeShipping.toFixed(2)} more for complimentary express delivery`
                    : '✓ Complimentary Worldwide Express Delivery Unlocked'}
                </span>
                <span className="text-[#580D1A] font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#580D1A] transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Line items list */}
            <div className="divide-y divide-neutral-200/80 border-y border-neutral-200/80">
              {cart.items.map((item) => (
                <div key={item.id} className="py-7 flex gap-6 items-start">
                  {/* Thumbnail */}
                  <div className="w-24 h-32 rounded-xl bg-white border border-neutral-200 overflow-hidden flex-shrink-0 relative shadow-sm">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center"
                      />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between self-stretch">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <Link href={`/products/${item.productId}`}>
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-950 hover:text-[#580D1A] transition-colors">
                            {item.title}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 hover:text-[#580D1A] transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs font-mono text-neutral-500">
                        {item.variantTitle}
                      </p>
                      <p className="text-xs font-mono text-neutral-500 pt-1">
                        Unit Price: ${item.price.amount}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      {/* Quantity Modifier */}
                      <div className="inline-flex items-center border border-neutral-300 rounded-full bg-white shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-neutral-500 hover:text-[#580D1A] transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-mono font-semibold text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-neutral-500 hover:text-[#580D1A] transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total */}
                      <span className="text-sm font-mono font-bold text-[#580D1A]">
                        ${(item.price.amount * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs font-mono text-neutral-600">
              <div className="flex items-center space-x-2.5 p-3.5 rounded-xl bg-white border border-neutral-200 shadow-xs">
                <Truck className="w-4 h-4 text-[#580D1A]" />
                <span>DHL Express Tracked</span>
              </div>
              <div className="flex items-center space-x-2.5 p-3.5 rounded-xl bg-white border border-neutral-200 shadow-xs">
                <RotateCcw className="w-4 h-4 text-[#580D1A]" />
                <span>30-Day Hassle Returns</span>
              </div>
              <div className="flex items-center space-x-2.5 p-3.5 rounded-xl bg-white border border-neutral-200 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#580D1A]" />
                <span>Duties Delivered Paid</span>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-neutral-200 bg-white p-7 lg:p-9 space-y-6 sticky top-28 shadow-lg">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-950 border-b border-neutral-200 pb-4">
              Order Summary
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="PROMO CODE (TRY: ARCHIVE10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 pl-9 pr-3 py-2.5 rounded-xl text-xs font-mono tracking-wider text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 border border-[#580D1A] text-xs font-mono uppercase tracking-wider rounded-xl hover:bg-[#580D1A] text-[#580D1A] hover:text-white transition-colors font-medium"
                >
                  Apply
                </button>
              </div>
              {discountApplied && (
                <p className="text-[11px] font-mono text-[#580D1A] font-semibold">
                  ✓ 10% ARCHIVE DISCOUNT APPLIED (-${discountAmount.toFixed(2)})
                </p>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-3 pt-2 text-xs font-mono text-neutral-600 border-t border-neutral-200">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-neutral-900 font-semibold">
                  ${cart.subtotal.amount.toFixed(2)}
                </span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-[#580D1A] font-medium">
                  <span>Archive Discount (10%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Worldwide Shipping</span>
                <span className="text-neutral-900">
                  {remainingForFreeShipping === 0 ? 'COMPLIMENTARY' : '$25.00'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Import Duties (DDP)</span>
                <span className="text-neutral-700">INCLUDED</span>
              </div>

              {/* Final Total */}
              <div className="border-t border-neutral-200 pt-4 flex justify-between text-sm font-bold text-neutral-950">
                <span className="uppercase tracking-wider">Total</span>
                <span className="text-xl text-[#580D1A]">
                  ${(finalTotal + (remainingForFreeShipping === 0 ? 0 : 25)).toFixed(2)} USD
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              className="w-full py-4 bg-[#580D1A] text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-full flex items-center justify-center space-x-2 transition-all hover:bg-[#430913] active:scale-98 shadow-md hover:shadow-lg block text-center"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 inline ml-1" />
            </Link>

            <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-neutral-500 uppercase text-center pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#580D1A]" />
              <span>Apple Pay &bull; Google Pay &bull; Credit Cards Accepted</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
