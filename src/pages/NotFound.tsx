/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home, Compass, PhoneCall, HelpCircle } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div id="not-found-container" className="min-h-[75vh] bg-[#FFFDF9] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center space-y-6 bg-white border-4 border-vibrant-dark rounded-[36px] p-8 md:p-12 shadow-[8px_8px_0_0_#1A2E35]">
        {/* Error Badge */}
        <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>404 — Page Not Found</span>
        </div>

        {/* Heading */}
        <h1 className="font-display font-black text-3xl md:text-4xl text-vibrant-dark leading-tight">
          Oops! Looks Like You Took a Calculation Detour
        </h1>

        <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed max-w-md mx-auto">
          The page or calculation route you are looking for does not exist or may have been moved.
          Let's guide you back to our active academy programs or helpful parent resources.
        </p>

        {/* Quick Nav Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
          <Link
            to="/"
            className="flex items-center gap-2.5 p-3 rounded-2xl border-2 border-slate-200 hover:border-vibrant-orange hover:bg-orange-50/40 transition-colors group"
          >
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-vibrant-orange flex items-center justify-center shrink-0">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-vibrant-dark group-hover:text-vibrant-orange">Home Page</span>
              <span className="block text-[10px] text-slate-500">Return to academy homepage</span>
            </div>
          </Link>

          <Link
            to="/programs"
            className="flex items-center gap-2.5 p-3 rounded-2xl border-2 border-slate-200 hover:border-vibrant-teal hover:bg-teal-50/40 transition-colors group"
          >
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-vibrant-teal flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-vibrant-dark group-hover:text-vibrant-teal">Our Programs</span>
              <span className="block text-[10px] text-slate-500">Abacus &amp; Vedic Maths courses</span>
            </div>
          </Link>

          <Link
            to="/worksheets"
            className="flex items-center gap-2.5 p-3 rounded-2xl border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 transition-colors group"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-vibrant-dark group-hover:text-amber-600">Worksheet Vault</span>
              <span className="block text-[10px] text-slate-500">Free printable math sheets</span>
            </div>
          </Link>

          <Link
            to="/contact"
            className="flex items-center gap-2.5 p-3 rounded-2xl border-2 border-slate-200 hover:border-vibrant-orange hover:bg-orange-50/40 transition-colors group"
          >
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-vibrant-orange flex items-center justify-center shrink-0">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-vibrant-dark group-hover:text-vibrant-orange">Contact Wakad Center</span>
              <span className="block text-[10px] text-slate-500">Inquire via WhatsApp or phone</span>
            </div>
          </Link>
        </div>

        {/* Primary Back Button */}
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-vibrant-dark hover:bg-vibrant-dark/90 text-white text-xs font-black uppercase tracking-wider py-3.5 px-8 rounded-full shadow-md active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
