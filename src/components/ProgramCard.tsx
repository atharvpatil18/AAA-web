/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { Program } from "../types";
import { Check, Sparkles, Flame, GraduationCap, ArrowRight } from "lucide-react";
import { trackDemoClick } from "../lib/analytics";

interface ProgramCardProps {
  program: Program;
  key?: string | number;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  
  // Custom theme logic for coloring
  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case "amber": // Abacus Magic (Yellow)
        return {
          border: "border-vibrant-dark",
          bg: "bg-white",
          text: "text-vibrant-dark",
          badge: "bg-vibrant-gold text-vibrant-dark border-vibrant-dark border-2 font-black",
          bullet: "text-amber-600 bg-yellow-50",
          btn: "bg-vibrant-gold text-vibrant-dark font-black shadow-[0_4px_0_0_#B39200] active:translate-y-0.5 active:shadow-none",
          bulletCol: "bg-vibrant-gold border border-vibrant-dark/20",
          shadow: "shadow-[8px_8px_0_0_#1A2E35]"
        };
      case "indigo": // Vedic Maths (Teal)
        return {
          border: "border-vibrant-dark",
          bg: "bg-white",
          text: "text-vibrant-dark",
          badge: "bg-vibrant-teal text-white border-vibrant-dark border-2 font-black",
          bullet: "text-vibrant-teal bg-[#E0FAF5]",
          btn: "bg-vibrant-teal text-white font-black shadow-[0_4px_0_0_#00897B] active:translate-y-0.5 active:shadow-none",
          bulletCol: "bg-vibrant-teal border border-vibrant-dark/20",
          shadow: "shadow-[8px_8px_0_0_#1A2E35]"
        };
      case "orange": // School Maths (Orange)
      default:
        return {
          border: "border-vibrant-dark",
          bg: "bg-white",
          text: "text-vibrant-dark",
          badge: "bg-vibrant-orange text-white border-vibrant-dark border-2 font-black",
          bullet: "text-vibrant-orange bg-[#FFF0E0]",
          btn: "bg-vibrant-orange text-white font-black shadow-[0_4px_0_0_#B33A00] active:translate-y-0.5 active:shadow-none",
          bulletCol: "bg-vibrant-orange border border-vibrant-dark/20",
          shadow: "shadow-[8px_8px_0_0_#1A2E35]"
        };
    }
  };

  const currentTheme = getThemeClasses(program.imageTheme);

  const handleApplyClick = () => {
    trackDemoClick("program_card_cta", { programName: program.title });
  };

  return (
    <div 
      className={`bg-white rounded-[32px] border-4 ${currentTheme.border} p-6 md:p-8 flex flex-col justify-between transition-all duration-300 ${currentTheme.shadow} group hover:-translate-y-1`}
    >
      <div>
        {/* Card Header & Badge */}
        <div className="flex justify-between items-start gap-4 mb-4">
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full ${currentTheme.badge}`}>
            {program.id === "abacus" && <Sparkles className="w-3.5 h-3.5 text-vibrant-dark" />}
            {program.id === "vedic-math" && <Flame className="w-3.5 h-3.5 text-white" />}
            {program.id === "school-math" && <GraduationCap className="w-3.5 h-3.5 text-white" />}
            {program.targetAge}
          </span>
          <span className="text-[10px] text-vibrant-dark font-black tracking-widest uppercase">
            CLASSROOM
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="font-display font-black text-2xl text-vibrant-dark group-hover:text-vibrant-orange transition-colors leading-tight mb-2">
          {program.title}
        </h3>
        <p className="text-gray-500 text-xs md:text-sm font-semibold mb-6 italic leading-relaxed">
          "{program.tagline}"
        </p>

        {/* Core Description */}
        <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-6">
          {program.description}
        </p>

        {/* Benefits Segment */}
        <div className="mb-6">
          <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
            Core Learning Benefits:
          </span>
          <ul className="space-y-2.5">
            {program.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-gray-700">
                <div className={`p-0.5 rounded-full ${currentTheme.bullet} shrink-0 mt-0.5 border border-slate-100`}>
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-gray-750">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <hr className="border-slate-100 my-6" />

        {/* Curriculum Checkpoints */}
        <div className="mb-8">
          <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
            Syllabus Highlights:
          </span>
          <div className="flex flex-wrap gap-2">
            {program.curriculum.map((item, idx) => (
              <span 
                key={idx} 
                className="bg-vibrant-cream border-2 border-vibrant-dark/10 text-vibrant-dark text-[10.5px] md:text-xs px-3 py-1.5 rounded-xl font-bold hover:border-vibrant-dark/30 transition shadow-sm flex items-center gap-1.5 shrink-0"
              >
                <span className={`w-2 h-2 rounded-full ${currentTheme.bulletCol}`}></span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Button Action footer */}
      <div>
        <a
          href="https://wa.me/919021924968"
          onClick={handleApplyClick}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full ${currentTheme.btn} rounded-2xl text-center flex items-center justify-center py-4 text-xs md:text-sm font-black uppercase tracking-wider cursor-pointer duration-150 transition-all gap-2`}
        >
          Book 1-on-1 Free Trial
          <ArrowRight className="w-4 h-4 shrink-0" />
        </a>
      </div>
    </div>
  );
}
