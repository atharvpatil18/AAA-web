/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Users, Calendar, Award, Star } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

interface StatItem {
  id: string;
  label: string;
  target: number;
  suffix: string;
  subtext: string;
  icon: React.ElementType;
  iconColor: string;
}

export default function TrustBar() {
  const { t, formatNumber } = useLanguage();
  const stats: StatItem[] = [
    {
      id: "students",
      label: "Students Mentored",
      target: 300,
      suffix: "+",
      subtext: "Across Wakad, Pune & Online",
      icon: Users,
      iconColor: "text-orange-600 bg-orange-50 border-orange-200",
    },
    {
      id: "champions",
      label: "National Participants",
      target: 56,
      suffix: "",
      subtext: "15th National Championship 2026",
      icon: Award,
      iconColor: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      id: "ratio",
      label: "Batch Student Ratio",
      target: 5,
      suffix: ":1",
      subtext: "Small Batches (Max 5 Students)",
      icon: Calendar,
      iconColor: "text-teal-600 bg-teal-50 border-teal-200",
    },
    {
      id: "satisfaction",
      label: "Parent Satisfaction",
      target: 100,
      suffix: "%",
      subtext: "Verified 5-Star Google Reviews",
      icon: Star,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    }
  ];

  const [counts, setCounts] = useState<Record<string, number>>({
    students: 0,
    champions: 0,
    ratio: 0,
    satisfaction: 0,
  });

  useEffect(() => {
    const duration = 1800; // Animation duration in ms
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = duration / frameRate;

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      
      setCounts((prev) => {
        const nextCounts = { ...prev };
        stats.forEach((stat) => {
          const progress = frame / totalFrames;
          const currentCount = Math.round(stat.target * progress);
          nextCounts[stat.id] = Math.min(currentCount, stat.target);
        });
        return nextCounts;
      });

      if (frame >= totalFrames) {
        clearInterval(interval);
      }
    }, frameRate);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      id="trust-indicators-bar" 
      className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto -mt-10 md:-mt-14 relative z-30"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;
          const currentCount = counts[stat.id];

          return (
            <div 
              key={stat.id} 
              className={`flex flex-col items-center text-center p-3 sm:p-4 border-slate-100
                ${idx % 2 === 0 ? "border-r" : ""}
                ${idx < 2 ? "border-b" : ""}
                lg:border-b-0
                ${idx === 3 ? "lg:border-r-0" : "lg:border-r"}
              `}
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-2.5 border shadow-xs ${stat.iconColor}`}>
                <IconComponent className="w-5 h-5" />
              </div>

              <span className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight block">
                {stat.id === "ratio" ? `1:${currentCount}` : `${formatNumber(currentCount)}${stat.suffix}`}
              </span>

              <span className="font-bold text-slate-800 text-xs sm:text-sm mt-0.5 block">
                {stat.label}
              </span>

              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block mt-0.5">
                {stat.subtext}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
