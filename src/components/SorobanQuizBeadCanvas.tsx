import React, { useState, useEffect } from "react";

interface SorobanQuizBeadCanvasProps {
  value: number; // Current numerical value to display or track (0 to 999)
  digitsCount?: 1 | 2 | 3; // 1-digit, 2-digit, or 3-digit rods
  interactive?: boolean; // If true, user can click beads to change value
  showDigitsFooter?: boolean; // If true, renders bottom digit badges (default false to avoid giving away answers in identification)
  onChange?: (newValue: number) => void; // Callback when user moves beads in interactive mode
}

interface RodState {
  upper: boolean; // true if upper bead (5) is active (slid down to beam)
  lowerCount: number; // 0 to 4 lower beads active (slid up to beam)
}

export default function SorobanQuizBeadCanvas({
  value,
  digitsCount = 2,
  interactive = false,
  showDigitsFooter = false,
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

  const handleLowerClick = (rodIdx: number, beadNumber: number) => {
    if (!interactive) return;
    const nextRods = [...rods];
    const currentCount = nextRods[rodIdx].lowerCount;
    // Clicking beadNumber (1..4): if currentCount === beadNumber, toggle off to beadNumber - 1
    const nextCount = currentCount === beadNumber ? beadNumber - 1 : beadNumber;
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
      ? ["Hundreds (100s)", "Tens (10s)", "Units (1s)"]
      : numRods === 2
      ? ["Tens (10s)", "Units (1s)"]
      : ["Units (1s)"];

  return (
    <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-amber-500/10 rounded-2xl border-2 border-amber-300/80 shadow-md my-2 max-w-sm sm:max-w-md w-full">
      {/* Abacus Outer Wooden Frame */}
      <div className="relative bg-amber-950 border-4 border-amber-900 rounded-xl p-3 shadow-xl w-full">
        {/* Rod Header Labels */}
        <div className="flex justify-around mb-2">
          {rodLabels.map((lbl, idx) => (
            <span
              key={idx}
              className="text-[10px] sm:text-xs font-black text-amber-200 uppercase tracking-wider bg-amber-900/90 px-2 py-0.5 rounded-md border border-amber-700/50 shadow-2xs"
            >
              {lbl}
            </span>
          ))}
        </div>

        {/* Abacus Inner Canvas Frame */}
        <div className="relative bg-amber-50 rounded-lg border-2 border-amber-900/80 overflow-hidden shadow-inner flex flex-col items-stretch">
          {/* UPPER DECK AREA (Height ~54px) */}
          <div className="relative h-[54px] w-full bg-amber-100/50">
            {rods.map((rod, rodIdx) => (
              <div
                key={rodIdx}
                className="absolute top-0 bottom-0 flex justify-center items-center select-none"
                style={{
                  left: `${(rodIdx / numRods) * 100}%`,
                  width: `${(1 / numRods) * 100}%`,
                }}
              >
                {/* Vertical Metallic Rod Line */}
                <div className="absolute top-0 bottom-0 w-1.5 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 z-0" />

                {/* UPPER BEAD (Value 5) - Bi-conical Ruby Red Bead */}
                <div
                  onClick={() => handleUpperToggle(rodIdx)}
                  className={`absolute w-11 sm:w-12 h-6 rounded-full border-2 border-red-900 shadow-md transition-all duration-200 cursor-pointer z-10 ${
                    rod.upper
                      ? "bottom-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-700 ring-2 ring-red-300 shadow-red-900/40" // ACTIVE: Slid down to touch beam
                      : "top-1 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 opacity-60 hover:opacity-90" // INACTIVE: Slid up to top frame
                  } ${interactive ? "hover:scale-105 active:scale-95" : ""}`}
                >
                  {/* Bead Center Highlight Bar */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div
                      className={`w-9 h-1 rounded-full ${
                        rod.upper ? "bg-amber-200/80 shadow-xs" : "bg-amber-400/40"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MIDDLE RECKONING BEAM (Divider Bar) */}
          <div className="relative h-4 bg-amber-950 border-y-2 border-amber-800 z-30 flex items-center shadow-md">
            {rods.map((_, rodIdx) => (
              <div
                key={rodIdx}
                className="absolute flex justify-center items-center"
                style={{
                  left: `${(rodIdx / numRods) * 100}%`,
                  width: `${(1 / numRods) * 100}%`,
                }}
              >
                {/* Unit Alignment Dot on Beam */}
                <div className="w-2 h-2 rounded-full bg-white border border-amber-900 shadow-xs" />
              </div>
            ))}
          </div>

          {/* LOWER DECK AREA (Height ~116px) */}
          <div className="relative h-[116px] w-full bg-amber-100/50">
            {rods.map((rod, rodIdx) => {
              const activeCount = rod.lowerCount; // 0 to 4 active beads at top (beam)
              return (
                <div
                  key={rodIdx}
                  className="absolute top-0 bottom-0 flex justify-center items-center select-none"
                  style={{
                    left: `${(rodIdx / numRods) * 100}%`,
                    width: `${(1 / numRods) * 100}%`,
                  }}
                >
                  {/* Vertical Metallic Rod Line */}
                  <div className="absolute top-0 bottom-0 w-1.5 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 z-0" />

                  {/* 4 LOWER BEADS (Value 1 each) */}
                  {[1, 2, 3, 4].map((beadNum) => {
                    const isActive = beadNum <= activeCount;
                    
                    // Position calculation:
                    // If active: stacked tightly from top of lower deck (under beam):
                    // beadNum 1 -> top 1px; beadNum 2 -> top 25px; beadNum 3 -> top 49px; beadNum 4 -> top 73px
                    // If inactive: stacked tightly from bottom of lower deck (on bottom frame):
                    // beadNum 4 -> bottom 1px; beadNum 3 -> bottom 25px; beadNum 2 -> bottom 49px; beadNum 1 -> bottom 73px
                    
                    const activeTopStyle = `${(beadNum - 1) * 24 + 2}px`;
                    const inactiveBottomStyle = `${(4 - beadNum) * 24 + 2}px`;

                    return (
                      <div
                        key={beadNum}
                        onClick={() => handleLowerClick(rodIdx, beadNum)}
                        style={{
                          top: isActive ? activeTopStyle : undefined,
                          bottom: !isActive ? inactiveBottomStyle : undefined,
                        }}
                        className={`absolute w-11 sm:w-12 h-5.5 rounded-full border-2 border-amber-950 shadow-md transition-all duration-200 cursor-pointer z-10 ${
                          isActive
                            ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 ring-2 ring-yellow-200 shadow-amber-900/40" // ACTIVE: Pushed UP to beam
                            : "bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 opacity-60 hover:opacity-90" // INACTIVE: Pushed DOWN to bottom frame
                        } ${interactive ? "hover:scale-105 active:scale-95" : ""}`}
                      >
                        {/* Bead Center Highlight Bar */}
                        <div className="w-full h-full flex items-center justify-center">
                          <div
                            className={`w-9 h-1 rounded-full ${
                              isActive ? "bg-white/80 shadow-xs" : "bg-amber-400/30"
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Rod Digits Sub-Footer Display (Rendered only when showDigitsFooter is true) */}
        {showDigitsFooter && (
          <div className="flex justify-around mt-2">
            {rods.map((rod, idx) => {
              const digitVal = (rod.upper ? 5 : 0) + rod.lowerCount;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center bg-amber-900/90 border border-amber-700/60 px-3 py-1 rounded-lg shadow-inner"
                >
                  <span className="text-xs font-bold text-amber-300">
                    {rodLabels[idx].split(" ")[0]}:
                  </span>
                  <span className="text-lg font-black text-white font-mono leading-none">
                    {digitVal}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Guide Caption */}
      <div className="mt-2.5 text-center text-xs font-bold text-slate-800 bg-white/90 px-3 py-1.5 rounded-full border border-amber-200 shadow-xs flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-red-700 inline-block" />
        <span>Upper Bead = 5 (Touch Beam)</span>
        <span className="text-slate-300">|</span>
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-amber-700 inline-block" />
        <span>Lower Bead = 1 (Touch Beam)</span>
      </div>
    </div>
  );
}
