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
  Lightbulb, 
  Target,
  ShieldCheck,
  GraduationCap
} from "lucide-react";
import { trackPageView } from "../lib/analytics";

export default function GuideWhyChildrenUseFingerCounting() {
  useEffect(() => {
    trackPageView(
      "/parent-guides/why-children-use-finger-counting", 
      "Why Children Use Finger Counting & Mental Math Habits | AAA"
    );
  }, []);

  // Article and BreadcrumbList Structured Data (No fabricated ratings/dates/author credentials)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Why Children Use Finger Counting and How Mental Calculation Habits Develop",
    "description": "An educational guide for parents exploring why children use finger counting, how it supports early quantity representation, and how alternative mental strategies develop gradually without pressure.",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://arnavabacusacademy-web.vercel.app/"
    },
    "mainEntityOfPage": "https://arnavabacusacademy-web.vercel.app/parent-guides/why-children-use-finger-counting"
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
        "name": "Finger Counting & Mental Calculation",
        "item": "https://arnavabacusacademy-web.vercel.app/parent-guides/why-children-use-finger-counting"
      }
    ]
  };

  return (
    <div id="guide-why-children-use-finger-counting-page" className="bg-[#FFFDF9] min-h-screen">
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
          <span className="text-vibrant-dark font-bold">Finger Counting & Mental Calculation</span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="bg-vibrant-dark text-white py-12 md:py-16 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Lightbulb className="w-3 h-3" /> Child Number Sense Guidance
            </span>
          </div>
          
          <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
            Why Children Use Finger Counting and How Mental Calculation Habits Develop
          </h1>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            An educational guide for parents seeking to understand finger counting as a natural concrete foundation, how children transition toward mental arithmetic strategies, and how to encourage progress without stress.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-amber-300">
              Reading Time: 6 mins
            </span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-teal-300">
              Early Foundations: Ages 4 to 9
            </span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-slate-300">
              Published by Arnav Abacus Academy
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Article Container */}
      <article className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-14 space-y-12">

        {/* 3. Short Answer */}
        <section className="bg-amber-50/70 border-2 border-amber-200 rounded-3xl p-6 md:p-8 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-amber-900 font-display font-black text-base md:text-lg">
            <Sparkles className="w-5 h-5 text-vibrant-orange shrink-0" />
            <h2>The Short Answer: Is Finger Counting a Problem?</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Finger counting is a normal, useful concrete stage in early mathematical development. It provides young learners with an accessible, physical way to represent quantities and verify early addition and subtraction sums.
          </p>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            As children gain experience with number relationships, place value, and visual representations (such as ten-frames or structured abacus beads), they often begin adopting alternative mental strategies at their own pace. Strategy choice depends on the child's age, task familiarity, and conceptual understanding; not every child follows the identical developmental timeline.
          </p>
          <p className="text-xs text-slate-600 italic pt-1 border-t border-amber-200/60 font-semibold">
            Parents can support their child by exploring alternative calculation models patiently, avoiding pressure or rushing, and recognizing that concrete tools form the bedrock upon which mental fluency grows.
          </p>
        </section>

        {/* 4. Why Children Use Finger Counting */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Brain className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              Why Children Use Their Fingers When Calculating
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Numbers are abstract symbols. When young children first encounter mathematical problems such as "4 + 3", the symbols alone do not have physical weight or spatial dimension. Fingers serve as an immediate, concrete bridge:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-orange bg-amber-50 px-2 py-0.5 rounded">Tactile Anchor</span>
              <h3 className="font-bold text-xs text-vibrant-dark">Physical One-to-One Matching</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Tapping or lifting fingers helps young learners maintain one-to-one correspondence between spoken counting words and physical items without losing track.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-teal bg-teal-50 px-2 py-0.5 rounded">Working Memory Support</span>
              <h3 className="font-bold text-xs text-vibrant-dark">Offloading Mental Memory</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Holding numbers in mind while executing an operation is demanding for developing working memory. Fingers act as an external holding space for partial counts.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-2 py-0.5 rounded">Reassurance</span>
              <h3 className="font-bold text-xs text-vibrant-dark">Verification & Confidence</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                When encountering unfamiliar sums, children turn to their fingers to double-check their intuition before giving a verbal answer.
              </p>
            </div>
          </div>
        </section>

        {/* 5. The Continuum: Concrete to Visual to Mental */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <GraduationCap className="w-6 h-6 text-vibrant-teal shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              The Relationship Between Concrete, Visual, and Mental Strategies
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Mathematical fluency develops gradually rather than as an instant leap from memorizing facts to effortless mental recall. Educators often find it helpful to view early arithmetic along a continuum of interconnected representations:
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 text-xs font-bold text-slate-700">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center w-full sm:w-auto flex-1 shadow-xs">
              <span className="text-[10px] text-amber-700 uppercase block font-black">1. Concrete Manipulation</span>
              Physical objects, counters, fingers, or tactile abacus beads.
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 rotate-90 sm:rotate-0 shrink-0" />
            <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center w-full sm:w-auto flex-1 shadow-xs">
              <span className="text-[10px] text-teal-700 uppercase block font-black">2. Visual Representations</span>
              Dot patterns, ten-frames, number lines, or mental bead pictures.
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 rotate-90 sm:rotate-0 shrink-0" />
            <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center w-full sm:w-auto flex-1 shadow-xs">
              <span className="text-[10px] text-slate-600 uppercase block font-black">3. Mental Strategies</span>
              Decomposition, making tens, derived facts, and known relations.
            </div>
          </div>

          <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed font-medium">
            Finger counting is simply one of the earliest concrete manifestations on this continuum. As children gain experience with richer visual and structural models, fingers naturally become less necessary for basic single-digit sums.
          </div>
        </section>

        {/* 6. Practical Arithmetic Example: Approaches to 7 + 5 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <BookOpen className="w-6 h-6 text-amber-600 shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              Practical Example: Different Ways to Approach 7 + 5
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-600 font-medium">
            To see how strategies evolve, consider different ways a child might solve the addition problem: <strong>7 + 5 = 12</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded">Strategy A</span>
              <h3 className="font-bold text-xs text-vibrant-dark">Counting On</h3>
              <div className="text-[11px] text-slate-600 font-medium space-y-1">
                <p>Starting with 7 and counting forward 5 times:</p>
                <div className="bg-slate-50 p-2.5 rounded-lg font-mono text-[11px] text-slate-800 border border-slate-100">
                  "7... 8, 9, 10, 11, 12"
                </div>
                <p className="text-[10px] text-slate-500 pt-1">A step beyond counting from 1, often accompanied by lifting 5 fingers sequentially.</p>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-teal bg-teal-50 px-2 py-0.5 rounded">Strategy B</span>
              <h3 className="font-bold text-xs text-vibrant-dark">Making Ten (Decomposition)</h3>
              <div className="text-[11px] text-slate-600 font-medium space-y-1">
                <p>Partitioning 5 into (3 + 2) to complete 10:</p>
                <div className="bg-slate-50 p-2.5 rounded-lg font-mono text-[11px] text-slate-800 border border-slate-100">
                  7 + 3 + 2 = 12
                </div>
                <p className="text-[10px] text-slate-500 pt-1">Uses number bonds to 10 as an anchor, reducing reliance on counting one-by-one.</p>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-orange bg-amber-50 px-2 py-0.5 rounded">Strategy C</span>
              <h3 className="font-bold text-xs text-vibrant-dark">Structured Bead Representation</h3>
              <div className="text-[11px] text-slate-600 font-medium space-y-1">
                <p>Representing quantities with bead values:</p>
                <div className="bg-amber-50/50 p-2.5 rounded-lg text-[11px] text-slate-800 border border-amber-100 leading-relaxed font-sans">
                  On a Soroban, the learner represents quantities using bead values and follows the calculation procedure taught for that operation.
                </div>
                <p className="text-[10px] text-slate-500 pt-1">Replaces sequential finger counts with structured bead grouping.</p>
              </div>
            </div>
          </div>

          <div className="bg-teal-50/60 border border-teal-200 rounded-2xl p-4 text-xs text-teal-950 font-medium leading-relaxed">
            💡 <strong>Observation:</strong> Each strategy is mathematically correct. Children transition between these approaches as they become more comfortable recognizing that numbers can be partitioned flexibly.
          </div>
        </section>

        {/* 7. How Abacus Practice May Provide Another Way */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Target className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              How Abacus Practice Provides an Alternative Representation
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            For parents wondering how children develop internal mental alternatives to fingers, the Japanese Soroban abacus provides a structured bridge:
          </p>
          <ul className="text-xs md:text-sm text-slate-600 space-y-2.5 font-medium list-disc pl-5 leading-relaxed">
            <li>
              <strong>Structured 5-and-10 Groupings:</strong> While human hands provide 10 individual fingers, a Soroban uses bi-quinary grouping (an upper bead of value 5 and lower beads of value 1). This encourages children to view numbers in structured chunks rather than isolated units.
            </li>
            <li>
              <strong>Sensory-to-Visual Transition:</strong> Through systematic practice, physical bead movement transitions to Anzan—the Japanese method of mental abacus visualization—which is used within AAA's advanced training to imagine bead movements internally.
            </li>
            <li>
              <strong>Expanding Beyond 10:</strong> Fingers are naturally limited to 10 unless complex multi-digit finger systems are taught. An abacus easily represents hundreds and thousands across adjacent rods, offering a consistent mental framework.
            </li>
          </ul>
          <p className="text-xs text-slate-600 font-medium leading-relaxed pt-1">
            <strong>AAA Positioning:</strong> Arnav Abacus Academy welcomes children aged <strong>4 to 14 Years</strong>, with our <strong>Peak Foundation Window between 5 and 9 Years</strong>, when spatial visualization and tactile learning are especially receptive. Abacus practice is offered as a supplementary pathway for number fluency, not an automatic or overnight replacement for early counting habits.
          </p>
        </section>

        {/* 8. When Parents Can Encourage Alternative Strategies Patiently */}
        <section className="bg-slate-100/70 border-2 border-slate-200 rounded-3xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark font-display font-black text-lg">
            <Lightbulb className="w-5 h-5 text-vibrant-teal shrink-0" />
            <h2>When and How to Encourage New Strategies Without Pressure</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            If you notice your child continuing to count on fingers for sums they might otherwise solve mentally, consider these patient, constructive educational suggestions:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-700 pt-1">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">Ask How They Found the Answer</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Rather than saying "don't use your fingers", ask: "Can you tell me how you worked that out?" Verbalizing their calculation makes their current thinking visible.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">Introduce One Strategy at a Time</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Practice small steps—such as "counting on" from the larger number (e.g. starting at 8 and counting up 3) before introducing complex decomposition.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">Use Varied Visual Supports</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Incorporate physical counters, ten-frames, drawings, or an abacus frame so the child experiences different visual ways of grouping quantities.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">Avoid Shaming or Speed Comparisons</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Forcing hands into pockets or rushing calculation can provoke math hesitation. Focus on conceptual understanding and accuracy before speed.
              </p>
            </div>
          </div>
        </section>

        {/* 9. Parent FAQs */}
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
                At what age do children typically move beyond finger counting?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                There is no fixed universal cutoff age. Many children use fingers extensively in Kindergarten and Class 1, and gradually shift to mental strategies between ages 6 and 9 as their familiarity with number bonds and arithmetic patterns grows. Even older students or adults may occasionally use fingers when verifying complex steps.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Is finger counting a sign of a math learning difficulty?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                In itself, no. Finger counting is widely recognized by cognitive psychologists as an active, helpful stage of embodied numerical learning. It demonstrates that the child understands that symbols represent physical quantities. If a child continues to rely solely on counting from one on fingers into later primary grades without grasping grouping, discussing this with their teacher can help identify areas for guided support.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Does learning Abacus mean my child will never use their fingers?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Abacus training uses the thumb and index finger to physically move beads on the instrument. As children transition to Anzan (mental abacus), they may still move their fingers slightly in the air to simulate bead movements. This "finger simulation" is a visual-spatial memory aid, not traditional one-by-one counting.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                How does Abacus compare to other supplementary math approaches?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Abacus focuses specifically on concrete-to-visual bead representations for arithmetic fluency in children aged 4 to 14. For older learners (ages 10+), Vedic Maths provides algebraic and mental shortcut strategies. To understand how both methods fit different learning stages, read our guide on <Link to="/parent-guides/abacus-vs-vedic-maths" className="text-vibrant-orange font-bold hover:underline">Abacus vs Vedic Maths</Link>.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Will abacus training conflict with how my child learns arithmetic at school?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                When taught with clear context, the two systems complement each other. Abacus strengthens internal mental calculation, while schools teach formal written steps and mathematical vocabulary. For an in-depth exploration, see our parent guide on <Link to="/parent-guides/does-abacus-confuse-school-math" className="text-vibrant-orange font-bold hover:underline">whether abacus confuses school maths</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* 10. Educational Disclaimer */}
        <section className="bg-slate-100/60 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-vibrant-dark font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Educational Scope & Supplementary Notice</span>
          </div>
          <p className="leading-relaxed">
            Arnav Abacus Academy offers supplementary learning programs designed to build focus and arithmetic fluency. Our courses do not replace school curricula prescribed by educational authorities (CBSE, ICSE, State Boards). We do not promise guaranteed school grades or rank outcomes; academic development depends on ongoing practice, individual child readiness, and collaborative support between parents and educators.
          </p>
        </section>

        {/* 11. Related Programs & Navigation */}
        <section className="bg-white border-4 border-vibrant-dark rounded-[32px] p-6 md:p-8 shadow-[8px_8px_0_0_#1A2E35] space-y-5">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-vibrant-orange bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Explore Academy Programs
            </span>
            <h2 className="font-display font-black text-2xl text-vibrant-dark">
              Supporting Your Child's Mathematical Journey
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
              Explore our core learning programs in Wakad, Pune, tailored for different developmental stages and academic goals:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <Link
              to="/programs/abacus"
              className="bg-slate-50 hover:bg-amber-50/60 border-2 border-slate-200 hover:border-vibrant-orange p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-vibrant-orange">
                Abacus Learning Program
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                Ages 4 to 14 Years (Peak 5–9)
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
                Class 1 to 10 Syllabus Synergy
              </span>
            </Link>

            <Link
              to="/parent-guides/does-abacus-confuse-school-math"
              className="bg-slate-50 hover:bg-teal-50/60 border-2 border-slate-200 hover:border-vibrant-teal p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-vibrant-teal">
                School Math Harmony Guide
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                Addressing Method Differences
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
