import React, { useState, useEffect } from "react";

interface SorobanQuizBeadCanvasProps {
  value: number; // Current numerical value to display or track (0 to 999)
  digitsCount?: 1 | 2 | 3; // 1-digit, 2-digit, or 3-digit rods
  interactive?: boolean; // If true, user can click beads to change value
  onChange?: (newValue: number) => void; // Callback when user moves beads in interactive mode
}

interface RodState {
  upper: boolean; // true if upper bead (5) is active (moved down to beam)
  lowerCount: number; // 0 to 4 lower beads active (moved up to beam)
}

export default function SorobanQuizBeadCanvas({
  value,
  digitsCount = 2,
  interactive = false,
  onChange,
}: SorobanQuizBeadCanvasProps) {
  // Determine how many rods to show based on digitsCount or value size
  const numRods = digitsCount || (value >= 100 ? 3 : value >= 10 ? 2 : 1);

  // Convert value into rod states from Hundreds (left) to Units (right)
  const getRodsFromValue = (val: number, numR: number): RodState[] => {
    const clamped = Math.max(0, Math.min(999, Math.floor(val)));
    const digits: number[] = [];
    if (numR === 3) {
      digits.push(Math.floor(clamped / 100) % 10);
      digits.push(Math.floor(clamped / 10) % 10);
      digits.push(clamped % 10);
    } else if (numR === 2) {
      digits.push(Math.floor(clamped / 10) % 10);
      digits.push(clamped % 10);
    } else {
      digits.push(clamped % 10);
    }

    return digits.map((d) => ({
      upper: d >= 5,
      lowerCount: d % 5,
    }));
  };

  const [rods, setRods] = useState<RodState[]>(() =>
    getRodsFromValue(value, numRods)
  );

  // Keep rods state synchronized with external value in non-interactive / reset state
  useEffect(() => {
    setRods(getRodsFromValue(value, numRods));
  }, [value, numRods]);

  // Calculate current total value from internal rod states
  const calculateTotal = (currRods: RodState[]): number => {
    return currRods.reduce((acc, rod, idx) => {
      const rodVal = (rod.upper ? 5 : 0) + rod.lowerCount;
      const power = currRods.length - 1 - idx;
      return acc + rodVal * Math.pow(10, power);
    }, 0);
  };

  const handleUpperToggle = (rodIdx: number) => {
    if (!interactive) return;
    const nextRods = [...rods];
    nextRods[rodIdx] = {
      ...nextRods[rodIdx],
      upper: !nextRods[rodIdx].upper,
    };
    setRods(nextRods);
    if (onChange) {
      onChange(calculateTotal(nextRods));
    }
  };

  const handleLowerClick = (rodIdx: number, beadIndex: number) => {
    if (!interactive) return;
    const nextRods = [...rods];
    const currentCount = nextRods[rodIdx].lowerCount;
    // Clicking beadIndex (1..4): if already set to beadIndex, set to beadIndex - 1
    const nextCount = currentCount === beadIndex ? beadIndex - 1 : beadIndex;
    nextRods[rodIdx] = {
      ...nextRods[rodIdx],
      lowerCount: nextCount,
    };
    setRods(nextRods);
    if (onChange) {
      onChange(calculateTotal(nextRods));
    }
  };

  // Label names for rods
  const rodLabels =
    numRods === 3
      ? ["H (100s)", "T (10s)", "U (1s)"]
      : numRods === 2
      ? ["T (10s)", "U (1s)"]
      : ["U (1s)"];

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-amber-500/10 to-orange-500/10 rounded-2xl border-2 border-amber-300/80 shadow-md my-2 max-w-sm sm:max-w-md w-full">
      {/* Abacus Outer Wooden Frame */}
      <div className="relative bg-amber-900 border-4 border-amber-950 rounded-xl p-3 shadow-xl w-full">
        {/* Unit Rod Header Labels */}
        <div className="flex justify-around mb-2">
          {rodLabels.map((lbl, idx) => (
            <span
              key={idx}
              className="text-[11px] font-black text-amber-200 uppercase tracking-widest bg-amber-950/80 px-2 py-0.5 rounded-md"
            >
              {lbl}
            </span>
          ))}
        </div>

        {/* Abacus Inner Canvas Frame */}
        <div className="relative bg-amber-100 rounded-lg border-2 border-amber-800/60 p-3 overflow-hidden shadow-inner">
          {/* Middle Reckoning Beam (Divider Bar with Unit Dots) */}
          <div className="absolute top-[38%] left-0 right-0 h-3.5 bg-amber-950 border-y border-amber-700 z-10 flex items-center justify-around shadow-sm">
            {rods.map((_, idx) => (
              <div
                key={idx}
                className="w-1.5 h-1.5 rounded-full bg-white shadow-xs"
              />
            ))}
          </div>

          {/* Rods Container */}
          <div className="flex justify-around items-center min-h-[180px]">
            {rods.map((rod, rodIdx) => (
              <div
                key={rodIdx}
                className="relative flex flex-col items-center h-44 w-12 cursor-pointer select-none"
              >
                {/* Vertical Metallic Rod Line */}
                <div className="absolute top-0 bottom-0 w-1.5 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-full z-0" />

                {/* UPPER DECK (Value 5) - Height ~60px */}
                <div className="relative w-full h-[60px] flex items-center justify-center z-20">
                  <div
                    onClick={() => handleUpperToggle(rodIdx)}
                    className={`absolute w-10 h-5 rounded-full border border-amber-900 shadow-md transition-all duration-200 ${
                      rod.upper
                        ? "bottom-0 bg-gradient-to-r from-red-500 via-red-400 to-red-600 ring-2 ring-red-300" // Active: Slid down to beam
                        : "top-0 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700" // Inactive: Slid up to top frame
                    } ${
                      interactive
                        ? "hover:brightness-110 active:scale-95"
                        : ""
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-8 h-1 bg-amber-200/50 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* LOWER DECK (Value 1 each, 4 beads) - Height ~100px */}
                <div className="relative w-full h-[100px] flex flex-col justify-between items-center z-20 mt-4">
                  {[1, 2, 3, 4].map((beadIndex) => {
                    const isActive = beadIndex <= rod.lowerCount;
                    return (
                      <div
                        key={beadIndex}
                        onClick={() => handleLowerClick(rodIdx, beadIndex)}
                        className={`w-10 h-4.5 rounded-full border border-amber-900 shadow-md transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 ring-2 ring-yellow-300 -translate-y-6" // Active: Slid up to beam
                            : "bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 translate-y-0" // Inactive: Slid down to bottom frame
                        } ${
                          interactive
                            ? "hover:brightness-110 active:scale-95"
                            : ""
                        }`}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-8 h-1 bg-amber-200/40 rounded-full" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Helper Text or Value Display */}
      {interactive ? (
        <div className="mt-2 text-xs font-bold text-amber-900 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1.5 shadow-xs">
          <span>👆 Click beads to set target number</span>
        </div>
      ) : (
        <div className="mt-2 text-xs font-bold text-slate-700 bg-white/90 px-3 py-1 rounded-full border border-slate-200 shadow-xs">
          <span>Read the beads on Units, Tens & Hundreds rods</span>
        </div>
      )}
    </div>
  );
}
