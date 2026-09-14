'use client';

import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    category: 'Drops & Ordering',
    q: 'How do Kolossal drop allocations work?',
    a: 'Every Kolossal drop is produced in limited numbered editions of 100 to 150 pieces worldwide. When an edition sells out, orders are permanently closed and the pattern enters our archival vault.',
  },
  {
    category: 'Drops & Ordering',
    q: 'How can I access private drop links early?',
    a: 'Subscribers to our Inner Circle archive receive private checkout links via email 24 hours prior to global public release.',
  },
  {
    category: 'Fabric & Garment Care',
    q: 'What makes 500 GSM French Terry special?',
    a: 'Standard commercial hoodies typically weigh between 280 to 350 GSM. Our custom-milled 500 GSM loopback cotton uses tightly twisted organic fibers that hold an architectural, non-collapsing drape while providing exceptional insulation.',
  },
  {
    category: 'Fabric & Garment Care',
    q: 'How should I wash and care for my heavyweight garments?',
    a: 'Wash inside-out in cold water (30°C / 85°F) on a delicate cycle using mild detergent. Never tumble dry; hang dry naturally flat to maintain pattern integrity and eliminate shrinkage.',
  },
  {
    category: 'Shipping & Duties',
    q: 'What does "Duties Delivered Paid" (DDP) mean?',
    a: 'We ship all international orders via DHL Express with all customs duties, local import taxes, and brokerage fees pre-paid by Kolossal. You will never encounter unexpected fees upon delivery.',
  },
  {
    category: 'Shipping & Duties',
    q: 'What is the delivery timeline for international shipments?',
    a: 'Orders are dispatched within 24 hours from our Milan or Tokyo logistics hubs. Express delivery typically takes 2 to 4 business days to major metropolitan areas globally.',
  },
  {
    category: 'Returns & Guarantee',
    q: 'What is your return policy?',
    a: 'We offer complimentary 30-day returns on unworn, unwashed garments with all original security tags, numbered dust bags, and packaging intact.',
  },
  {
    category: 'Returns & Guarantee',
    q: 'What does the Lifetime Hardware Warranty cover?',
    a: 'All custom gunmetal zippers, solid 925 sterling silver clasps, and snap fasteners are warrantied against manufacturing failure for life. We provide complimentary replacement hardware and repair services.',
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter(
    (item) =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-36 pb-36 px-6 lg:px-12 max-w-4xl mx-auto space-y-16">
      {/* Header */}
      <div className="border-b border-neutral-200/80 pb-10 space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#580D1A] font-semibold">
          KNOWLEDGE BASE
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-neutral-950">
          FREQUENTLY ASKED
        </h1>
        <p className="text-xs sm:text-sm font-light text-neutral-600 max-w-xl leading-relaxed">
          Detailed explanations regarding our 500 GSM milling protocols, worldwide DDP express shipping, and drop mechanics.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          placeholder="SEARCH TOPICS (GSM, SHIPPING, RETURNS, SIZING)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-neutral-300 pl-11 pr-4 py-4 rounded-2xl text-xs font-mono tracking-wider text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A] shadow-xs"
        />
      </div>

      {/* FAQ Accordion List */}
      <div className="divide-y divide-neutral-200 border-y border-neutral-200">
        {filteredFaqs.length === 0 ? (
          <div className="py-20 text-center text-xs font-mono text-neutral-500 uppercase tracking-widest">
            No matching questions found for "{search}"
          </div>
        ) : (
          filteredFaqs.map((faq, index) => (
            <div key={index} className="py-7">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between text-left space-x-4 group"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#580D1A] uppercase tracking-widest font-semibold">
                    {faq.category}
                  </span>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-950 group-hover:text-[#580D1A] transition-colors">
                    {faq.q}
                  </h3>
                </div>
                <div className={`w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 transition-transform duration-300 flex-shrink-0 ${
                  openIndex === index ? 'rotate-180 text-[#580D1A] bg-[#580D1A]/10 border-[#580D1A]/30' : ''
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {openIndex === index && (
                <div className="pt-4 text-xs font-light text-neutral-600 leading-relaxed max-w-2xl">
                  {faq.a}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Still need help banner */}
      <div className="p-8 rounded-2xl bg-white border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="flex items-center space-x-4">
          <HelpCircle className="w-8 h-8 text-[#580D1A] flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold uppercase text-neutral-950">Have a Specific Inquiry?</h4>
            <p className="text-xs text-neutral-500 font-mono">Our client concierge team is ready to assist.</p>
          </div>
        </div>
        <a
          href="/contact"
          className="px-6 py-3 bg-[#580D1A] text-white font-semibold text-xs uppercase tracking-widest rounded-full hover:bg-[#430913] transition-colors flex-shrink-0 shadow-sm"
        >
          Contact Advisory
        </a>
      </div>
    </div>
  );
}
