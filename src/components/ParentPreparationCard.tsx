/**
 * ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-17
 * Parent Preparation Tips Card
 *
 * Governing Baseline: AAA-S4-WS-CONF-01, AAA-WS17-STEP0-SCOPE-01
 * Governing Determination: MGT-DET-S4-S3-STEP0-WS17-05
 * Academic Lead: Neha Patil (Founder & Academic Director)
 */

import React from 'react';
import { Sparkles, Smile, Pencil, Users, Brain, Clock } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface ParentPreparationCardProps {
  studentName?: string;
  programName?: string;
  className?: string;
}

export default function ParentPreparationCard({
  studentName,
  programName = 'Mathematics',
  className = '',
}: ParentPreparationCardProps) {
  const { language } = useLanguage();
  const childLabel = studentName ? studentName.trim() : 'Your child';

  const prepItems = [
    {
      icon: Smile,
      title: language === 'hi' ? 'जिज्ञासा पहले, तनाव मुक्त' : language === 'mr' ? 'जिज्ञासा प्रथम, शून्य ताण' : 'Curiosity First, Zero Stress',
      description: language === 'hi'
        ? `यह एक खोजपूर्ण सीखने का सत्र है, परीक्षा नहीं! संस्थापिका नेहा पाटिल इस बात पर ध्यान देती हैं कि ${childLabel} संख्याओं को स्वाभाविक रूप से कैसे देखता है।`
        : language === 'mr'
        ? `हे एक शोधपूर्ण अध्ययन सत्र आहे, परीक्षा नाही! संस्थापिका नेहा पाटील ${childLabel} संख्यांचे नैसर्गिक दृश्यीकरण कसे करतो यावर लक्ष केंद्रित करतात.`
        : `This is an exploratory learning session, not a test! Neha Patil focuses on how ${childLabel} visualizes numbers naturally in a welcoming, encouraging space.`,
      accentBg: 'bg-emerald-50',
      accentBorder: 'border-emerald-200',
      iconColor: 'text-emerald-600',
    },
    {
      icon: Pencil,
      title: language === 'hi' ? 'साथ में क्या लाएं' : language === 'mr' ? 'सोबत काय आणावे' : 'What to Bring',
      description: language === 'hi'
        ? 'केवल एक पेंसिल और इरेज़र। अबैकस टूल, वैदिक गणित कार्यपत्रक और एक्टिविटी शीट केंद्र पर प्रदान की जाती हैं।'
        : language === 'mr'
        ? 'फक्त एक पेन्सिल आणि खोडरबर. ॲबॅकस टूल, वैदिक गणित टेम्पलेट्स आणि ॲक्टिव्हिटी शीट्स केंद्रावर पुरवल्या जातात.'
        : 'Just a regular sharpened pencil and eraser. Tactile Soroban abacus tools, Vedic math templates, and discovery activity sheets are provided at the center.',
      accentBg: 'bg-amber-50',
      accentBorder: 'border-amber-200',
      iconColor: 'text-amber-600',
    },
    {
      icon: Users,
      title: language === 'hi' ? 'छोटे समर्पित बैच' : language === 'mr' ? 'समर्पित मायक्रो-बॅचेस' : 'Dedicated Micro-Batches',
      description: language === 'hi'
        ? 'प्रति बैच अधिकतम ५ छात्र। अध्यापन पद्धति को समझने के लिए आप पहले १० मिनट उपस्थित रह सकते हैं।'
        : language === 'mr'
        ? 'प्रति बॅच कमाल ५ विद्यार्थी. मुलांच्या शिकण्याची पद्धत अनुभवण्यासाठी आपण पहिल्या १० मिनिटांत उपस्थित राहू शकता.'
        : 'Strict maximum of 5 students per batch. You are welcome to observe the first 10 minutes to understand our child-centric teaching methodology.',
      accentBg: 'bg-blue-50',
      accentBorder: 'border-blue-200',
      iconColor: 'text-blue-600',
    },
    {
      icon: Brain,
      title: language === 'hi' ? '६-आयामी अध्ययन विश्लेषण' : language === 'mr' ? '६-आयामी अध्ययन निरीक्षण' : '6-Dimension Learning Observation',
      description: language === 'hi'
        ? `सत्र के बाद नेहा पाटिल ${childLabel} के संख्या बोध, दृश्यीकरण और एकाग्रता पर व्यक्तिगत मार्गदर्शन साझा करती हैं।`
        : language === 'mr'
        ? `सत्रानंतर नेहा पाटील ${childLabel} च्या संख्या ज्ञान, दृश्यीकरण आणि एकाग्रतेवर वैयक्तिक निरीक्षणे मांडतात.`
        : `Following the exploratory trial, Neha Patil shares personalized observations on sensory number sense, spatial visualization, pattern agility, and optimal batch placement.`,
      accentBg: 'bg-purple-50',
      accentBorder: 'border-purple-200',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className={`bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 text-left ${className}`}>
      <div className="flex items-center gap-2 mb-3.5">
        <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
        <h4 className="font-display font-bold text-sm text-slate-900 tracking-tight">
          {language === "hi" ? "डिस्कवरी सत्र की तैयारी कैसे करें" : language === "mr" ? "डिस्कव्हरी सत्राची तयारी कशी करावी" : "How to Prepare for the Discovery Session"}
        </h4>
      </div>
      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
        {language === "hi" ? `${childLabel} के ३०-४५ मिनट के सत्र को सकारात्मक व प्रेरणादायी बनाने के लिए आवश्यक जानकारी:` : language === "mr" ? `${childLabel} च्या ३०-४५ मिनिटांच्या सत्राला सकारात्मक आणि उत्साहवर्धक बनवण्यासाठी आवश्यक माहिती:` : `Everything you need to know to ensure a positive, empowering experience for ${childLabel} during their 30–45 minute exploratory session:`}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {prepItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border ${item.accentBg} ${item.accentBorder} flex flex-col justify-start transition-all`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-6 h-6 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-xs ${item.iconColor}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="font-display font-bold text-xs text-slate-900">
                  {item.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-normal">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3.5 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          {language === "hi" ? "अवधि: ३०–४५ मिनट" : language === "mr" ? "कालावधी: ३०–४५ मिनिटे" : "Duration: 30–45 minutes"}
        </span>
        <span className="font-medium text-slate-600">
          Wakad Pune Center or Online
        </span>
      </div>
    </div>
  );
}
