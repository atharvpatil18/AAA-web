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
      title: t("homeStageInspireTitle"),
      tagline: t("homeStageInspireTagline"),
      desc: t("homeStageInspireDesc"),
      icon: Sparkles,
      color: "bg-amber-100 text-amber-800",
    },
    {
      step: "02",
      title: t("homeStageExploreTitle"),
      tagline: t("homeStageExploreTagline"),
      desc: t("homeStageExploreDesc"),
      icon: Compass,
      color: "bg-orange-100 text-orange-800",
    },
    {
      step: "03",
      title: t("homeStageUnderstandTitle"),
      tagline: t("homeStageUnderstandTagline"),
      desc: t("homeStageUnderstandDesc"),
      icon: Lightbulb,
      color: "bg-teal-100 text-teal-800",
    },
    {
      step: "04",
      title: t("homeStagePracticeTitle"),
      tagline: t("homeStagePracticeTagline"),
      desc: t("homeStagePracticeDesc"),
      icon: Target,
      color: "bg-blue-100 text-blue-800",
    },
    {
      step: "05",
      title: t("homeStageApplyTitle"),
      tagline: t("homeStageApplyTagline"),
      desc: t("homeStageApplyDesc"),
      icon: Zap,
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      step: "06",
      title: t("homeStageReflectTitle"),
      tagline: t("homeStageReflectTagline"),
      desc: t("homeStageReflectDesc"),
      icon: Smile,
      color: "bg-emerald-100 text-emerald-800",
    },
  ];

  // 8 Child Development Intelligence Pillars
  const developmentPillars = [
    {
      title: t("pillar1Title"),
      desc: t("pillar1Desc"),
      observation: t("pillar1Obs"),
      icon: Eye,
    },
    {
      title: t("pillar2Title"),
      desc: t("pillar2Desc"),
      observation: t("pillar2Obs"),
      icon: Brain,
    },
    {
      title: t("pillar3Title"),
      desc: t("pillar3Desc"),
      observation: t("pillar3Obs"),
      icon: Layers,
    },
    {
      title: t("pillar4Title"),
      desc: t("pillar4Desc"),
      observation: t("pillar4Obs"),
      icon: Zap,
    },
    {
      title: t("pillar5Title"),
      desc: t("pillar5Desc"),
      observation: t("pillar5Obs"),
      icon: Target,
    },
    {
      title: t("pillar6Title"),
      desc: t("pillar6Desc"),
      observation: t("pillar6Obs"),
      icon: Activity,
    },
    {
      title: t("pillar7Title"),
      desc: t("pillar7Desc"),
      observation: t("pillar7Obs"),
      icon: ShieldCheck,
    },
    {
      title: t("pillar8Title"),
      desc: t("pillar8Desc"),
      observation: t("pillar8Obs"),
      icon: Smile,
    },
  ];

  // Homepage FAQs
  const homeFaqs = [
    {
      q: t("faq1Question"),
      a: t("faq1Answer")
    },
    {
      q: t("faq5Question"),
      a: t("faq5Answer")
    },
    {
      q: t("faq3Question"),
      a: t("faq3Answer")
    },
    {
      q: t("faq2Question"),
      a: t("faq2Answer")
    },
    {
      q: t("faq7Question"),
      a: t("faq7Answer")
    },
    {
      q: t("faq6Question"),
      a: t("faq6Answer")
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
              {t("homeTrustStripBadge")}
            </span>
            <h3 className="font-display font-black text-lg sm:text-xl text-white">
              {t("homeTrustStripTitle")}
            </h3>
            <p className="text-xs text-slate-300 max-w-xl font-medium">
              {t("homeTrustStripDesc")}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/mentor"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-full transition-all"
            >
              {t("homeTrustStripVerify")}
            </Link>
            <Link
              to="/showcase"
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all border border-slate-700"
            >
              {t("homeTrustStripFame")}
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
            {t("homeProgSectionBadge")}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
            {t("homeProgSectionTitle")}
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            {t("homeProgSectionSubtitle")}
          </p>
        </div>

        {/* Tab Selection Headings */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 pb-6 max-w-5xl mx-auto border-b border-slate-200">
          {PROGRAMS.map((prog) => {
            const isSelected = selectedProgram === prog.id;
            const progTitle = prog.id === "abacus" ? t("navAbacusProgram")
              : prog.id === "vedic-math" ? t("navVedicProgram")
              : prog.id === "mental-math" ? t("navMentalProgram")
              : prog.id === "school-math" ? t("navSchoolProgram")
              : prog.id === "ipm-olympiad" ? t("navIpmProgram")
              : prog.title;
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
                {progTitle}
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
            <span>{t("homeCompareProgramsLink")}</span>
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
              {t("homeModelBadge")}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
              {t("homeModelTitle")}
            </h2>
            <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
              {t("homeModelSubtitle")}
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
                  {t("homeLabsStripBadge")}
                </span>
                <h3 className="font-display font-black text-xl text-slate-900">
                  {t("homeLabsStripTitle")}
                </h3>
                <p className="text-xs text-slate-600 font-medium max-w-xl">
                  {t("homeLabsStripDesc")}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
                <Link
                  to="/abacus-simulator"
                  className="bg-slate-900 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-full transition-colors shadow-xs inline-flex items-center gap-1.5"
                >
                  <span>{t("homeLabBtnSimulator")}</span>
                </Link>
                <Link
                  to="/vedic-maths-sutras"
                  className="bg-slate-100 hover:bg-orange-100 hover:text-orange-700 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-full transition-colors border border-slate-200/60 inline-flex items-center gap-1.5"
                >
                  <span>{t("homeLabBtnSutras")}</span>
                </Link>
                <Link
                  to="/speed-challenge"
                  className="bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold px-4 py-2.5 rounded-full transition-colors border border-amber-200 inline-flex items-center gap-1.5"
                >
                  <span>{t("homeLabBtnSpeed")}</span>
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
            {t("homePillarsBadge")}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
            {t("homePillarsTitle")}
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
            {t("homePillarsSubtitle")}
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
                  <strong className="text-slate-800 block mb-0.5">{t("homePillarsObservationLabel")}</strong>
                  {pillar.observation}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-slate-500 font-medium max-w-2xl mx-auto">
          {t("homePillarsFootnote")}
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
              {t("homeGuidesBadge")}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
              {t("homeGuidesTitle")}
            </h2>
            <p className="text-slate-600 text-xs md:text-sm font-semibold">
              {t("homeGuidesSubtitle")}
            </p>
          </div>
          <Link
            to="/parent-guides"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs px-5 py-3 rounded-full transition-all shadow-sm shrink-0 self-start md:self-auto"
          >
            <span>{t("homeGuidesExploreAll")}</span>
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
                {t("homeGuide1Badge")}
              </span>
              <h3 className="font-display font-black text-lg text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                {t("homeGuide1Title")}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {t("homeGuide1Desc")}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 pt-4 group-hover:translate-x-1 transition-transform">
              {t("homeGuideReadCta")}
            </span>
          </Link>

          <Link
            to="/parent-guides/why-children-use-finger-counting"
            className="bg-white border border-slate-200 hover:border-teal-500 rounded-3xl p-6 shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full uppercase">
                {t("homeGuide2Badge")}
              </span>
              <h3 className="font-display font-black text-lg text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                {t("homeGuide2Title")}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {t("homeGuide2Desc")}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 pt-4 group-hover:translate-x-1 transition-transform">
              {t("homeGuideReadCta")}
            </span>
          </Link>

          <Link
            to="/parent-guides/why-smart-children-make-silly-math-mistakes"
            className="bg-white border border-slate-200 hover:border-amber-500 rounded-3xl p-6 shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full uppercase">
                {t("homeGuide3Badge")}
              </span>
              <h3 className="font-display font-black text-lg text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                {t("homeGuide3Title")}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {t("homeGuide3Desc")}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 pt-4 group-hover:translate-x-1 transition-transform">
              {t("homeGuideReadCta")}
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
              {t("homeFounderBadge")}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
              {t("homeFounderTitle")}
            </h2>
            <p className="text-slate-600 text-xs md:text-sm font-semibold">
              {t("homeFounderSubtitle")}
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
              <span>{t("homeAchieveBadge")}</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
              {t("homeAchieveTitle")}
            </h2>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
              {t("homeAchievePara1")}
            </p>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
              {t("homeAchievePara2")}
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-amber-50 p-3 sm:p-4 rounded-2xl border border-amber-200 text-center">
                <span className="font-display font-black text-2xl sm:text-3xl text-amber-600 block">{t("homeAchieveCard1Num")}</span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 block">{t("homeAchieveCard1Label")}</span>
                <span className="text-[9.5px] sm:text-[10.5px] text-slate-500 block">{t("homeAchieveCard1Sub")}</span>
              </div>
              <div className="bg-orange-50 p-3 sm:p-4 rounded-2xl border border-orange-200 text-center">
                <span className="font-display font-black text-2xl sm:text-3xl text-orange-600 block">{t("homeAchieveCard2Num")}</span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 block">{t("homeAchieveCard2Label")}</span>
                <span className="text-[9.5px] sm:text-[10.5px] text-slate-500 block">{t("homeAchieveCard2Sub")}</span>
              </div>
              <div className="bg-teal-50 p-3 sm:p-4 rounded-2xl border border-teal-200 text-center">
                <span className="font-display font-black text-2xl sm:text-3xl text-teal-600 block">{t("homeAchieveCard3Num")}</span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 block">{t("homeAchieveCard3Label")}</span>
                <span className="text-[9.5px] sm:text-[10.5px] text-slate-500 block">{t("homeAchieveCard3Sub")}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/showcase"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full inline-flex items-center gap-2 shadow-sm transition-all"
              >
                <span>{t("homeAchieveHallOfFame")}</span>
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
                  {t("homeAchievePhotoCaption")}
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
              {t("homeTestimonialsBadge")}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
              {t("homeTestimonialsTitle")}
            </h2>
            <p className="text-slate-600 text-xs md:text-sm font-semibold">
              {t("homeTestimonialsSubtitle")}
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
            {t("faqBadge") || "Clear Answers"}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
            {t("faqTitle")}
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            {t("faqSubtitle")}
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
                <span>{t("homeFinalSectionBadge")}</span>
              </span>

              <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight leading-tight text-white">
                {t("homeFinalSectionTitle")}
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                {t("homeFinalSectionDesc")}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => handleOpenCounselling("home_final_conversion_counselling")}
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t("homeFinalBookCta")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleWhatsAppChat("home_final_conversion_whatsapp")}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-7 py-4 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t("homeFinalWhatsappCta")}</span>
                </button>
              </div>

              {/* Address card */}
              <div className="pt-4 space-y-3 text-left">
                <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">{t("homeFinalWakadAddressLabel")}</strong>
                    {t("footerAddress")}
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
                  {t("homeFinalDirectInquiryBadge")}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  {t("homeFinalBookSessionTitle")}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {t("homeFinalBookSessionSub")}
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
