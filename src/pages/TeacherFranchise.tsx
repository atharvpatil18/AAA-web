/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Award, BookOpen, CheckCircle2, ShieldCheck, Users, GraduationCap, Building2, Sparkles, Phone, Mail, MapPin, Send, ArrowRight } from "lucide-react";
import LeadForm from "../components/LeadForm";

export default function TeacherFranchise() {
  const [activeTab, setActiveTab] = useState<"teacher" | "franchise">("teacher");

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white py-16 px-4 md:px-8 border-b border-purple-900/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            ISO 9001:2015 & Skill India Aligned Certification
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white mb-3">
            Teacher Training & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-teal-300">Academy Franchise</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
            Become a Certified Abacus & Vedic Math Master Trainer or open an official Arnav Abacus Academy center under certified guidance by Neha Patil.
          </p>

          {/* Toggle Button */}
          <div className="mt-8 inline-flex items-center bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
            <button
              onClick={() => setActiveTab("teacher")}
              className={`px-6 py-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === "teacher"
                  ? "bg-amber-500 text-slate-950 shadow-lg"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              👩‍🏫 Certified Teacher Training Course
            </button>
            <button
              onClick={() => setActiveTab("franchise")}
              className={`px-6 py-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === "franchise"
                  ? "bg-amber-500 text-slate-950 shadow-lg"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              🏫 Open an Academy Center (Franchise)
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10">
        {/* TAB 1: TEACHER TRAINING */}
        {activeTab === "teacher" && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-black text-amber-600 uppercase tracking-widest flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Professional Certification Program
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  Start Your Career as a Certified Abacus & Vedic Math Educator
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Designed for passionate home tutors, teachers, and entrepreneurs. Learn complete bead mechanics, 16 Vedic Math Sutras, lesson planning, and child psychology methods.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">Government & ISO Approved Syllabus</h4>
                      <p className="text-xs text-slate-500">Comprehensive Level 1 to Level 8 Soroban + Senior Vedic Math curriculum.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">Flexible Online & Offline Batches</h4>
                      <p className="text-xs text-slate-500">Weekend and weekday slots guided directly by Master Trainer Neha Patil.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">Complete Kit & Business Guidance</h4>
                      <p className="text-xs text-slate-500">Includes physical Abacus frame, teacher manuals, printable test banks, and student lead generation assistance.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl">
                <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
                  <Send className="w-4 h-4 text-amber-500" /> Apply for Next Teacher Training Batch
                </h3>
                <p className="text-xs text-slate-500 mb-6 font-medium">Fill in your contact details for curriculum syllabus & fee structure details.</p>
                <LeadForm defaultProgram="Teacher Training Certification" />
              </div>
            </div>

            {/* Course Curriculum Highlights */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 mb-6 text-center">
                Teacher Certification Modules & Duration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200">
                  <span className="text-xs font-black text-amber-700 uppercase">Module 1</span>
                  <h4 className="font-extrabold text-slate-900 text-base mt-1 mb-2">Abacus Teacher Foundation</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Junior Abacus (JR-0 to JR-3) bead movements, Small Friends (+5/-5), Big Friends (+10/-10), and speed listening dictations.
                  </p>
                </div>
                <div className="p-5 bg-purple-50 rounded-2xl border border-purple-200">
                  <span className="text-xs font-black text-purple-700 uppercase">Module 2</span>
                  <h4 className="font-extrabold text-slate-900 text-base mt-1 mb-2">Vedic Math Master Sutras</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    16 Vedic Sutras & 13 Sub-sutras covering rapid multiplications, division shortcuts, square roots, and algebraic speed math.
                  </p>
                </div>
                <div className="p-5 bg-teal-50 rounded-2xl border border-teal-200">
                  <span className="text-xs font-black text-teal-700 uppercase">Module 3</span>
                  <h4 className="font-extrabold text-slate-900 text-base mt-1 mb-2">Classroom & Center Setup</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Student performance tracking, parent consultation skills, diagnostic testing, and marketing strategies for starting home batches.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FRANCHISE / ACADEMY CENTER */}
        {activeTab === "franchise" && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-black text-amber-600 uppercase tracking-widest flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" /> Low Investment, High Return Franchise Model
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  Partner with Arnav Abacus Academy in Your City
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Establish an authorized learning center under our trusted brand. Access proven curriculum, online student portal access, and complete marketing support.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-900 text-white rounded-2xl">
                    <span className="text-2xl font-black text-amber-400">Zero</span>
                    <p className="text-xs font-bold text-slate-300 mt-1">Royalty Options Available</p>
                  </div>
                  <div className="p-4 bg-slate-900 text-white rounded-2xl">
                    <span className="text-2xl font-black text-emerald-400">100%</span>
                    <p className="text-xs font-bold text-slate-300 mt-1">Curriculum & Portal Support</p>
                  </div>
                </div>
              </div>

              {/* Franchise Inquiry Form */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl">
                <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-500" /> Apply for Center Franchise
                </h3>
                <p className="text-xs text-slate-500 mb-6 font-medium">Get detailed franchise prospectus and revenue share models.</p>
                <LeadForm defaultProgram="Academy Center Franchise Inquiry" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
