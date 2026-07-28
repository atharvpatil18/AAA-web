/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, ShieldCheck, ChevronDown, ChevronUp, X, Heart, Share2, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";
import { getSuccessStories, fetchSuccessStoriesFromCloud } from "../lib/successStories";
import type { SuccessStory } from "../lib/successStories";

/* ── Confetti helper (reused from PublicSuccessWall) ── */
interface ConfettiParticle { id: number; x: number; y: number; color: string; angle: number; speed: number; size: number; opacity: number; }
const CONFETTI_COLORS = ["#f59e0b","#ef4444","#10b981","#6366f1","#f97316","#ec4899"];
function useShowcaseConfetti() {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);
  const frameRef = useRef<number | null>(null);
  const burst = useCallback((ox: number, oy: number) => {
    const ps: ConfettiParticle[] = Array.from({ length: 22 }, (_, i) => ({
      id: Date.now() + i, x: ox, y: oy,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      angle: (i / 22) * 360, speed: 2 + Math.random() * 4,
      size: 5 + Math.random() * 5, opacity: 1,
    }));
    setParticles(ps);
    let tick = 0;
    const animate = () => {
      tick++;
      setParticles(prev => prev.map(p => ({ ...p, x: p.x + Math.cos((p.angle * Math.PI) / 180) * p.speed, y: p.y + Math.sin((p.angle * Math.PI) / 180) * p.speed + tick * 0.15, opacity: Math.max(0, p.opacity - 0.025) })).filter(p => p.opacity > 0));
      if (tick < 60) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
  }, []);
  useEffect(() => () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); }, []);
  return { particles, burst };
}

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
  mainCategory: "international" | "national_state" | "school_level" | "academy_level";
  academySubCategory?: "abacus" | "vedic_math" | "mental_math" | "school_math" | "competitive_math";
}

const SHOWCASE_APPLAUDS_KEY = "aaa_showcase_applauds_v1";
const APPLAUDS_CLOUD_URL = "https://jsonblob.com/api/jsonBlob/019fa7e5-1981-7a92-9f98-870ed087ff58";

