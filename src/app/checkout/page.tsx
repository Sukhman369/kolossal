'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Truck,
  CreditCard,
  MapPin,
  ChevronRight
} from 'lucide-react';

export default function CheckoutPage() {
  const { cart } = useCart();
  const [step, setStep] = useState<'details' | 'payment' | 'complete'>('details');

  // Form State
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('United States');
  const [postalCode, setPostalCode] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  const shippingCost = cart.subtotal.amount >= 250 ? 0 : 25;
  const totalAmount = cart.subtotal.amount + shippingCost;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && firstName && address) {
      setStep('payment');
    }
  };

  const handleCompleteOrder = () => {
    const randomOrder = `KOL-${Math.floor(100000 + Math.random() * 900000)}-EXP`;
    setOrderNumber(randomOrder);
    setStep('complete');
  };

  if (step === 'complete') {
    return (
      <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto text-center space-y-8 min-h-screen">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400">
            Order Confirmed // Drop Allocation Reserved
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
            Thank You, {firstName || 'Client'}
          </h1>
          <p className="text-xs sm:text-sm font-mono text-neutral-400">
            Reference Number: <span className="text-white font-bold">{orderNumber}</span>
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10 text-left space-y-4 max-w-lg mx-auto text-xs font-mono text-neutral-300">
          <div className="flex justify-between border-b border-white/[0.08] pb-3">
            <span className="text-neutral-500">Destination</span>
            <span className="text-white">{city}, {country}</span>
          </div>
          <div className="flex justify-between border-b border-white/[0.08] pb-3">
            <span className="text-neutral-500">Carrier</span>
            <span className="text-white">DHL Express (DDP Tracked)</span>
          </div>
          <div className="flex justify-between border-b border-white/[0.08] pb-3">
            <span className="text-neutral-500">Confirmation Sent To</span>
            <span className="text-white truncate max-w-[200px]">{email}</span>
          </div>
          <div className="flex justify-between font-bold pt-1 text-sm text-white">
            <span>Total Paid</span>
            <span>${totalAmount.toFixed(2)} USD</span>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link
            href="/track-order"
            className="px-8 py-4 bg-white text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-neutral-200 transition-colors"
          >
            Track Shipment Status
          </Link>
          <Link
            href="/"
            className="px-8 py-4 border border-white/20 text-white font-medium text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white/10 transition-colors"
          >
            Return to Atelier
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Checkout Minimal Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-12">
        <div className="flex items-center space-x-3">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            Encrypted Headless Checkout
          </span>
        </div>
        <Link href="/cart" className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white">
          Back to Bag
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Form Workflow (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step Breadcrumbs */}
          <div className="flex items-center space-x-4 text-xs font-mono">
            <span className={step === 'details' ? 'text-white font-bold' : 'text-emerald-400'}>
              01 // Shipping Details
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className={step === 'payment' ? 'text-white font-bold' : 'text-neutral-600'}>
              02 // Payment & Allocation
            </span>
          </div>

          {step === 'details' ? (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  Contact Information
                </h3>
                <input
                  type="email"
                  required
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/15 px-4 py-3.5 rounded-xl text-xs font-mono tracking-wider text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/40"
                />
              </div>

              {/* Shipping Address */}
              <div className="space-y-4 pt-4 border-t border-white/[0.08]">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  Delivery Destination
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="FIRST NAME"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/15 px-4 py-3.5 rounded-xl text-xs font-mono tracking-wider text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/40"
                  />
                  <input
                    type="text"
                    required
                    placeholder="LAST NAME"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/15 px-4 py-3.5 rounded-xl text-xs font-mono tracking-wider text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/40"
                  />
                </div>

                <input
                  type="text"
                  required
                  placeholder="STREET ADDRESS & APARTMENT/SUITE"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/15 px-4 py-3.5 rounded-xl text-xs font-mono tracking-wider text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/40"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="CITY"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/15 px-4 py-3.5 rounded-xl text-xs font-mono tracking-wider text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/40"
                  />
                  <input
                    type="text"
                    required
                    placeholder="POSTAL / ZIP CODE"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/15 px-4 py-3.5 rounded-xl text-xs font-mono tracking-wider text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/40"
                  />
                </div>

                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-[#0c0c0c] border border-white/15 px-4 py-3.5 rounded-xl text-xs font-mono tracking-wider text-white focus:outline-none focus:border-white/40"
                >
                  <option value="United States">United States (USD)</option>
                  <option value="United Kingdom">United Kingdom (GBP)</option>
                  <option value="European Union">European Union (EUR)</option>
                  <option value="Japan">Japan (JPY)</option>
                  <option value="Canada">Canada (CAD)</option>
                  <option value="Australia">Australia (AUD)</option>
                </select>
              </div>

              {/* Shipping Tier Indicator */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-3">
                  <Truck className="w-4 h-4 text-neutral-300" />
                  <div>
                    <span className="text-white block font-semibold">DHL Express Tracked (DDP)</span>
                    <span className="text-neutral-500">2-4 Business Days Worldwide Delivery</span>
                  </div>
                </div>
                <span className="text-white font-bold">
                  {shippingCost === 0 ? 'FREE' : '$25.00'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-neutral-200 transition-colors"
              >
                Continue to Payment
              </button>
            </form>
          ) : (
            /* Step 2: Payment View */
            <div className="space-y-6">
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-2 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Ship To</span>
                  <span className="text-white">{address}, {city}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Method</span>
                  <span className="text-white">DHL Express Worldwide (DDP)</span>
                </div>
                <button
                  onClick={() => setStep('details')}
                  className="text-neutral-400 hover:text-white underline pt-1"
                >
                  Edit Information
                </button>
              </div>

              {/* Mock Payment Selector */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  Payment Method
                </h3>
                
                <div className="border border-white/20 rounded-2xl p-6 bg-white/[0.02] space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-4 h-4 text-white" />
                      <span className="text-xs font-mono text-white">Credit Card / Global Debit</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">TEST MODE ACTIVE</span>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      disabled
                      value="•••• •••• •••• 4242 (Simulated Token)"
                      className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 rounded-lg text-xs font-mono text-neutral-400"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        disabled
                        value="12/28"
                        className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 rounded-lg text-xs font-mono text-neutral-400"
                      />
                      <input
                        type="text"
                        disabled
                        value="888"
                        className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 rounded-lg text-xs font-mono text-neutral-400"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCompleteOrder}
                  className="w-full py-4 bg-white text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-neutral-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  Pay ${totalAmount.toFixed(2)} USD & Reserve Drop
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Items Summary (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0c0c0c] p-6 lg:p-8 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white border-b border-white/[0.08] pb-4">
            Allocation Summary ({cart.itemCount})
          </h3>

          <div className="divide-y divide-white/[0.06] max-h-96 overflow-y-auto">
            {cart.items.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-16 rounded bg-neutral-900 border border-white/10 overflow-hidden flex-shrink-0">
                    {item.image && (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-white truncate max-w-[180px]">
                      {item.title}
                    </h4>
                    <span className="text-[11px] font-mono text-neutral-500">
                      Qty: {item.quantity} &bull; {item.variantTitle}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold text-white">
                  ${(item.price.amount * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/[0.08] pt-4 space-y-2 text-xs font-mono text-neutral-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-white">${cart.subtotal.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>DHL Express Delivery</span>
              <span className="text-white">{shippingCost === 0 ? 'FREE' : '$25.00'}</span>
            </div>
            <div className="flex justify-between">
              <span>Import Duties & Customs</span>
              <span className="text-neutral-300">DDP INCLUDED</span>
            </div>
            <div className="border-t border-white/[0.08] pt-3 flex justify-between text-sm font-bold text-white">
              <span>Total Amount</span>
              <span className="text-lg">${totalAmount.toFixed(2)} USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
