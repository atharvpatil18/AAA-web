/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import DemoBookingModal from "../components/DemoBookingModal";
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
  Brain,
  HelpCircle,
  Clock,
  Users,
  Target,
  Zap,
  CheckCircle2,
  Calendar
} from "lucide-react";
import LeadForm from "../components/LeadForm";
import { trackProgramView, trackWhatsAppClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

export default function ProgramMentalMaths() {
  const { language, t } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    trackProgramView("Mental Mathematics", "canonical_program_hub");
  }, []);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Mental Mathematics & Speed Arithmetic Program",
    "description": "High-agility mental arithmetic, lightning numerical recall, and cognitive visualization coaching for school students in Wakad, Pune.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://aaa-web-b0h.pages.dev/"
    },
    "educationalCredentialAwarded": "Certificate in Mental Arithmetic Excellence",
    "audience": {
      "@type": "Audience",
      "audienceType": "School students aged 6 to 14 seeking speed, accuracy and mental agility"
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
        "item": "https://aaa-web-b0h.pages.dev/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Programs",
        "item": "https://aaa-web-b0h.pages.dev/programs"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Mental Mathematics",
        "item": "https://aaa-web-b0h.pages.dev/programs/mental-maths"
      }
    ]
  };

  const handleConsult = () => {
    trackWhatsAppClick("program_mental_maths_counselling", "mental_math_inquiry");
    const waText = encodeURIComponent(
      "Hello Arnav Abacus Academy! I would like to inquire about the Mental Mathematics & Speed Arithmetic Program for my child."
    );
    window.open(`https://wa.me/919021924968?text=${waText}`, "_blank");
  };

  return (
    <div id="program-mental-maths-page" className="bg-[#FFFDF9] min-h-screen">
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
          <Link to="/" className="hover:text-orange-600 transition-colors">{t("navHome")}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/programs" className="hover:text-orange-600 transition-colors">{t("navPrograms")}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">{t("progMentalBreadcrumb")}</span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="bg-slate-900 text-white py-14 md:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Brain className="w-3.5 h-3.5" />
                <span>{t("progMentalHeroBadge")}</span>
              </div>
              <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
                {t("progMentalHeroTitle")}
              </h1>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                {t("progMentalHeroDesc")}
              </p>

              {/* Quick Spec Pills */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-amber-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <Clock className="w-3.5 h-3.5" /> {t("progMentalSpecAge")}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-emerald-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <Users className="w-3.5 h-3.5" /> {t("progMentalSpecRatio")}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-sky-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <MapPin className="w-3.5 h-3.5" /> {t("progMentalSpecLoc")}
                </span>
              </div>

              {/* Location Snippet */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{t("progMentalLocTitle")}</strong> {t("progMentalLocDesc")}
                </span>
              </div>
            </div>

            {/* Hero LeadForm Embed */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100">
              <div className="mb-4">
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {t("progMentalLeadBadge")}
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-2">
                  {t("progMentalLeadTitle")}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {t("progMentalLeadDesc")}
                </p>
              </div>
              <LeadForm sourceCampaign="programs_mental_maths_page" defaultProgram="Mental Mathematics" />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Who Should Join */}
      <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            {t("progMentalWhoBadge")}
          </span>
          <h2 className="font-display font-black text-3xl text-slate-900">
            {t("progMentalWhoTitle")}
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            {t("progMentalWhoSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-orange-500 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm">
              1
            </div>
            <h3 className="font-display font-black text-base text-slate-900">{t("progMentalWho1Title")}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t("progMentalWho1Desc")}
            </p>
          </div>

          <div className="bg-white border-2 border-orange-500/30 p-6 rounded-3xl space-y-3 shadow-md relative">
            <span className="absolute -top-3 right-4 bg-orange-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {t("progMentalWho2Badge")}
            </span>
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-sm">
              2
            </div>
            <h3 className="font-display font-black text-base text-slate-900">{t("progMentalWho2Title")}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t("progMentalWho2Desc")}
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-orange-500 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-black text-sm">
              3
            </div>
            <h3 className="font-display font-black text-base text-slate-900">{t("progMentalWho3Title")}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t("progMentalWho3Desc")}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Curriculum & Structured Levels */}
      <section className="py-14 md:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-14">
            <span className="text-[10px] font-bold text-orange-600 bg-orange-100 border border-orange-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              {t("progMentalLevelsBadge")}
            </span>
            <h2 className="font-display font-black text-3xl text-slate-900 leading-tight">
              {t("progMentalLevelsTitle")}
            </h2>
            <p className="text-slate-600 text-xs md:text-sm font-semibold">
              {t("progMentalLevelsSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-black text-orange-600 uppercase tracking-widest block">{t("progMentalL1Badge")}</span>
              <h3 className="font-bold text-base text-slate-900">{t("progMentalL1Title")}</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                <li>• {t("progMentalL1Point1")}</li>
                <li>• {t("progMentalL1Point2")}</li>
                <li>• {t("progMentalL1Point3")}</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-black text-teal-700 uppercase tracking-widest block">{t("progMentalL2Badge")}</span>
              <h3 className="font-bold text-base text-slate-900">{t("progMentalL2Title")}</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                <li>• {t("progMentalL2Point1")}</li>
                <li>• {t("progMentalL2Point2")}</li>
                <li>• {t("progMentalL2Point3")}</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-black text-indigo-600 uppercase tracking-widest block">{t("progMentalL3Badge")}</span>
              <h3 className="font-bold text-base text-slate-900">{t("progMentalL3Title")}</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                <li>• {t("progMentalL3Point1")}</li>
                <li>• {t("progMentalL3Point2")}</li>
                <li>• {t("progMentalL3Point3")}</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest block">{t("progMentalL4Badge")}</span>
              <h3 className="font-bold text-base text-slate-900">{t("progMentalL4Title")}</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                <li>• {t("progMentalL4Point1")}</li>
                <li>• {t("progMentalL4Point2")}</li>
                <li>• {t("progMentalL4Point3")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Teaching Methodology & AAA Learning Model */}
      <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              {t("progMentalMethodBadge")}
            </span>
            <h2 className="font-display font-black text-3xl text-slate-900 leading-tight">
              {t("progMentalMethodTitle")}
            </h2>
            <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
              {t("progMentalMethodSubtitle")}
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-slate-700"><strong>{t("progMentalMethodP1Title")}</strong> {t("progMentalMethodP1Desc")}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-slate-700"><strong>{t("progMentalMethodP2Title")}</strong> {t("progMentalMethodP2Desc")}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-slate-700"><strong>{t("progMentalMethodP3Title")}</strong> {t("progMentalMethodP3Desc")}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-slate-700"><strong>{t("progMentalMethodP4Title")}</strong> {t("progMentalMethodP4Desc")}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Award className="w-8 h-8 text-orange-500" />
              <div>
                <h3 className="font-black text-slate-900 text-lg">{t("progMentalOutHeading")}</h3>
                <span className="text-xs text-slate-500 font-medium">{t("progMentalOutSub")}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50/60 p-4 rounded-xl border border-orange-100">
                <span className="text-2xl font-black text-orange-600 block">{t("progMentalOutMetric1Val")}</span>
                <span className="text-[11px] font-bold text-slate-700">{t("progMentalOutMetric1")}</span>
              </div>
              <div className="bg-teal-50/60 p-4 rounded-xl border border-teal-100">
                <span className="text-2xl font-black text-teal-700 block">{t("progMentalOutMetric2Val")}</span>
                <span className="text-[11px] font-bold text-slate-700">{t("progMentalOutMetric2")}</span>
              </div>
              <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-100">
                <span className="text-2xl font-black text-indigo-700 block">{t("progMentalOutMetric3Val")}</span>
                <span className="text-[11px] font-bold text-slate-700">{t("progMentalOutMetric3")}</span>
              </div>
              <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
                <span className="text-2xl font-black text-emerald-700 block">{t("progMentalOutMetric4Val")}</span>
                <span className="text-[11px] font-bold text-slate-700">{t("progMentalOutMetric4")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Practice Expectations & Progress Tracking */}
      <section className="py-14 md:py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                {t("progMentalHabitBadge")}
              </span>
              <h2 className="font-display font-black text-2xl md:text-3xl text-white">
                {t("progMentalHabitTitle")}
              </h2>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                {t("progMentalHabitDesc")}
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 md:p-8 space-y-4">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-400" />
                {t("progMentalDashTitle")}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t("progMentalDashDesc")}
              </p>
              <div className="pt-2">
                <button
                  onClick={handleConsult}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-6 py-3 rounded-full transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{t("progMentalBtnTimings")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Parent FAQs */}
      <section className="py-14 md:py-20 max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            {t("progMentalFaqBadge")}
          </span>
          <h2 className="font-display font-black text-3xl text-slate-900">
            {t("progMentalFaqTitle")}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="font-bold text-sm md:text-base text-slate-900 mb-2">
              {t("progMentalQ1")}
            </h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              {t("progMentalA1")}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="font-bold text-sm md:text-base text-slate-900 mb-2">
              {t("progMentalQ2")}
            </h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              {t("progMentalA2")}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="font-bold text-sm md:text-base text-slate-900 mb-2">
              {t("progMentalQ3")}
            </h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              {t("progMentalA3")}
            </p>
          </div>
        </div>
      </section>

      {/* 8. Final Conversion CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-6">
          <h2 className="font-display font-black text-3xl md:text-5xl leading-tight">
            {t("progMentalCtaTitle")}
          </h2>
          <p className="text-orange-100 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed font-semibold">
            {t("progMentalCtaDesc")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleConsult}
              className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 font-black text-xs md:text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all cursor-pointer"
            >
              {t("progMentalCtaBtnWa")}
            </button>
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-slate-900/40 hover:bg-slate-900/60 border border-white/30 text-white font-bold text-xs md:text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all"
            >
              {t("progMentalCtaBtnVisit")}
            </Link>
          </div>
        </div>
      </section>
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultProgram="Mental Mathematics (Ages 6–14)"
        source="program_page_mental_maths"
      />
    </div>
  );
}
