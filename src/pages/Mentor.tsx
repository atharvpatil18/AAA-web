/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import TeacherProfile from "../components/TeacherProfile";
import LeadForm from "../components/LeadForm";
import { Award, ShieldAlert, Sparkles, BookOpen, GraduationCap, Star, UserCheck } from "lucide-react";
import { trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

export default function Mentor() {
  const { t } = useLanguage();
  const handleMentorshipCta = () => {
    trackDemoClick("mentor_page_whatsapp_consult");
  };

  const corePillars = [
    {
      title: t("mentorPillar1Title"),
      desc: t("mentorPillar1Desc"),
      icon: Sparkles,
      color: "text-orange-600 bg-orange-50",
    },
    {
      title: t("mentorPillar2Title"),
      desc: t("mentorPillar2Desc"),
      icon: UserCheck,
      color: "text-amber-500 bg-amber-50",
    },
    {
      title: t("mentorPillar3Title"),
      desc: t("mentorPillar3Desc"),
      icon: GraduationCap,
      color: "text-indigo-600 bg-indigo-50",
    }
  ];

  return (
    <div id="mentor-page-container" className="bg-slate-50 min-h-screen">
      
      {/* 1. Header Banner */}
      <section className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-orange-500/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-4 relative z-10">
          <span className="text-xs uppercase font-bold text-orange-400 bg-orange-450/10 px-3.5 py-1 rounded-full tracking-widest">
            {t("mentorPageBadge")}
          </span>
          <h1 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-tight">
            {t("mentorPageTitle")}
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {t("mentorPageSubtitle")}
          </p>
        </div>
      </section>

      {/* 2. Detailed Profile Component Card container */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <TeacherProfile />
      </section>

      {/* 3. Mentor Philosophy Segment */}
      <section className="py-16 md:py-20 bg-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-3.5 py-1 rounded-full uppercase tracking-widest inline-block">
              {t("mentorPagePillarsBadge")}
            </span>
            <h2 className="font-display font-bold text-3xl text-gray-900 leading-tight">
              {t("mentorPillarsTitle")}
            </h2>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
              {t("mentorPillarsDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="bg-slate-50 border border-gray-150 rounded-2xl p-6 md:p-8 space-y-4 hover:shadow-md transition">
                  <div className={`w-12 h-12 rounded-xl ${pillar.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-gray-950">
                    {pillar.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-655 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Split Booking Segment with Lead Form */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-full uppercase tracking-widest inline-block">
              {t("mentorPageBookBadge")}
            </span>
            <h2 className="font-display font-extrabold text-3xl text-gray-900 leading-tight">
              {t("mentorConsultTitle")}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t("mentorConsultDesc")}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs md:text-sm text-gray-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span>{t("mentorPageBullet1")}</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-gray-750 font-medium">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span>{t("mentorPageBullet2")}</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-gray-750 font-medium">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span>{t("mentorPageBullet3")}</span>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="https://wa.me/919021924968"
                onClick={handleMentorshipCta}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs md:text-sm px-6 py-4 rounded-xl inline-flex items-center gap-2"
              >
                {t("mentorPageCta")}
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <LeadForm sourceCampaign="Mentor Profile Section" />
          </div>

        </div>
      </section>

    </div>
  );
}
