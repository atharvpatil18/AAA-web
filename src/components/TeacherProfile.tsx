/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Award, Heart, CheckCircle2, Star, ShieldCheck, Mail, Phone, MapPin, GraduationCap, Sparkles } from "lucide-react";
import { trackWhatsAppClick, trackCounsellingBook } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

export default function TeacherProfile() {
  const { language, t } = useLanguage();
  const [imgFailed, setImgFailed] = React.useState(false);

  const handleConsultClick = () => {
    trackCounsellingBook({
      source: "teacher_profile_consult",
      program: "Founder Consultation",
      deliveryMode: "offline_and_online",
    });
    trackWhatsAppClick("teacher_profile_consult", "founder_mentorship");
  };

  const verifiedCredentials = [
    t("teacherProfileCert1"),
    t("teacherProfileCert2"),
    t("teacherProfileCert3"),
    t("teacherProfileCert4"),
    t("teacherProfileCert5")
  ];

  return (
    <div 
      id="teacher-profile-card" 
      className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl max-w-5xl mx-auto overflow-hidden relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Photo Column */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative">
            {/* Avatar wrapper */}
            <div className="w-52 h-52 md:w-60 md:h-60 rounded-3xl bg-slate-900 p-1 shadow-lg relative overflow-hidden border-2 border-slate-200 flex items-center justify-center">
              {!imgFailed ? (
                <img 
                  src="/teacher-profile.jpg" 
                  alt={language === "mr" ? "नेहा पाटील - संस्थापिका आणि शैक्षणिक संचालिका, अर्णव ॲबॅकस अकॅडमी वाकड पुणे" : language === "hi" ? "नेहा पाटिल - संस्थापिका और शैक्षणिक निदेशिका, अर्णव एबाकस एकेडमी वाकड पुणे" : "Neha Patil - Founder & Academic Director, Arnav Abacus Academy Wakad Pune"} 
                  className="w-full h-full rounded-2xl object-cover" 
                  loading="lazy"
                  decoding="async"
                  width={240}
                  height={240}
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-slate-900 flex flex-col items-center justify-center p-4 text-center text-white">
                  <span className="font-display font-black text-6xl text-amber-400">NP</span>
                  <span className="font-bold text-lg mt-2 block">{language === "mr" ? "नेहा पाटील" : language === "hi" ? "नेहा पाटिल" : "Neha Patil"}</span>
                  <span className="text-[10px] text-teal-300 font-bold uppercase tracking-wider block mt-1">
                    IIVA Certified Mentor
                  </span>
                </div>
              )}
            </div>

            {/* Float badge */}
            <div className="absolute -bottom-3 -right-3 bg-slate-900 text-white p-2.5 sm:p-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700">
              <Star className="w-4 h-4 text-amber-400 fill-current animate-pulse" />
              <div>
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">{t("teacherTopRated")}</span>
                <span className="block text-xs font-black text-white leading-none mt-0.5">Wakad, Pune</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center bg-slate-50 border border-slate-200/80 p-4 rounded-2xl max-w-xs shadow-xs">
            <span className="block text-[11px] font-black text-orange-600 uppercase tracking-widest text-center mb-1">
              {t("teacherMicroBatchLabel")}
            </span>
            <p className="text-xs text-slate-600 font-medium leading-relaxed text-center">
              {t("teacherMicroBatchDesc")}
            </p>
          </div>
        </div>

        {/* Text Details Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              <Award className="w-4 h-4 text-orange-600" />
              {t("teacherBadge")}
            </span>
            <h3 className="font-display font-black text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight">
              {t("teacherMeetNeha")}
            </h3>
            <p className="font-display font-semibold text-sm md:text-base text-slate-600 italic">
              {t("teacherPhilosophy")}
            </p>
          </div>

          <div className="text-slate-600 text-xs md:text-sm leading-relaxed space-y-3 font-medium">
            <p>
              {t("teacherBioP1")}
            </p>
            <p>
              {t("teacherBioP2")}
            </p>
          </div>

          {/* Verified Credentials Checklist */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 block">
              {t("teacherCredentialsHeading")}
            </span>
            {verifiedCredentials.map((cert, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>{cert}</span>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://wa.me/919021924968?text=Hello%20Neha%20Ma'am!%20I%20would%20like%20to%20book%20a%20Parent%20Counselling%20Session%20for%20my%20child."
              onClick={handleConsultClick}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
            >
              <span>{t("teacherConsultBtn")}</span>
            </a>
            <div className="text-slate-500 text-xs font-semibold flex items-center gap-1.5 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{t("teacherFreeDiag")}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
