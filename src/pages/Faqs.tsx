/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import LeadForm from "../components/LeadForm";
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import { trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Abacus" | "Vedic Maths" | "School Maths";
}

export default function Faqs() {
  const { t } = useLanguage();

  const faqItems: FaqItem[] = [
    {
      id: "faq1",
      category: "Abacus",
      question: t("faq1Question"),
      answer: t("faq1Answer")
    },
    {
      id: "faq2",
      category: "Vedic Maths",
      question: t("faq2Question"),
      answer: t("faq2Answer")
    },
    {
      id: "faq3",
      category: "General",
      question: t("faq3Question"),
      answer: t("faq3Answer")
    },
    {
      id: "faq4",
      category: "General",
      question: t("faq4Question"),
      answer: t("faq4Answer")
    },
    {
      id: "faq5",
      category: "Abacus",
      question: t("faq5Question"),
      answer: t("faq5Answer")
    },
    {
      id: "faq6",
      category: "School Maths",
      question: t("faq6Question"),
      answer: t("faq6Answer")
    },
    {
      id: "faq7",
      category: "General",
      question: t("faq7Question"),
      answer: t("faq7Answer")
    },
    {
      id: "faq8",
      category: "General",
      question: t("faq8Question"),
      answer: t("faq8Answer")
    }
  ];

  // Map category tab filter
  const [selectedCategory, setSelectedCategory] = useState<"All" | "General" | "Abacus" | "Vedic Maths" | "School Maths">("All");

  // Accordion track open list
  const [openedFaqs, setOpenedFaqs] = useState<Record<string, boolean>>({
    faq1: true, // First open by default
  });

  const toggleFaq = (id: string) => {
    setOpenedFaqs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleConsultClick = () => {
    trackDemoClick("faqs_page_doubts_cta");
  };

  const categories: ("All" | "General" | "Abacus" | "Vedic Maths" | "School Maths")[] = [
    "All", "General", "Abacus", "Vedic Maths", "School Maths"
  ];

  const catMapping: Record<string, string> = {
    "All": t("faqCategoryAll"),
    "General": t("faqCategoryGeneral"),
    "Abacus": t("faqCategoryAbacus"),
    "Vedic Maths": t("faqCategoryVedic"),
    "School Maths": t("faqCategorySchool")
  };

  const filteredFaqs = selectedCategory === "All"
    ? faqItems
    : faqItems.filter(item => item.category === selectedCategory);

  return (
    <div id="faqs-page-container" className="bg-slate-50 min-h-screen">
      
      {/* 1. Header Hero Banner */}
      <section className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-orange-500/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-4 relative z-10">
          <span className="text-xs uppercase font-bold text-orange-400 bg-orange-450/10 px-3.5 py-1 rounded-full tracking-widest inline-block">
            {t("faqTitle")}
          </span>
          <h1 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-tight">
            {t("faqSubtitle")}
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {t("faqDesc")}
          </p>
        </div>
      </section>

      {/* 2. Interactive QA Accordion Content */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Accordion Left Side */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4.5 py-2 rounded-full text-xs font-semibold tracking-wider transition cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-orange-600 text-white shadow-md shadow-orange-500/10"
                      : "bg-white border border-gray-150 text-gray-600 hover:text-orange-500 hover:border-orange-500"
                  }`}
                >
                  {catMapping[cat]}
                </button>
              ))}
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {filteredFaqs.map((item) => {
                const isOpen = !!openedFaqs[item.id];
                return (
                  <div 
                    key={item.id} 
                    className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:border-orange-200 transition-all duration-200"
                  >
                    {/* Collapsible Trigger */}
                    <button
                      onClick={() => toggleFaq(item.id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left text-gray-900 font-display font-bold text-sm md:text-base hover:text-orange-600 transition-colors focus:outline-none cursor-pointer"
                    >
                      <span className="flex items-start gap-2.5">
                        <HelpCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                        <span>{item.question}</span>
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-400 shrink-0 ml-4 border rounded-full p-0.5 border-gray-100" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 ml-4 border rounded-full p-0.5 border-gray-100" />
                      )}
                    </button>

                    {/* Content Area */}
                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-[400px] border-t border-gray-50 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 py-5 text-xs md:text-sm text-gray-600 max-w-2xl leading-relaxed whitespace-pre-line">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Inquire More box */}
            <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-6 space-y-3 mt-8">
              <span className="block text-[11px] font-bold text-orange-700 uppercase tracking-widest leading-none">
                {t("faqDoubtsBadge")}
              </span>
              <h3 className="font-display font-bold text-base text-gray-950">
                {t("faqDoubtsTitle")}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t("faqDoubtsDesc")}
              </p>
              <div>
                <a
                  href="https://wa.me/919021924968"
                  onClick={handleConsultClick}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 transition"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  {t("faqChatCta")}
                </a>
              </div>
            </div>

          </div>

          {/* Lead Booking Form right side */}
          <div className="lg:col-span-5">
            <LeadForm sourceCampaign="FAQ Page Lead Capture" />
          </div>

        </div>
      </section>

    </div>
  );
}
