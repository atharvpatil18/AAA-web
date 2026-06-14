/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Award, Heart, CheckCircle2, Star, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import { trackDemoClick } from "../lib/analytics";

export default function TeacherProfile() {
  const [imgFailed, setImgFailed] = React.useState(false);
  const handleConsultClick = () => {
    trackDemoClick("teacher_profile_consult");
  };

  const certifications = [
    "IIVA Certified Abacus Master & Vedic Math Coach",
    "Expert in Child Psychology & Visualization Practice",
    "Over 3+ Years of Direct Mentorial Excellence",
    "Tailored 1-on-1 Personalized Attention System for Every Student"
  ];

  return (
    <div 
      id="teacher-profile-card" 
      className="bg-white border-4 border-vibrant-dark rounded-[40px] p-6 md:p-8 lg:p-12 shadow-[12px_12px_0_0_#1A2E35] max-w-5xl mx-auto overflow-hidden relative"
    >
      {/* Visual background badges */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-orange-100/40 to-transparent rounded-full -mr-24 -mt-24 pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Profile Details Photo / Avatar Illustration Column */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative">
            {/* Visual avatar wrapper */}
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-[32px] bg-vibrant-orange p-1 shadow-md relative overflow-hidden border-2 border-vibrant-dark flex items-center justify-center">
              {!imgFailed ? (
                <img 
                  src="/teacher-profile.jpg" 
                  alt="Neha Patil - Master Trainer" 
                  className="w-full h-full rounded-[26px] object-cover" 
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div className="w-full h-full rounded-[26px] bg-white flex flex-col items-center justify-center p-4 text-center">
                  <span className="font-display font-black text-6xl md:text-7xl text-vibrant-orange">
                    NP
                  </span>
                  <span className="text-vibrant-dark font-black text-lg md:text-xl tracking-tight mt-2 block">
                    Neha Patil
                  </span>
                  <span className="text-[10px] text-vibrant-teal font-black tracking-widest uppercase block mt-1">
                    IIVA CERTIFIED MENTOR
                  </span>
                </div>
              )}
            </div>

            {/* Float badge */}
            <div className="absolute -bottom-3 -right-3 bg-vibrant-dark text-white p-3 rounded-2xl shadow-xl flex items-center gap-1.5 border-2 border-vibrant-dark">
              <Star className="w-4 h-4 text-vibrant-gold fill-current animate-pulse" />
              <div>
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Top Rated Mentor</span>
                <span className="block text-xs font-black text-white leading-none mt-0.5">Pune</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center sm:text-left bg-vibrant-cream border-2 border-vibrant-dark p-4 rounded-2xl max-w-xs shadow-sm">
            <span className="block text-[11px] font-black text-vibrant-orange uppercase tracking-widest text-center mb-1.5">
              Academy Partners
            </span>
            <p className="text-xs text-gray-500 font-medium leading-relaxed text-center">
              Co-mentored by <strong className="text-vibrant-dark">Nitin Sir</strong> to ensure continuous personalized care, discipline, and visual development.
            </p>
          </div>
        </div>

        {/* Text Details Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-vibrant-orange bg-[#FFF0E0] border border-[#FFD8B1] px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              <Award className="w-4 h-4" /> Founder &amp; Academic Director
            </span>
            <h3 className="font-display font-black text-3xl md:text-4xl text-vibrant-dark tracking-tight leading-tight">
              Meet Neha Patil
            </h3>
            <p className="font-display font-bold text-sm md:text-base text-gray-500 italic">
              "Every child calculates differently; our program respects their unique pace and overcomes fear of numbers with fun beads."
            </p>
          </div>

          <div className="text-gray-600 text-xs md:text-sm leading-relaxed space-y-4 font-medium">
            <p>
              As an internationally recognized <strong>IIVA Certified Professional</strong>, Neha Patil has dedicated her academic career to helping children overcome finger-counting limits. Through visualization beads, mental abacus triggers, and speed calculation sutras, her students construct strong neural pathways for focus, visual storage, and active retention.
            </p>
            <p>
              Neha's teaching philosophy revolves around a <strong>calm approach, clear communication, and a highly positive learning environment</strong> where children feel safe and respected from the very first minute.
            </p>
          </div>

          {/* Checklist with bullet points */}
          <div className="space-y-2.5">
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs md:text-sm text-vibrant-dark font-black">
                <CheckCircle2 className="w-5 h-5 text-vibrant-teal shrink-0" />
                <span>{cert}</span>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://wa.me/919021924968"
              onClick={handleConsultClick}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-vibrant-teal text-white font-black text-xs md:text-sm px-6 py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_0_0_#00897B] active:translate-y-1 active:shadow-none hover:brightness-105 transition-all cursor-pointer shrink-0"
            >
              Consult Neha Ma'am on WhatsApp
            </a>
            <div className="text-gray-400 text-xs font-semibold flex items-center gap-1 text-center font-sans">
              <ShieldCheck className="w-4 h-4 text-vibrant-teal shrink-0" />
              100% Free Consultation. No Commitments required.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
