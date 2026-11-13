import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Program } from "../types";
import { Check, Sparkles, Flame, GraduationCap, ArrowRight, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";
import { trackProgramView, trackWhatsAppClick, trackDemoRequest } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

interface ProgramCardProps {
  program: Program;
  key?: string | number;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const { language, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const getProgramRoute = (id: string) => {
    switch (id) {
      case "abacus":
        return "/programs/abacus";
      case "vedic-math":
        return "/programs/vedic-maths";
      case "mental-math":
        return "/programs/mental-maths";
      case "school-math":
        return "/programs/school-maths";
      case "ipm-olympiad":
        return "/programs/ipm-olympiad";
      default:
        return "/programs";
    }
  };

  const getLocalizedProgram = () => {
    switch (program.id) {
      case "abacus":
        return {
          title: t("progAbacusTitle") || program.title,
          tagline: t("progAbacusTagline") || program.tagline,
          targetAge: t("progAbacusAge") || program.targetAge,
          description: t("progAbacusDesc") || program.description,
          benefits: [t("progAbacusBenefit1"), t("progAbacusBenefit2"), t("progAbacusBenefit3"), t("progAbacusBenefit4"), t("progAbacusBenefit5")].filter(Boolean),
          curriculum: [t("progAbacusCurriculum1"), t("progAbacusCurriculum2"), t("progAbacusCurriculum3"), t("progAbacusCurriculum4"), t("progAbacusCurriculum5")].filter(Boolean),
        };
      case "vedic-math":
        return {
          title: t("progVedicTitle") || program.title,
          tagline: t("progVedicTagline") || program.tagline,
          targetAge: t("progVedicAge") || program.targetAge,
          description: t("progVedicDesc") || program.description,
          benefits: [t("progVedicBenefit1"), t("progVedicBenefit2"), t("progVedicBenefit3"), t("progVedicBenefit4"), t("progVedicBenefit5")].filter(Boolean),
          curriculum: [t("progVedicCurriculum1"), t("progVedicCurriculum2"), t("progVedicCurriculum3"), t("progVedicCurriculum4"), t("progVedicCurriculum5")].filter(Boolean),
        };
      case "mental-math":
        return {
          title: t("progMentalTitle") || program.title,
          tagline: t("progMentalTagline") || program.tagline,
          targetAge: t("progMentalAge") || program.targetAge,
          description: t("progMentalDesc") || program.description,
          benefits: [t("progMentalBenefit1"), t("progMentalBenefit2"), t("progMentalBenefit3"), t("progMentalBenefit4"), t("progMentalBenefit5")].filter(Boolean),
          curriculum: [t("progMentalCurriculum1"), t("progMentalCurriculum2"), t("progMentalCurriculum3"), t("progMentalCurriculum4"), t("progMentalCurriculum5")].filter(Boolean),
        };
      case "school-math":
        return {
          title: t("progSchoolTitle") || program.title,
          tagline: t("progSchoolTagline") || program.tagline,
          targetAge: t("progSchoolAge") || program.targetAge,
          description: t("progSchoolDesc") || program.description,
          benefits: [t("progSchoolBenefit1"), t("progSchoolBenefit2"), t("progSchoolBenefit3"), t("progSchoolBenefit4"), t("progSchoolBenefit5")].filter(Boolean),
          curriculum: [t("progSchoolCurriculum1"), t("progSchoolCurriculum2"), t("progSchoolCurriculum3"), t("progSchoolCurriculum4"), t("progSchoolCurriculum5")].filter(Boolean),
        };
      case "ipm-olympiad":
        return {
          title: t("progIpmTitle") || program.title,
          tagline: t("progIpmTagline") || program.tagline,
          targetAge: t("progIpmAge") || program.targetAge,
          description: t("progIpmDesc") || program.description,
          benefits: [t("progIpmBenefit1"), t("progIpmBenefit2"), t("progIpmBenefit3"), t("progIpmBenefit4"), t("progIpmBenefit5")].filter(Boolean),
          curriculum: [t("progIpmCurriculum1"), t("progIpmCurriculum2"), t("progIpmCurriculum3"), t("progIpmCurriculum4"), t("progIpmCurriculum5")].filter(Boolean),
        };
      default:
        return program;
    }
  };

  const localized = getLocalizedProgram();
  const title = localized.title;
  const tagline = localized.tagline;
  const targetAge = localized.targetAge;
  const description = localized.description;
  const benefits = localized.benefits.length > 0 ? localized.benefits : program.benefits;
  const curriculum = localized.curriculum.length > 0 ? localized.curriculum : program.curriculum;
  
  // Custom theme logic for coloring
  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case "amber":
        return {
          border: "border-slate-100",
          bg: "bg-white",
          text: "text-vibrant-dark",
          badge: "bg-amber-100 text-amber-800 font-bold",
          bullet: "text-amber-600 bg-amber-50",
          btn: "bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-xs hover:shadow-md active:scale-97",
          bulletCol: "bg-amber-500"
        };
      case "indigo":
        return {
          border: "border-slate-100",
          bg: "bg-white",
          text: "text-vibrant-dark",
          badge: "bg-teal-100 text-teal-800 font-bold",
          bullet: "text-teal-700 bg-teal-50",
          btn: "bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-xs hover:shadow-md active:scale-97",
          bulletCol: "bg-teal-600"
        };
      case "orange":
      default:
        return {
          border: "border-slate-100",
          bg: "bg-white",
          text: "text-vibrant-dark",
          badge: "bg-orange-100 text-orange-800 font-bold",
          bullet: "text-orange-600 bg-orange-50",
          btn: "bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-xs hover:shadow-md active:scale-97",
          bulletCol: "bg-orange-600"
        };
    }
  };

  const currentTheme = getThemeClasses(program.imageTheme);

  const handleApplyClick = () => {
    trackWhatsAppClick("program_card_book_trial", program.title);
    trackDemoRequest({
      source: "program_card",
      program: program.title,
      deliveryMode: "offline_and_online",
    });
  };

  const handleToggleExpand = () => {
    if (!isExpanded) {
      trackProgramView(program.title, "program_card_expand");
    }
    setIsExpanded(!isExpanded);
  };

  const readMoreText = language === "hi" ? "और पढ़ें" : language === "mr" ? "अधिक वाचा" : "Read More";
  const readLessText = language === "hi" ? "कम पढ़ें" : language === "mr" ? "कमी वाचा" : "Read Less";

  const shortDescription = description.split(/[.।]/)[0] + (language === "hi" || language === "mr" ? "।" : ".");

  return (
    <div 
      className={`rounded-3xl border ${currentTheme.border} ${currentTheme.bg} p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 relative group overflow-hidden`}
    >
      <div>
        {/* Badge & Target Age */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${currentTheme.badge}`}>
            {targetAge}
          </span>
          <span className="text-[11px] font-bold text-slate-500">
            {t("heroPillarSmallBatches")}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 tracking-tight leading-snug mb-2 group-hover:text-orange-600 transition-colors">
          {title}
        </h3>

        {/* Tagline */}
        <p className="text-xs font-semibold text-slate-600 italic mb-4 leading-relaxed">
          "{tagline}"
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-medium">
          {isExpanded ? description : shortDescription}
        </p>

        {/* Toggle Button */}
        <button
          onClick={handleToggleExpand}
          className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors mb-6 cursor-pointer flex items-center gap-1 focus:outline-none"
        >
          {isExpanded ? (
            <>
              {readLessText} <ChevronUp className="w-4 h-4 shrink-0" />
            </>
          ) : (
            <>
              {readMoreText} <ChevronDown className="w-4 h-4 shrink-0" />
            </>
          )}
        </button>

        {isExpanded && (
          <div className="transition-all duration-300">
            {/* Benefits Segment */}
            <div className="mb-6">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                {t("progKeyBenefits")}
              </span>
              <ul className="space-y-2.5">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-700">
                    <div className={`p-0.5 rounded-full ${currentTheme.bullet} shrink-0 mt-0.5`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <hr className="border-slate-100 my-6" />

            {/* Curriculum Checkpoints */}
            <div className="mb-8">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                {t("progCurriculum")}
              </span>
              <div className="flex flex-wrap gap-2">
                {curriculum.map((item, idx) => (
                  <span 
                    key={idx} 
                    className="bg-slate-50 border border-slate-200 text-slate-800 text-[10.5px] md:text-xs px-3 py-1.5 rounded-full font-semibold hover:bg-slate-100 transition flex items-center gap-1.5 shrink-0"
                  >
                    <span className={`w-2 h-2 rounded-full ${currentTheme.bulletCol}`}></span>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Small Batch Standard */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-6 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[11px] md:text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  {t("heroPillarSmallBatches")}
                </strong>
                <p className="text-[10.5px] md:text-xs text-slate-600 font-medium leading-relaxed">
                  {t("progSmallBatchDesc")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Button Action footer */}
      <div className="space-y-2.5 pt-4">
        <Link
          to={getProgramRoute(program.id)}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full text-center flex items-center justify-center py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer duration-150 transition-all gap-1.5 shadow-xs"
        >
          <span>{t("progExploreHub")}</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </Link>
        <a
          href="https://wa.me/919021924968"
          onClick={handleApplyClick}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full ${currentTheme.btn} rounded-full text-center flex items-center justify-center py-3 text-xs md:text-sm font-bold uppercase tracking-wider cursor-pointer duration-150 transition-all gap-2`}
        >
          <span>{t("navBookParentCounselling")}</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </a>
      </div>
    </div>
  );
}
