/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import ProgramCard from "../components/ProgramCard";
import LeadForm from "../components/LeadForm";
import { PROGRAMS } from "../data";
import { BookOpen, Sparkles, Trophy, CheckCircle, HelpCircle, ShieldCheck } from "lucide-react";
import { trackDemoClick, trackWhatsAppClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

export default function Programs() {
  const { t } = useLanguage();
  const handleConsult = () => {
    trackWhatsAppClick("programs_directory_consult_button", "parent_counselling");
    const waText = encodeURIComponent(
      "Hello Arnav Abacus Academy! I would like to book a Parent Counselling Session to discuss the best mathematics programme for my child."
    );
    window.open(`https://wa.me/919021924968?text=${waText}`, "_blank");
  };

  return (
    <div id="programs-page-container" className="bg-[#FFFDF9] min-h-screen">
      
      {/* 1. Header Hero Banner */}
      <section className="bg-slate-900 text-white py-16 md:py-24 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-4 relative z-10">
          <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Structured Cognitive Pathways
          </span>
          <h1 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-tight">
            Mathematics &amp; Brain Development Programmes
          </h1>
          <p className="text-slate-300 text-xs md:text-sm font-medium max-w-2xl mx-auto leading-relaxed">
            Age-appropriate, research-backed curricula taught in micro-batches (1:8 ratio) by certified mentors in Wakad, Pune.
          </p>

          {/* Canonical Sub-Program Quick Links */}
          <div className="pt-4 flex flex-wrap justify-center gap-2.5">
            <Link
              to="/programs/abacus"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-full shadow-sm transition-all"
            >
              Abacus (Ages 4.5–9) &rarr;
            </Link>
            <Link
              to="/programs/vedic-maths"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-full shadow-sm transition-all"
            >
              Vedic Maths (Ages 9–14) &rarr;
            </Link>
            <Link
              to="/programs/mental-maths"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-4 py-2 rounded-full shadow-sm transition-all"
            >
              Mental Maths (Ages 6–14) &rarr;
            </Link>
            <Link
              to="/programs/school-maths"
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs px-4 py-2 rounded-full shadow-sm transition-all"
            >
              School Maths (Grades 5–10) &rarr;
            </Link>
            <Link
              to="/programs/ipm-olympiad"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-full shadow-sm transition-all"
            >
              IPM &amp; Olympiad (Grades 2–9) &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Directory Class cards */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Five Dedicated Pathways
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
            Explore Our Comprehensive Programmes
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            Choose the right mathematics foundation based on your child's age, academic focus, and developmental goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS.map((prog) => (
            <ProgramCard key={prog.id} program={prog} />
          ))}
        </div>
      </section>

      {/* 3. Compare Benefits table / details block */}
      <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Foundational vs Speed Math
            </span>
            <h2 className="font-display font-black text-3xl text-slate-900 leading-tight">
              Which Programme Fits Your Child?
            </h2>
            <p className="text-slate-600 text-xs md:text-sm font-semibold">
              Compare our core mathematical disciplines to choose the ideal starting milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left box */}
            <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-700 rounded-2xl flex items-center justify-center font-black text-base">
                AB
              </div>
              <h3 className="font-display font-black text-lg text-slate-900">
                Soroban Japanese Abacus (Ages 4.5–9)
              </h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Best suited for early learners developing foundational number sense. Uses physical beads transitioning into mental bead visualization (Anzan) to eliminate finger counting and build photographic memory.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 font-bold">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  Activates both brain hemispheres during the peak cognitive growth window
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  8 structured levels with national competition eligibility
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  Zero screen dependency during concrete foundational years
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  to="/programs/abacus"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700"
                >
                  Explore Abacus Programme Details &rarr;
                </Link>
              </div>
            </div>

            {/* Right box */}
            <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center font-black text-base">
                VD
              </div>
              <h3 className="font-display font-black text-lg text-slate-900">
                Vedic Mathematics &amp; Olympiad (Ages 9–14)
              </h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Designed for students in Grades 5–10 facing heavy school arithmetic, algebraic factorisation, and competitive tests (IPM, IMO). Eliminates scrap scratch-work and speeds up multi-digit calculation.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 font-bold">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  16 ancient Indian mathematical sutras for 10x-15x faster evaluation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  Cross-checks that catch procedural mistakes before answer submission
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  Proven competitive edge in Olympiads, IPM &amp; scholarship exams
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  to="/programs/vedic-maths"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
                >
                  Explore Vedic Maths Programme Details &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contact / Lead Booking Row */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Academic Consultation
            </span>
            <h2 className="font-display font-black text-3xl text-slate-900 leading-tight">
              Unsure Which Programme Your Child Needs?
            </h2>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-semibold">
              Every child has a unique learning pace. Schedule a one-on-one diagnostic counselling session with Founder Neha Patil at our Wakad Center or Live Online to identify your child's exact readiness.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 bg-orange-500 rounded-full text-white font-bold flex items-center justify-center shrink-0">
                ★
              </div>
              <div>
                <cite className="not-italic font-black text-slate-900 text-sm leading-none block">
                  Neha Patil (MCA, IIVA Certified)
                </cite>
                <span className="text-xs text-slate-500 font-medium block mt-1 leading-none">
                  Founder &amp; Academic Director, Arnav Abacus Academy
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleConsult}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs md:text-sm px-7 py-3.5 rounded-full inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Book Counselling on WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl">
            <h3 className="font-black text-lg text-slate-900 mb-2">Request Parent Counselling</h3>
            <p className="text-xs text-slate-500 mb-6 font-medium">We'll review your child's current grade and recommend the best learning track.</p>
            <LeadForm sourceCampaign="Programs Overview Layout" />
          </div>

        </div>
      </section>

    </div>
  );
}
