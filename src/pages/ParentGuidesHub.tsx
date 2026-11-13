/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";
import { 
  BookOpen, 
  Sparkles, 
  Brain, 
  Target, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Users, 
  HelpCircle, 
  GraduationCap, 
  MapPin, 
  Calendar,
  Compass,
  Lightbulb
} from "lucide-react";
import { trackPageView, trackDemoClick } from "../lib/analytics";
import DemoBookingModal from "../components/DemoBookingModal";

interface ParentGuideItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  readTime: string;
  targetAge: string;
  category: string;
  coreQuestion: string;
  summary: string;
  keyTakeaways: string[];
  recommendedFor: string;
  badgeColor: string;
}

const PARENT_GUIDES: ParentGuideItem[] = [
  {
    id: "guide-abacus-vs-vedic",
    slug: "abacus-vs-vedic-maths",
    title: "Abacus vs Vedic Maths: What's the Difference?",
    subtitle: "A Parent's Guide to Choosing the Right Mathematical Foundation",
    readTime: "8 min read",
    targetAge: "Ages 4.5–14 Years",
    category: "Methodology Comparison",
    coreQuestion: "Should my child start with Abacus beads or Vedic Sutras?",
    summary: "An objective educational comparison explaining how Soroban bead manipulation builds sensory number sense and spatial visualization for younger children (ages 4.5–9), whereas Vedic Mathematics equips older students (ages 9–14) with algebraic speed sutras for school and competitive exams.",
    keyTakeaways: [
      "Abacus builds sensory bead visualization (Anzan) during peak neurodevelopment (ages 4.5–9).",
      "Vedic Maths provides step-saving sutras and cross-multiplication for school grades 5–10.",
      "The two methods are complementary, serving distinct stages of child cognitive readiness."
    ],
    recommendedFor: "Parents evaluating whether their child is ready for concrete bead arithmetic or high-speed mental sutras.",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200"
  },
  {
    id: "guide-abacus-school-math",
    slug: "does-abacus-confuse-school-math",
    title: "Does Abacus Confuse School Maths?",
    subtitle: "How Sensory Bead Calculation Complements Classroom Arithmetic",
    readTime: "7 min read",
    targetAge: "Ages 5–12 Years (Grades 1–6)",
    category: "School Curriculum Harmony",
    coreQuestion: "Will learning left-to-right abacus calculation conflict with school right-to-left addition?",
    summary: "Addresses common parental concerns about differences between school column arithmetic and abacus methods. Explains cognitive scaffolding, procedural switching, and how structured mentorship ensures abacus strengthens school performance without confusion.",
    keyTakeaways: [
      "School math emphasizes formal written steps; Abacus builds instant mental working memory.",
      "Children naturally develop cognitive flexibility to switch between visualization and written tests.",
      "Small-batch mentorship (maximum 5 students) ensures school syllabus alignment without conflicting methods."
    ],
    recommendedFor: "Parents concerned about CBSE, ICSE, or State Board curriculum harmony and school homework compliance.",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200"
  },
  {
    id: "guide-finger-counting",
    slug: "why-children-use-finger-counting",
    title: "Why Children Use Finger Counting and How to Transition",
    subtitle: "Understanding Concrete Numerical Scaffolding in Early Childhood",
    readTime: "6 min read",
    targetAge: "Ages 4–9 Years",
    category: "Cognitive Development",
    coreQuestion: "Why is my child still counting on fingers for basic addition and subtraction?",
    summary: "Explores why finger counting is a natural developmental stage, why scolding children slows progress, and how the Japanese Soroban abacus provides a physical-to-visual bridge that smoothly replaces finger counting with mental visualization.",
    keyTakeaways: [
      "Finger counting is evidence of working memory searching for concrete tactile support.",
      "Forced verbal memorization creates arithmetic anxiety and increases careless mistakes.",
      "Soroban bead tactility naturally elevates counting to mental image manipulation (Anzan)."
    ],
    recommendedFor: "Parents whose children hesitate during sums or rely heavily on fingers for single-digit arithmetic.",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200"
  },
  {
    id: "guide-silly-mistakes",
    slug: "why-smart-children-make-silly-math-mistakes",
    title: "Why Children Make Calculation Mistakes Even When They Understand Concepts",
    subtitle: "Deconstructing Procedural Errors, Attentional Fatigue & Working Memory Overload",
    readTime: "8 min read",
    targetAge: "Ages 6–14 Years",
    category: "Academic Performance",
    coreQuestion: "My child understands all math concepts, so why do they lose marks on silly mistakes?",
    summary: "Deconstructs the cognitive causes behind 'careless errors'—including cognitive overload, sign transcription lapses, and subvocalization—providing parents with a structured 4-step home error review routine to build lasting calculation accuracy.",
    keyTakeaways: [
      "Silly mistakes are usually symptoms of working memory overload, not conceptual ignorance.",
      "Rushed scratch calculations without verification habits cause 80% of lost exam marks.",
      "Vedic checking methods (digit sums) and abacus mental storage build automatic error self-correction."
    ],
    recommendedFor: "Parents whose children score below potential due to procedural, sign, or copying errors in exams.",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    id: "guide-ideal-age",
    slug: "ideal-age-to-start-abacus",
    title: "What Is the Ideal Age to Start Abacus? A Parent's Guide",
    subtitle: "Cognitive Readiness, Brain Development Windows & Practical Milestones",
    readTime: "6 min read",
    targetAge: "Ages 4.5–9 Years",
    category: "Admissions & Readiness",
    coreQuestion: "Is my 4-year-old too young, or is my 9-year-old starting too late?",
    summary: "Breaks down developmental readiness across age bands (4.5–6, 6–8, and 9+ years), explaining the neuroplasticity window, essential pre-numeracy checkpoints, and how AAA adapts instruction for each developmental milestone.",
    keyTakeaways: [
      "The prime neuroplasticity window for spatial bead visualization is ages 4.5 to 9.",
      "Children must recognize numerals 1–10 and follow simple 2-step auditory directions before beginning.",
      "Older children (ages 9+) can accelerate through foundational levels or transition into Vedic Mathematics."
    ],
    recommendedFor: "Parents planning their child's extracurricular learning schedule and seeking objective readiness markers.",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200"
  }
];

