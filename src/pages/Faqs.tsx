/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import LeadForm from "../components/LeadForm";
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import { trackDemoClick } from "../lib/analytics";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Abacus" | "Vedic Maths" | "School Maths";
}

export default function Faqs() {
  const faqItems: FaqItem[] = [
    {
      id: "faq1",
      category: "Abacus",
      question: "What is the ideal age to enroll my child in Abacus classes?",
      answer: "The ideal age window for starting visual abacus matches physical brain growth ratios: between 4 and 14 years old (with peak results between 5 and 9 years). During this stage, a child's brain structure is highly active and elastic, meaning they rapidly map numerical bead visuals into their subconscious spatial storage."
    },
    {
      id: "faq2",
      category: "Vedic Maths",
      question: "What is the difference between Abacus and Vedic Mathematics?",
      answer: "While both programs supercharge mental arithmetic, they rely on entirely different cognitive mechanisms and target separate age buckets:\n\n• Abacus: Designed for young children (ages 4-14) using physical, tactile bead sliding to build spatial memory. It triggers whole-brain development (left and right hemisphere connection).\n\n• Vedic Maths: Designed for older kids (ages 10+ or Class 5-10) who already understand standard multiplication tables. It leverages 16 traditional math sutras (shortcuts) to execute complex divisibility, algebra, and square roots 10x to 15x faster mentally with no visual aids."
    },
    {
      id: "faq3",
      category: "General",
      question: "Are the instructors at Arnav Abacus Academy certified?",
      answer: "Yes, 100%! Arnav Abacus Academy operates under direct faculty leadership. Founder Neha Patil is a fully IIVA (Indian Institute of Vedic Maths & Abacus) Certified Professional. Both Neha Ma’am and Nitin Sir are trained in child spatial diagnostics, classroom discipline, and stress-free academic coaching."
    },
    {
      id: "faq4",
      category: "General",
      question: "How long is each segment session, and what are the class schedules?",
      answer: "We are open seven days a week to accommodate busy schedules, offering flexible rolling sessions on both weekdays and weekends. Sessions are arranged based on individual personalized tracks to fit your child's age and focus span without causing academic fatigue."
    },
    {
      id: "faq5",
      category: "Abacus",
      question: "Will learning the visual abacus confuse my child's school math syllabus?",
      answer: "No, on the contrary! Abacus training does not conflict with CBSE, ICSE, or State syllabus counting. Rather, it supercharges the underlying calculative speed. While school teaches formulas and concepts, Abacus equips the child to perform the core arithmetic operations (adding, subtract, dividing) 10x faster with absolute precision, leading to much better grades."
    },
    {
      id: "faq6",
      category: "School Maths",
      question: "Do you provide customized coaching for class 1-10 school exams?",
      answer: "Yes. Our School Maths curriculum is designed to boost academic confidence and test performance. We analyze each child's active textbook series (NCERT, CBSE, local boards), resolve individual homework blocks, and practice extensive sample question sheets in a calm environment."
    },
    {
      id: "faq7",
      category: "General",
      question: "Do you offer online sessions or only offline batches?",
      answer: "Our primary expertise is in premium hand-guided offline batches at our bungalow center, opposite Creative Cameo, ensuring child focus, personal tutor safety, and visual bead engagement. For specialized cases or advanced Vedic math segments, online batches are coordinated on request of the parent."
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
            Frequently Asked Queries
          </span>
          <h1 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-tight">
            Answering Your Mathematical Doubts
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Need clarity on visual bead exercises, curriculum levels, or fee discount waivers? Browse our verified parent answers below.
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
                  {cat}
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
                Still have unanswered doubts?
              </span>
              <h3 className="font-display font-bold text-base text-gray-950">
                Direct WhatsApp consultation with Neha Ma'am
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Connect and directly ask Neha Ma’am about customized kid levels, batch fee scales, custom timetables, and our classroom setup.
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
                  Chat Directly over WhatsApp
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
