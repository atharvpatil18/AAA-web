/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  ChevronRight, 
  ArrowRight, 
  Zap, 
  Calculator, 
  Target, 
  BookOpen, 
  Brain, 
  CheckCircle2, 
  Calendar 
} from "lucide-react";
import VedicMathDemo from "../components/VedicMathDemo";
import DemoBookingModal from "../components/DemoBookingModal";
import { trackPageView, trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

export default function LabVedicMathSutras() {
  const { language, t } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    trackPageView(
      "/vedic-maths-sutras",
      "Interactive Vedic Maths Sutras | Fast Mental Calculation Tricks | AAA Pune"
    );
  }, []);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://aaa-web-b0h.pages.dev/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Interactive Labs",
        "item": "https://aaa-web-b0h.pages.dev/vedic-maths-sutras"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Vedic Maths Sutra Lab",
        "item": "https://aaa-web-b0h.pages.dev/vedic-maths-sutras"
      }
    ]
  };

  const learningResourceSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "Interactive Vedic Mathematics Sutras",
    "description": "Step-by-step visual demonstration of authentic Vedic Sutras including Urdhva Tiryagbhyam and Ekadhikena with algebraic proofs.",
    "educationalLevel": "Ages 9 to 16 years (Class 5 to 10)",
    "learningResourceType": "Interactive Simulation",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://aaa-web-b0h.pages.dev"
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-vibrant-dark">
      {/* Schema.org JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }}
      />

      {/* Breadcrumb Navigation Bar */}
      <nav aria-label="Breadcrumb" className="bg-[#FAF7F2] border-b border-slate-200 py-3 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center gap-1.5 text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-vibrant-orange transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-400">Interactive Learning Labs</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-vibrant-dark font-bold">Vedic Maths Sutras</span>
        </div>
      </nav>

      {/* Hero Header Section */}
      <section className="py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-vibrant-orange uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 fill-current" /> High-Speed Mental Calculation
        </div>
        <h1 className="font-display font-black text-3xl md:text-5xl text-vibrant-dark tracking-tight leading-tight">
          Interactive Vedic Mathematics Sutra Lab
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Test 3 authentic Vedic Sutras below. See how cross-multiplication vector paths and algebraic deficiency patterns turn multi-step column calculations into single-line mental answers.
        </p>
      </section>

      {/* Main Interactive Tool Container */}
      <main className="px-4 md:px-8 max-w-4xl mx-auto pb-16">
        <VedicMathDemo />
      </main>

      {/* Pedagogical Explanation & School Exam Integration Section */}
      <section className="py-16 bg-[#FAF7F2] border-t border-slate-200 px-4 md:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-vibrant-teal uppercase tracking-widest">
              CBSE, ICSE & Olympiad Exam Benefits
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl text-vibrant-dark">
              How Vedic Mathematics Solves the "Exam Time Pressure" Problem
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              In Class 6 to 10 board curricula, students spend up to 70% of exam time on raw arithmetic computations. Vedic Mathematics provides lightning-fast verification shortcuts, eliminating careless arithmetic slips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-vibrant-orange">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-vibrant-dark">Single-Line Vector Math</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The Urdhva-Tiryagbhyam sutra bypasses multiple rows of partial products, writing the final product in one horizontal stroke directly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-vibrant-teal">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-vibrant-dark">Instant Result Checking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Using digital root sutras (Beejank), students verify answers in under 3 seconds without having to recalculate lengthy long division or squaring.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-vibrant-dark">Algebraic Grounding</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unlike rote tricks, every Vedic shortcut has an elegant algebraic proof ($(a-b)^2$, $(10x+5)^2$), deepening high school algebraic maturity.
              </p>
            </div>
          </div>

          {/* Call to Action Box */}
          <div className="bg-vibrant-dark text-white rounded-3xl p-8 md:p-10 border-2 border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-vibrant-gold uppercase tracking-wider block">
                Class 5 to 10 Advanced Batches
              </span>
              <h3 className="font-display font-black text-xl md:text-2xl text-white">
                {language === "mr" ? "नेहा पाटील यांच्यासोबत विनामूल्य १-ऑन-१ मूल्यमापन बुक करा" : language === "hi" ? "नेहा पाटिल के साथ निःशुल्क १-ऑन-१ मूल्यांकन बुक करें" : "Book a Free 1-on-1 Assessment with Neha Patil"}
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                {language === "mr" ? "आपल्या पाल्याच्या अंकगणितीय अडचणी शोधा. नेहा पाटील शालेय बोर्ड आणि ऑलिम्पियाडनुसार वैयक्तिकृत स्पीड-लर्निंग योजना तयार करतात." : language === "hi" ? "अपने बच्चे की अंकगणितीय गणना बाधाओं की पहचान करें। नेहा पाटिल स्कूली बोर्ड और ओलंपियाड के अनुसार व्यक्तिगत स्पीड-लर्निंग योजना तैयार करती हैं।" : "Discover your child's arithmetic calculation bottlenecks. Neha Patil designs an individualized speed-learning plan tailored to school boards and Olympiads."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                type="button"
                onClick={() => {
                  trackDemoClick("vedic_lab_cta");
                  setIsDemoModalOpen(true);
                }}
                className="w-full sm:w-auto bg-vibrant-teal hover:bg-vibrant-teal/90 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md active:translate-y-0.5 cursor-pointer text-center"
              >
                Book Parent Counselling
              </button>
              <Link
                to="/programs/vedic-maths"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>Examine Course Levels</span> <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Booking Modal Bridge */}
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultProgram="Vedic Mathematics Assessment"
        source="vedic_lab_page"
      />
    </div>
  );
}
