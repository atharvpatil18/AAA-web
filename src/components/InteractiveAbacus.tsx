/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { RotateCcw, HelpCircle, Star } from "lucide-react";
import { motion } from "motion/react";

interface RodState {
  upper: boolean; // true if active (slid down to divider)
  lowerCount: number; // 0 to 4 (number of beads slid up to divider)
}

export default function InteractiveAbacus() {
  // 5 rods: Indices 0 (ten-thousands) to 4 (ones) from left to right
  const [rods, setRods] = useState<RodState[]>([
    { upper: false, lowerCount: 0 },
    { upper: false, lowerCount: 0 },
    { upper: false, lowerCount: 0 },
    { upper: false, lowerCount: 0 },
    { upper: false, lowerCount: 0 },
  ]);

  const [showGuide, setShowGuide] = useState(false);

  // Toggle upper bead (value 5)
  const toggleUpper = (rodIdx: number) => {
    setRods((prev) => {
      const next = [...prev];
      next[rodIdx] = { ...next[rodIdx], upper: !next[rodIdx].upper };
      return next;
    });
  };

  // Set lower beads count (value 1-4)
  const setLowerCount = (rodIdx: number, val: number) => {
    setRods((prev) => {
      const next = [...prev];
      // If clicking already selected top lower bead, clear it down
      const currentCount = next[rodIdx].lowerCount;
      const nextCount = currentCount === val ? val - 1 : val;
      next[rodIdx] = { ...next[rodIdx], lowerCount: Math.max(0, nextCount) };
      return next;
    });
  };

  // Reset abacus to 0
  const resetAbacus = () => {
    setRods([
      { upper: false, lowerCount: 0 },
      { upper: false, lowerCount: 0 },
      { upper: false, lowerCount: 0 },
      { upper: false, lowerCount: 0 },
      { upper: false, lowerCount: 0 },
    ]);
  };

  // Calculate values
  const getRodValue = (rod: RodState) => {
    return (rod.upper ? 5 : 0) + rod.lowerCount;
  };

  const totalValue = rods.reduce((acc, rod, idx) => {
    const power = 4 - idx; // left is 10^4, right is 10^0
    return acc + getRodValue(rod) * Math.pow(10, power);
  }, 0);

  return (
    <div 
      id="interactive-abacus-widget" 
      className="bg-white border-4 border-vibrant-dark rounded-[36px] p-6 md:p-8 shadow-[8px_8px_0_0_#1A2E35] max-w-2xl mx-auto space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="inline-flex items-center gap-1 text-[10px] text-vibrant-teal bg-[#E0FAF5] border border-vibrant-teal/20 px-3 py-1 rounded-full uppercase tracking-wider font-black">
            <Star className="w-3.5 h-3.5 fill-current" /> Interactive Soroban Tool
          </span>
          <h3 className="font-display font-black text-2xl text-vibrant-dark">
            Try Moving the Beads!
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-vibrant-teal transition cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{showGuide ? "Hide Guide" : "How to use?"}</span>
          </button>
          <button
            onClick={resetAbacus}
            className="flex items-center gap-1.5 text-xs font-black text-vibrant-orange hover:text-vibrant-orange/90 transition bg-orange-50 border border-orange-100 px-3 py-2 rounded-xl cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {showGuide && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-vibrant-cream border-2 border-vibrant-dark/20 p-4 rounded-2xl text-xs text-vibrant-dark font-medium leading-relaxed space-y-2"
        >
          <p className="font-bold text-vibrant-orange">📖 Quick Soroban Reading Guide:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-650">
            <li>Each vertical column represents a place value (from left: 10000s, 1000s, 100s, 10s, 1s).</li>
            <li>The **Upper Bead** (above divider) is worth **5** when moved down to touch the divider.</li>
            <li>Each **Lower Bead** (below divider) is worth **1** when moved up to touch the divider.</li>
            <li>Tap any bead to change its value. Tap the Reset button to clear all rods.</li>
          </ul>
        </motion.div>
      )}

      {/* Visual Abacus Box */}
      <div className="bg-[#5C3A21] border-8 border-[#3D2513] rounded-3xl p-4 md:p-6 shadow-[inset_0_4px_12px_rgba(0,0,0,0.5)] relative overflow-hidden">
        
        {/* Rods and Frame container */}
        <div className="relative h-[240px] border-4 border-[#2C190D] bg-[#1E1108] rounded-xl flex justify-around p-1">
          
          {/* Horizontal Beam/Divider */}
          <div className="absolute top-[68px] left-0 right-0 h-4 bg-[#4A2C18] border-y-2 border-[#2C190D] shadow-md z-10 flex items-center justify-around">
            {/* Real-time pinpoint indicators */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-vibrant-gold opacity-50 z-20" />
            ))}
          </div>

          {/* Render Rods */}
          {rods.map((rod, rIdx) => {
            const val = getRodValue(rod);

            return (
              <div key={rIdx} className="relative w-16 h-full flex flex-col items-center select-none">
                
                {/* Metallic Rod Line */}
                <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-r from-gray-400 via-gray-100 to-gray-500 rounded-full shadow-sm" />

                {/* --- UPPER DECK --- */}
                {/* Bead placement area: h-16 (0 to 68px) */}
                <div 
                  onClick={() => toggleUpper(rIdx)}
                  className="absolute w-12 h-[60px] top-1 cursor-pointer flex items-center justify-center"
                >
                  <motion.div 
                    animate={{ y: rod.upper ? 20 : -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-11 h-6 bg-gradient-to-b from-[#B07D3E] via-[#F4C178] to-[#99652B] border border-amber-950 rounded-full shadow-md flex items-center justify-center text-[10px] font-black text-amber-950/70"
                  >
                    5
                  </motion.div>
                </div>

                {/* --- LOWER DECK --- */}
                {/* Bead placement area: h-36 (84px to 230px) */}
                <div className="absolute top-[88px] bottom-1 w-12 cursor-pointer flex flex-col justify-end">
                  {[1, 2, 3, 4].map((idx) => {
                    const isActive = rod.lowerCount >= idx;
                    // Lower beads are pushed up towards the divider.
                    // Active beads: moved up. Inactive beads: resting at the bottom.
                    const yOffset = rod.lowerCount >= idx 
                      ? -105 + (idx - 1) * 26 // pushed up close to divider
                      : -10 + (idx - 1) * 26;  // resting down

                    return (
                      <motion.div
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setLowerCount(rIdx, idx);
                        }}
                        animate={{ y: yOffset }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`absolute left-0.5 w-11 h-6 rounded-full border border-amber-950 shadow-md flex items-center justify-center text-[9px] font-black cursor-pointer ${
                          isActive 
                            ? "bg-gradient-to-b from-vibrant-teal via-[#7CEFE0] to-[#00897B] text-teal-950/70"
                            : "bg-gradient-to-b from-[#A5784A] via-[#E8B682] to-[#8C5D30] text-amber-950/70"
                        }`}
                      >
                        1
                      </motion.div>
                    );
                  })}
                </div>

                {/* Individual Rod Value Badge */}
                <div className="absolute -bottom-1 bg-[#2C190D] border border-amber-950/50 rounded-md px-2 py-0.5 text-[10px] font-black text-vibrant-gold tracking-tight z-20">
                  {val}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Calculated Value Display */}
      <div className="bg-vibrant-cream border-2 border-vibrant-dark rounded-2xl p-4 text-center">
        <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          Computed Abacus Value
        </span>
        <span className="font-display font-black text-4xl md:text-5xl text-vibrant-dark block tracking-tight my-1">
          {totalValue.toLocaleString("en-IN")}
        </span>
        <p className="text-xs text-gray-400 font-semibold leading-relaxed">
          Matches place values (Ten Thousands • Thousands • Hundreds • Tens • Ones)
        </p>
      </div>
    </div>
  );
}
