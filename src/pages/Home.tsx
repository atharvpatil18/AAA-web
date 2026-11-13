/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import ProgramCard from "../components/ProgramCard";

// Lazy load below-the-fold auxiliary modules
const SpeedChallengeWidget = React.lazy(() => import("../components/SpeedChallengeWidget"));
const TeacherProfile = React.lazy(() => import("../components/TeacherProfile"));
const TestimonialCarousel = React.lazy(() => import("../components/TestimonialCarousel"));
const LeadForm = React.lazy(() => import("../components/LeadForm"));
const InteractiveAbacus = React.lazy(() => import("../components/InteractiveAbacus"));
const VedicMathDemo = React.lazy(() => import("../components/VedicMathDemo"));
import DemoBookingModal from "../components/DemoBookingModal";

import { useLanguage } from "../lib/LanguageContext";
import { PROGRAMS } from "../data";
import { INITIAL_BLOG_POSTS } from "../data/blogData";
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Download, 
  Clock, 
  X, 
  Trophy, 
  Brain, 
  Target, 
  Zap, 
  Lightbulb, 
  Compass, 
  CheckCircle,
  Eye,
  Layers,
  Activity,
  Smile,
  ShieldCheck,
  Calendar
} from "lucide-react";
import { trackDemoClick, trackWhatsAppClick, trackCounsellingBook } from "../lib/analytics";