export default function ParentGuidesHub() {
  const { language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedGuideForModal, setSelectedGuideForModal] = useState("General Parent Guide Inquiry");

  useEffect(() => {
    trackPageView("/parent-guides", "Parent Guides & Cognitive Math Insights | Arnav Abacus Academy Wakad");
  }, []);

  const handleOpenDiscoveryModal = (source: string) => {
    trackDemoClick(source);
    setIsDemoModalOpen(true);
  };

  return (
    <div id="parent-guides-hub" className="bg-[#FFFDF9] min-h-screen">
      {/* 1. Hero Header */}
      <section className="bg-slate-900 text-white py-16 md:py-24 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Authoritative Mathematical &amp; Child Development Insights</span>
          </div>
          
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight max-w-4xl mx-auto">
            Parent Guides to Foundational Mathematics &amp; Cognitive Growth
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Objective, research-informed educational guides authored by {language === "mr" ? "नेहा पाटील" : language === "hi" ? "नेहा पाटिल" : "Neha Patil"} and the AAA academic team in Wakad, Pune. Designed to help parents resolve common learning dilemmas, understand calculation mechanics, and support confident mathematical thinking.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Evidence-Based Pedagogy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Zero Commercial Gimmicks
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Wakad, Pune Single Dedicated Center
            </span>
          </div>
        </div>
      </section>

      {/* 2. Educational Philosophy Scaffolding */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 bg-orange-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-md">
              <Lightbulb className="w-7 h-7" />
            </div>
            <div className="flex-1 space-y-1 text-center md:text-left">
              <h2 className="text-lg md:text-xl font-black text-slate-900">
                Mathematics is the Medium; Thoughtful Learning is the Mission
              </h2>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                Our parent guides do not promote rote speed drills or exam pressure. We focus on how children conceptualize numbers, develop spatial visualization, and build durable executive function. Every child's learning trajectory is personal.
              </p>
            </div>
            <button
              onClick={() => handleOpenDiscoveryModal("parent_guides_hub_philosophy_cta")}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3.5 rounded-full shadow-md shrink-0 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Book Discovery Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Guide Cards Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Comprehensive Parent Resource Library
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
            Explore In-Depth Parent Guides
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            Select a guide addressing your child's current mathematical stage or learning question.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PARENT_GUIDES.map((guide, idx) => (
            <article 
              key={guide.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${guide.badgeColor}`}>
                    {guide.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {guide.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {guide.targetAge}
                    </span>
                  </div>
                </div>

                {/* Title & Question */}
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                    <Link to={`/parent-guides/${guide.slug}`}>
                      {guide.title}
                    </Link>
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 font-bold mt-1">
                    {guide.subtitle}
                  </p>
                </div>

                {/* Problem Statement Box */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-700">
                  <strong className="text-slate-900 block font-bold mb-0.5">Core Parent Dilemma:</strong>
                  <span>"{guide.coreQuestion}"</span>
                </div>

                {/* Summary */}
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                  {guide.summary}
                </p>

                {/* Key Takeaways */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                    Key Insights Covered:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {guide.keyTakeaways.map((takeaway, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500 font-medium text-center sm:text-left">
                  {guide.recommendedFor}
                </span>
                <Link
                  to={`/parent-guides/${guide.slug}`}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs px-5 py-3 rounded-full transition-all inline-flex items-center justify-center gap-1.5 shadow-sm shrink-0"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Catchment & Discovery Session Bridge */}
      <section className="py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Personalised Diagnostic Exploration</span>
              </span>

              <h2 className="font-display font-black text-2xl sm:text-4xl tracking-tight leading-tight text-white">
                Still Unsure Which Learning Track Fits Your Child?
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                Reading guides is a great first step, but every child processes numbers differently. Book a one-on-one Personalised Learning Discovery Session with Director {language === "mr" ? "नेहा पाटील" : language === "hi" ? "नेहा पाटिल" : "Neha Patil"}. We evaluate base-10 number sense, bead visualization aptitude, and focus in an encouraging, low-pressure environment.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  type="button"
                  onClick={() => handleOpenDiscoveryModal("parent_guides_hub_footer_cta")}
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book a Discovery Session</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/programs"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-4 rounded-full border border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>View All Programmes</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800/90 rounded-3xl p-6 border border-slate-700 space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white text-sm block mb-1">
                    Single Dedicated Wakad Location
                  </strong>
                  <p className="leading-relaxed text-slate-300">
                    Flat No. 3, 1st Floor, Adv. Balaji Sagar Bungalow, Opp. Creative Cameo, Near Park Street, Behind Wisdom World School, Wakad, Pune, Maharashtra 411057.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60 space-y-2">
                <span className="font-bold text-amber-300 text-[11px] block uppercase tracking-wider">
                  Local Pune Catchment Coverage:
                </span>
                <p className="text-slate-400 text-[11.5px] leading-relaxed">
                  We serve families residing across <strong>Wakad, Pimple Saudagar, Hinjawadi, Tathawade, and Baner</strong> from our single, well-equipped physical learning center in Wakad. Out-of-station and NRI families are supported via live, interactive online batches.
                </p>
              </div>

              <div className="pt-1 flex items-center justify-between text-slate-400 text-[11px]">
                <span>Batches: Maximum 5 students</span>
                <span>{language === "mr" ? "मार्गदर्शिका: नेहा पाटील" : language === "hi" ? "मेंटर: नेहा पाटिल" : "Mentor: Neha Patil"}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Discovery Booking Modal */}
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultProgram="Personalised Learning Discovery Session"
        source="parent_guides_hub"
      />
    </div>
  );
}
