/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Phone, ArrowRight, Smartphone, Compass, Sparkles, BookOpen, Star } from "lucide-react";
import { trackDemoClick } from "../lib/analytics";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: "app" | "competition" | "batch" | "general";
  tag: string;
  summary: string;
  details: string[];
  colorTheme: "teal" | "orange" | "gold";
}

export default function NewsEvents() {
  const handleCtaClick = () => {
    trackDemoClick("news_page_bottom_cta");
  };

  const newsData: NewsItem[] = [
    {
      id: "news-1",
      title: "Launching Our Parent-Student Mobile App!",
      date: "Rolling Out July 2026",
      category: "app",
      tag: "Digital Ecosystem",
      summary: "We are excited to announce the official Arnav Abacus Academy mobile app for Android and iOS, designed to digitize practice sheets and track child progression in real time.",
      details: [
        "Interactive virtual Soroban abacus for home practice.",
        "Weekly digital worksheets with speed tracking timers.",
        "Instant progress report sheets uploaded by Neha Ma'am & Nitin Sir.",
        "Gamified reward badges for consistency and homework completion."
      ],
      colorTheme: "teal",
    },
    {
      id: "news-2",
      title: "Annual IIVA State Abacus Championship 2026",
      date: "August 24, 2026 • Pune",
      category: "competition",
      tag: "Olympiad Registration",
      summary: "Registrations are officially open for the Maharashtra State Level Abacus & Vedic Mathematics competition. Over 50+ students from our Wakad center are participating.",
      details: [
        "Authorized IIVA (Indian Institute of Vedic Maths & Abacus) syllabus.",
        "Categories divided by age and completed training levels.",
        "Customized mock challenge worksheets will be solved in center daily.",
        "Medals, certificates, and state-wide rank honors for qualifiers."
      ],
      colorTheme: "gold",
    },
    {
      id: "news-3",
      title: "Vedic Maths Intensive: Speed Calculators Batch",
      date: "New Batches Starting Weekly",
      category: "batch",
      tag: "Course Enrollment",
      summary: "A specialized 3-month course for school students of Grade 5 to 10. Master high-speed mental calculations, division shortcuts, fractions, and algebra.",
      details: [
        "Completely eliminates math phobia before school examinations.",
        "Useful for Olympiads, Scholarship exams, and competitive papers.",
        "Teaches 16 sutras for speed calculation with 100% accuracy.",
        "Limited to 8 students per batch for customized focus."
      ],
      colorTheme: "orange",
    }
  ];

  return (
    <div id="news-page-container" className="bg-[#FFFDF9] min-h-screen">
      
      {/* 1. Page Header */}
      <section className="bg-vibrant-dark text-white py-16 md:py-24 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-vibrant-teal/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-4 relative z-10">
          <span className="text-[10px] font-black text-vibrant-gold bg-[#FFF5CC]/15 border border-vibrant-gold/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Academy Announcements
          </span>
          <h1 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-tight">
            News &amp; Upcoming Events
          </h1>
          <p className="text-[#A2C4C9] text-xs md:text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
            Stay updated with our latest student opportunities, competition calendars, and the digital rollout of our parent-student portal app.
          </p>
        </div>
      </section>

      {/* 2. App Rollout Highlight Feature Card (Full Width) */}
      <section className="py-16 max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-[#FFFDF9] border-4 border-vibrant-dark rounded-[32px] overflow-hidden shadow-[12px_12px_0_0_#1A2E35] grid grid-cols-1 lg:grid-cols-12">
          {/* Left panel */}
          <div className="p-8 md:p-12 lg:col-span-7 space-y-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 text-[10px] text-vibrant-teal bg-[#E0FAF5] border border-vibrant-teal/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider font-bold w-fit">
              <Smartphone className="w-3.5 h-3.5" /> COMING SOON IN JULY 2026
            </div>
            <h2 className="font-display font-black text-3xl md:text-4xl text-vibrant-dark tracking-tight leading-tight">
              Arnav Abacus Student Practice App
            </h2>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-semibold">
              We are introducing a dedicated mobile application for our registered families. This bridges the classroom learning with tactile home practice, giving parents full transparency over their child's progression.
            </p>

            {/* Checklist of app features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-vibrant-dark font-black pt-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-vibrant-teal/10 flex items-center justify-center border border-vibrant-teal/20">✓</div>
                <span>Real-time Speed Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-vibrant-teal/10 flex items-center justify-center border border-vibrant-teal/20">✓</div>
                <span>Virtual Abacus Beads Game</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-vibrant-teal/10 flex items-center justify-center border border-vibrant-teal/20">✓</div>
                <span>Homework Progress Sheets</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-vibrant-teal/10 flex items-center justify-center border border-vibrant-teal/20">✓</div>
                <span>Badges &amp; Trophies Rewards</span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-gray-400 font-bold">
              * Note: The app will be provided absolutely free for all active Wakad center students.
            </div>
          </div>

          {/* Right panel: Graphic representation of App Mockup */}
          <div className="bg-vibrant-cream lg:col-span-5 border-t-4 lg:border-t-0 lg:border-l-4 border-vibrant-dark flex items-center justify-center p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#1A2E35_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Brutalist Phone frame mockup */}
            <div className="w-64 h-96 bg-white border-4 border-vibrant-dark rounded-[24px] shadow-[6px_6px_0_0_#1A2E35] p-4 flex flex-col justify-between relative z-10">
              {/* Phone speaker notch */}
              <div className="w-24 h-4 bg-vibrant-dark rounded-full mx-auto mb-2"></div>
              
              {/* App screen mockup content */}
              <div className="flex-grow flex flex-col justify-between pt-2">
                <div className="space-y-3">
                  {/* App Brand Header */}
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-[10px] font-black text-vibrant-dark">ARNAV APP v1.0</span>
                    <span className="w-2 h-2 rounded-full bg-vibrant-teal animate-pulse"></span>
                  </div>

                  {/* Child's Profile */}
                  <div className="bg-vibrant-cream border-2 border-vibrant-dark rounded-xl p-2 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-vibrant-orange flex items-center justify-center text-white font-black text-xs">AP</div>
                    <div>
                      <h4 className="text-[10px] font-black text-vibrant-dark leading-none">Arnav Patil</h4>
                      <span className="text-[8px] text-gray-400 font-bold block mt-0.5">Level 3 Completed</span>
                    </div>
                  </div>

                  {/* Speed stats */}
                  <div className="bg-[#E0FAF5] border border-vibrant-teal/20 rounded-xl p-2 text-center">
                    <span className="text-[7px] text-vibrant-teal font-black uppercase tracking-wider block">Weekly Goal Progress</span>
                    <strong className="text-sm font-black text-vibrant-dark block mt-0.5">85 / 100 Sums</strong>
                    <div className="w-full bg-white/60 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-vibrant-teal h-full w-[85%]"></div>
                    </div>
                  </div>
                </div>

                {/* Simulated Practice Button */}
                <div className="bg-vibrant-dark text-white text-[10px] font-black py-2.5 rounded-xl text-center cursor-pointer shadow-sm">
                  Start Abacus Challenge ⚡
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. News / Events List */}
      <section className="py-8 pb-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-black text-vibrant-orange bg-[#FFF0E0] border border-[#FFD8B1] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            ACTIVE NOTICE BOARD
          </span>
          <h2 className="font-display font-black text-3xl text-vibrant-dark leading-tight">
            Academy Notice Board &amp; Calendars
          </h2>
          <p className="text-gray-550 text-xs md:text-sm font-semibold">
            Please check the event timetables below. For registration confirmations or syllabus updates, contact Neha Ma'am directly.
          </p>
        </div>

        {/* News stack */}
        <div className="space-y-12">
          {newsData.map((item) => {
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
                className={`bg-[#FFFDF9] border-4 ${borderCol} rounded-[32px] overflow-hidden shadow-[8px_8px_0_0_${shadowCol}] p-6 md:p-8 lg:p-10 flex flex-col md:flex-row gap-6 md:gap-10 hover:scale-[1.005] transition-transform`}
              >
                {/* Date marker block */}
                <div className="md:w-56 shrink-0 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black text-vibrant-orange">
                    <Calendar className="w-4 h-4" /> {item.date}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-vibrant-dark/15 shadow-sm inline-block ${badgeBg}`}>
                    {item.tag}
                  </span>
                </div>

                {/* News contents */}
                <div className="flex-grow space-y-4">
                  <h3 className="font-display font-black text-xl md:text-2xl text-vibrant-dark tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-semibold">
                    {item.summary}
                  </p>

                  {/* Bullet specifics */}
                  <ul className="space-y-2.5 pt-2">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-vibrant-dark font-black">
                        <span className={`w-1.5 h-1.5 rounded-full ${accentBg} shrink-0 mt-1.5`}></span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
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
            Have Questions About Upcoming Events?
          </h2>
          <p className="text-[#FFF2E0] text-xs md:text-sm max-w-2xl mx-auto leading-relaxed font-bold">
            We are always here to guide you. Speak to our mentors on the phone or visit the Wakad center directly.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/919021924968"
              onClick={handleCtaClick}
              className="w-full sm:w-auto bg-vibrant-gold text-vibrant-dark border-2 border-vibrant-dark font-black px-8 py-5 rounded-2xl shadow-[0_6px_0_0_#1A2E35] active:translate-y-1 active:shadow-none hover:scale-[1.01] transition-all text-center"
            >
              Contact Wakad Center
            </a>
            <Link
              to="/contact"
              className="text-xs uppercase font-black text-white tracking-widest hover:underline flex items-center gap-1"
            >
              View Center Maps <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