export default function Home() {
  const { language, t } = useLanguage();
  const [selectedProgram, setSelectedProgram] = useState("abacus");
  const [showAbacusPlayground, setShowAbacusPlayground] = useState(false);
  const [showVedicPlayground, setShowVedicPlayground] = useState(false);
  const [showQuizWidget, setShowQuizWidget] = useState(false);
  const [isCounsellingModalOpen, setIsCounsellingModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleOpenCounselling = (source: string) => {
    trackCounsellingBook({
      source,
      program: selectedProgram,
      deliveryMode: "offline_and_online",
    });
    trackDemoClick(source);
    setIsCounsellingModalOpen(true);
  };

  const handleWhatsAppChat = (source: string) => {
    trackWhatsAppClick(source, "parent_counselling");
    const waText = encodeURIComponent(
      "Hello Arnav Abacus Academy! I would like to book a Parent Counselling Session with Neha Patil for my child."
    );
    window.open(`https://wa.me/919021924968?text=${waText}`, "_blank");
  };

  // AAA Learning Model 6 Stages
  const learningStages = [
    {
      step: "01",
      title: "Inspire",
      tagline: "Spark Numerical Wonder",
      desc: "We introduce numbers as playful spatial patterns rather than stressful drills, instantly dissolving math anxiety.",
      icon: Sparkles,
      color: "bg-amber-100 text-amber-800",
    },
    {
      step: "02",
      title: "Explore",
      tagline: "Tactile Bead Exploration",
      desc: "Children touch and slide physical Soroban beads, anchoring abstract digit values into concrete sensory reality.",
      icon: Compass,
      color: "bg-orange-100 text-orange-800",
    },
    {
      step: "03",
      title: "Understand",
      tagline: "Conceptual Place-Value Logic",
      desc: "Deep comprehension of number complements (Friends of 5 & 10) ensures children understand the 'why' behind every step.",
      icon: Lightbulb,
      color: "bg-teal-100 text-teal-800",
    },
    {
      step: "04",
      title: "Practice",
      tagline: "Micro-Batch Deliberate Drills",
      desc: "Daily 10–15 minute focused practice in small batches (maximum 5 students per batch) with immediate corrective feedback from mentors.",
      icon: Target,
      color: "bg-blue-100 text-blue-800",
    },
    {
      step: "05",
      title: "Apply",
      tagline: "Mental Bead Visualization (Anzan)",
      desc: "Children mentally compute multi-digit problems without physical beads, applying speed arithmetic directly to schoolwork.",
      icon: Zap,
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      step: "06",
      title: "Reflect",
      tagline: "Self-Belief & Meta-Cognition",
      desc: "Students evaluate their own calculation logs, celebrate precision milestones, and build independent academic confidence.",
      icon: Smile,
      color: "bg-emerald-100 text-emerald-800",
    },
  ];

  // 8 Child Development Intelligence Pillars
  const developmentPillars = [
    {
      title: "Visualization",
      desc: "Children form vivid mental images of abacus beads, moving away from paper counting and developing spatial mental models.",
      observation: "Observed when a child calculates mentally with eyes focused or closed, moving imaginary beads with accuracy.",
      icon: Eye,
    },
    {
      title: "Working Memory",
      desc: "Holding intermediate calculations while processing next-step digits, expanding short-term retention capacity.",
      observation: "Observed during rapid multi-row additions where earlier subtotals are retained without writing.",
      icon: Brain,
    },
    {
      title: "Pattern Recognition",
      desc: "Intuitive discernment of mathematical relationships, base-10 pairs, and algebraic structures effortlessly.",
      observation: "Observed when a child quickly groups numbers into easy complements (e.g. 7 + 8 as 7 + 3 + 5).",
      icon: Layers,
    },
    {
      title: "Processing Speed",
      desc: "Elimination of procedural calculation lag and finger counting, accelerating arithmetical execution naturally.",
      observation: "Measured via time-trial drills where reaction latency drops from 4 seconds per sum to under 1 second.",
      icon: Zap,
    },
    {
      title: "Attention & Focus",
      desc: "Sustained concentration during multi-step tasks without distraction or restlessness.",
      observation: "Observed in 20-minute uninterrupted problem-solving sessions without digital screen fatigue.",
      icon: Target,
    },
    {
      title: "Cognitive Flexibility",
      desc: "Ability to switch fluently between traditional school math column methods, Vedic shortcuts, and mental visualization.",
      observation: "Observed when a child independently verifies a standard long division using Vedic digit-sums.",
      icon: Activity,
    },
    {
      title: "Executive Function",
      desc: "Self-monitoring, methodical error-checking, and disciplined pacing during exam time constraints.",
      observation: "Observed when a child spots their own carry-over oversight before submitting a worksheet.",
      icon: ShieldCheck,
    },
    {
      title: "Confidence",
      desc: "Complete eradication of math phobia, transforming a reluctant learner into an enthusiastic, voluntary problem-solver.",
      observation: "Parent-reported transformation in homework independence and eagerness to participate in school math classes.",
      icon: Smile,
    },
  ];

  // Homepage FAQs
  const homeFaqs = [
    {
      q: "What is the best age to enroll my child in Arnav Abacus Academy?",
      a: "For Abacus, the ideal developmental window is approximately 4.5 to 9 years old, when neuroplasticity and visual memory development are at their peak. For Vedic Mathematics, students aged 9 to 14 (Grades 5–10) benefit most because they apply the 16 sutras directly to heavy school syllabus and competitive exams."
    },
    {
      q: "Does Abacus create confusion with my child's school board syllabus (CBSE/ICSE/SSC)?",
      a: "No, Abacus does not confuse school math. Abacus trains internal computation agility, place-value sense, and working memory. In school exams, students still write the required step-by-step layout on paper, but they complete the underlying arithmetic in seconds with zero scratch-margin errors."
    },
    {
      q: "What makes Arnav Abacus Academy different from commercial chain franchises?",
      a: "Commercial franchises often rely on large batches (15–25 students) and part-time instructors with high turnover. AAA is founded and directed personally by Neha Patil (MCA, IIVA Certified), strictly maintaining small batches with a maximum of five students per batch. Every child receives customized pacing, error diagnostics, and direct mentor care."
    },
    {
      q: "How much daily practice is expected from the child at home?",
      a: "We advocate a manageable 10 to 15-minute daily practice routine. Consistent daily micro-drills strengthen neural pathways far more effectively than cramming for 2 hours once a week. This keeps math fun and prevents burnout."
    },
    {
      q: "Can we attend classes offline in Wakad or online from home?",
      a: "We offer both! We conduct offline micro-batches at our dedicated center in Wakad (Flat No. 3, Balaji Sagar Bungalow, Near Park Street, behind Wisdom World School) and live interactive 1-on-1 and small group online sessions for students across Pune, India, and overseas."
    },
    {
      q: "How can parents track progress?",
      a: "Through our AAA Brain Dashboard™ methodology, parents receive regular level-completion reports, speed benchmarks, accuracy audits, and 1-on-1 consultation feedback with Mentor Neha Patil."
    }
  ];

  return (
    <div id="home-page-container" className="bg-[#FFFDF9] min-h-screen text-slate-800">
      
      {/* =========================================================================
          SECTION 1: HERO
          Brand Identifier, Clear 5-Second Headline, Reassuring Message, Primary & Secondary CTAs
          ========================================================================= */}
      <Hero />

      {/* =========================================================================
          SECTION 2: TRUST AND CREDIBILITY
          Showcase verified founder credentials, student achievements, championship participation
          ========================================================================= */}
      <div className="px-4 md:px-8">
        <TrustBar />
      </div>

      {/* Trust & Credibility Strip */}
      <section className="py-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
              Verified Institutional Authority
            </span>
            <h3 className="font-display font-black text-lg sm:text-xl text-white">
              Recognised Excellence in Mathematical Child Development
            </h3>
            <p className="text-xs text-slate-300 max-w-xl font-medium">
              Certified Trainer in Abacus &amp; Vedic Mathematics • Small Batches • Serving Wakad &amp; Pune.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/mentor"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-full transition-all"
            >
              Verify Credentials &rarr;
            </Link>
            <Link
              to="/showcase"
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all border border-slate-700"
            >
              Student Hall of Fame
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: PROGRAMMES
          Clear introductions for all 5 programmes linking to dedicated landing pages
          ========================================================================= */}
      <section id="programmes-section" className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Five Dedicated Pathways
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
            Our Structured Mathematics Programmes
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            Every programme is calibrated to child development stages and taught in personalised small batches with a maximum of five students per batch.
          </p>
        </div>

        {/* Tab Selection Headings */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 pb-6 max-w-5xl mx-auto border-b border-slate-200">
          {PROGRAMS.map((prog) => {
            const isSelected = selectedProgram === prog.id;
            return (
              <button
                key={prog.id}
                onClick={() => setSelectedProgram(prog.id)}
                className={`py-2.5 px-4 rounded-full text-xs font-bold transition-all cursor-pointer text-center ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {prog.title}
              </button>
            );
          })}
        </div>

        {/* Selected Program Card Display */}
        <div className="max-w-2xl lg:max-w-3xl mx-auto transition-all duration-300">
          {PROGRAMS.map((prog) => {
            if (prog.id !== selectedProgram) return null;
            return (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ProgramCard program={prog} />
              </motion.div>
            );
          })}
        </div>

        {/* View All Programmes Footer Link */}
        <div className="text-center pt-8">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 hover:text-orange-700 uppercase tracking-wider"
          >
            <span>Compare All 5 Programmes &amp; Curriculum Breakdown</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: AAA LEARNING MODEL™
          Inspire → Explore → Understand → Practice → Apply → Reflect
          ========================================================================= */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-3 max-w-3xl mx-auto mb-14">
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Proprietary Pedagogy
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
              The AAA Learning Model™
            </h2>
            <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
              "Mathematics is the medium; developing confident, independent and thoughtful learners is the mission."
              Our 6-stage progressive mastery model transforms anxious students into joyful, autonomous thinkers.
            </p>
          </div>

          {/* 6 Stages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningStages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div 
                  key={stage.step}
                  className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-orange-600 transition-colors">
                      {stage.step}
                    </span>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${stage.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-black text-lg text-slate-900">
                      {stage.title}
                    </h3>
                    <span className="text-[11px] font-bold text-orange-600 block mb-2">
                      {stage.tagline}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Interactive Learning Labs Strip */}
          <div className="mt-12 pt-8 border-t border-slate-200/80">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  Interactive Learning Labs
                </span>
                <h3 className="font-display font-black text-xl text-slate-900">
                  Experience Our Pedagogical Tools Directly
                </h3>
                <p className="text-xs text-slate-600 font-medium max-w-xl">
                  Test abacus bead manipulation, explore Vedic multiplication Sutras, or let your child take our 45-second arithmetic speed drill online.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
                <Link
                  to="/abacus-simulator"
                  className="bg-slate-900 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-full transition-colors shadow-xs inline-flex items-center gap-1.5"
                >
                  <span>🧮 Abacus Simulator</span>
                </Link>
                <Link
                  to="/vedic-maths-sutras"
                  className="bg-slate-100 hover:bg-orange-100 hover:text-orange-700 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-full transition-colors border border-slate-200/60 inline-flex items-center gap-1.5"
                >
                  <span>📐 Vedic Sutras</span>
                </Link>
                <Link
                  to="/speed-challenge"
                  className="bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold px-4 py-2.5 rounded-full transition-colors border border-amber-200 inline-flex items-center gap-1.5"
                >
                  <span>⚡ Speed Challenge</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CHILD DEVELOPMENT INTELLIGENCE
          The Eight Development Pillars (Visualization, Working Memory, etc.)
          ========================================================================= */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-14">
          <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Cognitive Growth Pillars
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
            Child Development Intelligence
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
            Abacus and Vedic Mathematics training goes far beyond fast calculations. We track learning progress across eight fundamental child development pillars:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {developmentPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-orange-500 transition-colors space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-display font-black text-base text-slate-900">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {pillar.desc}
                </p>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[10.5px] text-slate-600 font-medium leading-relaxed">
                  <strong className="text-slate-800 block mb-0.5">How It Is Observed:</strong>
                  {pillar.observation}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-slate-500 font-medium max-w-2xl mx-auto">
          * Note: Development indicators reflect observed learning progress and cognitive skill tracking; they are not intended as clinical neurological diagnostic scores.
        </div>
      </section>

      {/* =========================================================================
          SECTION 5B: PARENT GUIDES & PRACTICAL LEARNING INSIGHTS
          Featured Parent Guides to address common child math dilemmas
          ========================================================================= */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8 border-t border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Practical Insights for Parents
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
              Evidence-Based Answers to Common Math Dilemmas
            </h2>
            <p className="text-slate-600 text-xs md:text-sm font-semibold">
              Before choosing a programme, explore how children learn calculation, why finger counting occurs, and how sensory bead arithmetic connects with school exams.
            </p>
          </div>
          <Link
            to="/parent-guides"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs px-5 py-3 rounded-full transition-all shadow-sm shrink-0 self-start md:self-auto"
          >
            <span>Explore All 5 Parent Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/parent-guides/abacus-vs-vedic-maths"
            className="bg-white border border-slate-200 hover:border-orange-500 rounded-3xl p-6 shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full uppercase">
                Ages 4.5–14
              </span>
              <h3 className="font-display font-black text-lg text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                Abacus vs Vedic Maths: What's the Difference?
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Learn why tactile bead visualization is best for ages 4.5–9, while Vedic Sutras empower older students with high-speed exam calculation.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 pt-4 group-hover:translate-x-1 transition-transform">
              Read Guide &rarr;
            </span>
          </Link>

          <Link
            to="/parent-guides/why-children-use-finger-counting"
            className="bg-white border border-slate-200 hover:border-teal-500 rounded-3xl p-6 shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full uppercase">
                Early Numeracy
              </span>
              <h3 className="font-display font-black text-lg text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                Why Children Count on Fingers & How to Transition
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Why finger counting is natural, why scolding backfires, and how the Soroban abacus bridges physical fingers into mental images.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 pt-4 group-hover:translate-x-1 transition-transform">
              Read Guide &rarr;
            </span>
          </Link>

          <Link
            to="/parent-guides/why-smart-children-make-silly-math-mistakes"
            className="bg-white border border-slate-200 hover:border-amber-500 rounded-3xl p-6 shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full uppercase">
                Accuracy & Focus
              </span>
              <h3 className="font-display font-black text-lg text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                Why Children Make Mistakes Despite Understanding Concepts
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Understand procedural slips, working memory overload, and a 4-step parent review routine to build lasting calculation accuracy.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 pt-4 group-hover:translate-x-1 transition-transform">
              Read Guide &rarr;
            </span>
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: FOUNDER PROFILE
          Introduce Neha Patil, verified credentials, MCA, IIVA, teaching philosophy
          ========================================================================= */}
      <section id="mentor-overview" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold text-orange-600 bg-orange-100 border border-orange-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Dedicated Mentorship
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
              Personalised Guidance by Neha Patil
            </h2>
            <p className="text-slate-600 text-xs md:text-sm font-semibold">
              Meet our Founder and Academic Director, dedicated to small-batch micro-teaching in Wakad, Pune.
            </p>
          </div>

          <React.Suspense fallback={<div className="h-64 bg-white rounded-3xl animate-pulse" />}>
            <TeacherProfile />
          </React.Suspense>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: STUDENT ACHIEVEMENTS
          15th National Championship 2026 case study, 56 participants across 15 levels
          ========================================================================= */}
      <section id="achievements-section" className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-800 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>National Competition Excellence</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
              15th National Level Championship 2026: 56 Champions from Wakad
            </h2>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
              At the 15th National Level Abacus &amp; Vedic Mathematics Championship, 56 dedicated students from Arnav Abacus Academy represented our Wakad center across 15 competitive levels.
            </p>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
              Competing against hundreds of young mathematicians nationwide under AVAS and IIVA benchmarks, our students achieved top podium spots, championship trophies, and gold medals.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                <span className="font-display font-black text-3xl text-amber-600 block">56</span>
                <span className="text-xs font-bold text-slate-800">Student Participants</span>
                <span className="text-[10.5px] text-slate-500 block">Wakad Center Contingent</span>
              </div>
              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200">
                <span className="font-display font-black text-3xl text-orange-600 block">15</span>
                <span className="text-xs font-bold text-slate-800">Mastery Levels</span>
                <span className="text-[10.5px] text-slate-500 block">From Foundation to Advance</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/showcase"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full inline-flex items-center gap-2 shadow-sm transition-all"
              >
                <span>View Full Student Hall of Fame</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 aspect-video relative group">
              <img
                src="/competition_glimpses_collage.jpg"
                alt="15th National Level Abacus Championship 2026 - Arnav Abacus Academy Students"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                <p className="text-white text-xs sm:text-sm font-bold">
                  AAA students celebrating their national championship trophies with Founder Neha Patil
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-video bg-slate-100">
                <img
                  src="/arnav_patil_international_1st_2025.webp"
                  alt="International Abacus Champion Arnav Patil"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-video bg-slate-100">
                <img
                  src="/seven_runner_up_stars_2025.webp"
                  alt="State Level Runner Up Stars 2025"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8: PARENT TESTIMONIALS
          Authentic feedback from verified Wakad & Pune parents
          ========================================================================= */}
      <section id="parent-testimonials" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Parent Experiences
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
              Trusted by 76+ Wakad Parents
            </h2>
            <p className="text-slate-600 text-xs md:text-sm font-semibold">
              Read how personalized mentorship transformed calculation speed, homework discipline, and exam confidence. Disclosures under CCPA Coaching Guidelines 2024: Testimonials reflect genuine experiences of enrolled students in paid programs.
            </p>
          </div>

          <React.Suspense fallback={<div className="h-64 bg-white rounded-3xl animate-pulse" />}>
            <TestimonialCarousel />
          </React.Suspense>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: FAQS
          Comprehensive Parent FAQs on eligibility, batch ratio, methodology, etc.
          ========================================================================= */}
      <section id="faq-section" className="py-16 md:py-24 max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Clear Answers
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            Everything you need to know about our programmes, batches, and teaching methodology.
          </p>
        </div>

        <div className="space-y-4">
          {homeFaqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 md:p-6 flex justify-between items-center gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-sm md:text-base text-slate-900">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-orange-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 md:px-6 md:pb-6 text-xs md:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: FINAL CONVERSION SECTION
          "Give Your Child a Stronger Start in Mathematics"
          Book Counselling, WhatsApp AAA, Full Wakad Location
          ========================================================================= */}
      <section className="py-16 md:py-24 bg-slate-900 text-white border-t border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Direct Call to Action */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Admissions Open for New Batches</span>
              </span>

              <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight leading-tight text-white">
                Give Your Child a Stronger Start in Mathematics.
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                Connect directly with Founder Neha Patil for an encouraging, educator-led Personalised Learning Discovery Session. Discover your child's arithmetic readiness, bead visualization aptitude, and focus in small batches (maximum 5 students per batch).
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => handleOpenCounselling("home_final_conversion_counselling")}
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book a Discovery Session</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleWhatsAppChat("home_final_conversion_whatsapp")}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-7 py-4 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>WhatsApp AAA</span>
                </button>
              </div>

              {/* Address card */}
              <div className="pt-4 space-y-3 text-left">
                <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Wakad Center Location:</strong>
                    Flat no. 3, 1st Floor, Advocate Balaji Sagar Bungalow, Opp. Creative Cameo, Near Park Street, behind WISDOM WORLD SCHOOL, Wakad, Pune, Maharashtra 411057.
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <a href="tel:+919021924968" className="hover:text-white font-bold">+91 90219 24968</a>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-amber-400" />
                    <a href="mailto:nehaatharv@gmail.com" className="hover:text-white font-bold">nehaatharv@gmail.com</a>
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Embedded Counselling Form */}
            <div className="lg:col-span-6 bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
              <div className="mb-4">
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Direct Parent Inquiry
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  Book a Personalised Discovery Session
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  We'll review your child's age group and recommend the ideal learning pathway.
                </p>
              </div>
              <LeadForm sourceCampaign="home_final_conversion_section" />
            </div>

          </div>
        </div>
      </section>

      {/* Floating Counselling Booking Modal */}
      <DemoBookingModal
        isOpen={isCounsellingModalOpen}
        onClose={() => setIsCounsellingModalOpen(false)}
        source="home_counselling_cta"
      />

    </div>
  );
}
