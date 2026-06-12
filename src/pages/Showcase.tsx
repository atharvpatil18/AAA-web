/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, Award, Sparkles, Star, Heart, Camera, ArrowRight, ShieldCheck } from "lucide-react";
import { trackDemoClick } from "../lib/analytics";

interface SuccessItem {
  id: string;
  type: "transformation" | "competition" | "gallery";
  title: string;
  studentName?: string;
  age?: string;
  grade?: string;
  achievementText?: string;
  beforeText?: string;
  afterText?: string;
  imageAlt: string;
  tag: string;
  colorTheme: "teal" | "orange" | "gold";
}

export default function Showcase() {
  const [activeTab, setActiveTab] = useState<"all" | "transformation" | "competition" | "gallery">("all");

  const handleCtaClick = () => {
    trackDemoClick("showcase_page_bottom_cta");
  };

  const showcaseData: SuccessItem[] = [
    {
      id: "story-1",
      type: "transformation",
      title: "Zeroing Down Silly Mistakes",
      studentName: "Arnav Patil",
      age: "9 Years",
      grade: "Grade 4",
      tag: "Math Transformation",
      beforeText: "Struggled with homework concentration, consistently made silly addition/subtraction errors due to exam anxiety.",
      afterText: "Developed photographic memory using 5-rod Soroban mental abacus. Silly mistakes reduced to zero, scores improved by 35%!",
      imageAlt: "Student practicing abacus visualization",
      colorTheme: "teal",
    },
    {
      id: "story-2",
      type: "competition",
      title: "State Abacus Olympiad Champion",
      studentName: "Aditya Deshmukh",
      age: "11 Years",
      grade: "Grade 6",
      tag: "Competition Gold",
      achievementText: "Bagged Gold Medal at the National Mental Arithmetic Competition (IIVA and SmartKid association), solving 100 sums in 8 minutes flat.",
      imageAlt: "Student holding award certificate",
      colorTheme: "gold",
    },
    {
      id: "story-3",
      type: "transformation",
      title: "Conquering School Board Fear",
      studentName: "Riya Sharma",
      age: "13 Years",
      grade: "Grade 8",
      tag: "Vedic Math Speed",
      beforeText: "Feared long divisions, algebra, and square roots. Solved papers slowly, leaving 20% of questions unattempted.",
      afterText: "Learned 16 sutras of Vedic Mathematics. Now performs calculations 10x faster. Scored a perfect 100/100 in math finals!",
      imageAlt: "Student solving algebraic sums on board",
      colorTheme: "orange",
    },
    {
      id: "story-4",
      type: "competition",
      title: "National Scholarship Achiever",
      studentName: "Karan Joshi",
      age: "10 Years",
      grade: "Grade 5",
      tag: "Competitive Edge",
      achievementText: "Qualified for the National level IPM & Scholarship exam with an state-wide rank. Solved complex fraction and decimal series mentally.",
      imageAlt: "Proud student holding scholarship badge",
      colorTheme: "teal",
    },
    {
      id: "gallery-1",
      type: "gallery",
      title: "Annual Abacus Certification Exam",
      tag: "Wakad Center Event",
      achievementText: "Snapshots of our young champions sitting for their level-up exams under IIVA guidelines. 100% of our students cleared with distinction!",
      imageAlt: "Students writing certification test",
      colorTheme: "orange",
    },
    {
      id: "gallery-2",
      type: "gallery",
      title: "Vedic Maths Boot Camp 2025",
      tag: "Interactive Workshop",
      achievementText: "Interactive group practice sessions where middle school students mastered mental calendar tricks, squares, and division shortcuts.",
      imageAlt: "Group of students in a high-energy workshop",
      colorTheme: "gold",
    },
    {
      id: "gallery-3",
      type: "gallery",
      title: "Parents-Teachers Appreciation Meet",
      tag: "Academy Fellowship",
      achievementText: "A warm gathering sharing individual progress sheets, student behavioral improvements, and custom spatial skill developments.",
      imageAlt: "Teachers interacting with parents at center",
      colorTheme: "teal",
    },
    {
      id: "gallery-4",
      type: "gallery",
      title: "Weekly Practice Medal Ceremony",
      tag: "Student Motivation",
      achievementText: "Rewarding weekly stars for consistency and neat abacus workbook submissions to build self-confidence and regular practice habits.",
      imageAlt: "Child receiving a medal from Neha Patil",
      colorTheme: "orange",
    }
  ];

  const filteredItems = activeTab === "all" 
    ? showcaseData 
    : showcaseData.filter(item => item.type === activeTab);

  return (
    <div id="showcase-page-container" className="bg-[#FFFDF9] min-h-screen">
      
      {/* 1. Page Header */}
      <section className="bg-vibrant-dark text-white py-16 md:py-24 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-vibrant-teal/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-4 relative z-10">
          <span className="text-[10px] font-black text-vibrant-gold bg-[#FFF5CC]/15 border border-vibrant-gold/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Proven Results &amp; Memories
          </span>
          <h1 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-tight">
            Our Achievements &amp; Gallery Showcase
          </h1>
          <p className="text-[#A2C4C9] text-xs md:text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
            See the real transformation of students at Arnav Abacus Academy. From building photographic memory to winning national trophies and enjoying daily classes.
          </p>
        </div>
      </section>

      {/* 2. Filter Navigation Tab Bar */}
      <section className="pt-12 pb-6 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {[
            { id: "all", label: "✨ View All", count: showcaseData.length },
            { id: "transformation", label: "📈 Success Transformations", count: showcaseData.filter(x => x.type === "transformation").length },
            { id: "competition", label: "🏆 Competition Trophies", count: showcaseData.filter(x => x.type === "competition").length },
            { id: "gallery", label: "📸 Activity Gallery", count: showcaseData.filter(x => x.type === "gallery").length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-vibrant-dark transition-all duration-150 shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none ${
                activeTab === tab.id
                  ? "bg-vibrant-orange text-white shadow-none translate-y-0.5"
                  : "bg-white text-vibrant-dark hover:bg-vibrant-cream"
              }`}
            >
              {tab.label} <span className="ml-1 opacity-70">({tab.count})</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Items Grid */}
      <section className="py-8 pb-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredItems.map((item) => {
            // Pick color theme variables
            const isTeal = item.colorTheme === "teal";
            const isOrange = item.colorTheme === "orange";
            const isGold = item.colorTheme === "gold";
            
            const badgeBg = isTeal ? "bg-[#E0FAF5] text-vibrant-teal" : isOrange ? "bg-[#FFF0E0] text-vibrant-orange" : "bg-[#FFF5CC] text-amber-700";
            const borderCol = "border-vibrant-dark";
            const shadowCol = "#1A2E35";
            const accentBg = isTeal ? "bg-vibrant-teal" : isOrange ? "bg-vibrant-orange" : "bg-vibrant-gold";

            return (
              <div 
                key={item.id} 
                className={`bg-[#FFFDF9] border-4 ${borderCol} rounded-[32px] overflow-hidden shadow-[8px_8px_0_0_${shadowCol}] flex flex-col hover:scale-[1.01] transition-transform duration-200`}
              >
                {/* Visual Header Placeholder - Dynamic CSS Gradients representing classroom concepts */}
                <div className={`h-48 relative overflow-hidden flex items-center justify-center border-b-4 ${borderCol} ${accentBg}/15`}>
                  {/* Decorative background grid pattern */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1A2E35_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {/* Styled visual badges */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-vibrant-dark/15 shadow-sm ${badgeBg}`}>
                      {item.tag}
                    </span>
                  </div>

                  {/* Icon representation in place of standard images to look incredibly premium */}
                  <div className="z-10 flex flex-col items-center gap-2">
                    <div className={`w-16 h-16 rounded-2xl bg-white border-2 ${borderCol} flex items-center justify-center shadow-md`}>
                      {item.type === "transformation" ? (
                        <Sparkles className="w-8 h-8 text-vibrant-teal" />
                      ) : item.type === "competition" ? (
                        <Trophy className="w-8 h-8 text-vibrant-gold fill-current" />
                      ) : (
                        <Camera className="w-8 h-8 text-vibrant-orange" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Card details */}
                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-display font-black text-xl text-vibrant-dark tracking-tight leading-tight">
                      {item.title}
                    </h3>

                    {/* Student metadata for story items */}
                    {item.studentName && (
                      <div className="flex items-center gap-3 text-xs font-bold text-gray-500 bg-vibrant-cream border border-gray-200 px-3 py-1.5 rounded-xl w-fit">
                        <span>👦 {item.studentName}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span>🎂 {item.age}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span>🏫 {item.grade}</span>
                      </div>
                    )}

                    {/* Main content body */}
                    {item.type === "transformation" ? (
                      <div className="space-y-3.5 pt-1">
                        <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4">
                          <span className="text-[10px] font-black uppercase text-red-500 tracking-wider block mb-1">Before AAA Classes:</span>
                          <p className="text-xs text-gray-600 font-medium leading-relaxed">
                            {item.beforeText}
                          </p>
                        </div>
                        <div className="bg-[#E0FAF5]/30 border border-vibrant-teal/10 rounded-2xl p-4">
                          <span className="text-[10px] font-black uppercase text-vibrant-teal tracking-wider block mb-1">After Mental Math:</span>
                          <p className="text-xs text-vibrant-dark font-semibold leading-relaxed">
                            {item.afterText}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs md:text-sm text-gray-650 leading-relaxed font-semibold">
                        {item.achievementText}
                      </p>
                    )}
                  </div>

                  {/* Trust Footer mark */}
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-vibrant-teal" /> Verified Success
                    </span>
                    <span>Arnav Abacus Wakad</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Bottom CTA Section */}
      <section className="py-20 md:py-28 bg-[#FF6321] text-white border-t-4 border-vibrant-dark relative">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            ⚡ Admissions Open for New Batches
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight text-white">
            Let Your Child Be Our Next Success Story!
          </h2>
          <p className="text-[#FFF2E0] text-xs md:text-sm max-w-2xl mx-auto leading-relaxed font-bold">
            Every child has the innate power to calculate at photographic speeds. Give them a complimentary learning assessment.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/919021924968"
              onClick={handleCtaClick}
              className="w-full sm:w-auto bg-vibrant-gold text-vibrant-dark border-2 border-vibrant-dark font-black px-8 py-5 rounded-2xl shadow-[0_6px_0_0_#1A2E35] active:translate-y-1 active:shadow-none hover:scale-[1.01] transition-all text-center"
            >
              Book Complimentary Trial
            </a>
            <Link
              to="/programs"
              className="text-xs uppercase font-black text-white tracking-widest hover:underline flex items-center gap-1"
            >
              Explore Course Outlines <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
