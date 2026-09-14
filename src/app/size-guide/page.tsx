'use client';

import React, { useState } from 'react';
import { Ruler, Sparkles } from 'lucide-react';

export default function SizeGuidePage() {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [category, setCategory] = useState<'hoodies' | 'tees' | 'pants' | 'outerwear'>('hoodies');

  const HOODIE_MEASUREMENTS = [
    { size: 'S', chest: unit === 'cm' ? '124' : '48.8', length: unit === 'cm' ? '68' : '26.8', shoulder: unit === 'cm' ? '60' : '23.6', sleeve: unit === 'cm' ? '61' : '24.0' },
    { size: 'M', chest: unit === 'cm' ? '130' : '51.2', length: unit === 'cm' ? '70' : '27.5', shoulder: unit === 'cm' ? '62' : '24.4', sleeve: unit === 'cm' ? '62' : '24.4' },
    { size: 'L', chest: unit === 'cm' ? '136' : '53.5', length: unit === 'cm' ? '72' : '28.3', shoulder: unit === 'cm' ? '64' : '25.2', sleeve: unit === 'cm' ? '63' : '24.8' },
    { size: 'XL', chest: unit === 'cm' ? '142' : '55.9', length: unit === 'cm' ? '74' : '29.1', shoulder: unit === 'cm' ? '66' : '26.0', sleeve: unit === 'cm' ? '64' : '25.2' },
  ];

  const TEE_MEASUREMENTS = [
    { size: 'S', chest: unit === 'cm' ? '118' : '46.5', length: unit === 'cm' ? '71' : '27.9', shoulder: unit === 'cm' ? '56' : '22.0', sleeve: unit === 'cm' ? '24' : '9.4' },
    { size: 'M', chest: unit === 'cm' ? '124' : '48.8', length: unit === 'cm' ? '73' : '28.7', shoulder: unit === 'cm' ? '58' : '22.8', sleeve: unit === 'cm' ? '25' : '9.8' },
    { size: 'L', chest: unit === 'cm' ? '130' : '51.2', length: unit === 'cm' ? '75' : '29.5', shoulder: unit === 'cm' ? '60' : '23.6', sleeve: unit === 'cm' ? '26' : '10.2' },
    { size: 'XL', chest: unit === 'cm' ? '136' : '53.5', length: unit === 'cm' ? '77' : '30.3', shoulder: unit === 'cm' ? '62' : '24.4', sleeve: unit === 'cm' ? '27' : '10.6' },
  ];

  const activeMeasurements = category === 'hoodies' ? HOODIE_MEASUREMENTS : TEE_MEASUREMENTS;

  return (
    <div className="pt-36 pb-36 px-6 lg:px-12 max-w-5xl mx-auto space-y-16">
      {/* Header */}
      <div className="border-b border-neutral-200/80 pb-10 space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#580D1A] font-semibold">
          PROPORTION ARCHITECTURE
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-neutral-950">
          SIZE & FIT MATRIX
        </h1>
        <p className="text-xs sm:text-sm font-light text-neutral-600 max-w-xl leading-relaxed">
          Kolossal garments are engineered with an intentional architectural boxy drape. Measure an existing favorite garment flat and compare against our matrix.
        </p>
      </div>

      {/* Controller Controls: Unit Switcher & Category */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-neutral-200 shadow-xs">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCategory('hoodies')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              category === 'hoodies' ? 'bg-[#580D1A] text-white font-semibold shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Heavyweight Hoodies
          </button>
          <button
            onClick={() => setCategory('tees')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              category === 'tees' ? 'bg-[#580D1A] text-white font-semibold shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Drop-Shoulder Tees
          </button>
        </div>

        {/* Metric / Imperial toggle */}
        <div className="inline-flex items-center border border-neutral-200 rounded-full p-1 bg-neutral-50 text-xs font-mono">
          <button
            onClick={() => setUnit('cm')}
            className={`px-3.5 py-1 rounded-full transition-all ${
              unit === 'cm' ? 'bg-[#580D1A] text-white font-bold shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Centimeters (cm)
          </button>
          <button
            onClick={() => setUnit('in')}
            className={`px-3.5 py-1 rounded-full transition-all ${
              unit === 'in' ? 'bg-[#580D1A] text-white font-bold shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Inches (in)
          </button>
        </div>
      </div>

      {/* Measurement Table */}
      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-neutral-200 text-neutral-500 uppercase tracking-widest bg-neutral-50/80">
              <th className="p-4 sm:p-6 font-semibold">Size</th>
              <th className="p-4 sm:p-6 font-semibold">Chest (Pit to Pit)</th>
              <th className="p-4 sm:p-6 font-semibold">Total Body Length</th>
              <th className="p-4 sm:p-6 font-semibold">Shoulder Drop Width</th>
              <th className="p-4 sm:p-6 font-semibold">Sleeve Length</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200/80 text-neutral-700">
            {activeMeasurements.map((row) => (
              <tr key={row.size} className="hover:bg-neutral-50/60 transition-colors">
                <td className="p-4 sm:p-6 font-bold text-[#580D1A] text-sm">{row.size}</td>
                <td className="p-4 sm:p-6">{row.chest} {unit}</td>
                <td className="p-4 sm:p-6">{row.length} {unit}</td>
                <td className="p-4 sm:p-6">{row.shoulder} {unit}</td>
                <td className="p-4 sm:p-6">{row.sleeve} {unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fit Advice Note */}
      <div className="p-8 rounded-2xl border border-neutral-200 bg-white shadow-xs space-y-4">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-4 h-4 text-[#580D1A]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-950">
            Fit Direction & Styling Guidance
          </h3>
        </div>
        <ul className="space-y-2 text-xs font-light text-neutral-600 leading-relaxed list-disc list-inside">
          <li>
            <strong className="text-neutral-900 font-medium">Intended Silhouette:</strong> All items are designed with oversized proportions. Select your true standard size for the intended runway drape.
          </li>
          <li>
            <strong className="text-neutral-900 font-medium">Closer Fit:</strong> If you prefer a traditional streetwear cut without the extreme drop-shoulder overhang, size down one measurement.
          </li>
          <li>
            <strong className="text-neutral-900 font-medium">Care Retention:</strong> 500 GSM loopback cotton has been pre-washed to reduce shrinkage to under 1.5% when hung to dry.
          </li>
        </ul>
      </div>
    </div>
  );
}
