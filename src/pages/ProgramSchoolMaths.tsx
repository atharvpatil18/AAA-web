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
  GraduationCap,
  Trophy
} from "lucide-react";
import LeadForm from "../components/LeadForm";
import { trackProgramView } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

export default function ProgramSchoolMaths() {
  const { t } = useLanguage();

  useEffect(() => {
    trackProgramView("School Maths", "canonical_program_hub");
  }, []);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "School Maths & Competitive Excellence Program",
    "description": "Comprehensive school mathematics support, CBSE/ICSE board curriculum clarity, and Olympiad/IPM competitive preparation in Wakad, Pune.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://arnavabacusacademy-web.vercel.app/"
    },
    "educationalCredentialAwarded": "School Math & Competitive Prep Certificate",
    "audience": {
      "@type": "Audience",
      "audienceType": "Students in Class 1 to 10"
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
        "name": "School Maths & Competitive Excellence",
        "item": "https://arnavabacusacademy-web.vercel.app/programs/school-maths"
      }
    ]
  };

  return (
    <div id="program-school-maths-page" className="bg-[#FFFDF9] min-h-screen">
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
          <span className="text-vibrant-dark font-bold">School Maths & Competitive Excellence</span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="bg-vibrant-dark text-white py-14 md:py-20 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-amber-500/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[10px] font-black text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                Curriculum Mastery & Competitive Edge
              </span>
              <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
                School Maths Coaching & Olympiad Prep in Wakad
              </h1>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                Comprehensive mathematics support aligned with CBSE, ICSE, and Maharashtra State Board standards. Building foundational clarity, word-problem comprehension, and competitive problem-solving readiness for IPM and Olympiad exams.
              </p>

              {/* Quick Spec Pills */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-amber-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <GraduationCap className="w-3.5 h-3.5" /> Target Grade: Class 1 to 10
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-emerald-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> CBSE, ICSE & State Board
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
                <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Book A Trial Session
                </span>
                <h2 className="text-xl font-black text-vibrant-dark mt-2">
                  Academic Math Consultation
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Review your child's syllabus needs, concept clarity, and competitive exam goals with our mentors.
                </p>
              </div>
              <LeadForm sourceCampaign="programs_school_maths_page" defaultProgram="School Math" />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Who is this program for? */}
      <section className="py-14 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Target Stages
          </span>
          <h2 className="font-display font-black text-3xl text-vibrant-dark">
            Who Can Benefit From Our School Math Coaching?
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            Serving students across primary, middle, and secondary school grades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-amber-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm">
              Class 1–4
            </div>
            <h3 className="font-display font-black text-base text-vibrant-dark">Primary Foundation Track</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Reinforcing fundamental number concepts, times tables, and word-problem visualization. Building confidence and reducing hesitation around mathematics while matching school textbook lessons.
            </p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-amber-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center font-black text-sm">
              Class 5–8
            </div>
            <h3 className="font-display font-black text-base text-vibrant-dark">Middle School Conceptual Core</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Bridging arithmetic with introductory algebra, fractions, geometry, and mensuration. Equipping students with step-by-step written proof habits required for full exam marks.
            </p>
          </div>

          <div className="bg-white border-2 border-amber-300 p-6 rounded-3xl space-y-3 shadow-md relative">
            <span className="absolute -top-3 right-4 bg-amber-600 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Competitive Focus
            </span>
            <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center font-black text-sm">
              Class 2–8
            </div>
            <h3 className="font-display font-black text-base text-vibrant-dark">IPM & Olympiad Preparation</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Specialized coaching for competitive benchmarks including IPM (Institute for Promotion of Mathematics) and National/International Mathematics Olympiads without school curriculum clash.
            </p>
          </div>
        </div>
      </section>

      {/* 4. What the Child Learns & How AAA Teaches */}
      <section className="py-14 md:py-18 bg-vibrant-cream border-y-4 border-vibrant-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-[10px] font-black text-vibrant-orange bg-[#FFF0E0] border border-[#FFD8B1] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                Curriculum Integration
              </span>
              <h2 className="font-display font-black text-3xl text-vibrant-dark leading-tight">
                Aligning School Syllabus With Logic Mastery
              </h2>
              <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
                Rather than treating math coaching as routine homework repetition, AAA trains students to understand mathematical relationships conceptually and express solutions cleanly.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">Board Curriculum Compliance</strong>
                    <span className="text-xs text-slate-600 font-medium">Strict alignment with CBSE, ICSE, and Maharashtra State Board syllabi ensures no conflicting notation or terminology.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">Word-Problem Deconstruction</strong>
                    <span className="text-xs text-slate-600 font-medium">Teaching children how to break complex multi-sentence questions into clear numerical equations systematically.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">Step-by-Step Proof Discipline</strong>
                    <span className="text-xs text-slate-600 font-medium">Writing out complete mathematical steps to secure full method marks in terminal and board examinations.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">Regular Progress Check-ins</strong>
                    <span className="text-xs text-slate-600 font-medium">Diagnostic assessments and periodic reviews with parents to ensure school report card improvement is steady.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Curriculum Highlights Box */}
            <div className="bg-white border-4 border-vibrant-dark p-6 md:p-8 rounded-[32px] shadow-[8px_8px_0_0_#1A2E35] space-y-4">
              <h3 className="font-display font-black text-lg text-vibrant-dark flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                School & Competitive Pillars
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Balancing day-to-day school board requirements with high-order logical thinking.
              </p>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">Concept Clarity Drills</span>
                  <span className="text-slate-500 font-medium">Fractions, Decimals, Ratios & Percentages</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">Algebraic Foundations</span>
                  <span className="text-slate-500 font-medium">Variables, Expressions & Simple Equations</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">Geometry & Mensuration</span>
                  <span className="text-slate-500 font-medium">Perimeter, Area, Angles & Spatial Proofs</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">IPM & Olympiad Prep</span>
                  <span className="text-slate-500 font-medium">Pattern Recognition, Logical Puzzles & Mock Tests</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">Vedic Speed Applications</span>
                  <span className="text-slate-500 font-medium">Rough-work verification and time-saving checks</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-[11px] text-amber-900 font-semibold">
                💡 Note: Arnav Abacus Academy provides independent academic coaching and preparation. We are not officially affiliated with or endorsed by examination boards or competition bodies.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Defensible Learning Outcomes */}
      <section className="py-14 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Expected Outcomes
          </span>
          <h2 className="font-display font-black text-3xl text-vibrant-dark">
            What Outcomes Can Parents Reasonably Expect?
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            Realistic academic progress fostered through structured practice and personalized attention.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">📖</span>
            <h4 className="font-bold text-sm text-vibrant-dark">Clear Conceptual Logic</h4>
            <p className="text-xs text-slate-600 font-medium">Students understand why formulas work rather than attempting to memorize patterns blindly.</p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">✍️</span>
            <h4 className="font-bold text-sm text-vibrant-dark">Step-Mark Discipline</h4>
            <p className="text-xs text-slate-600 font-medium">Writing out organized solutions prevents avoidable mark deductions on subjective exam sheets.</p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">🏆</span>
            <h4 className="font-bold text-sm text-vibrant-dark">Competitive Preparedness</h4>
            <p className="text-xs text-slate-600 font-medium">Familiarity with non-routine problem formats builds confidence for IPM and Olympiad competitions.</p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">😊</span>
            <h4 className="font-bold text-sm text-vibrant-dark">Reduced Homework Tears</h4>
            <p className="text-xs text-slate-600 font-medium">Independent comprehension relieves daily academic frustration and restores parental peace of mind.</p>
          </div>
        </div>
      </section>

      {/* 6. Parent Questions / FAQ */}
      <section className="py-14 md:py-18 bg-slate-50 border-t-2 border-slate-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Frequently Asked Questions
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl text-vibrant-dark">
              Common Parent Questions on School Maths
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                Does this coaching follow my child's specific school textbook?
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                Yes. Our teaching directly aligns with NCERT, CBSE, ICSE, and Maharashtra State Board curriculum standards, ensuring that classroom topics and homework assignments reinforce what is being taught at school.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                How are IPM and Olympiad preparations conducted?
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                In addition to standard textbook exercises, students practice diagnostic problem sheets featuring higher-order thinking skills, logical patterns, and mock timing drills designed specifically for competitive benchmarks.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                How do mental math shortcuts fit into school math?
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                Students write down all required curriculum proof steps for the teacher, while using mental shortcuts and Vedic checks internally to compute answers accurately and cross-verify solutions before submitting their paper. For guidance on why children make procedural calculation errors despite understanding concepts, see our parent guide on <Link to="/parent-guides/why-smart-children-make-silly-math-mistakes" className="text-amber-600 font-bold hover:underline">understanding calculation mistakes</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Verified Trust & Location Context */}
      <section className="py-14 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-white border-4 border-vibrant-dark rounded-[32px] p-6 md:p-10 shadow-[8px_8px_0_0_#1A2E35] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Dedicated Mentorship
            </span>
            <h3 className="font-display font-black text-2xl text-vibrant-dark">
              Supportive Wakad Classroom Environment
            </h3>
            <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
              Arnav Abacus Academy offers personalized academic coaching led by Founder Neha Patil and Nitin Sir. Located conveniently near Park Street, behind Wisdom World School in Wakad, Pune.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-vibrant-gold" /> Small Batch Coaching
              </span>
              <span className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-600" /> Competition & Olympiad Mentorship
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> CBSE & ICSE Board Synergy
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link
              to="/mentor"
              className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase px-5 py-3.5 rounded-2xl text-center shadow-md transition-all flex items-center justify-center gap-2"
            >
              Meet Mentor Neha Patil <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="bg-vibrant-cream hover:bg-white text-vibrant-dark border-2 border-vibrant-dark font-black text-xs uppercase px-5 py-3.5 rounded-2xl text-center shadow-sm transition-all"
            >
              Contact Wakad Center
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
              to="/programs/vedic-maths"
              className="bg-white border-2 border-slate-200 hover:border-vibrant-orange px-5 py-3 rounded-2xl text-vibrant-dark transition-all flex items-center gap-2 shadow-xs"
            >
              <span>Vedic Mathematics (Ages 10+)</span>
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
