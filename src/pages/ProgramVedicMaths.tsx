/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
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
  HelpCircle,
  Clock,
  Zap,
  Target
} from "lucide-react";
import LeadForm from "../components/LeadForm";
import { trackProgramView } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

export default function ProgramVedicMaths() {
  const { t } = useLanguage();

  useEffect(() => {
    trackProgramView("Vedic Maths", "canonical_program_hub");
  }, []);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Vedic Mathematics Program",
    "description": "High-speed mental calculation shortcuts, algebraic sutras, and accuracy checking habits for students aged 10+ in Wakad, Pune.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://arnavabacusacademy-web.vercel.app/"
    },
    "educationalCredentialAwarded": "Vedic Mathematics Course Certificate",
    "audience": {
      "@type": "Audience",
      "audienceType": "Students aged 10+ years (Class 5 to 10)"
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
        "name": "Vedic Mathematics Program",
        "item": "https://arnavabacusacademy-web.vercel.app/programs/vedic-maths"
      }
    ]
  };

  return (
    <div id="program-vedic-maths-page" className="bg-[#FFFDF9] min-h-screen">
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
          <Link to="/" className="hover:text-vibrant-orange transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/programs" className="hover:text-vibrant-orange transition-colors">Programs</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-vibrant-dark font-bold">Vedic Mathematics Program</span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="bg-vibrant-dark text-white py-14 md:py-20 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-vibrant-teal/15 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[10px] font-black text-vibrant-teal bg-[#E0FAF5]/15 border border-vibrant-teal/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                Academic Speed & Accuracy
              </span>
              <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
                Vedic Maths Classes in Wakad, Pune
              </h1>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                High-speed mental calculation shortcuts based on foundational Sutras. Helping middle and high school students save examination time, reduce messy rough-work scribbles, and verify answers with confidence.
              </p>

              {/* Quick Spec Pills */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-teal-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <Clock className="w-3.5 h-3.5" /> Target Age: 10+ Years (Class 5–10)
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-amber-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <Zap className="w-3.5 h-3.5" /> Speed Sutras & Checking Habits
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-sky-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <MapPin className="w-3.5 h-3.5" /> Wakad Center, Pune
                </span>
              </div>

              {/* Academy Location Snippet */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-vibrant-orange shrink-0 mt-0.5" />
                <span>
                  <strong>Classroom Location:</strong> Flat No. 3, 1st Floor, Advocate Balaji Sagar Bungalow, Opp. Creative Cameo, Near Park Street, behind WISDOM WORLD SCHOOL, Wakad, Pune.
                </span>
              </div>
            </div>

            {/* Hero LeadForm Embed */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-vibrant-dark">
              <div className="mb-4">
                <span className="text-[10px] font-black text-vibrant-teal bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Book A Trial Session
                </span>
                <h2 className="text-xl font-black text-vibrant-dark mt-2">
                  Complimentary Vedic Math Assessment
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Assess your child's calculation speed, rough-work habits, and exam confidence with Mentor Neha Patil.
                </p>
              </div>
              <LeadForm sourceCampaign="programs_vedic_maths_page" defaultProgram="Vedic Maths" />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Who is this program for? */}
      <section className="py-14 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-black text-vibrant-teal bg-[#E0FAF5] border border-vibrant-teal/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Learner Profile
          </span>
          <h2 className="font-display font-black text-3xl text-vibrant-dark">
            Who Can Benefit From Vedic Mathematics?
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            Tailored for students who already possess basic school arithmetic and seek speed, checking habits, and exam efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-vibrant-teal transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-black text-sm">
              Class 5–7
            </div>
            <h3 className="font-display font-black text-base text-vibrant-dark">Primary to Middle Transition</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Students encountering multi-digit multiplication, division, and fractions for the first time. Vedic shortcuts transform tedious multi-step grids into manageable mental routines.
            </p>
          </div>

          <div className="bg-white border-2 border-vibrant-teal/40 p-6 rounded-3xl space-y-3 shadow-md relative">
            <span className="absolute -top-3 right-4 bg-vibrant-teal text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Exam Advantage
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
              Class 8–10
            </div>
            <h3 className="font-display font-black text-base text-vibrant-dark">Board Exam Candidates</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Secondary students facing strict 2-hour or 3-hour examination deadlines. Vedic methods serve as a fast reverse-checking system without erasing or conflicting with standard board proof steps.
            </p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-vibrant-teal transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">
              Olympiad
            </div>
            <h3 className="font-display font-black text-base text-vibrant-dark">Competitive Exam Aspirants</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Students preparing for IPM, IMO, NTSE, and scholarship tests where mental computation speed directly influences test completion rates and overall accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* 4. What the Child Learns & How AAA Teaches */}
      <section className="py-14 md:py-18 bg-vibrant-cream border-y-4 border-vibrant-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-[10px] font-black text-vibrant-teal bg-[#E0FAF5] border border-vibrant-teal/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                Pedagogical Framework
              </span>
              <h2 className="font-display font-black text-3xl text-vibrant-dark leading-tight">
                Vedic Arithmetic As A School Checking Engine
              </h2>
              <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
                Vedic Maths at AAA is not taught as an alternative to school steps. Instead, it serves as a powerful "speed catalyst" and self-verification habit that prevents careless calculation errors during written exams.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">The 16 Foundational Sutras</strong>
                    <span className="text-xs text-slate-600 font-medium">Word formulas (such as <em>Urdhva Tiryagbhyam</em> and <em>Nikhilam</em>) enabling mental cross-multiplication in a single line.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">Beejank (Digit-Sum) Reverse Checks</strong>
                    <span className="text-xs text-slate-600 font-medium">Single-digit root checking techniques allow students to verify complex calculations in seconds without reworking the entire problem.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">Minimizing Margin Scribbles & Calculation Slips</strong>
                    <span className="text-xs text-slate-600 font-medium">Organized mental calculation keeps exam margins tidy and prevents transcription errors common in stressful timed exams.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">Step-Mark Integrity for Board Papers</strong>
                    <span className="text-xs text-slate-600 font-medium">Students learn to write complete CBSE/ICSE required steps while using Vedic methods internally to calculate and verify results immediately.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Curriculum Modules */}
            <div className="bg-white border-4 border-vibrant-dark p-6 md:p-8 rounded-[32px] shadow-[8px_8px_0_0_#1A2E35] space-y-4">
              <h3 className="font-display font-black text-lg text-vibrant-dark flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-vibrant-teal" />
                Vedic Maths Curriculum Modules
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Structured modules progressing from foundational arithmetic shortcuts to algebraic factoring.
              </p>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">Module 1: High-Speed Multiplication</span>
                  <span className="text-slate-500 font-medium">Base 10, 100, 1000 & Crosswise Multiplication</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">Module 2: Rapid Division & Decimals</span>
                  <span className="text-slate-500 font-medium">Straight Division (Paravartya Yojayet)</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">Module 3: Squares, Cubes & Roots</span>
                  <span className="text-slate-500 font-medium">Square roots & cube roots of perfect numbers</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">Module 4: Algebraic Shortcuts</span>
                  <span className="text-slate-500 font-medium">Linear & quadratic equation quick-factoring</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">Module 5: Beejank & Divisibility</span>
                  <span className="text-slate-500 font-medium">Automatic verification and digit-sum checks</span>
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-2xl p-3.5 text-[11px] text-teal-900 font-semibold">
                💡 Taught under the guidance of IIVA-certified educators with direct focus on school syllabus synergy.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Defensible Learning Outcomes */}
      <section className="py-14 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-black text-vibrant-teal bg-[#E0FAF5] border border-vibrant-teal/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Expected Outcomes
          </span>
          <h2 className="font-display font-black text-3xl text-vibrant-dark">
            What Outcomes Can Parents Reasonably Expect?
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            Realistic habits developed through regular practice and active problem-solving drills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">⚡</span>
            <h4 className="font-bold text-sm text-vibrant-dark">Faster Exam Checks</h4>
            <p className="text-xs text-slate-600 font-medium">Students save valuable minutes by completing routine calculations mentally rather than writing full grids.</p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">🎯</span>
            <h4 className="font-bold text-sm text-vibrant-dark">Self-Verification Habits</h4>
            <p className="text-xs text-slate-600 font-medium">Beejank checks provide students with independent habits to verify answers before turning in exam sheets.</p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">📝</span>
            <h4 className="font-bold text-sm text-vibrant-dark">Cleaner Rough Work</h4>
            <p className="text-xs text-slate-600 font-medium">Minimizing sprawling margin scribbles prevents careless transcription and misread digit errors.</p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">🧘</span>
            <h4 className="font-bold text-sm text-vibrant-dark">Exam Composure</h4>
            <p className="text-xs text-slate-600 font-medium">Knowing how to handle heavy multi-digit calculations relieves time pressure and test day anxiety.</p>
          </div>
        </div>
      </section>

      {/* 6. Parent Questions / FAQ */}
      <section className="py-14 md:py-18 bg-slate-50 border-t-2 border-slate-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black text-vibrant-teal bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Frequently Asked Questions
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl text-vibrant-dark">
              Common Parent Questions on Vedic Maths
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-vibrant-teal shrink-0" />
                Will school teachers deduct marks for using Vedic shortcuts?
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                No. In subjective school exams (CBSE/ICSE), students write out all standard curriculum steps for full method marks. They use Vedic Maths to calculate answers rapidly and verify their accuracy, saving time and preventing calculation errors.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-vibrant-teal shrink-0" />
                What is the difference between Abacus and Vedic Maths?
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                Abacus uses a physical tactile instrument for younger children (ages 4–14) to develop spatial visualization and number sense. Vedic Maths uses mental Sutras for students aged 10+ to solve mental arithmetic, squares, and algebraic equations without physical tools. For an in-depth breakdown, read our <Link to="/parent-guides/abacus-vs-vedic-maths" className="text-vibrant-teal font-bold hover:underline">detailed Abacus vs Vedic Maths guide</Link>.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-vibrant-teal shrink-0" />
                Does my child need prior Abacus training to learn Vedic Maths?
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                Not at all. Vedic Maths is an independent system. Any student in Class 5 or above with a basic understanding of primary school arithmetic and times tables can learn Vedic techniques smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Verified Trust & Location Context */}
      <section className="py-14 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-white border-4 border-vibrant-dark rounded-[32px] p-6 md:p-10 shadow-[8px_8px_0_0_#1A2E35] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[10px] font-black text-vibrant-teal bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Wakad Classroom Academy
            </span>
            <h3 className="font-display font-black text-2xl text-vibrant-dark">
              Certified Mentorship with Neha Patil & Nitin Sir
            </h3>
            <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
              Arnav Abacus Academy provides structured offline and online micro-batches guided directly by certified faculty. Our center is conveniently located near Park Street, behind Wisdom World School in Wakad, Pune.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-vibrant-teal" /> IIVA Certified Training
              </span>
              <span className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-amber-600" /> Exam Time Management Focus
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> CBSE & ICSE Syllabus Synergy
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link
              to="/showcase"
              className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase px-5 py-3.5 rounded-2xl text-center shadow-md transition-all flex items-center justify-center gap-2"
            >
              View Student Results <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="bg-vibrant-cream hover:bg-white text-vibrant-dark border-2 border-vibrant-dark font-black text-xs uppercase px-5 py-3.5 rounded-2xl text-center shadow-sm transition-all"
            >
              Visit Wakad Center
            </Link>
          </div>

        </div>
      </section>

      {/* 8. Related Programs Navigation */}
      <section className="py-12 bg-slate-100/60 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-6">
          <h3 className="font-display font-black text-lg text-vibrant-dark">
            Explore Other Academy Learning Tracks
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold">
            <Link
              to="/programs/abacus"
              className="bg-white border-2 border-slate-200 hover:border-vibrant-orange px-5 py-3 rounded-2xl text-vibrant-dark transition-all flex items-center gap-2 shadow-xs"
            >
              <span>Abacus Learning Program (Ages 4–14)</span>
              <ArrowRight className="w-3.5 h-3.5 text-vibrant-orange" />
            </Link>
            <Link
              to="/programs/school-maths"
              className="bg-white border-2 border-slate-200 hover:border-vibrant-orange px-5 py-3 rounded-2xl text-vibrant-dark transition-all flex items-center gap-2 shadow-xs"
            >
              <span>School Maths & Olympiad Prep (Class 1–10)</span>
              <ArrowRight className="w-3.5 h-3.5 text-vibrant-orange" />
            </Link>
            <Link
              to="/programs"
              className="bg-slate-800 text-white hover:bg-slate-900 px-5 py-3 rounded-2xl transition-all flex items-center gap-2 shadow-xs"
            >
              <span>All Programs Overview</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
