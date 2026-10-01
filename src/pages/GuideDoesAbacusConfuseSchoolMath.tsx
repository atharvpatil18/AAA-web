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
  GraduationCap,
  MessageSquare
} from "lucide-react";
import { trackPageView } from "../lib/analytics";

export default function GuideDoesAbacusConfuseSchoolMath() {
  useEffect(() => {
    trackPageView(
      "/parent-guides/does-abacus-confuse-school-math", 
      "Does Abacus Confuse School Maths? A Parent Guide | Arnav Abacus Academy"
    );
  }, []);

  // Article and BreadcrumbList Structured Data (No fabricated ratings/dates/author credentials)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Does Abacus Confuse School Maths? An Educational Guide for Parents",
    "description": "An objective guide explaining the relationship between Abacus bead visualization and written school arithmetic, addressing common parent questions about calculation methods and school working steps.",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://arnavabacusacademy-web.vercel.app/"
    },
    "mainEntityOfPage": "https://arnavabacusacademy-web.vercel.app/parent-guides/does-abacus-confuse-school-math"
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
        "name": "Does Abacus Confuse School Maths?",
        "item": "https://arnavabacusacademy-web.vercel.app/parent-guides/does-abacus-confuse-school-math"
      }
    ]
  };

  return (
    <div id="guide-does-abacus-confuse-school-math-page" className="bg-[#FFFDF9] min-h-screen">
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
          <span className="text-vibrant-dark font-bold">Does Abacus Confuse School Maths?</span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="bg-vibrant-dark text-white py-12 md:py-16 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Lightbulb className="w-3 h-3" /> Educational Guidance for Parents
            </span>
          </div>
          
          <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
            Does Abacus Confuse School Maths?
          </h1>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            An open, evidence-grounded discussion on how bead visualization interacts with school written algorithms, why temporary calculation mixing can happen, and how parents can guide their child with clarity.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-amber-300">
              Reading Time: 6 mins
            </span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-teal-300">
              Primary School Focus: Class 1 to 5
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
            <h2>The Short Answer: Will It Confuse Your Child?</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Learning Abacus alongside school mathematics can involve using different calculation methods. Clear explanation and practice can help children understand when to use each method.
          </p>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            A helpful way to understand the two learning environments is:
          </p>
          <ul className="text-xs md:text-sm text-slate-700 space-y-2 font-medium pl-4 list-disc">
            <li>
              <strong>Abacus</strong> develops concrete tactile number sense and rapid internal visualization of quantities.
            </li>
            <li>
              <strong>School mathematics</strong> emphasizes standard written notation, linear equations, mathematical vocabulary, and step-by-step working.
            </li>
          </ul>
          <p className="text-xs text-slate-600 italic pt-1 border-t border-amber-200/60 font-semibold">
            When parents and educators treat both methods as complementary rather than conflicting, children can enjoy the calculation fluency of abacus while fulfilling the written requirements of school assignments.
          </p>
        </section>

        {/* 4. Educational Accuracy: Distinguishing the Three Concepts */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <GraduationCap className="w-6 h-6 text-vibrant-teal shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              Distinguishing Understanding, Method, and Assessment Requirements
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Much of what parents perceive as "confusion" stems from blurring three distinct aspects of early mathematical education:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-teal bg-teal-50 px-2 py-0.5 rounded">Concept 1</span>
              <h3 className="font-bold text-xs text-vibrant-dark">Mathematical Understanding</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Grasping what numbers actually represent: place value (tens and units), the meaning of addition as joining groups, and decomposition. Both school math and abacus share this identical conceptual foundation.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-orange bg-amber-50 px-2 py-0.5 rounded">Concept 2</span>
              <h3 className="font-bold text-xs text-vibrant-dark">Calculation Method</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                The specific tool or strategy used to arrive at a numerical result—such as physical beads, mental Anzan visualization, finger counting, or conventional column carryover.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-2 py-0.5 rounded">Concept 3</span>
              <h3 className="font-bold text-xs text-vibrant-dark">Assessment Requirements</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Some school assessments may expect students to show their working steps, depending on the question and the school's assessment expectations.
              </p>
            </div>
          </div>

          <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed font-medium">
            <strong>Key Insight for Parents:</strong> A child who solves an arithmetic sum mentally via abacus is using a valid mental strategy. However, some school assessments may expect students to show their working steps, depending on the question and the school's assessment expectations. Helping children practice writing out their working ensures they fulfill classroom expectations while keeping their mental fluency.
          </div>
        </section>

        {/* 5. What Children Learn Through Abacus vs School Math */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Brain className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              Comparing Pedagogical Approaches
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-slate-200 p-5 md:p-6 rounded-3xl space-y-3 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h3 className="font-display font-black text-base text-vibrant-dark">
                How Abacus Approaches Arithmetic
              </h3>
              <ul className="text-xs text-slate-600 space-y-2 font-medium list-disc pl-4 leading-relaxed">
                <li>
                  <strong>Left-to-Right Processing:</strong> On the Japanese Soroban, calculations often proceed from highest place value (tens/hundreds) to lowest (units), mirroring how quantities are naturally read.
                </li>
                <li>
                  <strong>Bead Complements:</strong> Arithmetic uses structured 5-complements (Small Friends) and 10-complements (Big Friends) to manipulate beads systematically.
                </li>
                <li>
                  <strong>Anzan Visualization:</strong> Over time, children internalize bead movements without physical instruments, conducting mental arithmetic through spatial memory.
                </li>
              </ul>
            </div>

            <div className="bg-white border-2 border-slate-200 p-5 md:p-6 rounded-3xl space-y-3 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="font-display font-black text-base text-vibrant-dark">
                How School Mathematics Approaches Arithmetic
              </h3>
              <ul className="text-xs text-slate-600 space-y-2 font-medium list-disc pl-4 leading-relaxed">
                <li>
                  <strong>Right-to-Left Column Addition:</strong> Standard classroom textbooks teach column addition starting strictly from the rightmost units column, carrying over tens above the next column.
                </li>
                <li>
                  <strong>Symbolic & Verbal Focus:</strong> Heavy emphasis on mathematical vocabulary ("regrouping", "borrowing", "sum", "difference") and word problems.
                </li>
                <li>
                  <strong>Standardized Written Working:</strong> Emphasis on uniform formatting so teachers can inspect intermediate calculation steps.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Practical Arithmetic Example: 28 + 17 = 45 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <BookOpen className="w-6 h-6 text-vibrant-teal shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              Practical Example: One Problem, Different Representations
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-600 font-medium">
            To see how different representations reach the same mathematical reality, consider the addition problem: <strong>28 + 17 = 45</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded">Representation A</span>
              <h3 className="font-bold text-xs text-vibrant-dark">Place-Value Reasoning</h3>
              <div className="text-[11px] text-slate-600 font-medium space-y-1">
                <p>Decomposing by tens and units:</p>
                <div className="bg-slate-50 p-2.5 rounded-lg font-mono text-[11px] text-slate-800 border border-slate-100">
                  28 = 20 + 8<br/>
                  17 = 10 + 7<br/>
                  (20 + 10) = 30<br/>
                  (8 + 7) = 15<br/>
                  30 + 15 = 45
                </div>
                <p className="text-[10px] text-slate-500 pt-1">Forms the mental conceptual foundation.</p>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-teal bg-teal-50 px-2 py-0.5 rounded">Representation B</span>
              <h3 className="font-bold text-xs text-vibrant-dark">Conventional School Column Working</h3>
              <div className="text-[11px] text-slate-600 font-medium space-y-1">
                <p>Standard right-to-left column algorithm:</p>
                <div className="bg-slate-50 p-2.5 rounded-lg font-mono text-[11px] text-slate-800 border border-slate-100">
                  &nbsp;&nbsp;[1] &nbsp;(carryover)<br/>
                  &nbsp;&nbsp;&nbsp;28<br/>
                  + &nbsp;17<br/>
                  -----<br/>
                  &nbsp;&nbsp;&nbsp;45
                </div>
                <p className="text-[10px] text-slate-500 pt-1">Units (8+7=15: write 5, carry 1); Tens (1+2+1=4).</p>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-orange bg-amber-50 px-2 py-0.5 rounded">Representation C</span>
              <h3 className="font-bold text-xs text-vibrant-dark">Abacus Bead Representation</h3>
              <div className="text-[11px] text-slate-600 font-medium space-y-1">
                <p>Spatial bead manipulation on Soroban:</p>
                <div className="bg-amber-50/50 p-2.5 rounded-lg text-[11px] text-slate-800 border border-amber-100 leading-relaxed font-sans">
                  On a Soroban, the learner represents the quantities using the bead values and follows the taught calculation procedure, manipulating upper (value 5) and lower beads (value 1) across the tens and units rods to arrive at <strong>45</strong>.
                </div>
                <p className="text-[10px] text-slate-500 pt-1">Visual and tactile confirmation of place value.</p>
              </div>
            </div>
          </div>

          <div className="bg-teal-50/60 border border-teal-200 rounded-2xl p-4 text-xs text-teal-950 font-medium leading-relaxed">
            💡 <strong>Observation:</strong> All three representations yield <strong>45</strong> because the underlying mathematics is identical. Once a child realizes that column carrying and bead complement manipulation are simply two different ways of representing the same regrouping, hesitation is reduced.
          </div>
        </section>

        {/* 7. Why Children May Experience Temporary Confusion */}
        <section className="space-y-4">
          <h2 className="font-display font-black text-xl md:text-2xl text-vibrant-dark">
            Why Some Children Experience Temporary Uncertainty
          </h2>
          <p className="text-xs md:text-sm text-slate-600 font-medium">
            When parents observe hesitation, it is usually not a sign that abacus is fundamentally incompatible with school, but rather one of these typical instructional considerations:
          </p>

          <div className="space-y-3">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1.5 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">
                1. Directional Discrepancy (Left-to-Right vs. Right-to-Left)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Children accustomed to calculating mentally from left to right on an abacus may occasionally attempt column addition in school from left to right, forgetting to leave room for carryover digits from the units place.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1.5 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">
                2. Rushing to Mental Calculation Before Solid Place-Value Foundations
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                If a child tries to do complex Anzan visualization before thoroughly understanding concrete place-value concepts, they may guess bead arrangements or feel overwhelmed when asked to explain their work.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1.5 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">
                3. Resistance to Writing Down Intermediate Working Steps
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Because abacus training fosters rapid calculation, children often feel impatient writing out multi-line steps, rough columns, or carryover markers required by their school teachers, leading to misunderstandings during school homework.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1.5 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">
                4. Vocabulary Differences Between Classroom and Training Center
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Schools frequently use terms like "borrowing", "regrouping", and "carrying", whereas abacus programs use terms like "Small Friends", "Big Friends", and "complements". Without parent or mentor bridge explanations, children can wonder why the terms differ.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Practical Steps for Parents */}
        <section className="bg-slate-100/70 border-2 border-slate-200 rounded-3xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark font-display font-black text-lg">
            <Target className="w-5 h-5 text-vibrant-orange shrink-0" />
            <h2>What Parents Can Do If Their Child Appears Hesitant</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Here are practical, constructive educational steps parents can take at home:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-700 pt-1">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">Ask the Child to Explain Both Methods</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Invite your child to demonstrate how they solve a sum using their beads and how they solve it on paper. Verbalizing both paths strengthens conceptual mastery.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">Support School Assignment Expectations</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Parents can encourage children to follow the working format expected in their school assignments. Frame abacus as their personal mental self-checker to verify answers after writing down school steps.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">Allow Time for Guided Practice</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Cognitive segmentation takes a few weeks of consistent practice. Be patient as your child's brain organizes tactile visualization and written algorithms into distinct mental toolkits.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">Avoid Comparing Children Solely on Speed</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Prioritize conceptual clarity and neatness over raw speed drills. A child who understands why a calculation works will retain confidence longer than one pressured to rush.
              </p>
            </div>
          </div>
        </section>

        {/* 9. How AAA Approaches This Question */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              How Arnav Abacus Academy Addresses Method Alignment
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            AAA encourages clear working, communication about learning difficulties, and connection between supplementary practice and school mathematics:
          </p>
          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 font-medium">
                <strong className="block text-vibrant-dark font-bold">Encouraging Written Working:</strong> Mentors explicitly instruct students that school assessments may expect written steps, and encourage children to use mental abacus calculation as a verification technique alongside their written work.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 font-medium">
                <strong className="block text-vibrant-dark font-bold">Open Communication:</strong> If parents notice their child experiencing temporary uncertainty between methods, mentors offer constructive guidance during center sessions to help connect both approaches.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 font-medium">
                <strong className="block text-vibrant-dark font-bold">Integrated School Maths Support:</strong> For students seeking broader curriculum practice, CBSE/ICSE word problem solving, or board exam alignment, AAA provides dedicated <Link to="/programs/school-maths" className="text-vibrant-orange font-bold hover:underline">School Maths coaching</Link> alongside foundation tracks.
              </div>
            </div>
          </div>
        </section>

        {/* 10. Parent FAQs */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <HelpCircle className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              Frequently Asked Questions on Abacus & School Maths
            </h2>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Can Abacus and school mathematics be learned together?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Yes. Children routinely manage different systems simultaneously (such as speaking two languages at home and school). When taught with clear context, abacus bead manipulation reinforces the place-value concepts taught in standard school textbooks.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Will my child forget conventional school addition methods?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                No. Because school assignments and daily classroom tests require pencil-and-paper column working, children receive regular practice in conventional written algorithms. Abacus strengthens the speed at which they perform internal single-digit calculations within those written steps.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Should children use Abacus methods in school examinations?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                In school exams, children should follow the specific formatting and written instructions set by their teacher (e.g. writing out column addition with carryover markers). They can use mental abacus visualization to calculate answers swiftly and check their final figures for accuracy.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Why can a child calculate mentally but struggle to show written steps?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Mental calculation relies on spatial imagery and working memory, whereas writing out proof steps requires fine motor endurance, understanding teacher grading rubrics, and formal mathematical notation. If a child resists writing steps, guided practice focusing on layout and presentation helps bridge the gap.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                What should parents do if their child mixes calculation methods?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Gently clarify which method is expected for the specific task at hand. Ask the child to solve the problem using school column steps first, and then encourage them to verify their answer using beads or mental visualization. If uncertainty persists, speak with their abacus mentor.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Does Abacus replace school mathematics?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                No. Abacus is a supplementary mental arithmetic and focus program. It does not cover geometry, measurement, fractions, data handling, or word problems, which are core parts of the school syllabus. It serves as an arithmetic foundation, not a complete replacement.
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
            Arnav Abacus Academy offers supplementary learning programs designed to build focus and arithmetic fluency. Our courses do not replace school curricula prescribed by educational authorities (CBSE, ICSE, State Boards). We do not promise guaranteed school grades or rank outcomes; academic development depends on ongoing practice, individual child readiness, and collaborative support between parents and educators.
          </p>
        </section>

        {/* 12. Related AAA Learning Tracks */}
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
              to="/parent-guides/abacus-vs-vedic-maths"
              className="bg-slate-50 hover:bg-teal-50/60 border-2 border-slate-200 hover:border-vibrant-teal p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-vibrant-teal">
                Abacus vs Vedic Maths Guide
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                Compare Learning Approaches
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
              Consult with Neha Ma'am <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

      </article>
    </div>
  );
}
