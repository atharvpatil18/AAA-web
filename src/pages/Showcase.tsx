/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, ChevronDown, ChevronUp, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

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
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"all" | "stories" | "gallery">(defaultTab);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [selectedItem, setSelectedItem] = useState<SuccessItem | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCtaClick = () => {
    trackDemoClick("showcase_page_bottom_cta");
  };

  const showcaseData: SuccessItem[] = [
    {
      id: "gallery-champion-arnav",
      type: "competition",
      title: t("showcaseItem1Title"),
      tag: t("showcaseTag1"),
      achievementText: t("showcaseItem1Text"),
      imageUrl: "international_abacus_champion.webp",
      imageAlt: "Arnav Patil receiving the International Abacus Champion Trophy from Hon. Dr. Kiran Bedi and IIVA CEO",
      colorTheme: "gold",
    },
    {
      id: "gallery-double-champion-arnav",
      type: "competition",
      title: t("showcaseItem2Title"),
      tag: t("showcaseTag2"),
      achievementText: t("showcaseItem2Text"),
      imageUrl: "arnav_patil_international_1st_2025.webp",
      imageAlt: "Arnav Patil holding the 1st Rank Trophy with Neha Patil on stage",
      colorTheme: "gold",
    },
    {
      id: "gallery-business-excellence",
      type: "gallery",
      title: t("showcaseItem3Title"),
      tag: t("showcaseTag3"),
      achievementText: t("showcaseItem3Text"),
      imageUrl: "business_excellence_award_2025.webp",
      imageAlt: "Neha Patil receiving the Business Excellence Award 2025 from Sanjay Kalamkar",
      colorTheme: "gold",
    },
    {
      id: "gallery-womens-achiever",
      type: "gallery",
      title: t("showcaseItem4Title"),
      tag: t("showcaseTag4"),
      achievementText: t("showcaseItem4Text"),
      imageUrl: "neha_achiever_collage.webp",
      imageAlt: "Neha Patil receiving the Women's Achiever Award from LPBMW community leaders",
      colorTheme: "gold",
    },
    {
      id: "gallery-best-student",
      type: "gallery",
      title: t("showcaseItem5Title"),
      tag: t("showcaseTag5"),
      achievementText: t("showcaseItem5Text"),
      imageUrl: "best_student_spriha_kamat_2025_2026.webp",
      imageAlt: "Spriha Kamath holding the Best Student of the Year Trophy with Neha Patil",
      colorTheme: "teal",
    },
    {
      id: "gallery-hitanshi-bronze",
      type: "competition",
      title: t("showcaseItem6Title"),
      tag: t("showcaseTag6"),
      achievementText: t("showcaseItem6Text"),
      imageUrl: "hitanshi_collage.webp",
      imageAlt: "Hitanshi Agarwal holding her trophy and celebrating her 3rd Rank at the International Abacus Competition",
      colorTheme: "orange",
    },
    {
      id: "gallery-shreshth-champion",
      type: "competition",
      title: t("showcaseItem7Title"),
      tag: t("showcaseTag7"),
      achievementText: t("showcaseItem7Text"),
      imageUrl: "shreshth_gupta_champion_2025.webp",
      imageAlt: "Shreshth Gupta receiving the 1st Rank International Abacus Competition Trophy with Neha Patil",
      colorTheme: "gold",
    },
    {
      id: "gallery-seven-runnerups",
      type: "competition",
      title: t("showcaseItem8Title"),
      tag: t("showcaseTag8"),
      achievementText: t("showcaseItem8Text"),
      imageUrl: "seven_runner_up_stars_2025.webp",
      imageAlt: "Seven Arnav Abacus Academy students posing with their Runner-Up Trophies on stage",
      colorTheme: "teal",
    },
    {
      id: "gallery-competition-glimpses",
      type: "gallery",
      title: t("showcaseItem9Title"),
      tag: t("showcaseTag9"),
      achievementText: t("showcaseItem9Text"),
      imageUrl: "competition_glimpses_collage.webp",
      imageAlt: "Collage of students participating and celebrating awards at various abacus competitions from 2023 to 2025",
      colorTheme: "teal",
    },
    {
      id: "gallery-bliss-camp",
      type: "gallery",
      title: t("showcaseItem10Title"),
      tag: t("showcaseTag10"),
      achievementText: t("showcaseItem10Text"),
      imageUrl: "bliss_international_abacus_camp_2024.webp",
      imageAlt: "Neha Patil teaching abacus to students at Bliss International School summer camp",
      colorTheme: "orange",
    },
    {
      id: "gallery-award",
      type: "gallery",
      title: t("showcaseItem11Title"),
      tag: t("showcaseTag11"),
      achievementText: t("showcaseItem11Text"),
      imageUrl: "national_math_day_award.webp",
      imageAlt: "Neha Patil receiving Entrepreneurship Excellence Award at IIT Delhi from IIVA & IVAS",
      colorTheme: "gold",
    },
    {
      id: "gallery-devaansh-perfect-100",
      type: "competition",
      title: t("showcaseItem12Title"),
      tag: t("showcaseTag12"),
      achievementText: t("showcaseItem12Text"),
      imageUrl: "devaansh_runner_level_1.webp",
      imageAlt: "Devaansh Ganjoo holding his 100/100 Runner Level 1 trophy at Arnav Abacus Academy",
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

  // Only show items that have a photo. Remove the cards without images or having only icon as image.
  const visibleItems = showcaseData.filter(item => !!item.imageUrl);

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
            {t("showcaseBadge")}
          </span>
          <h1 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-tight">
            {t("showcaseTitle")}
          </h1>
          <p className="text-[#A2C4C9] text-xs md:text-sm font-semibold max-w-3xl mx-auto leading-relaxed">
            {t("showcaseSubtitle")}
          </p>
        </div>
      </section>

      {/* 2. Filter Navigation Tab Bar */}
      <section className="pt-12 pb-6 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {[
            { id: "all", label: t("showcaseTabAll"), count: visibleItems.length },
            { id: "stories", label: t("showcaseTabStories"), count: storiesCount },
            { id: "gallery", label: t("showcaseTabGallery"), count: galleryCount },
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
            const isExpanded = !!expandedCards[item.id];

            // Pick color theme variables
            const isTeal = item.colorTheme === "teal";
            const isOrange = item.colorTheme === "orange";
            
            const badgeBg = isTeal 
              ? "bg-[#E0FAF5] text-[#00BFA5] border-[#A3F3E4]" 
              : isOrange 
                ? "bg-[#FFF0E0] text-[#FF6321] border-[#FFD2B2]" 
                : "bg-[#FFF5CC] text-amber-700 border-[#FCE69C]";
            const borderCol = "border-vibrant-dark";
            const shadowCol = "#1A2E35";

            return (
              <div 
                key={item.id} 
                className={`bg-white border-4 ${borderCol} rounded-[32px] overflow-hidden shadow-[8px_8px_0_0_${shadowCol}] flex flex-col hover:scale-[1.01] transition-transform duration-200`}
              >
                {/* Visual Header Placeholder - Clickable Image */}
                <div 
                  className={`aspect-[4/3] w-full relative overflow-hidden flex items-center justify-center border-b-4 ${borderCol} bg-[#F3F1EC] cursor-pointer group`}
                  onClick={() => setSelectedItem(item)}
                >
                  {item.imageUrl && (
                    <img 
                      src={item.imageUrl} 
                      alt={item.imageAlt} 
                      className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  )}
                  
                  {/* Category Tag Badge in Top Left */}
                  <div className="absolute top-5 left-5 z-10 pointer-events-none">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border ${badgeBg} shadow-sm`}>
                      {item.tag}
                    </span>
                  </div>

                  {/* Click to zoom overlay hint */}
                  <div className="absolute inset-0 bg-vibrant-dark/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-white/95 text-vibrant-dark text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border-2 border-vibrant-dark shadow-sm">
                      {t("showcaseClickToExpand")}
                    </span>
                  </div>
                </div>

                {/* Card details */}
                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-display font-black text-xl md:text-2xl text-vibrant-dark tracking-tight leading-tight">
                      {item.title}
                    </h3>

                    {/* Student metadata for story items */}
                    {item.studentName && (
                      <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-gray-550 bg-[#F8F9FA] border border-gray-200 px-4 py-2 rounded-full w-fit">
                        <span>Student: {item.studentName}</span>
                        <span className="text-gray-300">•</span>
                        <span>Age: {item.age}</span>
                        <span className="text-gray-300">•</span>
                        <span>Class: {item.grade}</span>
                      </div>
                    )}

                    {/* Collapsible Section for Story / Achievement Details */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-2 pb-2 space-y-4">
                            {item.type === "transformation" ? (
                              <div className="space-y-3.5">
                                <div className="bg-[#FFF5F5] border border-red-100 rounded-2xl p-4">
                                  <span className="text-[10px] font-black uppercase text-red-500 tracking-wider block mb-1">
                                    Before AAA Classes:
                                  </span>
                                  <p className="text-xs text-gray-655 font-medium leading-relaxed">
                                    {item.beforeText}
                                  </p>
                                </div>
                                <div className="bg-[#E0FAF5]/30 border border-vibrant-teal/20 rounded-2xl p-4">
                                  <span className="text-[10px] font-black uppercase text-vibrant-teal tracking-wider block mb-1">
                                    After Mental Math:
                                  </span>
                                  <p className="text-xs text-vibrant-dark font-semibold leading-relaxed">
                                    {item.afterText}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className={`pl-4 border-l-4 ${isTeal ? 'border-vibrant-teal' : isOrange ? 'border-vibrant-orange' : 'border-vibrant-gold'} py-1 bg-[#F8F9FA] rounded-r-xl`}>
                                <p 
                                  className="text-xs md:text-sm text-gray-655 leading-relaxed font-semibold"
                                  dangerouslySetInnerHTML={{ __html: item.achievementText || "" }}
                                />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Read More / Toggle Expand Button & Trust Footer */}
                  <div className="space-y-4 pt-2">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="w-full flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-wider border-2 border-vibrant-dark bg-white text-vibrant-dark hover:bg-vibrant-cream transition-all duration-150 shadow-[4px_4px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          <span>{t("showcaseHideStory")}</span>
                          <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <span>{t("showcaseReadStory")}</span>
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-400">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-vibrant-teal" /> {t("showcaseVerified")}
                      </span>
                      <span>Arnav Abacus Academy</span>
                    </div>
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
            {t("newsCtaBadge")}
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight text-white">
            {t("showcaseBottomTitle")}
          </h2>
          <p className="text-[#FFF2E0] text-xs md:text-sm max-w-2xl mx-auto leading-relaxed font-bold">
            {t("showcaseBottomSubtitle")}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/919021924968"
              onClick={handleCtaClick}
              className="w-full sm:w-auto bg-vibrant-gold text-vibrant-dark border-2 border-vibrant-dark font-black px-8 py-5 rounded-2xl shadow-[0_6px_0_0_#1A2E35] active:translate-y-1 active:shadow-none hover:scale-[1.01] transition-all text-center"
            >
              {t("bookTrial")}
            </a>
            <Link
              to="/programs"
              className="text-xs uppercase font-black text-white tracking-widest hover:underline flex items-center gap-1"
            >
              {t("homeExamineCourses")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Image Lightbox / Description Popup Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-vibrant-dark/85 backdrop-blur-sm p-4 md:p-6"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#FFFDF9] border-4 border-vibrant-dark rounded-[32px] overflow-hidden shadow-[6px_6px_0_0_#1A2E35] md:shadow-[12px_12px_0_0_#1A2E35] max-w-3xl w-full max-h-[90vh] flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-30 bg-white hover:bg-vibrant-cream border-2 border-vibrant-dark p-2 rounded-full shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-vibrant-dark" />
              </button>

              {/* Main Content Scrollable Area */}
              <div className="overflow-y-auto flex-grow">
                {/* Image Frame */}
                <div className="aspect-[16/10] w-full bg-[#F3F1EC] flex items-center justify-center border-b-4 border-vibrant-dark relative">
                  <img
                     src={selectedItem.imageUrl}
                     alt={selectedItem.imageAlt}
                     className="w-full h-full object-contain p-4"
                  />
                  
                  {/* Badge */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border bg-white border-vibrant-dark shadow-sm text-vibrant-dark">
                      {selectedItem.tag}
                    </span>
                  </div>
                </div>

                {/* Info & Description Area */}
                <div className="p-6 md:p-8 space-y-4">
                  <h3 className="font-display font-black text-2xl md:text-3xl text-vibrant-dark tracking-tight leading-tight">
                    {selectedItem.title}
                  </h3>

                  {/* Student details if available */}
                  {selectedItem.studentName && (
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-gray-550 bg-[#F8F9FA] border border-gray-200 px-4 py-2 rounded-full w-fit">
                      <span>Student: {selectedItem.studentName}</span>
                      <span className="text-gray-300">•</span>
                      <span>Age: {selectedItem.age}</span>
                      <span className="text-gray-300">•</span>
                      <span>Class: {selectedItem.grade}</span>
                    </div>
                  )}

                  {/* Full Description text */}
                  <div className="pt-2">
                    {selectedItem.type === "transformation" ? (
                      <div className="space-y-4">
                        <div className="bg-[#FFF5F5] border border-red-100 rounded-2xl p-4">
                          <span className="text-[10px] font-black uppercase text-red-500 tracking-wider block mb-1">
                            Before AAA Classes:
                          </span>
                          <p className="text-sm text-gray-750 font-medium leading-relaxed">
                            {selectedItem.beforeText}
                          </p>
                        </div>
                        <div className="bg-[#E0FAF5]/30 border border-vibrant-teal/20 rounded-2xl p-4">
                          <span className="text-[10px] font-black uppercase text-vibrant-teal tracking-wider block mb-1">
                            After Mental Math:
                          </span>
                          <p className="text-sm text-vibrant-dark font-semibold leading-relaxed">
                            {selectedItem.afterText}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="pl-4 border-l-4 border-vibrant-teal py-1 bg-[#F8F9FA] rounded-r-xl p-4">
                        <p
                          className="text-sm md:text-base text-gray-700 leading-relaxed font-semibold"
                          dangerouslySetInnerHTML={{ __html: selectedItem.achievementText || "" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Action/Footer */}
              <div className="p-4 bg-vibrant-cream border-t-2 border-vibrant-dark flex justify-between items-center text-xs font-bold text-gray-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-vibrant-teal" /> {t("showcaseVerified")}
                </span>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="bg-vibrant-dark text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-vibrant-dark/95 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
