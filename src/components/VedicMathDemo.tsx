/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Calculator, HelpCircle, ChevronRight, ChevronLeft, RefreshCw } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

export default function VedicMathDemo() {
  const { language, t, formatNumber } = useLanguage();
  const [activeSutra, setActiveSutra] = useState<"square" | "cross" | "ekadhikena">("square");
  const [showFormula, setShowFormula] = useState(false);

  // Sutra 1 State
  const [squareNum, setSquareNum] = useState<number>(98);

  // Sutra 2 (Cross Multiplication 3x2) State
  const [crossStep, setCrossStep] = useState<number>(0);
  const numA = 123;
  const numB = 45;

  // Sutra 3 (Ekadhikena Purvena) State
  const [fiveNum, setFiveNum] = useState<number>(35);

  const steps3x2 = language === "hi" ? [
    {
      title: "चरण १: इकाइयों को सीधा गुणा करें",
      formula: "3 × 5 = 15",
      explain: "दाहिनी ओर के अंकों को गुणा करें। 5 लिखें, 1 को आगे बढ़ाएं (हासिल)।",
      highlight: "units",
      result: "उत्तर: ...5 (हासिल: 1)"
    },
    {
      title: "चरण २: दहाई और इकाई को तिरछा गुणा करें",
      formula: "(2 × 5) + (3 × 4) = 10 + 12 = 22",
      explain: "दहाई और इकाई को तिरछा गुणा करें, फिर पिछला हासिल (1) जोड़ें = 23। 3 लिखें, 2 आगे बढ़ाएं।",
      highlight: "tens-units",
      result: "उत्तर: ..35 (हासिल: 2)"
    },
    {
      title: "चरण ३: सैकड़ा और इकाई + दहाई को तिरछा गुणा करें",
      formula: "(1 × 5) + (2 × 4) = 5 + 8 = 13",
      explain: "सैकड़ा/इकाई और दहाई/दहाई को तिरछा गुणा करें, फिर पिछला हासिल (2) जोड़ें = 15। 5 लिखें, 1 आगे बढ़ाएं।",
      highlight: "hundreds-tens-units",
      result: "उत्तर: .535 (हासिल: 1)"
    },
    {
      title: "चरण ४: सैकड़ा और दहाई को तिरछा गुणा करें",
      formula: "(1 × 4) = 4",
      explain: "सबसे बाईं ओर के अंकों को तिरछा गुणा करें, फिर पिछला हासिल (1) जोड़ें = 5। 5 लिखें।",
      highlight: "hundreds-tens",
      result: "उत्तर: 5535 (हासिल: 0)"
    },
    {
      title: "चरण ५: सही अंतिम उत्तर!",
      formula: "123 × 45 = 5535",
      explain: "सभी चरण पूरे हुए! देखें कि आपने केवल एक पंक्ति में 3-अंकीय और 2-अंकीय गुणा कितनी तेजी से हल किया।",
      highlight: "all",
      result: "उत्तर: 5535 ✅"
    }
  ] : language === "mr" ? [
    {
      title: "पायरी १: एकक स्थानाचा उभा गुणाकार",
      formula: "3 × 5 = 15",
      explain: "उजवीकडील एकक स्थानच्या अंकांचा उभा गुणाकार करा. ५ खाली लिहा, १ हातचा ठेवा.",
      highlight: "units",
      result: "उत्तर: ...५ (हातचा: १)"
    },
    {
      title: "पायरी २: दशक आणि एकक अंकांचा तिरपा गुणाकार",
      formula: "(2 × 5) + (3 × 4) = 10 + 12 = 22",
      explain: "दशक आणि एकक अंकांचा तिरपा गुणाकार करा आणि पूर्वीचा हातचा (१) जोडा = २३. ३ खाली लिहा, २ हातचा ठेवा.",
      highlight: "tens-units",
      result: "उत्तर: ..३५ (हातचा: २)"
    },
    {
      title: "पायरी ३: शतक-एकक आणि दशक-दशक गुणाकार",
      formula: "(1 × 5) + (2 × 4) = 5 + 8 = 13",
      explain: "शतक आणि एकक, आणि दशक आणि दशक यांचा गुणाकार करून हातचा (२) जोडा = १५. ५ खाली लिहा, १ हातचा ठेवा.",
      highlight: "hundreds-tens-units",
      result: "उत्तर: .५३५ (हातचा: १)"
    },
    {
      title: "पायरी ४: शतक आणि दशक अंकांचा तिरपा गुणाकार",
      formula: "(1 × 4) = 4",
      explain: "शतक आणि दशक अंकांचा गुणाकार करा आणि हातचा (१) जोडा = ५. ५ खाली लिहा.",
      highlight: "hundreds-tens",
      result: "उत्तर: ५५३५ (हातचा: ०)"
    },
    {
      title: "पायरी ५: अचूक अंतिम उत्तर!",
      formula: "123 × 45 = 5535",
      explain: "सर्व पायऱ्या पूर्ण झाल्या! केवळ एका ओळीत तुम्ही ३-अंकी आणि २-अंकी गुणाकार किती जलद सोडवला ते पहा.",
      highlight: "all",
      result: "उत्तर: ५५३५ ✅"
    }
  ] : [
    {
      title: "Step 1: Multiply Units Vertically",
      formula: "3 × 5 = 15",
      explain: "Multiply the rightmost digits. Write down 5, carry forward 1.",
      highlight: "units",
      result: "Ans: ...5 (Carry: 1)"
    },
    {
      title: "Step 2: Cross-Multiply Tens & Units",
      formula: "(2 × 5) + (3 × 4) = 10 + 12 = 22",
      explain: "Cross-multiply tens and units, then add the previous carry (1) = 23. Write down 3, carry forward 2.",
      highlight: "tens-units",
      result: "Ans: ..35 (Carry: 2)"
    },
    {
      title: "Step 3: Cross-Multiply Hundreds & Units + Tens",
      formula: "(1 × 5) + (2 × 4) = 5 + 8 = 13",
      explain: "Cross-multiply hundreds/units and tens/tens, then add previous carry (2) = 15. Write down 5, carry forward 1.",
      highlight: "hundreds-tens-units",
      result: "Ans: .535 (Carry: 1)"
    },
    {
      title: "Step 4: Cross-Multiply Hundreds & Tens",
      formula: "(1 × 4) = 4",
      explain: "Cross-multiply the leftmost digits, then add previous carry (1) = 5. Write down 5.",
      highlight: "hundreds-tens",
      result: "Ans: 5535 (Carry: 0)"
    },
    {
      title: "Step 5: Perfect Final Answer!",
      formula: "123 × 45 = 5535",
      explain: "All steps complete! Look at how fast you solved a 3-digit by 2-digit multiplication in a single horizontal line.",
      highlight: "all",
      result: "Result: 5535 ✅"
    }
  ];

  // Sutra 1 computations
  const deviation = 100 - squareNum;
  const leftHalf = squareNum - deviation;
  const rightHalfVal = deviation * deviation;
  const rightHalfStr = rightHalfVal < 10 ? `0${rightHalfVal}` : `${rightHalfVal}`;
  const finalSquare = leftHalf * 100 + rightHalfVal;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 max-w-3xl mx-auto">
      {/* Tab Selector */}
      <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => { setActiveSutra("square"); setCrossStep(0); }}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none ${
            activeSutra === "square" 
              ? "bg-vibrant-teal text-white shadow-sm" 
              : "bg-white border border-slate-200 hover:border-slate-350 text-vibrant-dark"
          }`}
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          {t("vedicTabSquaring")}
        </button>
        <button
          onClick={() => { setActiveSutra("cross"); }}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none ${
            activeSutra === "cross" 
              ? "bg-vibrant-teal text-white shadow-sm" 
              : "bg-white border border-slate-200 hover:border-slate-350 text-vibrant-dark"
          }`}
        >
          <Calculator className="w-4 h-4 shrink-0" />
          {t("vedicTabMult")}
        </button>
        <button
          onClick={() => { setActiveSutra("ekadhikena"); }}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none ${
            activeSutra === "ekadhikena" 
              ? "bg-vibrant-teal text-white shadow-sm" 
              : "bg-white border border-slate-200 hover:border-slate-350 text-vibrant-dark"
          }`}
        >
          <Sparkles className="w-4 h-4 text-vibrant-gold shrink-0" />
          {t("vedicTabEndingFive")}
        </button>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Sutra 1 Interface */}
        {activeSutra === "square" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-display font-black text-xl text-vibrant-dark">
                {t("vedicTitle")}
              </h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                {t("vedicSubtitle")}
              </p>
            </div>

            {/* Slider control */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-605">
                  {language === "hi" ? "संख्या चुनें:" : language === "mr" ? "संख्या निवडा:" : "Select Number:"}
                </span>
                <span className="bg-vibrant-teal text-white text-lg font-bold px-4 py-1 rounded-xl shadow-xs">
                  {formatNumber(squareNum)}²
                </span>
              </div>
              <input
                type="range"
                min="90"
                max="99"
                value={squareNum}
                onChange={(e) => setSquareNum(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-vibrant-teal"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                <span>{formatNumber(90)}</span>
                <span>{formatNumber(95)}</span>
                <span>{formatNumber(99)}</span>
              </div>
            </div>

            {/* Step Visualization Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#FFF8F0]/70 border border-orange-100 p-4.5 rounded-2xl text-center space-y-1 hover-material-card">
                <span className="text-[10px] font-black text-vibrant-orange uppercase tracking-wider block">
                  {language === "hi" ? "चरण १: विचलन" : language === "mr" ? "पायरी १: विचलन" : "Step 1: Deficiency"}
                </span>
                <div className="font-display font-black text-xl text-vibrant-dark">
                  {formatNumber(100)} - {formatNumber(squareNum)} = <span className="text-vibrant-orange">{formatNumber(deviation)}</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">
                  {language === "hi" ? "संख्या १०० से कितनी कम है ज्ञात करें" : language === "mr" ? "दिलेली संख्या १०० पेक्षा किती कमी आहे ते काढा" : "Find how much the number is below 100"}
                </p>
              </div>

              <div className="bg-[#E0FAF5]/70 border border-teal-100 p-4.5 rounded-2xl text-center space-y-1 hover-material-card">
                <span className="text-[10px] font-black text-vibrant-teal uppercase tracking-wider block">
                  {language === "hi" ? "चरण २: बायाँ भाग" : language === "mr" ? "पायरी २: डावा भाग" : "Step 2: Left Half"}
                </span>
                <div className="font-display font-black text-xl text-vibrant-dark">
                  {formatNumber(squareNum)} - {formatNumber(deviation)} = <span className="text-vibrant-teal">{formatNumber(leftHalf)}</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">
                  {language === "hi" ? "संख्या में से विचलन घटाएं" : language === "mr" ? "संख्येतून विचलन वजा करा" : "Subtract deviation from the number"}
                </p>
              </div>

              <div className="bg-[#FFFCE0]/70 border border-amber-200 p-4.5 rounded-2xl text-center space-y-1 hover-material-card">
                <span className="text-[10px] font-black text-amber-700 uppercase tracking-wider block">
                  {language === "hi" ? "चरण ३: दायाँ भाग" : language === "mr" ? "पायरी ३: उजवा भाग" : "Step 3: Right Half"}
                </span>
                <div className="font-display font-black text-xl text-vibrant-dark">
                  {formatNumber(deviation)}² = <span className="text-amber-700">{formatNumber(rightHalfStr)}</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">
                  {language === "hi" ? "विचलन का वर्ग करें (२ अंकों में रखें)" : language === "mr" ? "विचलनाचा वर्ग करा (२ अंकी ठेवा)" : "Square the deficiency (keep as 2 digits)"}
                </p>
              </div>
            </div>

            {/* Formula Block */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800 shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-vibrant-gold uppercase tracking-wider block animate-pulse">
                  {language === "hi" ? "भागों को मिलाएं" : language === "mr" ? "भाग एकत्र करा" : "Combine Parts"}
                </span>
                <div className="font-display font-black text-2.5xl leading-none">
                  <span className="text-vibrant-teal">{formatNumber(leftHalf)}</span>
                  <span className="text-vibrant-gold"> | </span>
                  <span className="text-vibrant-orange">{formatNumber(rightHalfStr)}</span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                  {language === "hi" ? "अंतिम उत्तर" : language === "mr" ? "अंतिम उत्तर" : "Final Answer"}
                </span>
                <div className="font-display font-black text-3xl text-vibrant-gold">
                  {formatNumber(finalSquare)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sutra 2 Interface */}
        {activeSutra === "cross" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-display font-black text-xl text-vibrant-dark">
                Sutra: Urdhva Tiryagbhyam (Vertically and Crosswise)
              </h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                {language === "hi"
                  ? "क्रॉस-गुणा वेक्टर पथों का उपयोग करके किसी भी ३-अंकीय संख्या को २-अंकीय संख्या (जैसे १२३ × ४५) से चरण-दर-चरण गुणा करें!"
                  : language === "mr"
                  ? "क्रॉस-गुणा पद्धत वापरून ३-अंकी संख्येला २-अंकी संख्येने (उदा. १२३ × ४५) सोप्या टप्प्यात गुणाकार करा!"
                  : "Multiply any 3-digit number by a 2-digit number (e.g. 123 × 45) step-by-step using cross-multiplication vector pathways!"}
              </p>
            </div>

            {/* Interactive Grid Simulation */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              {/* Digit Alignments */}
              <div className="space-y-3 font-mono font-black text-2xl text-vibrant-dark tracking-widest text-center select-none bg-white p-5 rounded-2xl border border-slate-100 shadow-xs min-w-[150px]">
                <div className="flex justify-center gap-4">
                  <span className={steps3x2[crossStep].highlight.includes("hundreds") ? "text-vibrant-orange scale-110 transition-all" : "text-gray-300"}>{formatNumber(1)}</span>
                  <span className={steps3x2[crossStep].highlight.includes("tens") ? "text-vibrant-orange scale-110 transition-all" : "text-gray-400"}>{formatNumber(2)}</span>
                  <span className={steps3x2[crossStep].highlight.includes("units") ? "text-vibrant-orange scale-110 transition-all" : "text-gray-400"}>{formatNumber(3)}</span>
                </div>
                <div className="border-b-2 border-slate-200 pb-1 flex justify-center gap-4">
                  <span className="text-gray-200">×</span>
                  <span className="text-gray-200">{formatNumber(0)}</span>
                  <span className={steps3x2[crossStep].highlight.includes("tens") ? "text-vibrant-teal scale-110 transition-all" : "text-gray-400"}>{formatNumber(4)}</span>
                  <span className={steps3x2[crossStep].highlight.includes("units") ? "text-vibrant-teal scale-110 transition-all" : "text-gray-400"}>{formatNumber(5)}</span>
                </div>
                {/* Visual Math Vector Indicators */}
                <div className="text-xs text-slate-400 font-bold select-none h-6 flex items-center justify-center font-sans tracking-normal mt-1">
                  {crossStep === 0 && (language === "hi" ? "↑ केवल इकाइयां" : language === "mr" ? "↑ फक्त एकक स्थान" : "↑ Units Only")}
                  {crossStep === 1 && (language === "hi" ? "↖ दहाई/इकाई का तिरछा गुणा ↗" : language === "mr" ? "↖ दशक/एकक तिरपा गुणाकार ↗" : "↖ Cross Tens/Units ↗")}
                  {crossStep === 2 && (language === "hi" ? "↖ सैकड़ा/इकाई और दहाई का तिरछा गुणा ↗" : language === "mr" ? "↖ शतक/एकक आणि दशक तिरपा गुणाकार ↗" : "↖ Cross Hundreds/Units & Tens ↗")}
                  {crossStep === 3 && (language === "hi" ? "↖ सैकड़ा/दहाई का तिरछा गुणा ↗" : language === "mr" ? "↖ शतक/दशक तिरपा गुणाकार ↗" : "↖ Cross Hundreds/Tens ↗")}
                  {crossStep === 4 && (language === "hi" ? "✅ हो गया!" : language === "mr" ? "✅ पूर्ण!" : "✅ Done!")}
                </div>
              </div>

              {/* Progress details */}
              <div className="flex-grow space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-vibrant-orange/10 text-vibrant-orange px-2.5 py-1 rounded-full font-black uppercase tracking-wider">
                    {formatNumber(language === "hi" ? `चरण ${crossStep + 1}/5` : language === "mr" ? `पायरी ${crossStep + 1} पैकी ५` : `Step ${crossStep + 1} of 5`)}
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    {steps3x2[crossStep].title}
                  </span>
                </div>
                <div className="font-display font-black text-lg text-vibrant-dark">
                  {formatNumber(steps3x2[crossStep].formula)}
                </div>
                <p className="text-xs text-gray-605 font-semibold leading-relaxed">
                  {formatNumber(steps3x2[crossStep].explain)}
                </p>
                <div className="bg-slate-900 text-vibrant-gold font-mono font-black text-sm p-3 rounded-xl w-fit">
                  {formatNumber(steps3x2[crossStep].result)}
                </div>
              </div>
            </div>

            {/* Stepper buttons */}
            <div className="flex justify-between items-center gap-4">
              <button
                disabled={crossStep === 0}
                onClick={() => setCrossStep((prev) => prev - 1)}
                className="px-5 py-2.5 rounded-full border border-slate-200 hover:border-slate-350 text-xs font-bold uppercase tracking-wider bg-white text-vibrant-dark disabled:opacity-40 disabled:pointer-events-none active:scale-97 transition-all flex items-center gap-1 cursor-pointer focus:outline-none"
              >
                <ChevronLeft className="w-4 h-4" /> {language === "hi" ? "पिछला" : language === "mr" ? "मागे" : "Prev"}
              </button>

              <button
                onClick={() => setCrossStep(0)}
                className="p-2.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none"
                title="Reset steps"
              >
                <RefreshCw className="w-4.5 h-4.5 text-gray-500" />
              </button>

              <button
                disabled={crossStep === steps3x2.length - 1}
                onClick={() => setCrossStep((prev) => prev + 1)}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-vibrant-teal text-white shadow-xs hover:shadow-md disabled:opacity-40 disabled:pointer-events-none active:scale-97 transition-all flex items-center gap-1 cursor-pointer focus:outline-none"
              >
                {language === "hi" ? "अगला" : language === "mr" ? "पुढे" : "Next"} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Sutra 3 Interface */}
        {activeSutra === "ekadhikena" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-display font-black text-xl text-vibrant-dark">
                {language === "hi" ? "सूत्र: एकाधिकेन पूर्वेण (५ पर समाप्त होने वाली संख्याएं)" : language === "mr" ? "सूत्र: एकाधिकेन पूर्वेण (५ ने शेवट होणाऱ्या संख्या)" : "Sutra: Ekadhikena Purvena (Numbers ending in 5)"}
              </h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                {language === "hi"
                  ? "५ पर समाप्त होने वाली किसी भी संख्या का वर्ग (जैसे ३५²) केवल ३ आसान चरणों में तुरंत ज्ञात करें!"
                  : language === "mr"
                  ? "५ ने शेवट होणाऱ्या कोणत्याही संख्येचा वर्ग (उदा. ३५²) अवघ्या ३ सोप्या टप्प्यात त्वरित काढा!"
                  : "Square any number ending in 5 (e.g. 35²) instantly in 3 simple steps!"}
              </p>
            </div>

            {/* Quick Picker */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-3">
              <span className="text-xs font-bold text-gray-605 block">
                {language === "hi" ? "संख्या चुनें:" : language === "mr" ? "संख्या निवडा:" : "Choose Number:"}
              </span>
              <div className="flex flex-wrap gap-2">
                {[15, 25, 35, 45, 55, 65, 75, 85, 95].map((n) => (
                  <button
                    key={n}
                    onClick={() => setFiveNum(n)}
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer focus:outline-none ${
                      fiveNum === n
                        ? "bg-vibrant-orange text-white border-vibrant-orange shadow-sm"
                        : "bg-white text-vibrant-dark border-slate-200 hover:border-slate-350 hover:bg-slate-50"
                    }`}
                  >
                    {formatNumber(n)}
                  </button>
                ))}
              </div>
            </div>

            {/* Step computations */}
            {(() => {
              const firstDigit = Math.floor(fiveNum / 10);
              const leftPart = firstDigit * (firstDigit + 1);
              const finalSquare = fiveNum * fiveNum;

              return (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#FFF8F0]/70 border border-orange-100 p-4.5 rounded-2xl text-center space-y-1 hover-material-card">
                      <span className="text-[10px] font-black text-vibrant-orange uppercase tracking-wider block">
                        {language === "hi" ? "चरण १: पहला अंक" : language === "mr" ? "पायरी १: पहिला अंक" : "Step 1: First Digit"}
                      </span>
                      <div className="font-display font-black text-xl text-vibrant-dark">
                        {formatNumber(firstDigit)}
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {language === "hi" ? "अंतिम '५' को छोड़कर पहला अंक लें" : language === "mr" ? "शेवटचा '५' वगळता पहिला अंक घ्या" : "Take the digit before the ending 5"}
                      </p>
                    </div>

                    <div className="bg-[#E0FAF5]/70 border border-teal-100 p-4.5 rounded-2xl text-center space-y-1 hover-material-card">
                      <span className="text-[10px] font-black text-vibrant-teal uppercase tracking-wider block">
                        {language === "hi" ? "चरण २: बायाँ भाग" : language === "mr" ? "पायरी २: डावा भाग" : "Step 2: Left Half"}
                      </span>
                      <div className="font-display font-black text-xl text-vibrant-dark text-center">
                        {formatNumber(firstDigit)} × ({formatNumber(firstDigit)} + {formatNumber(1)}) = <span className="text-vibrant-teal">{formatNumber(leftPart)}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {language === "hi" ? "अंतिम '५' को छोड़कर पहले अंक को (अंक + १) से गुणा करें" : language === "mr" ? "शेवटचा '५' वगळता पहिल्या अंकाला (अंक + १) ने गुणा" : "Multiply digit by (digit + 1)"}
                      </p>
                    </div>

                    <div className="bg-[#FFFCE0]/70 border border-amber-200 p-4.5 rounded-2xl text-center space-y-1 hover-material-card">
                      <span className="text-[10px] font-black text-amber-700 uppercase tracking-wider block">
                        {language === "hi" ? "चरण ३: दायाँ भाग" : language === "mr" ? "पायरी ३: उजवा भाग" : "Step 3: Right Half"}
                      </span>
                      <div className="font-display font-black text-xl text-amber-700">
                        {formatNumber(5)}² = {formatNumber(25)}
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {language === "hi" ? "अंतिम भाग हमेशा २५ होता है" : language === "mr" ? "शेवटचा भाग नेहमी २५ असतो" : "The right half is always 25"}
                      </p>
                    </div>
                  </div>

                  {/* Combined Results */}
                  <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800 shadow-sm">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-vibrant-gold uppercase tracking-wider block animate-pulse">
                        {language === "hi" ? "भागों को मिलाएं" : language === "mr" ? "भाग एकत्र करा" : "Combine Parts"}
                      </span>
                      <div className="font-display font-black text-2.5xl leading-none">
                        <span className="text-vibrant-teal">{formatNumber(leftPart)}</span>
                        <span className="text-vibrant-gold"> | </span>
                        <span className="text-vibrant-orange">{formatNumber(25)}</span>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                        {language === "hi" ? "अंतिम उत्तर" : language === "mr" ? "अंतिम उत्तर" : "Final Answer"}
                      </span>
                      <div className="font-display font-black text-3xl text-vibrant-gold">
                        {formatNumber(fiveNum)}² = {formatNumber(finalSquare)}
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Toggle Math Formula Button */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={() => setShowFormula(!showFormula)}
            className="text-xs font-black text-vibrant-teal hover:text-vibrant-teal/80 transition-colors flex items-center gap-1.5 cursor-pointer focus:outline-none"
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            {showFormula 
              ? (language === "hi" ? "सूत्र स्पष्टीकरण छिपाएं" : language === "mr" ? "सूत्र स्पष्टीकरण लपवा" : "Hide Formula Explanation")
              : (language === "hi" ? "सूत्र स्पष्टीकरण देखें (9-14 वर्ष के लिए)" : language === "mr" ? "सूत्र स्पष्टीकरण पहा (९-१४ वर्षे)" : "Show Formula Explanation (For Ages 9-14)")
            }
          </button>
          
          {showFormula && (
            <div className="mt-4 bg-slate-50 border border-slate-150 p-5 rounded-2xl text-xs md:text-sm text-vibrant-dark space-y-3 shadow-xs">
              <h4 className="font-black text-xs md:text-sm text-vibrant-teal">
                {language === "hi" ? "बीजगणितीय प्रमाण (Algebraic Proof):" : language === "mr" ? "बीजगणितीय स्पष्टीकरण (Algebraic Proof):" : "Algebraic Proof (Sutra logic):"}
              </h4>
              {activeSutra === "square" && (
                <p className="leading-relaxed font-semibold">
                  {language === "hi" 
                    ? "यदि कोई संख्या 100 से 'd' कम है, तो (100 - d)² = 10000 - 200d + d² = 100(100 - 2d) + d² = 100(संख्या - विचलन) + विचलन²। इसलिए बायाँ भाग (संख्या - विचलन) और दायाँ भाग विचलन² है।"
                    : language === "mr"
                    ? "जर एखादी संख्या 100 पेक्षा 'd' ने कमी असेल, तर (100 - d)² = 10000 - 200d + d² = 100(100 - 2d) + d² = 100(संख्या - विचलन) + विचलन²। म्हणून डावी बाजू (संख्या - विचलन) आणि उजवी बाजू विचलन² असते."
                    : "If a number is 'd' below 100, then (100 - d)² = 10000 - 200d + d² = 100(100 - 2d) + d² = 100(Number - deviation) + deviation². Hence, the left half is (Number - deviation) and the right half is deviation²."
                  }
                </p>
              )}
              {activeSutra === "cross" && (
                <p className="leading-relaxed font-semibold">
                  {language === "hi"
                    ? "इकाइयों, दहाइयों और सैकड़ा स्थानों के सामान्य विस्तार (100a + 10b + c)(10d + e) को गुणन स्तंभों में दर्शाया गया है: 1000ad + 100(ae + bd) + 10(be + cd) + ce।"
                    : language === "mr"
                    ? "इकाई, दशक आणि शतक स्थानांचा विस्तार (100a + 10b + c)(10d + e) गुणाकारात असा होतो: 1000ad + 100(ae + bd) + 10(be + cd) + ce।"
                    : "The expansion of place values (100a + 10b + c)(10d + e) = 1000ad + 100(ae + bd) + 10(be + cd) + ce, which dictates the step-by-step vertical and crosswise multiplication."
                  }
                </p>
              )}
              {activeSutra === "ekadhikena" && (
                <p className="leading-relaxed font-semibold">
                  {language === "hi"
                    ? "5 पर समाप्त होने वाली संख्या (10x + 5)² = 100x² + 100x + 25 = 100x(x + 1) + 25 होती है। इसलिए बायाँ भाग x(x + 1) होता है और दाहिना भाग हमेशा 25 होता है।"
                    : language === "mr"
                    ? "५ ने शेवट होणारी संख्या (10x + 5)² = 100x² + 100x + 25 = 100x(x + 1) + 25 असते। म्हणून डावी बाजू x(x + 1) आणि उजवी बाजू नेहमी २५ असते."
                    : "Any number ending in 5 can be written as 10x + 5. Its square is (10x + 5)² = 100x(x + 1) + 25. This mathematically proves why the left side is x(x + 1) and the right side is always 25."
                  }
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
