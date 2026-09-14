'use client';

import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateQuantity, removeItem } = useCart();

  if (!isOpen) return null;

  const freeShippingThreshold = 250;
  const progressPercent = Math.min(
    100,
    Math.round((cart.subtotal.amount / freeShippingThreshold) * 100)
  );
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cart.subtotal.amount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F7] border-l border-neutral-200 text-neutral-900 flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-neutral-200/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm uppercase tracking-[0.2em] font-semibold text-neutral-950">
                BAG ({cart.itemCount})
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full hover:bg-neutral-200/60 text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-4 bg-white/70 border-b border-neutral-200/60">
            <div className="text-[11px] font-mono tracking-wider text-neutral-600 mb-2">
              {remainingForFreeShipping > 0 ? (
                <>
                  ADD{' '}
                  <span className="text-[#580D1A] font-bold">
                    ${remainingForFreeShipping.toFixed(2)}
                  </span>{' '}
                  MORE FOR COMPLIMENTARY EXPRESS SHIPPING
                </>
              ) : (
                <span className="text-[#580D1A] font-bold">
                  ✓ COMPLIMENTARY EXPRESS SHIPPING UNLOCKED
                </span>
              )}
            </div>
            <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#580D1A] transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Line Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
            {cart.items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-neutral-400 py-16">
                <span className="text-3xl font-serif text-[#580D1A]">∅</span>
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">Your bag is currently empty</p>
                <button
                  onClick={closeCart}
                  className="px-6 py-3 border border-[#580D1A] text-[#580D1A] text-xs uppercase tracking-[0.2em] font-medium rounded-full hover:bg-[#580D1A] hover:text-white transition-all duration-300"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex space-x-4 pb-6 border-b border-neutral-200/80 last:border-none"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-lg bg-white border border-neutral-200 overflow-hidden flex-shrink-0 relative shadow-sm">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[9px] font-mono text-neutral-400">
                        IMG
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 hover:text-[#580D1A] p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] font-mono text-neutral-500">
                        {item.variantTitle}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      {/* Quantity Controller */}
                      <div className="inline-flex items-center border border-neutral-300 rounded-full bg-white shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-neutral-500 hover:text-[#580D1A] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium text-neutral-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-neutral-500 hover:text-[#580D1A] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total Line Price */}
                      <span className="text-xs font-mono font-semibold text-[#580D1A]">
                        ${(item.price.amount * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer */}
          {cart.items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-neutral-200 bg-white space-y-4 shadow-lg">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-neutral-600 font-mono">
                  <span>SUBTOTAL</span>
                  <span className="text-neutral-950 font-semibold">
                    ${cart.subtotal.amount.toFixed(2)} {cart.subtotal.currencyCode}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-neutral-500 font-mono">
                  <span>SHIPPING</span>
                  <span>
                    {remainingForFreeShipping === 0 ? 'FREE' : 'CALCULATED AT CHECKOUT'}
                  </span>
                </div>
              </div>

              <a
                href="/checkout"
                onClick={closeCart}
                className="w-full py-4 bg-[#580D1A] text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-full flex items-center justify-center space-x-2 transition-all hover:bg-[#430913] active:scale-98 shadow-md hover:shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-neutral-500 uppercase pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#580D1A]" />
                <span>Encrypted 256-Bit Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
