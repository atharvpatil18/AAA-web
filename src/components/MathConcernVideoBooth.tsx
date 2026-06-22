/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Play, Pause, AlertCircle, Brain, Target, ShieldCheck, HelpCircle, Sparkles, Quote, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../lib/LanguageContext";

interface ConcernCase {
  id: string;
  parentName: string;
  studentName: string;
  age: string;
  grade: string;
  avatar: string;
  avatarBg: string;
  // Localized Keys
  concernTitleKey: string;
  concernQuoteKey: string;
  subtitles: {
    time: string;
    speaker: "parent" | "expert";
    textKey: string;
  }[];
  abacusSolutionKey: string;
  scienceKey: string;
  academyWayKey: string;
}

export default function MathConcernVideoBooth() {
  const { language, t } = useLanguage();
  const [activeConcernId, setActiveConcernId] = useState<string>("concern-1");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeDetailTab, setActiveDetailTab] = useState<"science" | "academy">("science");
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const concerns: ConcernCase[] = [
    {
      id: "concern-1",
      parentName: "Meera (Mother)",
      studentName: "Aarav",
      age: "8 Years",
      grade: "Grade 3",
      avatar: "👩‍👦",
      avatarBg: "bg-[#FFF0E0] border-[#FFD8B1] text-orange-650",
      concernTitleKey: "concern1Title",
      concernQuoteKey: "concern1Quote",
      subtitles: [
        { time: "0:02", speaker: "parent", textKey: "c1Sub1" },
        { time: "0:06", speaker: "parent", textKey: "c1Sub2" },
        { time: "0:10", speaker: "expert", textKey: "c1Sub3" },
        { time: "0:15", speaker: "expert", textKey: "c1Sub4" }
      ],
      abacusSolutionKey: "c1Solution",
      scienceKey: "c1Science",
      academyWayKey: "c1Academy"
    },
    {
      id: "concern-2",
      parentName: "Sanjay (Father)",
      studentName: "Rohan",
      age: "10 Years",
      grade: "Grade 5",
      avatar: "👨‍👦",
      avatarBg: "bg-[#E0FAF5] border-[#A3F3E4] text-[#00BFA5]",
      concernTitleKey: "concern2Title",
      concernQuoteKey: "concern2Quote",
      subtitles: [
        { time: "0:02", speaker: "parent", textKey: "c2Sub1" },
        { time: "0:06", speaker: "parent", textKey: "c2Sub2" },
        { time: "0:10", speaker: "expert", textKey: "c2Sub3" },
        { time: "0:15", speaker: "expert", textKey: "c2Sub4" }
      ],
      abacusSolutionKey: "c2Solution",
      scienceKey: "c2Science",
      academyWayKey: "c2Academy"
    },
    {
      id: "concern-3",
      parentName: "Anjali (Mother)",
      studentName: "Siya",
      age: "7 Years",
      grade: "Grade 2",
      avatar: "👩‍👧",
      avatarBg: "bg-[#FFF5CC] border-[#FCE69C] text-amber-700",
      concernTitleKey: "concern3Title",
      concernQuoteKey: "concern3Quote",
      subtitles: [
        { time: "0:02", speaker: "parent", textKey: "c3Sub1" },
        { time: "0:06", speaker: "parent", textKey: "c3Sub2" },
        { time: "0:10", speaker: "expert", textKey: "c3Sub3" },
        { time: "0:15", speaker: "expert", textKey: "c3Sub4" }
      ],
      abacusSolutionKey: "c3Solution",
      scienceKey: "c3Science",
      academyWayKey: "c3Academy"
    },
    {
      id: "concern-4",
      parentName: "Rajesh (Father)",
      studentName: "Karan",
      age: "11 Years",
      grade: "Grade 6",
      avatar: "👨‍👧‍👦",
      avatarBg: "bg-[#E0FAF5] border-[#A3F3E4] text-[#00BFA5]",
      concernTitleKey: "concern4Title",
      concernQuoteKey: "concern4Quote",
      subtitles: [
        { time: "0:02", speaker: "parent", textKey: "c4Sub1" },
        { time: "0:06", speaker: "parent", textKey: "c4Sub2" },
        { time: "0:10", speaker: "expert", textKey: "c4Sub3" },
        { time: "0:15", speaker: "expert", textKey: "c4Sub4" }
      ],
      abacusSolutionKey: "c4Solution",
      scienceKey: "c4Science",
      academyWayKey: "c4Academy"
    },
    {
      id: "concern-5",
      parentName: "Priya (Mother)",
      studentName: "Kabir",
      age: "9 Years",
      grade: "Grade 4",
      avatar: "👩‍👧‍👦",
      avatarBg: "bg-[#FFF0E0] border-[#FFD8B1] text-orange-650",
      concernTitleKey: "concern5Title",
      concernQuoteKey: "concern5Quote",
      subtitles: [
        { time: "0:02", speaker: "parent", textKey: "c5Sub1" },
        { time: "0:06", speaker: "parent", textKey: "c5Sub2" },
        { time: "0:10", speaker: "expert", textKey: "c5Sub3" },
        { time: "0:15", speaker: "expert", textKey: "c5Sub4" }
      ],
      abacusSolutionKey: "c5Solution",
      scienceKey: "c5Science",
      academyWayKey: "c5Academy"
    }
  ];

  const activeConcern = concerns.find(c => c.id === activeConcernId) || concerns[0];

  // Simulating video playback loop
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 20) {
            return 0; // Loop video back to beginning
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeConcernId]);

  // Reset time when changing concern
  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(true);
  }, [activeConcernId]);

  // Determine current subtitle index
  const getCurrentSubtitle = () => {
    if (currentTime < 5) return activeConcern.subtitles[0];
    if (currentTime < 10) return activeConcern.subtitles[1];
    if (currentTime < 15) return activeConcern.subtitles[2];
    return activeConcern.subtitles[3];
  };

  const currentSub = getCurrentSubtitle();

  return (
    <section className="py-20 md:py-24 bg-[#FFFDF9] border-t-4 border-vibrant-dark relative">
      <div className="absolute inset-0 bg-radial from-vibrant-teal/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 relative z-10">
        
        {/* Title Heading */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[10px] font-black text-vibrant-orange bg-[#FFF0E0] border border-[#FFD8B1] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            {t("boothBadge")}
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-vibrant-dark tracking-tight leading-tight">
            {t("boothTitle")}
          </h2>
          <p className="text-gray-550 text-xs md:text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
            {t("boothSubtitle")}
          </p>
        </div>

        {/* Unified Diagnostic Dashboard Frame */}
        <div className="border-4 border-vibrant-dark rounded-[32px] overflow-hidden shadow-[8px_8px_0_0_#1A2E35] bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-vibrant-dark">
            
            {/* Subsection 1: Goal or Challenge Path Selector (Left Column) */}
            <div className="lg:col-span-5 p-5 md:p-6 bg-vibrant-cream/30 space-y-4">
              <h4 className="text-xs uppercase font-black tracking-widest text-vibrant-dark flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-vibrant-orange inline-block"></span>
                {t("boothLeftHeader")}
              </h4>
              <div className="space-y-3 max-h-[350px] lg:max-h-[500px] overflow-y-auto pr-1">
                {concerns.map(concern => {
                  const isActive = concern.id === activeConcernId;
                  return (
                    <button
                      key={concern.id}
                      onClick={() => setActiveConcernId(concern.id)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-150 flex items-center gap-4 ${
                        isActive 
                          ? "bg-vibrant-dark text-white border-vibrant-dark shadow-[4px_4px_0_0_#FF6321]"
                          : "bg-white text-vibrant-dark border-vibrant-dark/15 hover:border-vibrant-dark shadow-[2px_2px_0_0_#1A2E35] hover:bg-vibrant-cream"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 text-xl ${concern.avatarBg}`}>
                        {concern.avatar}
                      </div>
                      <div className="flex-grow space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase opacity-75">
                            {concern.parentName}
                          </span>
                          <span className="text-[9px] font-black bg-black/10 text-current px-2 py-0.5 rounded-full">
                            {concern.studentName} ({concern.age})
                          </span>
                        </div>
                        <h3 className="font-bold text-xs md:text-sm leading-snug">
                          {t(concern.concernTitleKey)}
                        </h3>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subsection 2 & 3: Video Player Screen & Solution Panel (Right Column) */}
            <div className="lg:col-span-7 flex flex-col divide-y-4 divide-vibrant-dark">
              
              {/* Subsection 2: Interactive Video screen */}
              <div className="bg-slate-950 p-6 flex flex-col justify-between overflow-hidden relative min-h-[320px] aspect-[16/10] sm:aspect-[16/9]">
                {/* Simulated scanlines/CRT overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none z-10 opacity-40" />

                {/* Top Overlay HUD */}
                <div className="flex justify-between items-center z-15">
                  <div className="flex items-center gap-2 bg-red-600/90 text-white font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-widest animate-pulse border border-red-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
                    REC: INTERACTIVE CONSULTATION
                  </div>
                </div>

                {/* Animated Video Placeholder Graphic */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-90 z-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeConcernId + "_" + (currentSub?.speaker || "parent")}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-center space-y-4"
                    >
                      {currentSub?.speaker === "parent" ? (
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-20 h-20 rounded-full bg-orange-500/10 border-4 border-dashed border-vibrant-orange flex items-center justify-center text-4xl animate-spin-slow">
                            {activeConcern.avatar}
                          </div>
                          <span className="text-white/60 text-[10px] font-black uppercase tracking-wider">
                            {activeConcern.parentName} (Parent Interview)
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-20 h-20 rounded-full bg-vibrant-teal/10 border-4 border-dashed border-vibrant-teal flex items-center justify-center text-4xl">
                            🎓
                          </div>
                          <span className="text-vibrant-teal text-[10px] font-black uppercase tracking-wider">
                            Neha Patil (Academy Director)
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Audio Waveform animation during play */}
                  {isPlaying && (
                    <div className="flex items-center gap-1 h-8 mt-6">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(bar => {
                        const randomDur = Math.random() * 0.4 + 0.3;
                        return (
                          <motion.div
                            key={bar}
                            animate={{ height: ["10%", "90%", "10%"] }}
                            transition={{ repeat: Infinity, duration: randomDur, ease: "easeInOut" }}
                            className={`w-1 rounded-full ${currentSub?.speaker === "parent" ? "bg-vibrant-orange" : "bg-vibrant-teal"}`}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Subtitle Overlay Track */}
                <div className="w-full bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-3 min-h-[56px] flex items-center justify-center text-center z-15 relative">
                  <Quote className="absolute top-2 left-2 w-3.5 h-3.5 text-white/20" />
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentSub?.textKey}
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="text-white text-xs md:text-sm font-medium leading-relaxed max-w-2xl px-6"
                    >
                      <span className={currentSub?.speaker === "parent" ? "text-vibrant-orange font-bold mr-1.5" : "text-vibrant-teal font-bold mr-1.5"}>
                        {currentSub?.speaker === "parent" ? activeConcern.parentName + ":" : "Teacher Neha:"}
                      </span>
                      {t(currentSub?.textKey || "")}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* Player Bottom Control Deck */}
              <div className="bg-[#1A2E35] p-4 flex items-center gap-4 shrink-0 z-20">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-xl bg-white hover:bg-vibrant-cream border border-vibrant-dark flex items-center justify-center shrink-0 shadow-[2px_2px_0_0_#0D171A]"
                >
                  {isPlaying ? <Pause className="w-5 h-5 text-vibrant-dark fill-vibrant-dark" /> : <Play className="w-5 h-5 text-vibrant-dark fill-vibrant-dark ml-0.5" />}
                </button>

                {/* Custom Seek Bar */}
                <div className="flex-grow flex items-center gap-2.5">
                  <span className="text-[10px] font-mono font-bold text-white/50">
                    0:{currentTime < 10 ? `0${currentTime}` : currentTime}
                  </span>
                  <div className="flex-grow h-2 bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
                    <motion.div
                      animate={{ width: `${(currentTime / 20) * 100}%` }}
                      transition={{ ease: "linear" }}
                      className="h-full bg-vibrant-orange"
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-white/50">0:20</span>
                </div>
              </div>

              {/* Subsection 3: Solution Mapping (Brief + Collapsible Details) */}
              <div className="p-5 md:p-6 bg-white space-y-4">
                
                {/* Brief Solution Mapping - Always Visible */}
                <div className="bg-orange-50 text-vibrant-dark border-2 border-[#FFD8B1] rounded-2xl p-4 flex gap-3">
                  <div className="text-xl shrink-0 mt-0.5">🌟</div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase tracking-wider text-vibrant-orange">
                      {t("boothAbacusSolutionHeader")}
                    </span>
                    <p className="text-xs md:text-sm font-bold leading-relaxed">
                      {t(activeConcern.abacusSolutionKey)}
                    </p>
                  </div>
                </div>

                {/* View Science & Framework Toggle Button */}
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-vibrant-dark transition-all duration-150 shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none ${
                      showDetails
                        ? "bg-vibrant-orange text-white shadow-none translate-y-0.5"
                        : "bg-white text-vibrant-dark hover:bg-vibrant-cream"
                    }`}
                  >
                    <span>{showDetails ? t("boothHideDetails") : t("boothViewDetails")}</span>
                    {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Detailed scientific / framework mapping */}
                <AnimatePresence initial={false}>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-2 border-vibrant-dark rounded-[24px] overflow-hidden mt-2 bg-slate-50">
                        {/* Tab Headers */}
                        <div className="flex border-b-2 border-vibrant-dark bg-[#F3F1EC]">
                          <button
                            onClick={() => setActiveDetailTab("science")}
                            className={`flex-1 py-3.5 text-xs font-black uppercase tracking-wider border-r-2 border-vibrant-dark flex items-center justify-center gap-2 ${
                              activeDetailTab === "science" ? "bg-white text-vibrant-dark" : "bg-transparent text-gray-500 hover:text-vibrant-dark"
                            }`}
                          >
                            <Brain className="w-4 h-4 text-vibrant-teal" /> {t("boothTabScience")}
                          </button>
                          <button
                            onClick={() => setActiveDetailTab("academy")}
                            className={`flex-1 py-3.5 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 ${
                              activeDetailTab === "academy" ? "bg-white text-vibrant-dark" : "bg-transparent text-gray-500 hover:text-vibrant-dark"
                            }`}
                          >
                            <Target className="w-4 h-4 text-vibrant-orange" /> {t("boothTabAcademy")}
                          </button>
                        </div>

                        {/* Tab Pane details */}
                        <div className="p-5 space-y-4">
                          {activeDetailTab === "science" ? (
                            <div className="space-y-2">
                              <span className="text-[10px] font-black uppercase text-vibrant-teal tracking-widest flex items-center gap-1.5">
                                <Brain className="w-3.5 h-3.5" /> {t("boothScienceHeader")}
                              </span>
                              <p className="text-xs md:text-sm text-gray-655 font-medium leading-relaxed">
                                {t(activeConcern.scienceKey)}
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <span className="text-[10px] font-black uppercase text-vibrant-orange tracking-widest flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5" /> {t("boothAcademyHeader")}
                              </span>
                              <p className="text-xs md:text-sm text-gray-655 font-medium leading-relaxed">
                                {t(activeConcern.academyWayKey)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
