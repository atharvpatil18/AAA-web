/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import ProgramCard from "../components/ProgramCard";
import LeadForm from "../components/LeadForm";
import { PROGRAMS } from "../data";
import { BookOpen, Sparkles, Trophy, CheckCircle, HelpCircle, ShieldCheck } from "lucide-react";
import { trackDemoClick } from "../lib/analytics";

export default function Programs() {
  const handleConsult = () => {
    trackDemoClick("programs_directory_consult_button");
  };

  return (
    <div id="programs-page-container" className="bg-[#FFFDF9] min-h-screen">
      
      {/* 1. Header Hero Banner */}
      <section className="bg-vibrant-dark text-white py-16 md:py-24 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-vibrant-teal/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-4 relative z-10">
          <span className="text-[10px] font-black text-vibrant-gold bg-[#FFF5CC]/15 border border-vibrant-gold/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Comprehensive Curriculums
          </span>
          <h1 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-tight">
            Math Programs Crafted For Kids
          </h1>
          <p className="text-[#A2C4C9] text-xs md:text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
            From playful bead manipulation on physical Abacus tools to super-speed Vedic algebra shortcuts and systematic school exam readiness.
          </p>
        </div>
      </section>

      {/* 2. Directory Class cards */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-black text-vibrant-orange bg-[#FFF0E0] border border-[#FFD8B1] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            EXPLORE OUR PROGRAMS
          </span>
          <h2 className="font-display font-black text-3xl text-vibrant-dark leading-tight">
            Interactive Classroom Streams
          </h2>
          <p className="text-gray-500 text-xs md:text-sm font-semibold">
            All programs run throughout the year under direct supervision of Master Trainer Neha Patil at our Wakad center.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROGRAMS.map((prog) => (
            <ProgramCard key={prog.id} program={prog} />
          ))}
        </div>
      </section>

      {/* 3. Compare Benefits table / details block */}
      <section className="py-16 md:py-20 bg-vibrant-cream border-y-4 border-vibrant-dark">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="text-[10px] font-black text-vibrant-teal bg-[#E0FAF5] border border-vibrant-teal/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              CURRICULUM BENCHMARKS
            </span>
            <h2 className="font-display font-black text-3xl text-vibrant-dark leading-tight">
              Arithmetic vs. Mind Visualization
            </h2>
            <p className="text-gray-500 text-xs md:text-sm font-semibold">
              Standard tutoring focuses purely on repetitive school homework. Our systems build cognitive brain agility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left box */}
            <div className="bg-[#FFFDF9] border-4 border-vibrant-dark p-6 md:p-8 rounded-[32px] shadow-[8px_8px_0_0_#1A2E35] space-y-4">
              <div className="w-12 h-12 bg-vibrant-orange text-white border-2 border-vibrant-dark rounded-xl flex items-center justify-center font-black shadow-sm text-base">
                AB
              </div>
              <h3 className="font-display font-black text-lg text-vibrant-dark">
                Cognitive Milestones of Abacus Learning
              </h3>
              <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed">
                By sliding beads, students construct a virtual "pictorial abacus" in their minds. Instead of reading boring digits, they see visual shapes to calculate.
              </p>
              <ul className="space-y-2.5 text-xs text-vibrant-dark font-black">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-vibrant-teal shrink-0" />
                  Photographic recall of multidigit counts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-vibrant-teal shrink-0" />
                  Increased auditory storage and split-second focus
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-vibrant-teal shrink-0" />
                  Active Left &amp; Right cerebral brain synchronization
                </li>
              </ul>
            </div>

            {/* Right box */}
            <div className="bg-[#FFFDF9] border-4 border-vibrant-dark p-6 md:p-8 rounded-[32px] shadow-[8px_8px_0_0_#1A2E35] space-y-4">
              <div className="w-12 h-12 bg-vibrant-teal text-white border-2 border-vibrant-dark rounded-xl flex items-center justify-center font-black shadow-sm text-base">
                VD
              </div>
              <h3 className="font-display font-black text-lg text-vibrant-dark">
                Strategic Benchmarks of Vedic Maths
              </h3>
              <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed">
                Vedic Maths empowers kids to calculate up to 10-15x faster than school methods, executing high-tier complex calculations without draft work.
              </p>
              <ul className="space-y-2.5 text-xs text-vibrant-dark font-black">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-vibrant-orange shrink-0" />
                  Total elimination of calculations phobia
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-vibrant-orange shrink-0" />
                  Amazing speeds on Olympiads, scholarships and school papers
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-vibrant-orange shrink-0" />
                  High visual intuition for algebra, squares &amp; roots
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contact / Lead Booking Row */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-black text-vibrant-orange bg-[#FFF0E0] border border-[#FFD8B1] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              INQUIRE ADVISORY SLOTS
            </span>
            <h2 className="font-display font-black text-3xl text-vibrant-dark leading-tight">
              Unsure which stream fits your child's age?
            </h2>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-semibold">
              Contact us for a friendly advisory conversation. Neha Ma’am will personally assess your child's math scores, school board structure, and spatial skills to guide you correctly.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 bg-vibrant-orange border-2 border-vibrant-dark rounded-full text-white font-black flex items-center justify-center shrink-0">
                ★
              </div>
              <div>
                <cite className="not-italic font-black text-vibrant-dark text-sm leading-none block">
                  Neha Patil (IIVA Certified)
                </cite>
                <span className="text-xs text-gray-405 font-bold block mt-1 leading-none">
                  Founder &amp; Certified Professional
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/919021924968"
                onClick={handleConsult}
                className="bg-vibrant-teal text-white font-black text-xs md:text-sm px-6 py-4 rounded-xl inline-flex items-center gap-1.5 shadow-[0_4px_0_0_#00897B] active:translate-y-1 active:shadow-none hover:brightness-105 duration-100 transition-all cursor-pointer"
              >
                Schedule Consultation Chat
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <LeadForm sourceCampaign="Programs Overview Layout" />
          </div>

        </div>
      </section>

    </div>
  );
}
