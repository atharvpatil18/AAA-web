/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import DemoBookingModal from "../components/DemoBookingModal";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  ChevronRight,
  Brain,
  HelpCircle,
  Clock,
  Users,
  Target,
  Zap,
  CheckCircle2,
  Calendar
} from "lucide-react";
import LeadForm from "../components/LeadForm";
import { trackProgramView, trackWhatsAppClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

export default function ProgramMentalMaths() {
  const { language, t } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    trackProgramView("Mental Mathematics", "canonical_program_hub");
  }, []);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Mental Mathematics & Speed Arithmetic Program",
    "description": "High-agility mental arithmetic, lightning numerical recall, and cognitive visualization coaching for school students in Wakad, Pune.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://arnavabacusacademy-web.vercel.app/"
    },
    "educationalCredentialAwarded": "Certificate in Mental Arithmetic Excellence",
    "audience": {
      "@type": "Audience",
      "audienceType": "School students aged 6 to 14 seeking speed, accuracy and mental agility"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://arnavabacusacademy-web.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Programs",
        "item": "https://arnavabacusacademy-web.vercel.app/programs"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Mental Mathematics",
        "item": "https://arnavabacusacademy-web.vercel.app/programs/mental-maths"
      }
    ]
  };

  const handleConsult = () => {
    trackWhatsAppClick("program_mental_maths_counselling", "mental_math_inquiry");
    const waText = encodeURIComponent(
      "Hello Arnav Abacus Academy! I would like to inquire about the Mental Mathematics & Speed Arithmetic Program for my child."
    );
    window.open(`https://wa.me/919021924968?text=${waText}`, "_blank");
  };

  return (
    <div id="program-mental-maths-page" className="bg-[#FFFDF9] min-h-screen">
      {/* Course & Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-slate-100/80 border-b border-slate-200 py-2.5 px-4 md:px-8 text-xs font-semibold text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/programs" className="hover:text-orange-600 transition-colors">Programs</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Mental Mathematics</span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="bg-slate-900 text-white py-14 md:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Brain className="w-3.5 h-3.5" />
                <span>Cognitive Speed &amp; Number Sense</span>
              </div>
              <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
                Mental Mathematics &amp; Speed Arithmetic in Wakad, Pune
              </h1>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                Transform calculations from a stressful chore into intuitive mental agility. Our structured Mental Math curriculum develops lightning recall, numerical estimation, working memory, and zero-finger calculation fluency.
              </p>

              {/* Quick Spec Pills */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-amber-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <Clock className="w-3.5 h-3.5" /> Age Eligibility: 6 to 14 Years
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-emerald-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <Users className="w-3.5 h-3.5" /> Small Batch Ratio (Max 5 Students)
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-sky-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <MapPin className="w-3.5 h-3.5" /> Wakad Center &amp; Online
                </span>
              </div>

              {/* Location Snippet */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Academy Center:</strong> Flat No. 3, 1st Floor, Advocate Balaji Sagar Bungalow, Opp. Creative Cameo, Near Park Street, behind WISDOM WORLD SCHOOL, Wakad, Pune (Serving Wakad, Pimple Saudagar, Hinjawadi, Tathawade & Baner).
                </span>
              </div>
            </div>

            {/* Hero LeadForm Embed */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100">
              <div className="mb-4">
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Book A Counselling Session
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-2">
                  AAA Personalised Learning Discovery Session
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Meet Director Neha Patil for a personalized mental calculation and number agility diagnostic.
                </p>
              </div>
              <LeadForm sourceCampaign="programs_mental_maths_page" defaultProgram="Mental Mathematics" />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Who Should Join */}
      <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Target Learner Profile
          </span>
          <h2 className="font-display font-black text-3xl text-slate-900">
            Who Should Join Mental Mathematics?
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            Designed for school students looking to eliminate calculation bottlenecks and build razor-sharp arithmetic reflexes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-orange-500 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm">
              1
            </div>
            <h3 className="font-display font-black text-base text-slate-900">Overcoming Slow Rough-Work</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Students who grasp concepts easily in school but waste critical test minutes writing down trivial additions, subtractions, and scratch scribbles on margins.
            </p>
          </div>

          <div className="bg-white border-2 border-orange-500/30 p-6 rounded-3xl space-y-3 shadow-md relative">
            <span className="absolute -top-3 right-4 bg-orange-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Common Challenge
            </span>
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-sm">
              2
            </div>
            <h3 className="font-display font-black text-base text-slate-900">Eliminating "Silly Mistakes"</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Bright children who lose 5–15% marks due to simple calculation slips, carry-over lapses, and procedural rushing under timed exam conditions.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-orange-500 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-black text-sm">
              3
            </div>
            <h3 className="font-display font-black text-base text-slate-900">Competitive Exam Agility</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Aspirants for IPM, Maths Olympiads, and scholarship exams requiring rapid elimination of answer choices, quick estimation, and high mental accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Curriculum & Structured Levels */}
      <section className="py-14 md:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-14">
            <span className="text-[10px] font-bold text-orange-600 bg-orange-100 border border-orange-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Structured Roadmap
            </span>
            <h2 className="font-display font-black text-3xl text-slate-900 leading-tight">
              Curriculum &amp; Progressive Mastery Levels
            </h2>
            <p className="text-slate-600 text-xs md:text-sm font-semibold">
              Step-by-step cognitive training taking children from physical calculation dependency to instantaneous mental computation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-black text-orange-600 uppercase tracking-widest block">Level 1</span>
              <h3 className="font-bold text-base text-slate-900">Number Sense &amp; Complements</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                <li>• Base 10 &amp; Base 100 relationships</li>
                <li>• Single-digit flash additions</li>
                <li>• Elimination of finger counting</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-black text-teal-700 uppercase tracking-widest block">Level 2</span>
              <h3 className="font-bold text-base text-slate-900">Multi-Digit Addition &amp; Subtraction</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                <li>• Left-to-right mental addition</li>
                <li>• Subtraction through complements</li>
                <li>• 2-digit by 2-digit mental drills</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-black text-indigo-600 uppercase tracking-widest block">Level 3</span>
              <h3 className="font-bold text-base text-slate-900">High-Speed Multiplication &amp; Division</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                <li>• Table mastery up to 20 &amp; beyond</li>
                <li>• Split &amp; merge multiplication strategies</li>
                <li>• Fast mental division &amp; remainders</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest block">Level 4</span>
              <h3 className="font-bold text-base text-slate-900">Advanced Numerical Estimation</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                <li>• Percentage, fraction &amp; ratio shortcuts</li>
                <li>• Square roots and rapid checks</li>
                <li>• Timed competitive sprint drills</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Teaching Methodology & AAA Learning Model */}
      <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Pedagogical Framework
            </span>
            <h2 className="font-display font-black text-3xl text-slate-900 leading-tight">
              The AAA Learning Model™ in Mental Math
            </h2>
            <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
              We never promote rote cramming or mindless memorization. Every calculation shortcut is understood deeply before speed is trained:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-slate-700"><strong>Inspire &amp; Explore:</strong> Showing the beauty and simplicity of numbers to dispel math anxiety.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-slate-700"><strong>Understand the Principle:</strong> Deep arithmetic logic behind place values and number complements.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-slate-700"><strong>Deliberate Practice:</strong> Small batch focus (max 5 students per batch) ensuring personalized corrective feedback in real time.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-slate-700"><strong>Apply &amp; Reflect:</strong> Transferring calculation agility into school homework, school exams, and competitions.</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Award className="w-8 h-8 text-orange-500" />
              <div>
                <h3 className="font-black text-slate-900 text-lg">Expected Learning Outcomes</h3>
                <span className="text-xs text-slate-500 font-medium">Measurable progress within 60–90 days</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50/60 p-4 rounded-xl border border-orange-100">
                <span className="text-2xl font-black text-orange-600 block">5x–10x</span>
                <span className="text-[11px] font-bold text-slate-700">Faster arithmetic speed</span>
              </div>
              <div className="bg-teal-50/60 p-4 rounded-xl border border-teal-100">
                <span className="text-2xl font-black text-teal-700 block">0</span>
                <span className="text-[11px] font-bold text-slate-700">Finger-counting reliance</span>
              </div>
              <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-100">
                <span className="text-2xl font-black text-indigo-700 block">95%+</span>
                <span className="text-[11px] font-bold text-slate-700">Calculation accuracy rate</span>
              </div>
              <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
                <span className="text-2xl font-black text-emerald-700 block">High</span>
                <span className="text-[11px] font-bold text-slate-700">Math exam confidence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Practice Expectations & Progress Tracking */}
      <section className="py-14 md:py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                Daily Habit Formula
              </span>
              <h2 className="font-display font-black text-2xl md:text-3xl text-white">
                Practice Expectations: 10–15 Minutes Daily
              </h2>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                Mastery in mental arithmetic doesn't require hours of tedious homework. We advocate a 10-to-15 minute daily micro-drill routine that keeps neural pathways agile and builds lasting speed reflexes without overwhelming the child.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 md:p-8 space-y-4">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-400" />
                AAA Brain Dashboard™ Progress Tracking
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Parents receive regular weekly checkpoint logs detailing the child's processing speed (seconds per evaluation), accuracy percentage, and level advancement.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleConsult}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-6 py-3 rounded-full transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Inquire About Batch Timings</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Parent FAQs */}
      <section className="py-14 md:py-20 max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Parent Questions
          </span>
          <h2 className="font-display font-black text-3xl text-slate-900">
            Frequently Asked Questions: Mental Math
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="font-bold text-sm md:text-base text-slate-900 mb-2">
              How does Mental Math differ from Abacus training?
            </h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Abacus uses tactile beads as a concrete sensory anchor transitioning to mental beads (Anzan), ideal for foundational ages 4.5–9. Mental Mathematics teaches direct numerical decomposition, complement arithmetic, and split-merge calculation shortcuts. At AAA, Mental Math is offered both as an independent standalone track (Ages 6–14) and as an integrated bridging curriculum between Abacus and Vedic Maths.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="font-bold text-sm md:text-base text-slate-900 mb-2">
              Will this confuse the steps taught in my child's school board (CBSE/ICSE/State)?
            </h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              No. Mental Math teaches children how numbers interact internally. In school exams, students still write the required explanatory steps on paper, but they complete the calculations instantaneously in their head with zero scratch errors.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="font-bold text-sm md:text-base text-slate-900 mb-2">
              What is the student-to-teacher batch size?
            </h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Every batch at Arnav Abacus Academy has a strict maximum of five students per batch. This ensures Founder Neha Patil (Certified Trainer of Abacus & Vedic Mathematics) provides personalized feedback to each student every single session.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Final Conversion CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-6">
          <h2 className="font-display font-black text-3xl md:text-5xl leading-tight">
            Give Your Child the Gift of Lifelong Mental Math Agility
          </h2>
          <p className="text-orange-100 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed font-semibold">
            Join hundreds of confident Pune students mastering mental arithmetic with personal mentorship by Neha Patil in Wakad.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleConsult}
              className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 font-black text-xs md:text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all cursor-pointer"
            >
              Book Parent Counselling on WhatsApp
            </button>
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-slate-900/40 hover:bg-slate-900/60 border border-white/30 text-white font-bold text-xs md:text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all"
            >
              Visit Wakad Center
            </Link>
          </div>
        </div>
      </section>
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultProgram="Mental Mathematics (Ages 6–14)"
        source="program_page_mental_maths"
      />
    </div>
  );
}
