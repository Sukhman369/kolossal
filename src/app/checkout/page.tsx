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
      <div className="pt-36 pb-32 px-6 max-w-3xl mx-auto text-center space-y-8 min-h-screen">
        <div className="w-20 h-20 rounded-full bg-[#580D1A]/10 border border-[#580D1A]/30 flex items-center justify-center mx-auto text-[#580D1A]">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#580D1A] font-semibold">
            Order Confirmed // Drop Allocation Reserved
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-neutral-950">
            Thank You, {firstName || 'Client'}
          </h1>
          <p className="text-xs sm:text-sm font-mono text-neutral-500">
            Reference Number: <span className="text-neutral-900 font-bold">{orderNumber}</span>
          </p>
        </div>

        <div className="p-7 rounded-2xl bg-white border border-neutral-200 shadow-lg text-left space-y-4 max-w-lg mx-auto text-xs font-mono text-neutral-700">
          <div className="flex justify-between border-b border-neutral-200 pb-3">
            <span className="text-neutral-500">Destination</span>
            <span className="text-neutral-950 font-medium">{city}, {country}</span>
          </div>
          <div className="flex justify-between border-b border-neutral-200 pb-3">
            <span className="text-neutral-500">Carrier</span>
            <span className="text-neutral-950 font-medium">DHL Express (DDP Tracked)</span>
          </div>
          <div className="flex justify-between border-b border-neutral-200 pb-3">
            <span className="text-neutral-500">Confirmation Sent To</span>
            <span className="text-neutral-950 font-medium truncate max-w-[200px]">{email}</span>
          </div>
          <div className="flex justify-between font-bold pt-1 text-sm text-[#580D1A]">
            <span>Total Paid</span>
            <span>${totalAmount.toFixed(2)} USD</span>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link
            href="/track-order"
            className="px-8 py-4 bg-[#580D1A] text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#430913] transition-colors shadow-md"
          >
            Track Shipment Status
          </Link>
          <Link
            href="/"
            className="px-8 py-4 border border-[#580D1A] text-[#580D1A] font-medium text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#580D1A] hover:text-white transition-colors"
          >
            Return to Storefront
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Checkout Minimal Header */}
      <div className="flex items-center justify-between border-b border-neutral-200/80 pb-6 mb-12">
        <div className="flex items-center space-x-3">
          <Lock className="w-4 h-4 text-[#580D1A]" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-600 font-medium">
            Encrypted Headless Checkout
          </span>
        </div>
        <Link href="/cart" className="text-xs font-mono uppercase tracking-wider text-[#580D1A] hover:underline underline-offset-4 font-medium transition-colors">
          Back to Bag
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Form Workflow (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step Breadcrumbs */}
          <div className="flex items-center space-x-4 text-xs font-mono">
            <span className={step === 'details' ? 'text-[#580D1A] font-bold' : 'text-emerald-700 font-medium'}>
              01 // Shipping Details
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className={step === 'payment' ? 'text-[#580D1A] font-bold' : 'text-neutral-400'}>
              02 // Payment & Allocation
            </span>
          </div>

          {step === 'details' ? (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-950">
                  Contact Information
                </h3>
                <input
                  type="email"
                  required
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 px-4 py-3.5 rounded-xl text-xs font-mono tracking-wider text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A]"
                />
              </div>

              {/* Shipping Address */}
              <div className="space-y-4 pt-4 border-t border-neutral-200">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-950">
                  Delivery Destination
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="FIRST NAME"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 px-4 py-3.5 rounded-xl text-xs font-mono tracking-wider text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="LAST NAME"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 px-4 py-3.5 rounded-xl text-xs font-mono tracking-wider text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A]"
                  />
                </div>

                <input
                  type="text"
                  required
                  placeholder="STREET ADDRESS & APARTMENT/SUITE"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 px-4 py-3.5 rounded-xl text-xs font-mono tracking-wider text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A]"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="CITY"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 px-4 py-3.5 rounded-xl text-xs font-mono tracking-wider text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="POSTAL / ZIP CODE"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 px-4 py-3.5 rounded-xl text-xs font-mono tracking-wider text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A]"
                  />
                </div>

                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-white border border-neutral-300 px-4 py-3.5 rounded-xl text-xs font-mono tracking-wider text-neutral-900 focus:outline-none focus:border-[#580D1A]"
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
              <div className="p-4 rounded-xl border border-neutral-200 bg-white flex items-center justify-between text-xs font-mono shadow-xs">
                <div className="flex items-center space-x-3">
                  <Truck className="w-4 h-4 text-[#580D1A]" />
                  <div>
                    <span className="text-neutral-950 block font-semibold">DHL Express Tracked (DDP)</span>
                    <span className="text-neutral-500">2-4 Business Days Worldwide Delivery</span>
                  </div>
                </div>
                <span className="text-[#580D1A] font-bold">
                  {shippingCost === 0 ? 'FREE' : '$25.00'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#580D1A] text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#430913] transition-colors shadow-md hover:shadow-lg"
              >
                Continue to Payment
              </button>
            </form>
          ) : (
            /* Step 2: Payment View */
            <div className="space-y-6">
              <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2 text-xs font-mono shadow-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Ship To</span>
                  <span className="text-neutral-950 font-medium">{address}, {city}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Method</span>
                  <span className="text-neutral-950 font-medium">DHL Express Worldwide (DDP)</span>
                </div>
                <button
                  onClick={() => setStep('details')}
                  className="text-[#580D1A] hover:underline pt-1 font-medium"
                >
                  Edit Information
                </button>
              </div>

              {/* Mock Payment Selector */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-950">
                  Payment Method
                </h3>
                
                <div className="border border-neutral-200 rounded-2xl p-6 bg-white space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-4 h-4 text-[#580D1A]" />
                      <span className="text-xs font-mono text-neutral-900 font-semibold">Credit Card / Global Debit</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#580D1A] font-semibold bg-[#580D1A]/10 px-2 py-0.5 rounded">TEST MODE ACTIVE</span>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      disabled
                      value="•••• •••• •••• 4242 (Simulated Token)"
                      className="w-full bg-neutral-100 border border-neutral-200 px-4 py-3 rounded-lg text-xs font-mono text-neutral-600"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        disabled
                        value="12/28"
                        className="w-full bg-neutral-100 border border-neutral-200 px-4 py-3 rounded-lg text-xs font-mono text-neutral-600"
                      />
                      <input
                        type="text"
                        disabled
                        value="888"
                        className="w-full bg-neutral-100 border border-neutral-200 px-4 py-3 rounded-lg text-xs font-mono text-neutral-600"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCompleteOrder}
                  className="w-full py-4 bg-[#580D1A] text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#430913] transition-colors shadow-lg shadow-[#580D1A]/25"
                >
                  Pay ${totalAmount.toFixed(2)} USD & Reserve Drop
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Items Summary (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-neutral-200 bg-white p-7 lg:p-9 space-y-6 shadow-lg">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-950 border-b border-neutral-200 pb-4">
            Allocation Summary ({cart.itemCount})
          </h3>

          <div className="divide-y divide-neutral-200 max-h-96 overflow-y-auto">
            {cart.items.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-16 rounded bg-neutral-100 border border-neutral-200 overflow-hidden flex-shrink-0">
                    {item.image && (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-neutral-950 truncate max-w-[180px]">
                      {item.title}
                    </h4>
                    <span className="text-[11px] font-mono text-neutral-500">
                      Qty: {item.quantity} &bull; {item.variantTitle}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold text-[#580D1A]">
                  ${(item.price.amount * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-neutral-200 pt-4 space-y-2 text-xs font-mono text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-neutral-900">${cart.subtotal.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>DHL Express Delivery</span>
              <span className="text-neutral-900">{shippingCost === 0 ? 'FREE' : '$25.00'}</span>
            </div>
            <div className="flex justify-between">
              <span>Import Duties & Customs</span>
              <span className="text-neutral-700">DDP INCLUDED</span>
            </div>
            <div className="border-t border-neutral-200 pt-3 flex justify-between text-sm font-bold text-neutral-950">
              <span>Total Amount</span>
              <span className="text-xl text-[#580D1A]">${totalAmount.toFixed(2)} USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
