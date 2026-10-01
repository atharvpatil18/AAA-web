/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  HelpCircle, 
  ChevronRight, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Brain, 
  Compass, 
  Target,
  ShieldCheck,
  Scale
} from "lucide-react";
import { trackPageView } from "../lib/analytics";

export default function GuideAbacusVsVedicMaths() {
  useEffect(() => {
    trackPageView("/parent-guides/abacus-vs-vedic-maths", "Abacus vs Vedic Maths: What's the Difference? | Arnav Abacus Academy");
  }, []);

  // Article and BreadcrumbList Structured Data (No fabricated ratings/dates/courses)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Abacus vs Vedic Maths: What's the Difference? A Guide for Parents",
    "description": "An objective educational comparison of Abacus Maths and Vedic Maths, outlining learning stages, pedagogical differences, and suitability for children.",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://arnavabacusacademy-web.vercel.app/"
    },
    "mainEntityOfPage": "https://arnavabacusacademy-web.vercel.app/parent-guides/abacus-vs-vedic-maths"
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
        "name": "Parent Guides",
        "item": "https://arnavabacusacademy-web.vercel.app/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Abacus vs Vedic Maths",
        "item": "https://arnavabacusacademy-web.vercel.app/parent-guides/abacus-vs-vedic-maths"
      }
    ]
  };

  const comparisonRows = [
    {
      aspect: "Typical AAA Age Positioning",
      abacus: "Ages 4 to 14 Years (Peak Foundation: 5 to 9 Years)",
      vedic: "Ages 10+ Years (Middle School, High School & Beyond)",
    },
    {
      aspect: "Main Learning Medium",
      abacus: "Physical Japanese 1:4 Soroban abacus transitioning to mental visualization",
      vedic: "Mental Sutras, algebraic formulas, and written numerical patterns",
    },
    {
      aspect: "Early Learning Emphasis",
      abacus: "Concrete bead tactile mechanics, bead place-value, single-digit fluency",
      vedic: "Number patterns, complementary bases (Base 10, 100), mental shortcuts",
    },
    {
      aspect: "Mental Calculation Development",
      abacus: "Visual bead manipulation in the mind's eye (Anzan method)",
      vedic: "Step-saving mental Sutras, cross-multiplication, and modular algebra",
    },
    {
      aspect: "Role of Spatial Visualization",
      abacus: "Central — internalizing spatial bead coordinates and positions",
      vedic: "Secondary — emphasis is on algebraic symmetry, patterns, and logic",
    },
    {
      aspect: "Calculation Strategies",
      abacus: "Bead complements (Big Friends, Small Friends) & direct mechanical movement",
      vedic: "Word-formula Sutras (e.g., Vertically & Crosswise, By One More)",
    },
    {
      aspect: "Checking & Verification",
      abacus: "Visual calculation rhythm & auditory dictation drill checks",
      vedic: "Beejank (digit-sum checking) for rapid reverse proof verification",
    },
    {
      aspect: "Typical Learning Stage",
      abacus: "Preschool, Kindergarten, and Primary School foundations",
      vedic: "Late Primary, Middle School, Board exam, and competitive prep",
    },
  ];

  return (
    <div id="guide-abacus-vs-vedic-page" className="bg-[#FFFDF9] min-h-screen">
      {/* Article & Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-slate-100/80 border-b border-slate-200 py-2.5 px-4 md:px-8 text-xs font-semibold text-slate-600">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-vibrant-orange transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/programs" className="hover:text-vibrant-orange transition-colors">Programs</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-vibrant-dark font-bold">Abacus vs Vedic Maths Guide</span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="bg-vibrant-dark text-white py-12 md:py-16 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Scale className="w-3 h-3" /> Objective Parent Learning Guide
            </span>
          </div>
          
          <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
            Abacus vs Vedic Maths: What's the Difference?
          </h1>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            A balanced comparison of two distinct calculation methodologies: their pedagogical foundations, developmental stages, and how parents can determine the right learning experience for their child.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-amber-300">
              Reading Time: 5 mins
            </span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-teal-300">
              Academic Stage: Ages 4 to 15+
            </span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-slate-300">
              Published by Arnav Abacus Academy
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Article Container */}
      <article className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-14 space-y-12">

        {/* 3. Short Answer: Abacus vs Vedic Maths */}
        <section className="bg-amber-50/70 border-2 border-amber-200 rounded-3xl p-6 md:p-8 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-amber-900 font-display font-black text-base md:text-lg">
            <Sparkles className="w-5 h-5 text-vibrant-orange shrink-0" />
            <h2>The Short Answer: How Do They Differ?</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            <strong>Abacus Maths</strong> and <strong>Vedic Maths</strong> are complementary mental arithmetic systems designed for different developmental stages:
          </p>
          <ul className="text-xs md:text-sm text-slate-700 space-y-2 font-medium pl-4 list-disc">
            <li>
              <strong>Abacus Maths</strong> uses a physical counting tool (the Japanese Soroban) to help younger learners (ages 4–14) move from concrete tactile beads to internal visual memory.
            </li>
            <li>
              <strong>Vedic Maths</strong> uses mental Sutras (word-formula strategies) for older learners (ages 10+) who already understand basic arithmetic and want fast calculation shortcuts, algebraic factoring, and cross-checking methods.
            </li>
          </ul>
          <p className="text-xs text-slate-600 italic pt-1 border-t border-amber-200/60 font-semibold">
            Neither method is universally "better" or superior to the other. Suitability depends on your child's age, motor readiness, and educational goals.
          </p>
        </section>

        {/* 4. What is Abacus Maths? */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Brain className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              What is Abacus Maths?
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Abacus Maths is a structured calculation discipline centered around the <strong>Japanese Soroban</strong>—a rectangular wooden calculation frame equipped with upper and lower beads arranged on vertical rods.
          </p>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            The learning progression follows three foundational phases:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-orange bg-amber-50 px-2 py-0.5 rounded">Phase 1</span>
              <h3 className="font-bold text-xs text-vibrant-dark">Concrete Tactile Beads</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Children physically manipulate beads using thumb and index finger coordination, building fine motor skills and physical number sense.
              </p>
            </div>
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-teal bg-teal-50 px-2 py-0.5 rounded">Phase 2</span>
              <h3 className="font-bold text-xs text-vibrant-dark">Bead Visualization (Anzan)</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Anzan — the Japanese method of mental abacus visualization — is used within AAA's advanced training to imagine bead movements in the mind's eye without touching the frame.
              </p>
            </div>
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Phase 3</span>
              <h3 className="font-bold text-xs text-vibrant-dark">Subconscious Fluency</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Internalized bead configurations allow children to compute multi-digit additions, subtractions, and multiplications with focus and rhythm.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            <strong>AAA Positioning:</strong> Arnav Abacus Academy welcomes children aged <strong>4 to 14 Years</strong> for Abacus training, highlighting the <strong>Peak Foundation Window between 5 and 9 Years</strong> when spatial visualization is especially receptive. Abacus remains fully open and effective for older children (up to age 14) seeking mental focus and calculation stamina; it is not restricted strictly to younger learners.
          </p>
        </section>

        {/* 5. What is Vedic Maths? */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Compass className="w-6 h-6 text-vibrant-teal shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              What is Vedic Maths?
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Vedic Mathematics is an ancient Indian mathematical calculation system codified from historical texts into <strong>16 Sutras</strong> (word-formulas) and 13 Sub-Sutras. Unlike abacus, it does not use a physical counting frame.
          </p>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Instead, Vedic Maths teaches students to identify arithmetic symmetries and apply systematic calculation strategies:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-teal bg-teal-50 px-2 py-0.5 rounded">Strategy 1</span>
              <h3 className="font-bold text-xs text-vibrant-dark">Base Complements</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Formulas like <em>Nikhilam</em> ("All from 9 and last from 10") allow rapid multiplication of numbers situated near powers of 10 (10, 100, 1,000).
              </p>
            </div>
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-orange bg-amber-50 px-2 py-0.5 rounded">Strategy 2</span>
              <h3 className="font-bold text-xs text-vibrant-dark">Cross-Multiplication</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                The <em>Urdhva Tiryagbhyam</em> ("Vertically and crosswise") Sutra computes multi-digit multiplication in a single horizontal written line.
              </p>
            </div>
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Strategy 3</span>
              <h3 className="font-bold text-xs text-vibrant-dark">Beejank Verification</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Digit-sum roots provide students with an independent technique to verify large answers in seconds without redoing entire calculations.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            <strong>AAA Positioning:</strong> Arnav Abacus Academy currently introduces Vedic Maths for learners aged <strong>10+ Years</strong> (typically Class 5 through 10), who already have firm mastery of school times tables and multi-digit operations.
          </p>
        </section>

        {/* 6. Comparison Table */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Scale className="w-6 h-6 text-amber-600 shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              Side-by-Side Comparison: Abacus vs Vedic Maths
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-600 font-medium">
            This comparison outlines the structural, pedagogical, and developmental differences between both disciplines:
          </p>

          <div className="overflow-x-auto border-2 border-slate-200 rounded-3xl shadow-xs bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th scope="col" className="p-3.5 md:p-4 font-black text-slate-200 w-1/3 border-r border-slate-800">Aspect</th>
                  <th scope="col" className="p-3.5 md:p-4 font-black text-amber-300 w-1/3 border-r border-slate-800">Abacus Maths</th>
                  <th scope="col" className="p-3.5 md:p-4 font-black text-teal-300 w-1/3">Vedic Maths</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {comparisonRows.map((row, idx) => (
                  <tr key={row.aspect} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                    <th scope="row" className="p-3.5 md:p-4 font-bold text-vibrant-dark border-r border-slate-100 text-left">
                      {row.aspect}
                    </th>
                    <td className="p-3.5 md:p-4 border-r border-slate-100 leading-relaxed">
                      {row.abacus}
                    </td>
                    <td className="p-3.5 md:p-4 leading-relaxed">
                      {row.vedic}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. Key Differences in Detail */}
        <section className="space-y-4">
          <h2 className="font-display font-black text-xl md:text-2xl text-vibrant-dark">
            Three Core Differences Parents Should Understand
          </h2>
          <div className="space-y-4">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xs">1</span>
                Tactile Instrument vs. Pattern Formulas
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Abacus is physically grounded. Children touch, flick, and align beads on rods before shifting to internal visualization. Vedic Maths, by contrast, operates immediately on numbers on paper or in thought, identifying mathematical properties (like distance from 100 or digit-sums) without any physical tool.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-black text-xs">2</span>
                Visual Memory vs. Algebraic Strategies
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Abacus develops internal spatial imagery through Anzan visualization. The child "sees" beads move. Vedic Maths develops structural logic and algebraic agility—teaching shortcuts that reduce multi-line calculations into one or two swift mental operations.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs">3</span>
                Foundational Number Sense vs. Arithmetic Efficiency
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Abacus establishes an instinctive relationship with numbers for early learners, helping them develop internal visualization beyond physical fingers. In Vedic Maths, practice in selected calculation strategies may help older learners approach appropriate multi-digit arithmetic problems more efficiently as they develop fluency.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Learning-Stage Comparison */}
        <section className="space-y-4">
          <h2 className="font-display font-black text-xl md:text-2xl text-vibrant-dark">
            Learning-Stage Suitability: Which Is Right For Your Child?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-amber-300 p-6 rounded-3xl space-y-3 shadow-xs">
              <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                Ages 4 to 9 (Early Years)
              </span>
              <h3 className="font-bold text-base text-vibrant-dark">Explore Abacus First</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                If your child is in Kindergarten, Class 1, or Class 2:
              </p>
              <ul className="text-xs text-slate-600 space-y-2 font-medium list-disc pl-4">
                <li>They still count on fingers or hesitate with basic addition/subtraction.</li>
                <li>They need a screen-free tactile medium to visualize mathematical quantities.</li>
                <li>They benefit from developing early focus, listening habits, and auditory memory.</li>
              </ul>
              <div className="pt-2">
                <Link
                  to="/programs/abacus"
                  className="text-xs font-bold text-vibrant-orange hover:underline inline-flex items-center gap-1"
                >
                  Learn about AAA's Abacus Program <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="bg-white border-2 border-teal-300 p-6 rounded-3xl space-y-3 shadow-xs">
              <span className="text-[10px] font-black text-teal-800 bg-teal-100 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                Ages 10+ (Middle & High School)
              </span>
              <h3 className="font-bold text-base text-vibrant-dark">Explore Vedic Maths</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                If your child is in Class 5 or higher:
              </p>
              <ul className="text-xs text-slate-600 space-y-2 font-medium list-disc pl-4">
                <li>They already know primary tables but take too long on multi-digit calculations.</li>
                <li>They make transcription errors during rough work in school exams.</li>
                <li>They are preparing for competitive tests (IPM, Olympiads, NTSE) or board papers.</li>
              </ul>
              <div className="pt-2">
                <Link
                  to="/programs/vedic-maths"
                  className="text-xs font-bold text-vibrant-teal hover:underline inline-flex items-center gap-1"
                >
                  Learn about AAA's Vedic Maths Program <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Can They Complement Each Other? */}
        <section className="bg-slate-100/70 border-2 border-slate-200 rounded-3xl p-6 md:p-8 space-y-3">
          <div className="flex items-center gap-2 text-vibrant-dark font-display font-black text-lg">
            <Target className="w-5 h-5 text-vibrant-teal shrink-0" />
            <h2>How the Two Approaches Can Complement a Learner's Journey</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            The two programs are not mutually exclusive. A common, natural learning pathway observed by educators is:
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 text-xs font-bold text-slate-700">
            <div className="bg-white border border-slate-200 p-3 rounded-xl text-center w-full sm:w-auto flex-1">
              <span className="text-[10px] text-amber-700 uppercase block font-black">Foundation (Ages 5–9)</span>
              Abacus Soroban & Anzan Visualization
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 rotate-90 sm:rotate-0 shrink-0" />
            <div className="bg-white border border-slate-200 p-3 rounded-xl text-center w-full sm:w-auto flex-1">
              <span className="text-[10px] text-teal-700 uppercase block font-black">Middle School (Ages 10+)</span>
              Vedic Maths Sutras & Speed Strategies
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 rotate-90 sm:rotate-0 shrink-0" />
            <div className="bg-white border border-slate-200 p-3 rounded-xl text-center w-full sm:w-auto flex-1">
              <span className="text-[10px] text-slate-600 uppercase block font-black">Academic Excellence</span>
              School Board & Olympiad Synergy
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-medium pt-2">
            A child who masters bead visualization during early primary years enters middle school with strong spatial concentration. Learning Vedic shortcuts at age 10+ adds analytical cross-checking habits without interfering with their previous foundations.
          </p>
        </section>

        {/* 10. Questions Parents Commonly Ask (FAQs) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <HelpCircle className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              Frequently Asked Questions from Parents
            </h2>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                What is the difference between Abacus Maths and Vedic Maths?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Abacus uses a physical bead frame to train visual number memory in children aged 4 to 14. Vedic Maths uses mental Sutra formulas to calculate arithmetic and algebraic operations quickly for students aged 10 and above.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Can a child learn both Abacus and Vedic Maths?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Yes, but typically sequentially rather than simultaneously. Younger children benefit most from starting with Abacus. As they reach middle school (around age 10 or Class 5), they can smoothly introduce Vedic Maths techniques.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Is Abacus only for younger children?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                No. While the peak foundation window is between 5 and 9 years, children up to age 14 can and do learn Abacus effectively to strengthen mental arithmetic and focus. Transitioning to Vedic Maths at age 10 is not mandatory; rather, Vedic Maths becomes an additional available option for middle schoolers seeking algebraic shortcuts and verification methods.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                When does AAA introduce Vedic Maths?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                At Arnav Abacus Academy, Vedic Maths is offered to students aged 10+ (typically Class 5 through 10) who have an established understanding of basic school arithmetic.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Do Abacus or Vedic Maths replace school mathematics?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                No. Both are supplementary learning programs. In subjective CBSE and ICSE exams, children must write out step-by-step proofs for full method marks. Abacus and Vedic Maths help them calculate accurately and check results without replacing classroom curricula.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Which approach involves visual calculation?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Abacus is strongly visual. Through Anzan training, learners cultivate mental images of beads moving in space. Vedic Maths, while containing visual patterns (such as cross-multiplication lines), relies more heavily on numerical properties and logic.
              </p>
            </div>
          </div>
        </section>

        {/* 11. Relationship with School Mathematics & Disclaimers */}
        <section className="bg-slate-100/60 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-vibrant-dark font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Educational Clarity & Supplementary Scope</span>
          </div>
          <p className="leading-relaxed">
            Arnav Abacus Academy offers supplementary academic and skill programs. Neither Abacus nor Vedic Maths serves as an official replacement for standard school mathematics prescribed by educational boards (such as CBSE, ICSE, or State Boards). Our programs do not guarantee academic ranks or exam scores; learning outcomes depend on learner consistency, practice habits, and individual readiness.
          </p>
        </section>

        {/* 12. Related AAA Programs & Decision Support */}
        <section className="bg-white border-4 border-vibrant-dark rounded-[32px] p-6 md:p-8 shadow-[8px_8px_0_0_#1A2E35] space-y-5">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-vibrant-orange bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Wakad Classroom Guidance
            </span>
            <h2 className="font-display font-black text-2xl text-vibrant-dark">
              Still Unsure Which Program Fits Your Child?
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
              Every child has unique learning habits. Parents in Wakad and Pune are welcome to visit our center for a personal evaluation with Founder Neha Patil to assess counting readiness and curriculum alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <Link
              to="/programs/abacus"
              className="bg-slate-50 hover:bg-amber-50/60 border-2 border-slate-200 hover:border-vibrant-orange p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-vibrant-orange">
                Abacus Program
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                Ages 4 to 14 Years
              </span>
            </Link>

            <Link
              to="/programs/vedic-maths"
              className="bg-slate-50 hover:bg-teal-50/60 border-2 border-slate-200 hover:border-vibrant-teal p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-vibrant-teal">
                Vedic Maths Program
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                Ages 10+ Years
              </span>
            </Link>

            <Link
              to="/programs/school-maths"
              className="bg-slate-50 hover:bg-amber-50/60 border-2 border-slate-200 hover:border-amber-500 p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-amber-600">
                School Maths & Olympiad
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                Classes 1 to 10
              </span>
            </Link>
          </div>

          {/* Action CTA */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium">
              <strong>Center Location:</strong> Flat No. 3, 1st Floor, Advocate Balaji Sagar Bungalow, Opp. Creative Cameo, Near Park Street, behind WISDOM WORLD SCHOOL, Wakad, Pune.
            </div>
            <Link
              to="/contact"
              className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase px-5 py-3 rounded-xl transition-all shadow-md shrink-0 inline-flex items-center gap-2"
            >
              Schedule an Evaluation <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

      </article>
    </div>
  );
}
