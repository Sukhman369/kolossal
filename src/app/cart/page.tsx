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
    <div className="pt-28 pb-24 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-neutral-300">Shopping Bag</span>
      </nav>

      {/* Header */}
      <div className="border-b border-white/[0.08] pb-6 mb-10 flex justify-between items-end">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500">
            YOUR SELECTION
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mt-1">
            SHOPPING BAG ({cart.itemCount})
          </h1>
        </div>
        <Link
          href="/collections"
          className="hidden sm:inline-flex items-center text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
        >
          Continue Shopping →
        </Link>
      </div>

      {cart.items.length === 0 ? (
        <div className="py-24 text-center space-y-6 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full border border-white/15 bg-white/[0.02] flex items-center justify-center mx-auto text-2xl text-neutral-400 font-mono">
            ∅
          </div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-white">
            Your Bag is Empty
          </h2>
          <p className="text-xs font-light text-neutral-400 leading-relaxed">
            There are currently no items in your shopping bag. Explore our curated drop of architectural garments.
          </p>
          <Link
            href="/collections"
            className="inline-block px-8 py-4 bg-white text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-neutral-200 transition-all active:scale-95"
          >
            Explore Drop 001
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Items Table / List (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Free Shipping Meter Banner */}
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-400">
                  {remainingForFreeShipping > 0
                    ? `Add $${remainingForFreeShipping.toFixed(2)} more for complimentary express delivery`
                    : '✓ Complimentary Worldwide Express Delivery Unlocked'}
                </span>
                <span className="text-neutral-300 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Line items list */}
            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {cart.items.map((item) => (
                <div key={item.id} className="py-6 flex gap-6 items-start">
                  {/* Thumbnail */}
                  <div className="w-24 h-32 rounded-xl bg-neutral-900 border border-white/10 overflow-hidden flex-shrink-0 relative">
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
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-white hover:text-neutral-300 transition-colors">
                            {item.title}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs font-mono text-neutral-400">
                        {item.variantTitle}
                      </p>
                      <p className="text-xs font-mono text-neutral-500 pt-1">
                        Unit Price: ${item.price.amount}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      {/* Quantity Modifier */}
                      <div className="inline-flex items-center border border-white/20 rounded-full bg-white/[0.03]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-neutral-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-mono font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-neutral-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total */}
                      <span className="text-sm font-mono font-bold text-white">
                        ${(item.price.amount * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs font-mono text-neutral-400">
              <div className="flex items-center space-x-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <Truck className="w-4 h-4 text-neutral-300" />
                <span>DHL Express Tracked</span>
              </div>
              <div className="flex items-center space-x-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <RotateCcw className="w-4 h-4 text-neutral-300" />
                <span>30-Day Hassle-Free Returns</span>
              </div>
              <div className="flex items-center space-x-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <ShieldCheck className="w-4 h-4 text-neutral-300" />
                <span>Duties Delivered Paid</span>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0c0c0c] p-6 lg:p-8 space-y-6 sticky top-28">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white border-b border-white/[0.08] pb-4">
              Order Summary
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="PROMO CODE (TRY: ARCHIVE10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/15 pl-9 pr-3 py-2.5 rounded-lg text-xs font-mono tracking-wider text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/40"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 border border-white/20 text-xs font-mono uppercase tracking-wider rounded-lg hover:bg-white/10 text-white transition-colors"
                >
                  Apply
                </button>
              </div>
              {discountApplied && (
                <p className="text-[11px] font-mono text-emerald-400">
                  ✓ 10% ARCHIVE DISCOUNT APPLIED (-${discountAmount.toFixed(2)})
                </p>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-3 pt-2 text-xs font-mono text-neutral-400 border-t border-white/[0.08]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-white font-semibold">
                  ${cart.subtotal.amount.toFixed(2)}
                </span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-emerald-400">
                  <span>Archive Discount (10%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Worldwide Shipping</span>
                <span className="text-white">
                  {remainingForFreeShipping === 0 ? 'COMPLIMENTARY' : '$25.00'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Import Duties (DDP)</span>
                <span className="text-neutral-300">INCLUDED</span>
              </div>

              {/* Final Total */}
              <div className="border-t border-white/[0.08] pt-4 flex justify-between text-sm font-bold text-white">
                <span className="uppercase tracking-wider">Total</span>
                <span className="text-lg">
                  ${(finalTotal + (remainingForFreeShipping === 0 ? 0 : 25)).toFixed(2)} USD
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              className="w-full py-4 bg-white text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-full flex items-center justify-center space-x-2 transition-all hover:bg-neutral-200 active:scale-98 shadow-[0_0_30px_rgba(255,255,255,0.2)] block text-center"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 inline ml-1" />
            </Link>

            <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-neutral-500 uppercase text-center pt-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Apple Pay &bull; Google Pay &bull; Credit Cards Accepted</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