export default function Showcase({ defaultTab = "all" }: { defaultTab?: "all" | "stories" | "gallery" }) {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [academySubFilter, setAcademySubFilter] = useState<string>("all");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [selectedItem, setSelectedItem] = useState<SuccessItem | null>(null);
  const [searchParams] = useSearchParams();

  // Applaud state
  const [applaudCounts, setApplaudCounts] = useState<Record<string, number>>({});
  const [applaudedItems, setApplaudedItems] = useState<Record<string, boolean>>({});
  const [popItem, setPopItem] = useState<string | null>(null);
  const { particles, burst } = useShowcaseConfetti();

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Map raw SuccessStory → SuccessItem (helper used for localStorage init and cloud refresh)
  const mapRawStories = (raw: SuccessStory[]): SuccessItem[] =>
    raw.map((s) => ({
      id: s.id,
      type: s.storyType,
      title: s.highlight,
      studentName: s.studentName,
      age: s.ageYears ? `${s.ageYears} Years` : undefined,
      grade: s.courseLevel,
      achievementText: s.aiGeneratedStory,
      beforeText: s.beforeText,
      afterText: s.afterText,
      imageUrl: s.studentPhotoUrl || "/logo.png",
      imageAlt: s.studentName,
      tag: `${s.eventLevel === "international" ? "International Level" : s.eventLevel === "national_state" ? "National/State Level" : "School & Academy Level"} • ${s.eventDateFormatted || ""}`,
      colorTheme: (s.eventLevel === "international" ? "gold" : s.eventLevel === "national_state" ? "orange" : "teal") as "gold" | "orange" | "teal",
      mainCategory: s.eventLevel,
      academySubCategory: s.course,
    }));

  // Initialise from localStorage immediately (zero delay — no blank screen)
  // then refresh from cloud in background via useEffect below
  const [adminStories, setAdminStories] = useState<SuccessItem[]>(() => {
    try { return mapRawStories(getSuccessStories()); } catch { return []; }
  });

  useEffect(() => {
    // Background cloud refresh — updates stories for parents on any device
    const refreshStories = () => {
      fetchSuccessStoriesFromCloud()
        .then((raw) => setAdminStories(mapRawStories(raw)))
        .catch(() => { /* cloud unavailable — localStorage data already shown */ });
    };
    refreshStories();
    window.addEventListener("focus", refreshStories);
    return () => window.removeEventListener("focus", refreshStories);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // 1. Load local applauds instantly
    try {
      const saved = localStorage.getItem(SHOWCASE_APPLAUDS_KEY);
      if (saved) {
        const { counts, liked } = JSON.parse(saved);
        if (counts) setApplaudCounts(counts);
        if (liked) setApplaudedItems(liked);
      }
    } catch {}

    const fetchLatestApplauds = () => {
      fetch(APPLAUDS_CLOUD_URL, { headers: { Accept: "application/json" } })
        .then((r) => {
          if (!r.ok) throw new Error("Rate limit or server error");
          return r.json();
        })
        .then((payload) => {
          const cloudCounts: Record<string, number> = payload?.applauds || (typeof payload === "object" && !Array.isArray(payload) && !payload.error ? payload : {});
          setApplaudCounts((prev) => {
            const merged: Record<string, number> = { ...prev, ...cloudCounts };
            Object.keys(cloudCounts).forEach((k) => {
              merged[k] = Math.max(cloudCounts[k] || 0, prev[k] || 0);
            });
            try {
              const liked = JSON.parse(localStorage.getItem(SHOWCASE_APPLAUDS_KEY) || "{}")?.liked || {};
              localStorage.setItem(SHOWCASE_APPLAUDS_KEY, JSON.stringify({ counts: merged, liked }));
            } catch {}
            return merged;
          });
        })
        .catch(() => {});
    };

    fetchLatestApplauds();
    window.addEventListener("focus", fetchLatestApplauds);

    return () => {
      window.removeEventListener("focus", fetchLatestApplauds);
    };
  }, []);

  // Auto-open story from ?story= URL param.
  // Depends on adminStories so it re-fires once async stories have loaded.
  useEffect(() => {
    const storyId = searchParams.get("story");
    if (!storyId) return;
    const allItems = [...adminStories, ...showcaseData];
    const match = allItems.find(i => i.id === storyId);
    if (match) {
      setSelectedItem(match);
    } else {
      // Force instant cloud fetch for deep-linked story
      fetchSuccessStoriesFromCloud().then((raw) => {
        const mapped = mapRawStories(raw);
        setAdminStories(mapped);
        const found = [...mapped, ...showcaseData].find((i) => i.id === storyId);
        if (found) setSelectedItem(found);
      }).catch(() => {});
    }
  }, [searchParams, adminStories]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleApplaud = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (applaudedItems[id]) return;
    const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
    burst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    setPopItem(id);
    setTimeout(() => setPopItem(null), 400);

    const targetCount = (applaudCounts[id] || 0) + 1;
    const newCounts = { ...applaudCounts, [id]: targetCount };
    const newLiked = { ...applaudedItems, [id]: true };
    setApplaudCounts(newCounts);
    setApplaudedItems(newLiked);
    try { localStorage.setItem(SHOWCASE_APPLAUDS_KEY, JSON.stringify({ counts: newCounts, liked: newLiked })); } catch {}

    // Immediate Cloud PUT
    fetch(APPLAUDS_CLOUD_URL, { headers: { Accept: "application/json" } })
      .then((r) => {
        if (!r.ok) throw new Error("Rate limit");
        return r.json();
      })
      .then((payload) => {
        const cloudCounts: Record<string, number> = payload?.applauds || (typeof payload === "object" && !Array.isArray(payload) && !payload.error ? payload : {});
        cloudCounts[id] = Math.max((cloudCounts[id] || 0) + 1, targetCount);
        return fetch(APPLAUDS_CLOUD_URL, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ applauds: cloudCounts }),
        });
      })
      .catch(() => {});
  };

  const toggleExpand = (id: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCtaClick = () => {
    trackDemoClick("showcase_page_bottom_cta");
  };

  // Build shareable URL for a story item
  const getShareUrl = (item: SuccessItem): string => {
    const base = window.location.href.split("#")[0];
    return `${base}#/showcase?story=${encodeURIComponent(item.id)}`;
  };

  const handleShare = (item: SuccessItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getShareUrl(item);
    try {
      navigator.clipboard.writeText(url);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleWhatsAppShare = (item: SuccessItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getShareUrl(item);
    const text = encodeURIComponent(
      `🏆 Check out this success story from Arnav Abacus Academy!\n\n"${item.title}"${item.studentName ? ` — ${item.studentName}` : ""}\n\n${url}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
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
      mainCategory: "international"
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
      mainCategory: "international"
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
      mainCategory: "national_state"
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
      mainCategory: "national_state"
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
      mainCategory: "academy_level",
      academySubCategory: "abacus"
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
      mainCategory: "international"
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
      mainCategory: "international"
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
      mainCategory: "international"
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
      mainCategory: "national_state"
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
      mainCategory: "academy_level",
      academySubCategory: "abacus"
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
      mainCategory: "national_state"
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
      mainCategory: "academy_level",
      academySubCategory: "abacus"
    },
    {
      id: "gallery-sushmit-championship",
      type: "competition",
      title: t("showcaseItem13Title"),
      tag: t("showcaseTag13"),
      achievementText: t("showcaseItem13Text"),
      imageUrl: "sushmit_championship_birthday.webp",
      imageAlt: "Sushmit holding his Championship Trophy with Teacher Neha at Arnav Abacus Academy",
      colorTheme: "gold",
      mainCategory: "academy_level",
      academySubCategory: "abacus"
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
      mainCategory: "academy_level",
      academySubCategory: "abacus"
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
      mainCategory: "national_state"
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
      mainCategory: "academy_level",
      academySubCategory: "vedic_math"
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
      mainCategory: "academy_level",
      academySubCategory: "competitive_math"
    },
    {
      id: "gallery-1",
      type: "gallery",
      title: "Annual Abacus Certification Exam",
      tag: "Academy Event",
      achievementText: "Snapshots of our young champions sitting for their level-up exams under IIVA guidelines. 100% of our students cleared with distinction!",
      imageAlt: "Students writing certification test",
      colorTheme: "orange",
      mainCategory: "academy_level",
      academySubCategory: "abacus"
    },
    {
      id: "gallery-2",
      type: "gallery",
      title: "Vedic Maths Boot Camp 2025",
      tag: "Interactive Workshop",
      achievementText: "Interactive group practice sessions where middle school students mastered mental calendar tricks, squares, and division shortcuts.",
      imageAlt: "Group of students in a high-energy workshop",
      colorTheme: "gold",
      mainCategory: "academy_level",
      academySubCategory: "vedic_math"
    },
    {
      id: "gallery-3",
      type: "gallery",
      title: "Parents-Teachers Appreciation Meet",
      tag: "Academy Fellowship",
      achievementText: "A warm gathering sharing individual progress sheets, student behavioral improvements, and custom spatial skill developments.",
      imageAlt: "Teachers interacting with parents at center",
      colorTheme: "teal",
      mainCategory: "academy_level",
      academySubCategory: "mental_math"
    },
    {
      id: "gallery-4",
      type: "gallery",
      title: "Weekly Practice Medal Ceremony",
      tag: "Student Motivation",
      achievementText: "Rewarding weekly stars for consistency and neat abacus workbook submissions to build self-confidence and regular practice habits.",
      imageAlt: "Child receiving a medal from Neha Patil",
      colorTheme: "orange",
      mainCategory: "academy_level",
      academySubCategory: "mental_math"
    }
  ];


  const allCombinedItems = [...adminStories, ...showcaseData];
  const visibleItems = allCombinedItems.filter(item => !!item.imageUrl);

  const filteredItems = visibleItems.filter(item => {
    if (activeCategory !== "all" && item.mainCategory !== activeCategory) {
      return false;
    }
    if (activeCategory === "academy_level" && academySubFilter !== "all" && item.academySubCategory !== academySubFilter) {
      return false;
    }
    return true;
  });

  const getCategoryCount = (catId: string) => {
    if (catId === "all") return visibleItems.length;
    return visibleItems.filter(item => item.mainCategory === catId).length;
  };

  return (
    <div id="showcase-page-container" className="bg-[#FFFDF9] min-h-screen">
      {/* Confetti Canvas Layer */}
      {particles.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden="true">
          {particles.map((p) => (
            <div key={p.id} style={{ position: "fixed", left: p.x, top: p.y, width: p.size, height: p.size, backgroundColor: p.color, opacity: p.opacity, borderRadius: Math.random() > 0.5 ? "50%" : "2px", transform: `rotate(${p.angle}deg)`, pointerEvents: "none" }} />
          ))}
        </div>
      )}

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


      {/* 3. Filter Navigation Tab Bar */}
      <section className="pt-12 pb-6 max-w-7xl mx-auto px-4 md:px-8 space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {[
            { id: "all", label: t("categoryAll"), count: visibleItems.length },
            { id: "international", label: t("categoryInternational"), count: getCategoryCount("international") },
            { id: "national_state", label: t("categoryNationalState"), count: getCategoryCount("national_state") },
            { id: "academy_level", label: t("categoryAcademyLevel"), count: getCategoryCount("academy_level") },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id);
                setAcademySubFilter("all");
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-vibrant-dark transition-all duration-150 shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none ${
                activeCategory === tab.id
                  ? "bg-vibrant-orange text-white shadow-none translate-y-0.5"
                  : "bg-white text-vibrant-dark hover:bg-vibrant-cream"
              }`}
            >
              {tab.label} <span className="ml-1 opacity-70">({tab.count})</span>
            </button>
          ))}
        </div>

        {activeCategory === "academy_level" && (
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 p-4 bg-[#F5F2EB] rounded-2xl border-2 border-dashed border-vibrant-dark/25 max-w-4xl mx-auto">
            {[
              { id: "all", label: t("subAll") },
              { id: "abacus", label: t("subAbacus") },
              { id: "vedic_math", label: t("subVedicMath") },
              { id: "mental_math", label: t("subMentalMath") },
              { id: "school_math", label: t("subSchoolMath") },
              { id: "competitive_math", label: t("subCompetitiveMath") },
            ].map(subTab => {
              const count = subTab.id === "all"
                ? visibleItems.filter(item => item.mainCategory === "academy_level").length
                : visibleItems.filter(item => item.mainCategory === "academy_level" && item.academySubCategory === subTab.id).length;
              return (
                <button
                  key={subTab.id}
                  onClick={() => setAcademySubFilter(subTab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 ${
                    academySubFilter === subTab.id
                      ? "bg-vibrant-teal text-white shadow-[1px_1px_0_0_#1A2E35] border border-vibrant-dark"
                      : "bg-white text-vibrant-dark/80 hover:text-vibrant-dark border border-gray-300 hover:border-vibrant-dark"
                  }`}
                >
                  {subTab.label} <span className="ml-0.5 opacity-60 text-[10px]">({count})</span>
                </button>
              );
            })}
          </div>
        )}
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
                        {item.age && (
                          <>
                            <span className="text-gray-300">•</span>
                            <span>Age: {item.age}</span>
                          </>
                        )}
                        {item.grade && (
                          <>
                            <span className="text-gray-300">•</span>
                            <span>Level/Class: {item.grade}</span>
                          </>
                        )}
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

                    <div className="pt-4 border-t border-gray-100 flex flex-wrap justify-between items-center gap-2">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                        <ShieldCheck className="w-3.5 h-3.5 text-vibrant-teal" /> {t("showcaseVerified")}
                      </span>
                      <div className="flex items-center gap-2">
                        {/* Share button */}
                        <button
                          type="button"
                          onClick={(e) => handleShare(item, e)}
                          title="Copy shareable link"
                          className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 select-none transition-all duration-200 ${
                            copiedId === item.id
                              ? "bg-emerald-500 text-white border border-emerald-600 shadow-md cursor-default"
                              : "bg-sky-50 hover:bg-sky-100 text-sky-600 border border-sky-200 hover:shadow-md cursor-pointer"
                          }`}
                        >
                          {copiedId === item.id ? (
                            <><Check className="w-3.5 h-3.5" /><span>Copied!</span></>
                          ) : (
                            <><Share2 className="w-3.5 h-3.5" /><span>Share</span></>
                          )}
                        </button>

                        {/* Applaud button */}
                        <button
                          type="button"
                          onClick={(e) => handleApplaud(item.id, e)}
                          disabled={!!applaudedItems[item.id]}
                          title={applaudedItems[item.id] ? "You've already applauded!" : "Applaud this achievement!"}
                          style={{ transform: popItem === item.id ? "scale(1.35)" : "scale(1)", transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1), background 0.2s" }}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 select-none ${
                            applaudedItems[item.id]
                              ? "bg-rose-500 text-white shadow-md shadow-rose-200 cursor-default"
                              : "bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 hover:shadow-md hover:shadow-rose-100 cursor-pointer"
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 transition-all duration-200 ${ popItem === item.id ? "scale-150" : "scale-100" } ${ applaudedItems[item.id] ? "fill-white text-white" : "fill-rose-400 text-rose-400" }`} />
                          <span className="tabular-nums">{applaudCounts[item.id] || 0} Applauds</span>
                        </button>
                      </div>
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
              <div className="p-4 bg-vibrant-cream border-t-2 border-vibrant-dark flex flex-wrap justify-between items-center gap-3 text-xs font-bold text-gray-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-vibrant-teal" /> {t("showcaseVerified")}
                </span>
                <div className="flex items-center gap-2">
                  {/* WhatsApp Share */}
                  <button
                    onClick={(e) => handleWhatsAppShare(selectedItem!, e)}
                    className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5a] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </button>

                  {/* Copy Link */}
                  <button
                    onClick={(e) => handleShare(selectedItem!, e)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      copiedId === selectedItem?.id
                        ? "bg-emerald-500 text-white shadow-sm"
                        : "bg-sky-100 hover:bg-sky-200 text-sky-700 border border-sky-300"
                    }`}
                  >
                    {copiedId === selectedItem?.id ? (
                      <><Check className="w-3.5 h-3.5" /> Copied!</>
                    ) : (
                      <><Share2 className="w-3.5 h-3.5" /> Copy Link</>
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedItem(null)}
                    className="bg-vibrant-dark text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-vibrant-dark/95 transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
