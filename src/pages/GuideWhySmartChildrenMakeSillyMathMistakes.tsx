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
  AlertTriangle,
  ClipboardList,
  GraduationCap
} from "lucide-react";
import { trackPageView } from "../lib/analytics";

export default function GuideWhySmartChildrenMakeSillyMathMistakes() {
  useEffect(() => {
    trackPageView(
      "/parent-guides/why-smart-children-make-silly-math-mistakes", 
      "Why Children Make Calculation Mistakes | Arnav Abacus Academy"
    );
  }, []);

  // Article and BreadcrumbList Structured Data (strictly verified, zero PII, zero fabricated metrics)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Why Children Make Calculation Mistakes Even When They Understand the Concept",
    "description": "An educational guide for parents exploring why children make arithmetic errors despite understanding mathematical concepts, common points of procedural difficulty, and practical review routines.",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://arnavabacusacademy-web.vercel.app/"
    },
    "mainEntityOfPage": "https://arnavabacusacademy-web.vercel.app/parent-guides/why-smart-children-make-silly-math-mistakes"
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
        "name": "Understanding Calculation Mistakes",
        "item": "https://arnavabacusacademy-web.vercel.app/parent-guides/why-smart-children-make-silly-math-mistakes"
      }
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Inject Article & BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-4xl mx-auto px-4 md:px-8 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link to="/" className="hover:text-vibrant-dark transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/blog" className="hover:text-vibrant-dark transition-colors">
            Parent Guides
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-bold truncate">
            Understanding Calculation Mistakes
          </span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="bg-vibrant-dark text-white py-12 md:py-16 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Lightbulb className="w-3 h-3" /> Arithmetic Fluency & Learning Habits
            </span>
          </div>
          
          <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
            Why Children Make Calculation Mistakes Even When They Understand the Concept
          </h1>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            An educational guide for parents exploring why conceptual grasp and calculation execution can diverge, how procedural load influences accuracy, and practical routines for identifying and addressing mistakes constructively.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-amber-300">
              Reading Time: 7 mins
            </span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-teal-300">
              Foundations: Ages 4 to 14
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
            <h2>The Short Answer: Why Understanding Doesn't Equal Flawless Execution</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            It is common for parents and teachers to observe a child who explains a mathematical concept with complete clarity during discussion, yet writes down an incorrect final calculation in written work. These are often labeled informally as "silly mistakes," but in educational practice, conceptual understanding and procedural execution are distinct skills that develop on different timelines.
          </p>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Solving an arithmetic problem requires coordinating multiple simultaneous demands: reading the operation sign, aligning columns, holding intermediate values in mind, performing sub-calculations, and recording figures legibly. When children are still building fluency, temporary procedural slips can happen even when their conceptual logic is entirely sound.
          </p>
          <p className="text-xs text-slate-600 italic pt-1 border-t border-amber-200/60 font-semibold">
            Viewing these errors as valuable clues to procedural load—rather than evidence of carelessness or lack of ability—allows parents to support children with patience, targeted practice, and effective self-checking routines.
          </p>
        </section>

        {/* 4. Understanding vs. Execution: Two Distinct Capacities */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Brain className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              Conceptual Understanding vs. Procedural Execution
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            In school mathematics, learning is sometimes viewed as a single uniform ability. However, educators observe that arithmetic mastery involves at least two complementary dimensions:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-teal bg-teal-50 px-2 py-0.5 rounded">Dimension 1</span>
              <h3 className="font-bold text-sm text-vibrant-dark">Conceptual Understanding</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Understanding <em>why</em> an operation works. A child with strong conceptual understanding knows that addition means combining quantities, multiplication is repeated equal grouping, and subtraction finds the difference between amounts.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Dimension 2</span>
              <h3 className="font-bold text-sm text-vibrant-dark">Procedural Execution & Fluency</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Executing the multi-step algorithm accurately and consistently. This involves visual attention, working memory for regrouping or carrying, spatial alignment of digits, and motor coordination during writing.
              </p>
            </div>
          </div>

          <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed font-medium">
            A child can have an advanced conceptual grasp of an operation while their procedural fluency is still maturing. Because calculation algorithms require sequential precision, a minor slip at step two alters the final answer even if steps one, three, and the overall mathematical approach were executed properly.
          </div>
        </section>

        {/* 5. Common Sources of Calculation Errors */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              Possible Sources of Calculation Errors
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Rather than attributing errors to vague traits like "carelessness," educational observation identifies specific points in the problem-solving workflow where slips can occur. These factors are possibilities to investigate, not diagnoses:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-700">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">1. Misreading Signs or Instructions</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Confusing a plus (+) for a multiplication (×) sign, or performing addition when the worksheet problem calls for subtraction, especially on mixed-operation pages.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">2. Regrouping & Place Value Slips</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Forgetting to add a carried ten to the next column, borrowing from a zero incorrectly, or misaligning units and tens digits vertically during multi-digit addition.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">3. Losing Intermediate Values</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                In multi-step arithmetic, a child may compute part of the answer correctly in their head, but replace or misremember that intermediate figure when computing the next step.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">4. Time Pressure & Rushing</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                When children feel hurried to complete a worksheet or match peers' speed, they may begin calculating before reading the entire problem carefully.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">5. Unfamiliar Procedures</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                When a method is newly introduced (such as long division or multi-digit column subtraction), the steps require deliberate conscious effort and are naturally more vulnerable to omission.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">6. Copying & Transcription Errors</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Transcribing a number from the question paper to rough paper incorrectly (e.g., writing 54 instead of 45), yielding a mathematically sound solution to the wrong starting numbers.
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-500 font-medium italic pt-1">
            Note: These factors do not explain every learner's experience. Individual children encounter different challenges at different stages of their mathematical education.
          </p>
        </section>

        {/* 6. Practical Verifiable Worked Examples */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <BookOpen className="w-6 h-6 text-teal-600 shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              Practical Examples: Identifying Where Errors Occur
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Examining concrete arithmetic problems helps illustrate how errors can be diagnosed constructively without assuming the child lacks understanding.
          </p>

          {/* Example 1: 28 + 17 = 45 */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-orange bg-amber-50 px-2 py-0.5 rounded">Example 1</span>
                <h3 className="font-bold text-sm text-vibrant-dark mt-1">Multi-Digit Addition: 28 + 17 = 45</h3>
              </div>
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                Correct: 45
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 font-black uppercase block">Observed Answer</span>
                <div className="font-mono text-base font-black text-rose-600">35</div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  The learner wrote 35 as the final sum.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 font-black uppercase block">Possible Point of Error</span>
                <div className="font-bold text-xs text-vibrant-dark">Unrecorded Carried Ten</div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  One possible explanation is that the carried ten was not included. The child may have calculated 8 + 7 = 15 correctly and written 5, but then calculated only 2 + 1 = 3 in the tens column without adding the regrouped 1. Ask the child to explain their steps before deciding what happened.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 font-black uppercase block">Constructive Discussion</span>
                <div className="font-bold text-xs text-vibrant-teal">Verification Question</div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  "Can you show me how you added the units column? Where does the 1 from 15 go when we move to the tens?"
                </p>
              </div>
            </div>
          </div>

          {/* Example 2: 52 - 18 = 34 */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-teal bg-teal-50 px-2 py-0.5 rounded">Example 2</span>
                <h3 className="font-bold text-sm text-vibrant-dark mt-1">Regrouping in Subtraction: 52 - 18 = 34</h3>
              </div>
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                Correct: 34
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 font-black uppercase block">Observed Answer</span>
                <div className="font-mono text-base font-black text-rose-600">46</div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  The learner wrote 46 as the difference.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 font-black uppercase block">Possible Point of Error</span>
                <div className="font-bold text-xs text-vibrant-dark">Subtracting Smaller from Larger</div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  One possible explanation is that the child subtracted the smaller digit from the larger digit independently in each column: calculating 8 − 2 = 6 in the units and 5 − 1 = 4 in the tens, without regrouping. Always check the child's actual working and verbal explanation before concluding this was their reasoning.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 font-black uppercase block">Correct Regrouping & Inquiry</span>
                <div className="font-bold text-xs text-vibrant-teal">Mathematical Procedure</div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  In standard subtraction, 2 units cannot subtract 8 units directly. Regrouping 1 ten from 5 tens leaves 4 tens and gives 12 units (52 = 40 + 12). Then, 12 − 8 = 4 units, and 4 tens − 1 ten = 3 tens, yielding 34. Discuss: "Can we take 8 from 2 directly?"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Practical Parent & Teacher Review Routine */}
        <section className="bg-slate-100/70 border-2 border-slate-200 rounded-3xl p-6 md:p-8 space-y-5">
          <div className="flex items-center gap-2 text-vibrant-dark font-display font-black text-lg">
            <ClipboardList className="w-5 h-5 text-vibrant-teal shrink-0" />
            <h2>A 6-Step Parent Review Routine for Calculation Mistakes</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            When reviewing homework or practice sheets at home, following a consistent, emotionally neutral review routine encourages metacognition (thinking about one's thinking) rather than defensive reactions:
          </p>

          <ol className="text-xs md:text-sm text-slate-600 space-y-3 font-medium list-decimal pl-5 leading-relaxed">
            <li>
              <strong>Ask the child to explain their thinking aloud:</strong> Ask them to walk you through how they solved the problem step by step. Very often, children spot their own slip simply by verbalizing the steps.
            </li>
            <li>
              <strong>Pinpoint the exact step where the calculation diverged:</strong> Separate the question into smaller parts to see if the error was in reading the sign, carrying, or calculating a basic single-digit fact.
            </li>
            <li>
              <strong>Encourage the child to correct that specific step independently:</strong> Avoid writing the correct answer for them. Guiding them to recalculate only the affected step reinforces ownership.
            </li>
            <li>
              <strong>Encourage a realistic checking habit:</strong> Show them how to use reverse operations (e.g., checking 45 - 17 = 28 to confirm 28 + 17 = 45) or estimation (e.g., 28 is near 30, 17 is near 20, so the answer should be near 50).
            </li>
            <li>
              <strong>Track recurring patterns neutrally without labels:</strong> If you notice repeated carrying slips across several days, note the pattern as a procedural skill to revisit, avoiding labels like "careless" or "unfocused."
            </li>
            <li>
              <strong>Share recurring or unclear observations with the school teacher:</strong> If an error pattern persists despite practice, discussing it collaboratively with the child's teacher helps align home and classroom guidance.
            </li>
          </ol>
        </section>

        {/* 8. Error Review Template (Zero PII, Classroom/Home Printable Format) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              Simple Home & Classroom Error-Review Template
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Parents and educators can maintain a simple paper error log during practice sessions to turn recurring errors into clear learning objectives:
          </p>

          <div className="overflow-x-auto bg-white border-2 border-slate-200 rounded-2xl shadow-xs">
            <table className="w-full text-left border-collapse text-xs font-medium">
              <thead>
                <tr className="bg-slate-100 text-vibrant-dark border-b border-slate-200">
                  <th className="p-3.5 font-bold">Question / Skill</th>
                  <th className="p-3.5 font-bold">Error Observed</th>
                  <th className="p-3.5 font-bold">Likely Point of Difficulty</th>
                  <th className="p-3.5 font-bold">Child's Explanation</th>
                  <th className="p-3.5 font-bold">Next Practice Action</th>
                  <th className="p-3.5 font-bold">Review Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600 text-[11px]">
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-mono">28 + 17</td>
                  <td className="p-3.5 font-mono text-rose-600">35</td>
                  <td className="p-3.5">Carried ten omitted in tens column</td>
                  <td className="p-3.5 italic">"I remembered 15 but forgot to write the small 1 on top"</td>
                  <td className="p-3.5">Use colored pencil to record carry digits for 5 problems</td>
                  <td className="p-3.5 text-slate-500">Practice Log</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-mono">52 - 18</td>
                  <td className="p-3.5 font-mono text-rose-600">46</td>
                  <td className="p-3.5">Subtracted smaller from larger units</td>
                  <td className="p-3.5 italic">"I subtracted 8 minus 2 because 2 minus 8 was too small"</td>
                  <td className="p-3.5">Review regrouping concrete model with base-ten blocks</td>
                  <td className="p-3.5 text-slate-500">Practice Log</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-mono">6 × 7</td>
                  <td className="p-3.5 font-mono text-rose-600">48</td>
                  <td className="p-3.5">Recalled adjacent multiplication fact (6 × 8)</td>
                  <td className="p-3.5 italic">"I got confused between 42 and 48"</td>
                  <td className="p-3.5">Build 6 × 7 as (6 × 5) + (6 × 2) = 30 + 12 = 42</td>
                  <td className="p-3.5 text-slate-500">Practice Log</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            This template is intended for offline parent or teacher reference. Arnav Abacus Academy does not collect or transmit student practice logs or assessment records.
          </p>
        </section>

        {/* 9. Responsible Positioning of Supplementary Programs */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Target className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              How Supplementary Learning Can Support Arithmetic Accuracy
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            When parents ask how structured practice programs relate to arithmetic accuracy, it helps to understand their specific pedagogical focus:
          </p>
          <ul className="text-xs md:text-sm text-slate-600 space-y-2.5 font-medium list-disc pl-5 leading-relaxed">
            <li>
              <strong>Structured Bead Mechanics (Abacus):</strong> For learners aged <strong>4 to 14 Years</strong> (with our <strong>Peak Foundation Window between 5 and 9 Years</strong>), Abacus provides concrete and visual bead representations. Working with physical beads requires systematic finger manipulation and explicit complement rules, which can help learners develop attentiveness to intermediate steps.
            </li>
            <li>
              <strong>Mental Verification Strategies (Vedic Maths):</strong> For older students aged <strong>10+</strong>, Vedic Maths introduces alternative calculation methods and verification checks (such as digit-sum checking methods), allowing learners to double-check multi-digit arithmetic through different pathways.
            </li>
            <li>
              <strong>Curriculum Synergy (School Maths Coaching):</strong> Regular board-aligned coaching reinforces standard column layouts, step-by-step written presentation, and mathematical vocabulary required in school examinations.
            </li>
          </ul>
          <p className="text-xs text-slate-600 font-medium leading-relaxed pt-1">
            <strong>Educational Clarity:</strong> Neither Abacus, Vedic Maths, nor any single training methodology guarantees zero errors or effortless examination success. Arithmetic accuracy improves gradually through consistent practice, supportive feedback, and developing personal checking habits.
          </p>
        </section>

        {/* 10. Frequently Asked Questions */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <HelpCircle className="w-6 h-6 text-vibrant-teal shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              Frequently Asked Questions from Parents
            </h2>
          </div>

          <div className="space-y-3">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Will making mistakes now prevent my child from succeeding in mathematics later?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Not necessarily. Mistakes are an essential part of mathematical learning. Recognizing why an error occurred and how to correct it builds stronger long-term problem-solving resilience than simply getting quick answers without reflection.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                How does finger counting relate to calculation slips?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Finger counting is a normal concrete representation stage. In complex sums, keeping track of sequential counts on fingers can add working memory load, which sometimes leads to counting slips. To explore why children use fingers and how mental strategies develop, visit our guide on <Link to="/parent-guides/why-children-use-finger-counting" className="text-vibrant-orange font-bold hover:underline">why children use finger counting</Link>.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Does learning Abacus conflict with school column arithmetic?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                When taught with clear context, Abacus and school mathematics complement each other. Abacus strengthens internal visual representation, while schools emphasize standard written column steps. For a detailed discussion, read our guide on <Link to="/parent-guides/does-abacus-confuse-school-math" className="text-vibrant-orange font-bold hover:underline">whether abacus confuses school maths</Link>.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                How should parents choose between Abacus and Vedic Maths for calculation support?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Abacus is designed for concrete-to-visual arithmetic development in younger children (ages 4–14, peak 5–9), whereas Vedic Maths is suited for older students (ages 10+) who already understand standard school operations. See our comparison guide on <Link to="/parent-guides/abacus-vs-vedic-maths" className="text-vibrant-orange font-bold hover:underline">Abacus vs Vedic Maths</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* 11. Educational Disclaimer */}
        <section className="bg-slate-100/60 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-vibrant-dark font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Educational Scope & Supplementary Notice</span>
          </div>
          <p className="leading-relaxed">
            Arnav Abacus Academy offers supplementary learning programs designed to build focus and arithmetic fluency. Our courses do not replace school curricula prescribed by educational authorities (CBSE, ICSE, State Boards). We do not promise guaranteed school grades, zero-error performance, or rank outcomes; academic development depends on ongoing practice, individual child readiness, and collaborative support between parents and educators.
          </p>
        </section>

        {/* 12. Related Programs & Navigation */}
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
