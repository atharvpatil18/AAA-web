/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Users, Calendar, Award, Star } from "lucide-react";

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
  const stats: StatItem[] = [
    {
      id: "students",
      label: "Students Trained",
      target: 200,
      suffix: "+",
      subtext: "Nurturing logical minds",
      icon: Users,
      iconColor: "text-orange-500 bg-orange-50",
    },
    {
      id: "experience",
      label: "Years of Experience",
      target: 3,
      suffix: "+",
      subtext: "Professional teaching",
      icon: Calendar,
      iconColor: "text-amber-500 bg-amber-50",
    },
    {
      id: "achievements",
      label: "Achievements Won",
      target: 100,
      suffix: "+",
      subtext: "Academic trophies & awards",
      icon: Award,
      iconColor: "text-indigo-500 bg-indigo-50",
    },
    {
      id: "satisfaction",
      label: "Parent Satisfaction",
      target: 100,
      suffix: "%",
      subtext: "Verified Google reviews",
      icon: Star,
      iconColor: "text-emerald-500 bg-emerald-50",
    }
  ];

  // Animated counters
  const [counts, setCounts] = useState<Record<string, number>>({
    students: 0,
    experience: 0,
    achievements: 0,
    satisfaction: 0,
  });

  useEffect(() => {
    const duration = 2000; // Animation duration in ms
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = duration / frameRate;

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      
      setCounts((prev) => {
        const nextCounts = { ...prev };
        stats.forEach((stat) => {
          // Linear ease-out count simulation
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
      className="bg-white rounded-[32px] border-4 border-vibrant-dark shadow-[8px_8px_0_0_#1A2E35] p-4 sm:p-8 max-w-7xl mx-auto -mt-16 md:-mt-20 relative z-30 opacity-100"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;
          const currentCount = counts[stat.id];

          // Determine custom icon backgrounds matching the vibrant specification
          let customIconClass = "text-vibrant-orange bg-[#FFF0E0] border-[#FFD8B1]";
          if (stat.id === "experience") {
            customIconClass = "text-vibrant-dark bg-gray-100 border-vibrant-dark/20";
          } else if (stat.id === "achievements") {
            customIconClass = "text-vibrant-teal bg-[#E0FAF5] border-vibrant-teal/20";
          } else if (stat.id === "satisfaction") {
            customIconClass = "text-yellow-600 bg-[#FFFCE8] border-[#FFEC8B]";
          }

          return (
            <div 
              key={stat.id} 
              className={`flex flex-col items-center text-center p-4 border-slate-100
                ${idx % 2 === 0 ? "border-r" : ""}
                ${idx < 2 ? "border-b" : ""}
                lg:border-b-0
                ${idx === 3 ? "lg:border-r-0" : "lg:border-r"}
              `}
            >
              {/* Stat Icon Circle */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3.5 border hover:scale-105 transition-transform shadow-sm ${customIconClass}`}>
                <IconComponent className="w-5 h-5" />
              </div>

              {/* Dynamic Number Counter */}
              <span className="font-display font-black text-3xl md:text-4xl text-vibrant-dark tracking-tight block">
                {currentCount}
                <span className="text-vibrant-orange">{stat.suffix}</span>
              </span>

              {/* Description Labels */}
              <span className="font-extrabold text-vibrant-dark text-xs md:text-sm mt-1 uppercase tracking-wider block">
                {stat.label}
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 mt-0.5 leading-none block">
                {stat.subtext}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
