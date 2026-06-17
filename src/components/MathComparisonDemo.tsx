/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Brain, Star, CheckCircle2, ChevronRight, HelpCircle, Layers } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

export default function MathComparisonDemo() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"abacus" | "vedic" | "school">("abacus");
  const [compStep, setCompStep] = useState<number>(0);

  const data = {
    abacus: {
      title: t("progAbacusTitle"),
      age: t("compAbacusAge"),
      method: t("compAbacusTools"),
      brain: t("compAbacusHemi"),
      focus: t("compAbacusPurpose"),
      bullet: t("progAbacusDesc")
    },
    vedic: {
      title: t("progVedicTitle"),
      age: t("compVedicAge"),
      method: t("compVedicTools"),
      brain: t("compVedicHemi"),
      focus: t("compVedicPurpose"),
      bullet: t("progVedicDesc")
    },
    school: {
      title: t("progSchoolTitle"),
      age: t("compSchoolAge"),
      method: t("compSchoolTools"),
      brain: t("compSchoolHemi"),
      focus: t("compSchoolPurpose"),
      bullet: t("progSchoolDesc")
    }
  };

  const complementarySteps = language === "hi" ? [
    {
      label: "गणित चुनौती",
      text: "मूल्यांकन करें: (321 × 11) + 89",
      school: "तार्किक संरचना सेट करता है: पहले गुणा करें, फिर जोड़ें।",
      vedic: "गुणक 11 शॉर्टकट लागू करता है (3 लिखें, 3+2=5, 2+1=3, 1 लिखें) -> 3531।",
      abacus: "मोती विज़ुअलाइज़ेशन का उपयोग करके तुरंत मन में 89 जोड़ता है (3531 + 89 = 3620)।",
      conclusion: "कुल समय: 3 सेकंड से कम! 🚀"
    },
    {
      label: "काम की दोबारा जांच करना",
      text: "सत्यापित करें: 98 × 97 = 9506",
      school: "चरणों को साबित करने के लिए लंबे कॉलम गुणा की आवश्यकता होती है।",
      vedic: "100 से विचलन की मानसिक जांच करता है: (98-3)=95 और (2×3)=06 -> 9506।",
      abacus: "जोड़ की गति की पुष्टि करता है, छोटी गलतियों से बचाता है।",
      conclusion: "पलक झपकते ही परिणाम सत्यापित! ✅"
    }
  ] : language === "mr" ? [
    {
      label: "गणित आव्हान",
      text: "किंमत काढा: (321 × 11) + 89",
      school: "तार्किक रचना ठरवते: आधी गुणाकार करा, मग बेरीज.",
      vedic: "११ च्या गुणाकाराचा शॉर्टकट वापरतो (३ लिहा, ३+२=५, २+१=३, १ लिहा) -> ३५३१.",
      abacus: "ॲबॅकस मणी विजुअलायझेशनद्वारे त्वरित ८९ जोडतो (३५३१ + ८९ = ३६२०).",
      conclusion: "एकूण वेळ: ३ सेकंदांपेक्षा कमी! 🚀"
    },
    {
      label: "पडताळणी करणे",
      text: "पडताळणी: 98 × 97 = 9506",
      school: "नेहमीच्या गुणाकाराने आकडेमोड करावी लागते.",
      vedic: "१०० मधील विचलनाची तोंडी पडताळणी: (९८-३)=९५ आणि (२×३)=०६ -> ९५०६.",
      abacus: "बेरीजेचा अचूक वेग तपासतो आणि हातच्याची चूक टाळतो.",
      conclusion: "क्षणार्धात पडताळणी पूर्ण! ✅"
    }
  ] : [
    {
      label: "The Math Challenge",
      text: "Evaluate: (321 × 11) + 89",
      school: "Sets the logical structure: Multiply first, then add.",
      vedic: "Applies the multiplier 11 shortcut (write 3, add 3+2=5, add 2+1=3, write 1) -> 3531.",
      abacus: "Instantly adds 89 mentally using bead visualization (3531 + 89 = 3620).",
      conclusion: "Total Time: Under 3 seconds! 🚀"
    },
    {
      label: "Cross-Checking Work",
      text: "Verify: 98 × 97 = 9506",
      school: "Requires long column multiplication to prove the steps.",
      vedic: "Mentally checks deviation from 100: (98-3)=95 & (2×3)=06 -> 9506.",
      abacus: "Confirms addition speeds, avoiding small carry-forward errors.",
      conclusion: "Result verified in a blink! ✅"
    }
  ];

  return (
    <div className="bg-white border-4 border-vibrant-dark rounded-[32px] overflow-hidden shadow-[8px_8px_0_0_#1A2E35] max-w-4xl mx-auto">
      {/* Visual Header Banner */}
      <div className="bg-vibrant-dark text-white p-6 md:p-8 flex items-center justify-between border-b-4 border-vibrant-dark">
        <div className="space-y-2">
          <span className="text-[10px] bg-vibrant-gold text-vibrant-dark px-3 py-1 rounded-full font-black uppercase tracking-wider">
            {t("compTitle").split(" ")[0]}
          </span>
          <h3 className="font-display font-black text-2xl md:text-3xl tracking-tight leading-none text-white">
            {t("compTitle")}
          </h3>
          <p className="text-[#A2C4C9] text-xs font-semibold max-w-xl">
            {t("compSubtitle")}
          </p>
        </div>
        <Layers className="w-12 h-12 text-vibrant-teal hidden sm:block shrink-0 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left column: Tab selector & comparison */}
        <div className="lg:col-span-7 p-6 md:p-8 border-b-4 lg:border-b-0 lg:border-r-4 border-vibrant-dark space-y-6">
          <span className="text-[10px] text-vibrant-orange font-black uppercase tracking-wider block">
            {language === "hi" ? "चुनें और तुलना करें:" : language === "mr" ? "निवडा आणि फरक तपासा:" : "Select & Compare Methodology:"}
          </span>
          
          <div className="flex gap-2">
            {(["abacus", "vedic", "school"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-xl border-2 border-vibrant-dark text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer ${activeTab === tab ? "bg-vibrant-teal text-white shadow-none translate-y-0.5" : "bg-white text-vibrant-dark"}`}
              >
                {tab === "abacus" ? t("compHeaderAbacus") : tab === "vedic" ? t("compHeaderVedic") : t("compHeaderSchool")}
              </button>
            ))}
          </div>

          {/* Grid Information */}
          <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 space-y-4">
            <h4 className="font-display font-black text-lg text-vibrant-dark">
              {data[activeTab].title}
            </h4>
            
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-slate-100">
                <span className="font-black text-gray-400">{t("compRowTargetAge")}:</span>
                <span className="col-span-2 font-bold text-gray-700">{data[activeTab].age}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-slate-100">
                <span className="font-black text-gray-400">{t("compRowCoreTools")}:</span>
                <span className="col-span-2 font-bold text-gray-700">{data[activeTab].method}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-slate-100">
                <span className="font-black text-gray-400">{t("compRowPurpose")}:</span>
                <span className="col-span-2 font-bold text-gray-700">{data[activeTab].focus}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1.5">
                <span className="font-black text-gray-400">{t("compRowHemisphere")}:</span>
                <span className="col-span-2 font-bold text-gray-700">{data[activeTab].brain}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 bg-white p-3.5 rounded-xl border border-slate-200 font-semibold leading-relaxed">
              {data[activeTab].bullet}
            </p>
          </div>
        </div>

        {/* Right column: Interactive Complementary Flow */}
        <div className="lg:col-span-5 p-6 md:p-8 bg-vibrant-cream/20 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-1.5">
              <Brain className="w-4.5 h-4.5 text-vibrant-teal" />
              <span className="text-[10px] text-vibrant-teal font-black uppercase tracking-wider">
                {language === "hi" ? "वे मिलकर कैसे काम करते हैं:" : language === "mr" ? "त्यांचा एकत्रित वापर कसा होतो:" : "How They Work Together:"}
              </span>
            </div>

            <div className="bg-white border-2 border-vibrant-dark p-5 rounded-2xl shadow-sm space-y-3.5">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-[10px] font-black text-vibrant-orange uppercase tracking-wider">
                  {language === "hi" ? "उदाहरण परिदृश्य:" : language === "mr" ? "उदाहरण:" : "Example Scenario:"}
                </span>
                <span className="text-xs font-black text-vibrant-dark bg-[#FFF5CC] px-3 py-1 rounded-lg border border-vibrant-gold">
                  {complementarySteps[compStep].text}
                </span>
              </div>

              {/* Complementary points */}
              <div className="space-y-3 text-[11px] leading-relaxed">
                <div>
                  <strong className="text-indigo-600 block">🏫 {t("compHeaderSchool")}:</strong>
                  <p className="text-gray-500 font-bold">{complementarySteps[compStep].school}</p>
                </div>
                <div>
                  <strong className="text-amber-700 block">⚡ {t("compHeaderVedic")}:</strong>
                  <p className="text-gray-500 font-bold">{complementarySteps[compStep].vedic}</p>
                </div>
                <div>
                  <strong className="text-vibrant-teal block">🧮 {t("compHeaderAbacus")}:</strong>
                  <p className="text-gray-500 font-bold">{complementarySteps[compStep].abacus}</p>
                </div>
              </div>

              <div className="bg-vibrant-dark text-vibrant-gold font-mono font-black text-center py-2.5 rounded-xl text-sm border-2 border-vibrant-dark">
                {complementarySteps[compStep].conclusion}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-4">
            <span className="text-[10px] font-bold text-gray-400">
              {language === "hi" ? `परिदृश्य ${compStep + 1}/${complementarySteps.length}` : language === "mr" ? `टप्पा ${compStep + 1} पैकी ${complementarySteps.length}` : `Interactive Scenario ${compStep + 1} of ${complementarySteps.length}`}
            </span>
            <button
              onClick={() => setCompStep((prev) => (prev + 1) % complementarySteps.length)}
              className="px-4 py-2 border-2 border-vibrant-dark rounded-xl bg-white hover:bg-slate-50 text-xs font-black shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1 cursor-pointer"
            >
              {language === "hi" ? "अगला डेमो" : language === "mr" ? "पुढील डेमो" : "Next Demo"} <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
