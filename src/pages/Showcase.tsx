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
  imageUrl?: string;
  imageAlt: string;
  tag: string;
  colorTheme: "teal" | "orange" | "gold";
}

export default function Showcase({ defaultTab = "all" }: { defaultTab?: "all" | "stories" | "gallery" }) {
  const [activeTab, setActiveTab] = useState<"all" | "stories" | "gallery">(defaultTab);

  const handleCtaClick = () => {
    trackDemoClick("showcase_page_bottom_cta");
  };

  const showcaseData: SuccessItem[] = [
    {
      id: "gallery-champion-arnav",
      type: "competition",
      title: "1st Rank at International Abacus Competition",
      tag: "International Champion",
      achievementText: "<strong>Arnav Patil</strong>, the brilliant young brand ambassador of Arnav Abacus Academy, achieved the ultimate glory by securing <strong>1st Rank</strong> at the International Abacus Competition on National Mathematics Day 2025. The champion's trophy and certificate were proudly presented by India's iconic former IPS officer and Lt. Governor, <strong>Dr. Kiran Bedi</strong>, alongside the CEO of IIVA. This monumental victory reflects the academy's commitment to cultivating elite mental arithmetic minds.",
      imageUrl: "international_abacus_champion.jpg",
      imageAlt: "Arnav Patil receiving the International Abacus Champion Trophy from Hon. Dr. Kiran Bedi and IIVA CEO",
      colorTheme: "gold",
    },
    {
      id: "gallery-double-champion-arnav",
      type: "competition",
      title: "Back-to-Back International Champion: Arnav Patil",
      tag: "Double Champion",
      achievementText: "Talk about a double victory! Within just one week, Arnav Abacus Academy’s brand ambassador, <strong>Arnav Patil</strong>, has clinched yet another <strong>1st Rank</strong> at the International level (C1 Category - Advanced Level) at the <strong>8th International Abacus Competition 2025</strong> in Pune. Razor-sharp accuracy meets relentless consistency—proving that champions aren't born, they are trained!",
      imageUrl: "arnav_patil_international_1st_2025.jpg",
      imageAlt: "Arnav Patil holding the 1st Rank Trophy with Neha Patil on stage",
      colorTheme: "gold",
    },
    {
      id: "gallery-business-excellence",
      type: "gallery",
      title: "Business Excellence Award 2025",
      tag: "Business Excellence",
      achievementText: "Arnav Abacus Academy Founder & Director, <strong>Neha Patil</strong>, was honored with the prestigious <strong>Business Excellence Award</strong> at the 8th International Abacus Competition 2025. Presented by <strong>Mr. Sanjay Kalamkar</strong>, CEO of Smart Kid Abacus Learning Pvt Ltd, this accolade celebrates her exceptional leadership, entrepreneurial vision, and dedication to raising mental math education standards globally.",
      imageUrl: "business_excellence_award_2025.jpg",
      imageAlt: "Neha Patil receiving the Business Excellence Award 2025 from Sanjay Kalamkar",
      colorTheme: "gold",
    },
    {
      id: "gallery-womens-achiever",
      type: "gallery",
      title: "Women’s Achiever Award & Community Recognition (Jan 2026)",
      tag: "Community Honors",
      achievementText: "Hattrick alert! 🏆 Arnav Abacus Academy’s visionary Founder & Director, <strong>Neha Patil</strong>, marks a remarkable three-award milestone in just one month! Honored with the prestigious <strong>Women’s Achiever Award</strong> by the Leva Patidar Bhatru Mandal Wakad (LPBMW), this special tribute celebrates her dual dedication—driving digital excellence at Wisdom World School and fostering mental arithmetic mastery at Arnav Abacus Academy. Awards from home always hit different; this recognition fuels our passion to keep elevating young minds and contributing to society!",
      imageUrl: "neha_achiever_collage.jpg",
      imageAlt: "Neha Patil receiving the Women's Achiever Award from LPBMW community leaders",
      colorTheme: "gold",
    },
    {
      id: "gallery-best-student",
      type: "gallery",
      title: "Best Student of the Year (2025-26)",
      tag: "Star Student",
      achievementText: "Meet our silent performer and supersonic star, <strong>Spriha Kamat</strong>—crowned <strong>Best Student of the Year</strong>! Spriha’s journey is defined by stellar consistency, absolute discipline, timely homework, and flawless math visualization skills. A massive shoutout to her supportive partners-in-success, Supermom <strong>Priya Kamat</strong> & Superdad <strong>Sameer Kamat</strong>, for fueling her growth!",
      imageUrl: "best_student_spriha_kamat_2025_2026.jpg",
      imageAlt: "Spriha Kamat holding the Best Student of the Year Trophy with Neha Patil",
      colorTheme: "teal",
    },
    {
      id: "gallery-hitanshi-bronze",
      type: "competition",
      title: "3rd Rank at International Abacus Competition",
      tag: "Bronze Medalist",
      achievementText: "Huge congratulations to our brilliant high-performer, <strong>Hitanshi Agarwal</strong>, for securing <strong>Rank 3</strong> at the 8th International Abacus Competition 2025 in Pune! Presented by Smart Kid Abacus Learning Pvt Ltd, this outstanding victory celebrates Hitanshi’s mental arithmetic brilliance and unwavering dedication to excellence on the global stage.",
      imageUrl: "hitanshi_collage.jpg",
      imageAlt: "Hitanshi Agarwal holding her trophy and celebrating her 3rd Rank at the International Abacus Competition",
      colorTheme: "orange",
    },
    {
      id: "gallery-shreshth-champion",
      type: "competition",
      title: "1st Rank at B1 Level International Abacus Competition",
      tag: "International Champion",
      achievementText: "A massive congratulations to our stellar math champion, <strong>Shreshth Gupta</strong>, for clinching <strong>1st Rank (B1 Level)</strong> at the 8th International Abacus Competition 2025 in Pune! Presented by Smart Kid Abacus Learning Pvt Ltd, Shreshth’s award-winning mathematical precision and exemplary dedication represent the highest standard of cognitive performance.",
      imageUrl: "shreshth_gupta_champion_2025.jpg",
      imageAlt: "Shreshth Gupta receiving the 1st Rank International Abacus Competition Trophy with Neha Patil",
      colorTheme: "gold",
    },
    {
      id: "gallery-seven-runnerups",
      type: "competition",
      title: "Runner-Up Trophies for Our Seven Stars",
      tag: "Rising Champions",
      achievementText: "Proof that confidence and smiles are the ultimate indicators of success! We are thrilled to celebrate our <strong>seven rising stars</strong>—ranging from Jr. KG to Advanced Levels—who bagged <strong>Runner-Up Trophies</strong> at the 8th International Abacus Competition 2025 in Pune. Huge congratulations to Prathamesh Zope (C2 Category), Atharva Titave (B2 Level), Hridhaan Bagla, Kriyansh Chhabria, Agastya Patil, Hitansh Agarwal, and Aarav Patil (Z Category). Your dedication makes us proud!",
      imageUrl: "seven_runner_up_stars_2025.jpg",
      imageAlt: "Seven Arnav Abacus Academy students posing with their Runner-Up Trophies on stage",
      colorTheme: "teal",
    },
    {
      id: "gallery-competition-glimpses",
      type: "gallery",
      title: "Glimpses of Glory: Competition Highlights (2023-2025)",
      tag: "Proud Moments",
      achievementText: "The secret behind our success? We do what we love, and we love what we do—especially when we see those priceless, confident smiles on our students' faces! 🌟 Take a look at these proud highlights from our active participation and stellar achievements across State, National, and International Abacus Competitions from 2023 to 2025. A massive congratulations to our young champions and a heartfelt thank you to our passionate, supportive parents for partnering in this beautiful journey!",
      imageUrl: "competition_glimpses_collage.jpg",
      imageAlt: "Collage of students participating and celebrating awards at various abacus competitions from 2023 to 2025",
      colorTheme: "teal",
    },
    {
      id: "gallery-bliss-camp",
      type: "gallery",
      title: "Abacus Excellence Camp at Bliss International (Summer 2024)",
      tag: "Summer Agility",
      achievementText: "Igniting arithmetic genius in real time! 🧠 During our Summer Camp 2024, Arnav Abacus Academy Founder & Director, <strong>Neha Patil</strong>, mentored brilliant young minds from Bliss International School in the art of Soroban abacus visualization. Don’t just take our word for it—watch their learning breakthroughs and success stories shine through their own video testimonials!",
      imageUrl: "bliss_international_abacus_camp_2024.jpg",
      imageAlt: "Neha Patil teaching abacus to students at Bliss International School summer camp",
      colorTheme: "orange",
    },
    {
      id: "gallery-award",
      type: "gallery",
      title: "National Entrepreneurship Excellence Award at IIT Delhi",
      tag: "National Recognition",
      achievementText: "Arnav Abacus Academy’s visionary Founder & Director, <strong>Neha Patil</strong>, receives the prestigious <strong>Entrepreneurship Excellence Award</strong> from IIVA & IVAS at IIT Delhi on National Mathematics Day. Handed over by the CEO and CMD of IIVA & IVAS, this national accolade celebrates her transformative impact on 150+ students through innovative Abacus & Vedic Math programs, along with earning a perfect 5-star rating across 47 Google reviews for educational excellence and trusted mentorship.",
      imageUrl: "national_math_day_award.jpg",
      imageAlt: "Neha Patil receiving Entrepreneurship Excellence Award at IIT Delhi from IIVA & IVAS",
      colorTheme: "gold",
    },
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
      tag: "Academy Event",
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

  // Filter out any item that does not have a photo (imageUrl)
  const visibleItems = showcaseData.filter(item => {
    return !!item.imageUrl;
  });

  const filteredItems = activeTab === "all" 
    ? visibleItems 
    : activeTab === "stories"
      ? visibleItems.filter(item => item.type === "transformation" || item.type === "competition")
      : visibleItems.filter(item => item.type === "gallery");

  const storiesCount = visibleItems.filter(x => x.type === "transformation" || x.type === "competition").length;
  const galleryCount = visibleItems.filter(x => x.type === "gallery").length;

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
            Our Achievements &amp; Gallery
          </h1>
          <p className="text-[#A2C4C9] text-xs md:text-sm font-semibold max-w-3xl mx-auto leading-relaxed">
            Witness the real, verified milestones of <strong>Arnav Abacus Academy</strong>. 
            From securing <strong>1st Ranks at International Abacus Competitions</strong> under Dr. Kiran Bedi's honors to receiving 
            prestigious National &amp; community entrepreneurship awards at IIT Delhi.
          </p>
        </div>
      </section>

      {/* 2. Filter Navigation Tab Bar */}
      <section className="pt-12 pb-6 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {[
            { id: "all", label: "View All", count: visibleItems.length },
            { id: "stories", label: "Success Stories", count: storiesCount },
            { id: "gallery", label: "Activity Gallery", count: galleryCount },
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
                {/* Visual Header Placeholder - Image or Gradient Icon */}
                <div className={`aspect-[4/3] w-full relative overflow-hidden flex items-center justify-center border-b-4 ${borderCol} ${item.imageUrl ? "" : `${accentBg}/15`}`}>
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.imageAlt} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      {/* Decorative background grid pattern */}
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1A2E35_1px,transparent_1px)] [background-size:16px_16px]"></div>
                      
                      {/* Icon representation */}
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
                    </>
                  )}
                  
                  {/* Styled visual badges */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-vibrant-dark/15 shadow-sm ${badgeBg}`}>
                      {item.tag}
                    </span>
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
                        <span>Student: {item.studentName}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span>Age: {item.age}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span>Class: {item.grade}</span>
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
                      <p 
                        className="text-xs md:text-sm text-gray-650 leading-relaxed font-semibold"
                        dangerouslySetInnerHTML={{ __html: item.achievementText || "" }}
                      />
                    )}
                  </div>

                  {/* Trust Footer mark */}
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-vibrant-teal" /> Verified Success
                    </span>
                    <span>Arnav Abacus Academy</span>
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
            Admissions Open for New Batches
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
