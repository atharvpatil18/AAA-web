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
  Calendar,
  Users,
  Clock,
  GraduationCap
} from "lucide-react";
import { trackPageView } from "../lib/analytics";

export default function GuideIdealAgeToStartAbacus() {
  useEffect(() => {
    trackPageView(
      "/parent-guides/ideal-age-to-start-abacus", 
      "What Is the Ideal Age to Start Abacus? A Parent's Guide | AAA"
    );
  }, []);

  // Article and BreadcrumbList Structured Data (strictly verified, zero PII, zero fabricated metrics)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What Is the Ideal Age to Start Abacus? A Parent's Guide",
    "description": "An objective guide for parents exploring starting ages for abacus learning, readiness considerations across ages 4 to 14, and how to evaluate suitability without pressure.",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://arnavabacusacademy-web.vercel.app/"
    },
    "mainEntityOfPage": "https://arnavabacusacademy-web.vercel.app/parent-guides/ideal-age-to-start-abacus"
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
        "name": "Ideal Age to Start Abacus",
        "item": "https://arnavabacusacademy-web.vercel.app/parent-guides/ideal-age-to-start-abacus"
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
            Ideal Age to Start Abacus
          </span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="bg-vibrant-dark text-white py-12 md:py-16 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Lightbulb className="w-3 h-3" /> Child Learning Readiness Guide
            </span>
          </div>
          
          <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
            What Is the Ideal Age to Start Abacus? A Parent's Guide
          </h1>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            An educational guide examining eligibility, developmental readiness factors, how learning approaches differ across ages 4 to 14, and how to evaluate whether abacus is a constructive fit for your child.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-amber-300">
              Reading Time: 6 mins
            </span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-teal-300">
              Eligibility: Ages 4 to 14
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
            <h2>The Short Answer: Is There One Single Ideal Starting Age?</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            There is no universal starting age that suits every child. At Arnav Abacus Academy (AAA), our program welcomes learners aged <strong>4 to 14 years</strong>, with our primary <strong>foundation focus between 5 and 9 years</strong>.
          </p>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Program eligibility should not be confused with identical readiness across all children. A child's actual readiness depends on individual interest, willingness to engage with tactile materials, comfort following simple guided directions, and whether a calm home-practice routine fits family life.
          </p>
          <p className="text-xs text-slate-600 italic pt-1 border-t border-amber-200/60 font-semibold">
            Children can benefit from abacus learning at different ages when the teaching style and expectations match their developmental stage.
          </p>
        </section>

        {/* 4. Practical Readiness Factors to Consider */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Brain className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              Practical Readiness Factors for Parents to Observe
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Rather than relying solely on a birth date, educators suggest observing these practical indicators of readiness. These are discussion points to explore with your child, not a formal admissions test or guarantee of performance:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-700">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">1. Child Interest & Willingness</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                The child shows curiosity about numbers, enjoys interactive learning, or is receptive to trying a hands-on activity without pressure.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">2. Engagement with Short Guided Activities</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Ability to sit comfortably and focus on a playful or guided task for 15 to 20 minutes at a time with supportive mentorship.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">3. Familiarity with Basic Number Concepts</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Basic recognition of digits and counting small sets of items, without requiring formal arithmetic prerequisites before joining.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">4. Following Simple Multi-Step Directions</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Comfort with sequential prompts (such as "move the upper bead down, then slide two lower beads up") with encouraging teacher guidance.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">5. Batch Pace & Environment Fit</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Whether the classroom setting, batch size, and peer dynamic feel welcoming and comfortable for your child's personality.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">6. Sustainable Family Routine</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Whether parents can support a brief, calm daily practice routine without creating academic stress or competing with school obligations.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Age Group Perspectives */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Users className="w-6 h-6 text-vibrant-teal shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              How Abacus Fits Different Starting Age Groups
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Because children develop cognitive, fine motor, and attention skills at different rates, learning looks different across different age brackets:
          </p>

          <div className="space-y-4 pt-1">
            {/* Age 4-5 */}
            <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  Ages 4 to 5
                </span>
                <span className="text-[11px] text-slate-500 font-bold">Introductory & Concrete Exposure</span>
              </div>
              <h3 className="font-bold text-sm text-vibrant-dark">Early Tactile Exploration</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                For learners around ages 4 to 5, abacus serves as a tactile counting toy and concrete number tool. At this age, sessions emphasize bead manipulation, recognizing numbers, and fine motor coordination through play-based activities. It is not necessary or recommended for every preschooler to enroll; exposure is valuable only when the individual child is ready and the program format provides gentle, unhurried guidance.
              </p>
            </div>

            {/* Age 5-9 */}
            <div className="bg-white border-2 border-teal-200 bg-teal-50/20 p-5 rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-teal bg-teal-100 px-2 py-0.5 rounded">
                  Ages 5 to 9
                </span>
                <span className="text-[11px] text-teal-800 font-bold">AAA Foundation Focus Window</span>
              </div>
              <h3 className="font-bold text-sm text-vibrant-dark">Tactile-to-Visual Mental Bridge</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Ages 5 to 9 represent AAA's primary foundation focus. During these early primary school years, children are actively transitioning from concrete tools to visual thinking. Bi-quinary bead mechanics provide a concrete anchor that supports school addition and subtraction concepts. Children in this bracket often transition naturally from physical beads toward Anzan—the Japanese method of mental abacus visualization—which is used within AAA's advanced training to imagine bead movements internally.
              </p>
            </div>

            {/* Age 10-14 */}
            <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  Ages 10 to 14
                </span>
                <span className="text-[11px] text-slate-500 font-bold">Continued Eligibility & Method Choices</span>
              </div>
              <h3 className="font-bold text-sm text-vibrant-dark">Older Beginners & Alternative Pathways</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Children aged 10 to 14 remain fully eligible for Abacus at AAA. Starting at age 10 or older is entirely viable. Children who begin at different ages may bring different levels of prior mathematical experience, and the teaching approach and pace should be suited to the individual learner. Older students also have the option to explore Vedic Maths (positioned at AAA for ages 10+), which focuses on number strategies and mental calculation methods rather than bead manipulation.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Practical Parent Checklist Before Booking */}
        <section className="bg-slate-100/70 border-2 border-slate-200 rounded-3xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark font-display font-black text-lg">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <h2>Parent Consideration Checklist Before Booking a Demo</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Use this short checklist as a personal conversation aid when evaluating whether to book an evaluation session:
          </p>

          <div className="space-y-2.5 pt-1 text-xs font-medium text-slate-700">
            <div className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-emerald-600 font-bold">✓</span>
              <div>
                <strong>Child Willingness:</strong> My child is interested, curious, or open to trying a hands-on math activity.
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-emerald-600 font-bold">✓</span>
              <div>
                <strong>Format Suitability:</strong> The classroom batch format and teaching approach appear appropriate for my child's current attention span and comfort level.
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-emerald-600 font-bold">✓</span>
              <div>
                <strong>Schedule Fit:</strong> Our family can manage regular attendance for offline sessions without overloading the child's weekly timetable.
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-emerald-600 font-bold">✓</span>
              <div>
                <strong>Practice Realistic Expectations:</strong> We understand the suggestion of brief, unhurried daily home practice (around 10–15 minutes as an illustrative guide) and can discuss a sustainable routine with the mentor.
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-emerald-600 font-bold">✓</span>
              <div>
                <strong>Collaborative Mentorship:</strong> I can discuss my child's learning stage openly with the mentor before finalizing enrollment.
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 font-medium italic pt-1">
            Note: This checklist is intended as an informal family guide, not a formal psychological evaluation or admission guarantee.
          </p>
        </section>

        {/* 7. Common Parent Questions / FAQs */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <HelpCircle className="w-6 h-6 text-vibrant-teal shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              Frequently Asked Questions on Abacus Starting Age
            </h2>
          </div>

          <div className="space-y-3">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Can a child start Abacus at age 4?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Yes, age 4 is within AAA's eligibility range. At this age, learning is kept introductory and tactile, focusing on bead play, counting, and digit familiarity. A parent and mentor evaluation helps ensure the child feels comfortable and enjoys the format.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Is age 7 or 8 too late to start?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Not at all. Ages 7 and 8 fall directly inside AAA's 5 to 9 foundation focus window. Children starting at 7 or 8 can engage with the bead curriculum effectively, and instructors adapt the pace to their existing comfort with numbers.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Can a child start at age 10 or older?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Yes. Children aged 10 to 14 can learn Abacus successfully. Alternatively, for students aged 10+, AAA also offers Vedic Maths, which uses numerical patterns and shortcuts without physical beads. Parents can compare these options in our guide on <Link to="/parent-guides/abacus-vs-vedic-maths" className="text-vibrant-orange font-bold hover:underline">Abacus vs Vedic Maths</Link>.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Does a child need to be good at math before joining?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                No prior mathematics mastery is required. The abacus begins with concrete quantities, making it accessible to children with diverse mathematical backgrounds. It is designed to develop number familiarity gradually, not reward pre-existing speed.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                How much daily home practice is expected?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                As a general guideline, around 10 to 15 minutes of regular daily practice is suggested to help children maintain familiarity with bead movements. However, this is an illustrative starting point to discuss with the mentor, not an official rigid rule or guarantee of progress. The ideal routine should fit comfortably into your family's daily schedule.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                Will abacus training conflict with school mathematics or finger counting?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                When taught with clear context, abacus complements school curriculum. For detailed insights on how methods harmonize, explore our guides on <Link to="/parent-guides/does-abacus-confuse-school-math" className="text-vibrant-orange font-bold hover:underline">whether abacus confuses school math</Link>, <Link to="/parent-guides/why-children-use-finger-counting" className="text-vibrant-orange font-bold hover:underline">why children use finger counting</Link>, and <Link to="/parent-guides/why-smart-children-make-silly-math-mistakes" className="text-vibrant-orange font-bold hover:underline">understanding calculation mistakes</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Educational Disclaimer */}
        <section className="bg-slate-100/60 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-vibrant-dark font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Educational Scope & Supplementary Notice</span>
          </div>
          <p className="leading-relaxed">
            Arnav Abacus Academy offers supplementary learning programs designed to build focus and arithmetic fluency. Our courses do not replace school curricula prescribed by educational authorities (CBSE, ICSE, State Boards). We do not promise guaranteed school grades, zero calculation errors, or rank outcomes; academic development depends on ongoing practice, individual child readiness, and collaborative support between parents and educators.
          </p>
        </section>

        {/* 9. Related Programs & Navigation */}
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
              to="/programs/vedic-maths"
              className="bg-slate-50 hover:bg-teal-50/60 border-2 border-slate-200 hover:border-vibrant-teal p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-vibrant-teal">
                Vedic Mathematics
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                Ages 10+ Mental Shortcuts
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
