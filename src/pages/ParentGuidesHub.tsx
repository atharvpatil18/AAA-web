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

export default function ParentGuidesHub() {
  const { t, language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    trackPageView("/parent-guides", "Parent Guides & Cognitive Math Insights | Arnav Abacus Academy Wakad");
  }, []);

  const handleOpenDiscoveryModal = (source: string) => {
    trackDemoClick(source);
    setIsDemoModalOpen(true);
  };

  const parentGuides: ParentGuideItem[] = [
    {
      id: "guide-abacus-vs-vedic",
      slug: "abacus-vs-vedic-maths",
      title: t("pgHubG1Title"),
      subtitle: t("pgHubG1Subtitle"),
      readTime: t("pgHubG1ReadTime"),
      targetAge: t("pgHubG1TargetAge"),
      category: t("pgHubG1Category"),
      coreQuestion: t("pgHubG1Question"),
      summary: t("pgHubG1Summary"),
      keyTakeaways: [
        t("pgHubG1Takeaway1"),
        t("pgHubG1Takeaway2"),
        t("pgHubG1Takeaway3"),
      ],
      recommendedFor: t("pgHubG1Recommended"),
      badgeColor: "bg-orange-50 text-orange-700 border-orange-200"
    },
    {
      id: "guide-abacus-school-math",
      slug: "does-abacus-confuse-school-math",
      title: t("pgHubG2Title"),
      subtitle: t("pgHubG2Subtitle"),
      readTime: t("pgHubG2ReadTime"),
      targetAge: t("pgHubG2TargetAge"),
      category: t("pgHubG2Category"),
      coreQuestion: t("pgHubG2Question"),
      summary: t("pgHubG2Summary"),
      keyTakeaways: [
        t("pgHubG2Takeaway1"),
        t("pgHubG2Takeaway2"),
        t("pgHubG2Takeaway3"),
      ],
      recommendedFor: t("pgHubG2Recommended"),
      badgeColor: "bg-teal-50 text-teal-700 border-teal-200"
    },
    {
      id: "guide-finger-counting",
      slug: "why-children-use-finger-counting",
      title: t("pgHubG3Title"),
      subtitle: t("pgHubG3Subtitle"),
      readTime: t("pgHubG3ReadTime"),
      targetAge: t("pgHubG3TargetAge"),
      category: t("pgHubG3Category"),
      coreQuestion: t("pgHubG3Question"),
      summary: t("pgHubG3Summary"),
      keyTakeaways: [
        t("pgHubG3Takeaway1"),
        t("pgHubG3Takeaway2"),
        t("pgHubG3Takeaway3"),
      ],
      recommendedFor: t("pgHubG3Recommended"),
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200"
    },
    {
      id: "guide-silly-mistakes",
      slug: "why-smart-children-make-silly-math-mistakes",
      title: t("pgHubG4Title"),
      subtitle: t("pgHubG4Subtitle"),
      readTime: t("pgHubG4ReadTime"),
      targetAge: t("pgHubG4TargetAge"),
      category: t("pgHubG4Category"),
      coreQuestion: t("pgHubG4Question"),
      summary: t("pgHubG4Summary"),
      keyTakeaways: [
        t("pgHubG4Takeaway1"),
        t("pgHubG4Takeaway2"),
        t("pgHubG4Takeaway3"),
      ],
      recommendedFor: t("pgHubG4Recommended"),
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200"
    },
    {
      id: "guide-ideal-age",
      slug: "ideal-age-to-start-abacus",
      title: t("pgHubG5Title"),
      subtitle: t("pgHubG5Subtitle"),
      readTime: t("pgHubG5ReadTime"),
      targetAge: t("pgHubG5TargetAge"),
      category: t("pgHubG5Category"),
      coreQuestion: t("pgHubG5Question"),
      summary: t("pgHubG5Summary"),
      keyTakeaways: [
        t("pgHubG5Takeaway1"),
        t("pgHubG5Takeaway2"),
        t("pgHubG5Takeaway3"),
      ],
      recommendedFor: t("pgHubG5Recommended"),
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200"
    }
  ];

  return (
    <div id="parent-guides-hub" className="bg-[#FFFDF9] min-h-screen">
      {/* 1. Hero Header */}
      <section className="bg-slate-900 text-white py-16 md:py-24 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t("pgHubHeroBadge")}</span>
          </div>
          
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight max-w-4xl mx-auto">
            {t("pgHubHeroTitle")}
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            {t("pgHubHeroDesc")}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {t("pgHubPillPedagogy")}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {t("pgHubPillZeroGimmicks")}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {t("pgHubPillDedicatedCenter")}
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
                {t("pgHubPhilosophyTitle")}
              </h2>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                {t("pgHubPhilosophyDesc")}
              </p>
            </div>
            <button
              onClick={() => handleOpenDiscoveryModal("parent_guides_hub_philosophy_cta")}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3.5 rounded-full shadow-md shrink-0 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{t("pgHubPhilosophyCta")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Guide Cards Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            {t("pgHubSectionBadge")}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
            {t("pgHubSectionTitle")}
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            {t("pgHubSectionSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {parentGuides.map((guide) => (
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
                  <strong className="text-slate-900 block font-bold mb-0.5">{t("pgHubCoreDilemmaLabel")}</strong>
                  <span>"{guide.coreQuestion}"</span>
                </div>

                {/* Summary */}
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                  {guide.summary}
                </p>

                {/* Key Takeaways */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                    {t("pgHubKeyInsightsLabel")}
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
                  <span>{t("pgHubReadGuideBtn")}</span>
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
                <span>{t("pgHubDiscoveryBadge")}</span>
              </span>

              <h2 className="font-display font-black text-2xl sm:text-4xl tracking-tight leading-tight text-white">
                {t("pgHubDiscoveryTitle")}
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                {t("pgHubDiscoveryDesc")}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  type="button"
                  onClick={() => handleOpenDiscoveryModal("parent_guides_hub_footer_cta")}
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t("pgHubDiscoveryCta")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/programs"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-4 rounded-full border border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>{t("pgHubViewProgramsCta")}</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800/90 rounded-3xl p-6 border border-slate-700 space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white text-sm block mb-1">
                    {t("pgHubLocationTitle")}
                  </strong>
                  <p className="leading-relaxed text-slate-300">
                    {t("pgHubLocationAddress")}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60 space-y-2">
                <span className="font-bold text-amber-300 text-[11px] block uppercase tracking-wider">
                  {t("pgHubCatchmentTitle")}
                </span>
                <p className="text-slate-400 text-[11.5px] leading-relaxed">
                  {t("pgHubCatchmentDesc")}
                </p>
              </div>

              <div className="pt-1 flex items-center justify-between text-slate-400 text-[11px]">
                <span>{t("pgHubBatchSize")}</span>
                <span>{t("pgHubMentorName")}</span>
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
