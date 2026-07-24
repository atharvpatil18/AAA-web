/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ABACUS_QUESTION_SETS, VEDIC_QUESTION_SETS } from "../data/practiceData";
import { PracticeCategory, PracticeMode, QuestionCountChoice } from "../types";
import { Calculator, Zap, Clock, CheckCircle2, ArrowRight, BookOpen, Sparkles, Flame, Rocket, Trophy, Award as Medal, Star, Sliders, Layers, User, Users, Calendar, ShieldCheck, ListOrdered, AlertCircle, ChevronDown, ChevronUp, Lock, Shield, Key } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { syncStudentAttempts } from "../lib/cloudSync";
import VedicLearningModal from "../components/VedicLearningModal";
import AdminEmailAccessModal from "../components/AdminEmailAccessModal";
import GuestSampleGatewayModal from "../components/GuestSampleGatewayModal";
import { checkUserAccess, isUserAdmin, getApprovedRecord, syncApprovedRecordsFromCloud, ACCESS_UPDATED_EVENT } from "../lib/accessControl";

const ABACUS_LEVEL_INFO: Record<string, { primaryFocus: string; uniqueTopics: string }> = {
  "SVM-6": {
    primaryFocus: "Senior Teacher / Senior Vedic Math Level 6 - 40 Supreme Master Topics",
    uniqueTopics: "Multi-digit Urdhva Tiryagbhyam (3Dx3D, 4Dx4D), Dhwajanka Flag Division Method, Dwandwa Yoga Duplex Squaring, Square Roots & Cube Roots by Vilokanam, Cubes & 4th Powers (N^4), & Vinculum Tables",
  },
  "SVM-5": {
    primaryFocus: "Senior Teacher / Senior Vedic Math Level 5 - 35 Grand Master Topics",
    uniqueTopics: "Nikhilam Base Multiplication Suite, Vinculum Conversion & Devinculation, Vedic Subtraction/Addition Base Methods, Paravartya & Nikhilam Divisions, & Yavadunam / Ekadhikena Squaring Suite",
  },
  "SVM-4": {
    primaryFocus: "Senior Vedic Math Level 4 - 20 Advanced Multiplication Suite (Above 12 Yrs)",
    uniqueTopics: "Nikhilam Base Method (Below/Above 10, 20-90, 100, 200-900), Mixed Above/Below, Different Bases, Multipliers (11, 12-19, 111, 222-999, 9s, 19-99), Special Sum of Units/Tens = 10, & General 2D x 2D",
  },
  "SVM-3": {
    primaryFocus: "Senior Vedic Math Level 3 - 24 High-Speed Sutras & Matrix Math",
    uniqueTopics: "Urdhva Tiryagbhyam, Antyayordashake'pi, Beejank, Divisibility Rules (2, 5, 10, 3), Multiplications (11, 111, 125, 1001, Teens, 9s), & 3x3 Grid Matrix",
  },
  "SVM-2": {
    primaryFocus: "Senior Vedic Math Level 2 - 24 Advanced Sutras & Divisions",
    uniqueTopics: "Multiplications (9, 5, 6, 15, 25, 50, 9s endings), Divisions (5, 9, 8, 99, 100, 1000, 25, 50), Nikhilam Subtraction, Time Arithmetic, & Rectangles/Squares Counting",
  },
  "SVM-1": {
    primaryFocus: "Senior Vedic Math Level 1 - 25 Master Topics & Conversions",
    uniqueTopics: "Table Formation, Unit Conversions (Paise/₹, cm/m, g/kg, mL/L, m/km, L/kL), Multiplications & Geometry",
  },
  "SVM-0": {
    primaryFocus: "Senior Vedic Math Foundation Sutras & Shortcuts",
    uniqueTopics: "Ekadhik, Ekanyunena, Balancing Rule, Dodging Tables, Rapid Multiplications, & Geometry Spatial Counting",
  },
  "JVM-1": {
    primaryFocus: "Junior Vedic Math Sutras & Conversions",
    uniqueTopics: "Rapid Addition, Ekadhik, Ekanyunena, Dodging Tables, Mult 11/101, & Unit Conversions",
  },
  "JR-0": {
    primaryFocus: "Soroban Bead Mechanics (Goda & Ichidama)",
    uniqueTopics: "Bead Reading, Rod Value Recognition, & Soroban Bead Placement (1, 2, 3 Digits)",
  },
  "JR-1": {
    primaryFocus: "Soroban Direct Math (Chokusetsu - 直接)",
    uniqueTopics: "Single-Digit Direct Addition & Subtraction (3, 4, 5 Rows) using Goda (5) and Ichidama (1) beads",
  },
  "JR-2": {
    primaryFocus: "Soroban Small & Big Friends (Goshin & Jushin)",
    uniqueTopics: "Small Friends (+5/-5 Complements), Big Friends (+10/-10 Complements), & Mixed Combination Complements",
  },
  "JR-3": {
    primaryFocus: "Soroban Multi-Row Speed Drills & 2D Base",
    uniqueTopics: "Single-Digit Speed Rows (6-7 Rows) & Double-Digit Soroban Foundation (4-7 Rows)",
  },
  "SR-1": {
    primaryFocus: "Soroban Single-Digit Speed & Precision",
    uniqueTopics: "Single-Digit Speed Drills (5-6 Rows) with Goshin & Jushin Formula Breakdown",
  },
  "SR-2": {
    primaryFocus: "Soroban Multi-Digit Master Complements",
    uniqueTopics: "2D Direct/All Complements (5 Rows), 1D Marathon (7 Rows), & 3D Soroban Speed",
  },
  "SR-3": {
    primaryFocus: "Soroban Multi-Digit Direct & Combination Drills",
    uniqueTopics: "1D/2D/3D Direct Endurance (4-5 Rows) & 2D Short Complements (3 Rows)",
  },
  "SR-4": {
    primaryFocus: "Soroban Multiplication (Kazan - 算盤掛け算)",
    uniqueTopics: "Single Digit × Single Digit (SD × SD) & Single Digit × 2 Digit (SD × 2D) Rod Assignments",
  },
  "SR-5": {
    primaryFocus: "4-Digit Soroban Quad-Digit Foundation",
    uniqueTopics: "4-Digit Direct Math (4 Rows) & 4-Digit All Complements (4 Rows)",
  },
  "SR-6": {
    primaryFocus: "Intermediate Soroban Multiplication",
    uniqueTopics: "Single Digit × 3 Digit (SD × 3D) & 2 Digit × 2 Digit (2D × 2D) Cross-Rod Products",
  },
  "SR-7": {
    primaryFocus: "Soroban Multi-Digit 5-Row Endurance Sums",
    uniqueTopics: "2-Digit, 3-Digit, & 4-Digit 5-Row All Complements Endurance Sums",
  },
  "SR-8": {
    primaryFocus: "Soroban Division (Wazan - 算盤割り算)",
    uniqueTopics: "Soroban Division: 2D ÷ 1D, 3D ÷ 1D, & 4D ÷ 1D Quotient Rod Subtraction",
  },
  "SR-9": {
    primaryFocus: "Decimal Addition & Subtraction",
    uniqueTopics: "3D & 4D 3-Row Decimal Addition & Subtraction (All Complements)",
  },
  "SR-10": {
    primaryFocus: "Advanced Mental Math & Mathematical Sutras",
    uniqueTopics: "Decimals Mult/Div, HCF, Percentage, LCM, & Square Root",
  },
};

const LEVEL_THEMES: Record<string, { gradient: string; badgeColor: string; tagIcon: string; rankBadge: string }> = {
  "SVM-6": {
    gradient: "from-amber-500 via-orange-600 to-red-700 hover:from-amber-600 hover:to-red-800",
    badgeColor: "bg-amber-950/60 text-amber-200 border-amber-400/40",
    tagIcon: "👑",
    rankBadge: "SVM-6 SUPREME MASTER SUITE",
  },
  "SVM-5": {
    gradient: "from-fuchsia-600 via-rose-600 to-amber-600 hover:from-fuchsia-700 hover:to-amber-700",
    badgeColor: "bg-fuchsia-950/60 text-fuchsia-200 border-fuchsia-400/40",
    tagIcon: "🏆",
    rankBadge: "SVM-5 GRAND MASTER SUITE",
  },
  "SVM-4": {
    gradient: "from-indigo-600 via-purple-600 to-pink-700 hover:from-indigo-700 hover:to-pink-800",
    badgeColor: "bg-indigo-950/60 text-indigo-200 border-indigo-400/40",
    tagIcon: "👑",
    rankBadge: "SVM-4 ADVANCED MULTIPLICATION SUITE",
  },
  "SVM-3": {
    gradient: "from-emerald-600 via-teal-600 to-cyan-700 hover:from-emerald-700 hover:to-cyan-800",
    badgeColor: "bg-emerald-950/60 text-emerald-200 border-emerald-400/40",
    tagIcon: "💎",
    rankBadge: "SVM-3 HIGH-SPEED MASTER",
  },
  "SVM-2": {
    gradient: "from-rose-600 via-pink-600 to-purple-700 hover:from-rose-700 hover:to-purple-800",
    badgeColor: "bg-rose-950/60 text-rose-200 border-rose-400/40",
    tagIcon: "⚡",
    rankBadge: "SVM-2 ADVANCED SUTRAS",
  },
  "SVM-1": {
    gradient: "from-amber-600 via-orange-600 to-red-700 hover:from-amber-700 hover:to-red-800",
    badgeColor: "bg-amber-950/60 text-amber-200 border-amber-400/40",
    tagIcon: "🔥",
    rankBadge: "SVM-1 MASTER SUTRAS",
  },
  "SVM-0": {
    gradient: "from-violet-600 via-purple-600 to-indigo-700 hover:from-violet-700 hover:to-indigo-800",
    badgeColor: "bg-purple-950/60 text-purple-200 border-purple-400/40",
    tagIcon: "🔮",
    rankBadge: "SVM-0 FOUNDATION SUTRAS",
  },
  "JVM-1": {
    gradient: "from-teal-600 via-cyan-600 to-blue-700 hover:from-teal-700 hover:to-cyan-800",
    badgeColor: "bg-teal-950/60 text-teal-200 border-teal-400/40",
    tagIcon: "✨",
    rankBadge: "JVM-1 VEDIC DRILLS",
  },
  "JR-0": {
    gradient: "from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800",
    badgeColor: "bg-emerald-950/60 text-emerald-200 border-emerald-400/40",
    tagIcon: "🌱",
    rankBadge: "BEAD MECHANICS FOUNDATION",
  },
  "JR-1": {
    gradient: "from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800",
    badgeColor: "bg-blue-950/60 text-blue-200 border-blue-400/40",
    tagIcon: "⭐",
    rankBadge: "ONE'S ROD DIRECT MATH",
  },
  "JR-2": {
    gradient: "from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-800",
    badgeColor: "bg-amber-950/60 text-amber-200 border-amber-400/40",
    tagIcon: "🔥",
    rankBadge: "FORMULA RULES (±5, ±10)",
  },
  "JR-3": {
    gradient: "from-purple-600 via-fuchsia-600 to-purple-700 hover:from-purple-700 hover:to-fuchsia-800",
    badgeColor: "bg-purple-950/60 text-purple-200 border-purple-400/40",
    tagIcon: "🚀",
    rankBadge: "MULTI-ROW DOUBLE DIGIT",
  },
  "SR-1": {
    gradient: "from-cyan-600 via-teal-600 to-cyan-700 hover:from-cyan-700 hover:to-teal-800",
    badgeColor: "bg-cyan-950/60 text-cyan-200 border-cyan-400/40",
    tagIcon: "⚡",
    rankBadge: "SINGLE DIGIT SPEED DRILLS",
  },
  "SR-2": {
    gradient: "from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:to-pink-800",
    badgeColor: "bg-rose-950/60 text-rose-200 border-rose-400/40",
    tagIcon: "💪",
    rankBadge: "2D & 3D MASTER SUMS",
  },
  "SR-3": {
    gradient: "from-indigo-600 via-violet-600 to-indigo-700 hover:from-indigo-700 hover:to-violet-800",
    badgeColor: "bg-indigo-950/60 text-indigo-200 border-indigo-400/40",
    tagIcon: "🎯",
    rankBadge: "MULTI-DIGIT ENDURANCE",
  },
  "SR-4": {
    gradient: "from-emerald-600 via-green-600 to-teal-700 hover:from-emerald-700 hover:to-green-800",
    badgeColor: "bg-emerald-950/60 text-emerald-200 border-emerald-400/40",
    tagIcon: "✖️",
    rankBadge: "BASIC MULTIPLICATION",
  },
  "SR-5": {
    gradient: "from-fuchsia-600 via-purple-600 to-pink-700 hover:from-fuchsia-700 hover:to-purple-800",
    badgeColor: "bg-fuchsia-950/60 text-fuchsia-200 border-fuchsia-400/40",
    tagIcon: "🔢",
    rankBadge: "4-DIGIT MATH FOUNDATION",
  },
  "SR-6": {
    gradient: "from-amber-600 via-orange-600 to-red-600 hover:from-amber-700 hover:to-red-700",
    badgeColor: "bg-amber-950/60 text-amber-200 border-amber-400/40",
    tagIcon: "💥",
    rankBadge: "INTERMEDIATE MULTIPLICATION",
  },
  "SR-7": {
    gradient: "from-blue-700 via-indigo-800 to-slate-900 hover:from-blue-800 hover:to-indigo-900",
    badgeColor: "bg-slate-950/70 text-blue-200 border-blue-400/40",
    tagIcon: "🏆",
    rankBadge: "5-ROW MARATHON DRILLS",
  },
  "SR-8": {
    gradient: "from-violet-700 via-purple-800 to-indigo-900 hover:from-violet-800 hover:to-purple-900",
    badgeColor: "bg-purple-950/70 text-purple-200 border-purple-400/40",
    tagIcon: "➗",
    rankBadge: "DIVISION MASTER DRILLS",
  },
  "SR-9": {
    gradient: "from-rose-700 via-red-700 to-orange-800 hover:from-rose-800 hover:to-red-800",
    badgeColor: "bg-red-950/70 text-rose-200 border-rose-400/40",
    tagIcon: "🔹",
    rankBadge: "DECIMAL ADD & SUB",
  },
  "SR-10": {
    gradient: "from-amber-600 via-purple-800 to-slate-950 hover:from-amber-700 hover:to-purple-900",
    badgeColor: "bg-amber-950/80 text-amber-200 border-amber-400/40 ring-1 ring-amber-300/40",
    tagIcon: "👑",
    rankBadge: "GRANDMASTER MATHEMATICAL SUTRAS",
  },
};

export default function PracticeHub() {
  const { currentUser } = useAuth();

  const [activeCategory, setActiveCategory] = useState<PracticeCategory>("abacus");
  const [selectedMode, setSelectedMode] = useState<PracticeMode>("exam");
  const [selectedCount, setSelectedCount] = useState<QuestionCountChoice>(20);
  const [ageFilter, setAgeFilter] = useState<"all" | "junior" | "senior">("all");
  const [hubTab, setHubTab] = useState<"sets" | "performance" | "leaderboard" | "admin">("sets");
  const [selectedSetLeaderboard, setSelectedSetLeaderboard] = useState<string>("abacus-jr1-direct-2row");
  const [attemptsList, setAttemptsList] = useState<any[]>([]);
  const navigate = useNavigate();

  // Guest Gateway states
  const [isGuestGatewayOpen, setIsGuestGatewayOpen] = useState(false);
  const [guestInitialSetId, setGuestInitialSetId] = useState("abacus-sr1-single-direct-5-6row");

  // Auto-open free guest practice gateway for non-logged-in visitors
  useEffect(() => {
    if (!currentUser && !localStorage.getItem("aaa_guest_user")) {
      setIsGuestGatewayOpen(true);
    }
  }, [currentUser]);

  // Access Control states
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [accessNotice, setAccessNotice] = useState<string | null>(null);
  const [, setAccessVer] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setAccessVer((v) => v + 1);
    window.addEventListener(ACCESS_UPDATED_EVENT, handleUpdate);
    syncApprovedRecordsFromCloud();
    return () => window.removeEventListener(ACCESS_UPDATED_EVENT, handleUpdate);
  }, [currentUser]);

  const handleCategoryClick = (cat: PracticeCategory) => {
    const userAdmin = isUserAdmin(currentUser?.email);
    if (currentUser?.email && !userAdmin) {
      const rec = getApprovedRecord(currentUser.email);
      if (rec && rec.permissions) {
        const hasPerm = rec.permissions.some(
          (p) => p.course === cat || (p.course as string) === "both"
        );
        if (!hasPerm) {
          setAccessNotice(
            `Access Restricted: Your email (${currentUser.email}) does not have access to the ${
              cat === "abacus" ? "Abacus" : "Vedic Math"
            } course.`
          );
          return;
        }
      }
    }
    setAccessNotice(null);
    setActiveCategory(cat);
  };

  // Collapsible state for Level Categories (JR-2, JR-3, etc.)
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({});

  // Learning Modal state for Concept & Sutra Lessons
  const [learningModalState, setLearningModalState] = useState<{
    isOpen: boolean;
    topicTitle: string;
    topicId: string;
    setIdToStart: string;
    category?: string;
    level?: string;
  }>({
    isOpen: false,
    topicTitle: "",
    topicId: "",
    setIdToStart: "",
  });

  const toggleLevel = (lvl: string) => {
    setExpandedLevels((prev) => ({
      ...prev,
      [lvl]: !prev[lvl],
    }));
  };

  // Admin Approved Emails management state
  const [approvedEmails, setApprovedEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [adminSearch, setAdminSearch] = useState("");
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminSuccess, setAdminSuccess] = useState<string | null>(null);

  // Load approved emails list
  useEffect(() => {
    const defaultEmails = ["nitinkpatil@gmail.com", "admin@arnavabacus.com", "nehaatharv@gmail.com", "arnavabacus@gmail.com"];
    const raw = localStorage.getItem("aaa_approved_emails");
    if (raw) {
      try {
        const stored = JSON.parse(raw);
        const merged = Array.from(new Set([...defaultEmails, ...stored]));
        localStorage.setItem("aaa_approved_emails", JSON.stringify(merged));
        setApprovedEmails(merged);
      } catch (e) {
        setApprovedEmails(defaultEmails);
      }
    } else {
      localStorage.setItem("aaa_approved_emails", JSON.stringify(defaultEmails));
      setApprovedEmails(defaultEmails);
    }
  }, [hubTab]);

  // Load real leaderboard & personal performance attempts (with cross-device cloud sync)
  useEffect(() => {
    const loadAndSyncAttempts = async () => {
      const guestObj = JSON.parse(localStorage.getItem("aaa_guest_user") || "{}");
      const activeEmail = currentUser?.email || guestObj.email;

      const rawAttempts = localStorage.getItem("aaa_leaderboard_attempts");
      let currentLocal: any[] = [];
      if (rawAttempts) {
        try {
          const parsed = JSON.parse(rawAttempts);
          currentLocal = parsed.filter((a: any) => !a.userId?.startsWith("mock_"));
          setAttemptsList(currentLocal);
        } catch (e) {
          console.error("Failed to parse attempts", e);
        }
      }

      // Always sync cloud attempts across mobile & desktop for active student/guest email or global leaderboard
      const synced = await syncStudentAttempts(activeEmail);
      setAttemptsList(synced.filter((a: any) => !a.userId?.startsWith("mock_")));
    };

    loadAndSyncAttempts();
  }, [hubTab, currentUser?.email]);

  const currentSets = activeCategory === "abacus" ? ABACUS_QUESTION_SETS : VEDIC_QUESTION_SETS;

  const handleStartSet = (setId: string) => {
    if (!currentUser) {
      setGuestInitialSetId(setId);
      setIsGuestGatewayOpen(true);
      return;
    }
    navigate(`/practice/session?setId=${setId}&mode=${selectedMode}&count=${selectedCount}`);
  };

  const handleStartGuestSamplePractice = (guestEmail: string, guestName: string, setId: string) => {
    const guestObj = { email: guestEmail, name: guestName };
    localStorage.setItem("aaa_guest_user", JSON.stringify(guestObj));
    setIsGuestGatewayOpen(false);
    navigate(`/practice/session?setId=${setId}&mode=speed-100-10m&count=100`);
  };

  const modeOptions: { mode: PracticeMode; label: string; timeText: string; icon: React.ReactNode; color: string; badge: string }[] = [
    {
      mode: "exam",
      label: "Standard Test",
      timeText: "Timed Timeline Test",
      icon: <Clock className="w-4 h-4 text-amber-400" />,
      color: "bg-slate-900 text-white border-slate-900",
      badge: "Timed Test"
    },
    {
      mode: "instant",
      label: "Instant Feedback",
      timeText: "Verify Answer Per Question",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
      color: "bg-emerald-600 text-white border-emerald-600",
      badge: "Instant Check"
    },
    {
      mode: "speed-100-5m",
      label: "100 Qs Speed Sprint",
      timeText: "100 Qs in 5 Mins",
      icon: <Rocket className="w-4 h-4 text-orange-400 animate-bounce" />,
      color: "bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500",
      badge: "🚀 100 Qs in 5 Min"
    },
    {
      mode: "speed-100-10m",
      label: "100 Qs Speed Marathon",
      timeText: "100 Qs in 10 Mins",
      icon: <Zap className="w-4 h-4 text-yellow-300" />,
      color: "bg-gradient-to-r from-purple-700 to-indigo-700 text-white border-purple-500",
      badge: "⚡ 100 Qs in 10 Min"
    },
    {
      mode: "speed-200-20m",
      label: "200 Qs Ultimate Sprint",
      timeText: "200 Qs in 20 Mins",
      icon: <Flame className="w-4 h-4 text-red-400 animate-pulse" />,
      color: "bg-gradient-to-r from-red-600 to-rose-700 text-white border-red-500",
      badge: "🔥 200 Qs in 20 Min"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* High Energy Hero Header */}
      <section className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white py-14 px-4 md:px-8 border-b border-purple-900/40 relative overflow-hidden">
        
        {/* Decorative background glow circles */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 shadow-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400" />
            🌟 High-Energy Abacus & Vedic Math Speed Zone
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white mb-3 leading-tight">
            Abacus & Vedic Math <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-teal-300">Practice Hub</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
            Master JVM-1 Vedic Math & Abacus levels! Choose 10 Questions, 20 Questions, or 50 Questions per set under your favorite mode.
          </p>

          {/* Motivational Cheer Badges */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-3 text-xs font-bold text-amber-200">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-lg flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" /> 10 Qs / 20 Qs / 50 Qs Options
            </span>
            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-lg flex items-center gap-1.5">
              <Rocket className="w-3.5 h-3.5 text-orange-400" /> JVM-1 Sutras & Conversions
            </span>
            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-lg flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-yellow-400" /> Instant Verification & Analysis
            </span>
          </div>
        </div>
      </section>

      {/* Main Practice Control Hub */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-5 md:p-8">
          
          {/* Dashboard Navigation Tabs */}
          <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
            <button
              onClick={() => setHubTab("sets")}
              className={`flex items-center gap-2 py-3.5 px-6 font-black text-sm border-b-4 transition-all whitespace-nowrap cursor-pointer ${
                hubTab === "sets"
                  ? "border-vibrant-orange text-vibrant-orange"
                  : "border-transparent text-slate-500 hover:text-slate-850"
              }`}
            >
              <BookOpen className="w-4.5 h-4.5" />
              Practice Topics
            </button>
            <button
              onClick={() => setHubTab("performance")}
              className={`flex items-center gap-2 py-3.5 px-6 font-black text-sm border-b-4 transition-all whitespace-nowrap cursor-pointer ${
                hubTab === "performance"
                  ? "border-vibrant-orange text-vibrant-orange"
                  : "border-transparent text-slate-500 hover:text-slate-850"
              }`}
            >
              <Medal className="w-4.5 h-4.5" />
              My Performance History
            </button>
             <button
              onClick={() => setHubTab("leaderboard")}
              className={`flex items-center gap-2 py-3.5 px-6 font-black text-sm border-b-4 transition-all whitespace-nowrap cursor-pointer ${
                hubTab === "leaderboard"
                  ? "border-vibrant-orange text-vibrant-orange"
                  : "border-transparent text-slate-500 hover:text-slate-850"
              }`}
            >
              <Trophy className="w-4.5 h-4.5" />
              Leaderboards
            </button>
            {currentUser && isUserAdmin(currentUser.email) && (
              <button
                onClick={() => setHubTab("admin")}
                className={`flex items-center gap-2 py-3.5 px-6 font-black text-sm border-b-4 transition-all whitespace-nowrap cursor-pointer ${
                  hubTab === "admin"
                    ? "border-vibrant-orange text-vibrant-orange"
                    : "border-transparent text-slate-500 hover:text-slate-850"
                }`}
              >
                <ShieldCheck className="w-4.5 h-4.5" />
                Admin Portal
              </button>
            )}
          </div>

          {/* TAB 1: PRACTICE SETS */}
          {hubTab === "sets" && (
            <div>
              {/* Access Control Status Banner */}
              {(() => {
                const guestObj = JSON.parse(localStorage.getItem("aaa_guest_user") || "{}");
                const activeEmail = currentUser?.email || guestObj.email;
                if (!activeEmail) return null;

                return (
                  <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/60 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30 shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-sm text-white">
                            {currentUser ? `Access Account: ${currentUser.email}` : `Guest Practice Session: ${guestObj.email}`}
                          </h4>
                          {isUserAdmin(currentUser?.email) && (
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-black border border-amber-500/30 uppercase">
                              Root Admin
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">
                          {(() => {
                            if (!currentUser) return "Logged in for free sample practice drills. Progress & leaderboard scores are saved under your email.";
                            if (isUserAdmin(currentUser.email)) return "Root Administrator Access: Full access to all Abacus & Vedic Math courses, levels, quiz & learn modes.";
                            const rec = getApprovedRecord(currentUser.email);
                            if (!rec || !rec.permissions || rec.permissions.length === 0) return "No specific level permissions configured for this email. Contact your instructor.";
                            return rec.permissions
                              .map((p) => `${p.course.toUpperCase()} (${p.levels.join(", ")}) [Mode: ${p.accessMode.toUpperCase()}]`)
                              .join(" • ");
                          })()}
                        </p>
                      </div>
                    </div>

                    {isUserAdmin(currentUser?.email) && (
                      <button
                        onClick={() => setIsAdminModalOpen(true)}
                        className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Manage Student Email Access
                      </button>
                    )}
                  </div>
                );
              })()}

              {accessNotice && (
                <div className="mb-6 p-3 bg-red-950/90 border border-red-500/60 text-red-200 text-xs rounded-xl flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{accessNotice}</span>
                  </div>
                  <button onClick={() => setAccessNotice(null)} className="text-xs underline text-red-300 font-bold">
                    Dismiss
                  </button>
                </div>
              )}

              {/* Category Tabs: Abacus vs Vedic Math with Custom Visual Cards & Subtext */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-8">
                {/* Abacus Practice Card */}
                <div
                  onClick={() => handleCategoryClick("abacus")}
                  className={`bg-white rounded-2xl border-2 p-4 flex flex-col items-center justify-between cursor-pointer transition-all duration-200 shadow-sm ${
                    activeCategory === "abacus"
                      ? "border-vibrant-orange ring-4 ring-orange-100 shadow-md scale-102"
                      : "border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="w-full flex flex-col items-center">
                    <span className={`text-base md:text-lg font-black mb-2.5 ${activeCategory === "abacus" ? "text-vibrant-orange" : "text-slate-800"}`}>
                      Abacus Practice
                    </span>
                    <div className="w-full h-36 sm:h-40 rounded-xl overflow-hidden border border-slate-200 shadow-xs relative bg-slate-50 flex items-center justify-center">
                      <img
                        src="/images/abacus_practice_tab.jpg"
                        alt="Abacus Practice"
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] font-bold text-slate-600 text-center mt-2.5 leading-tight">
                    Arnav Abacus Academy, Wakad Pune, India
                  </p>
                </div>

                {/* Vedic Maths Practice Card */}
                <div
                  onClick={() => handleCategoryClick("vedic")}
                  className={`bg-white rounded-2xl border-2 p-4 flex flex-col items-center justify-between cursor-pointer transition-all duration-200 shadow-sm ${
                    activeCategory === "vedic"
                      ? "border-vibrant-teal ring-4 ring-teal-100 shadow-md scale-102"
                      : "border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="w-full flex flex-col items-center">
                    <span className={`text-base md:text-lg font-black mb-2.5 ${activeCategory === "vedic" ? "text-vibrant-teal" : "text-slate-800"}`}>
                      Vedic Maths Practice
                    </span>
                    <div className="w-full h-32 rounded-xl overflow-hidden border border-slate-200 shadow-xs relative bg-white flex items-center justify-center p-2">
                      <img
                        src="/images/vedic_math_practice_tab.jpg"
                        alt="Vedic Maths Practice"
                        className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] font-bold text-slate-600 text-center mt-2.5 leading-tight">
                    IIVA Authorised Vedic Math Center - Atharv Vedic Math, Wakad Pune, India
                  </p>
                </div>
              </div>

              {/* Mode Selector Header & Buttons */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 rounded-2xl text-white mb-8 border border-indigo-800/50 shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 border-b border-indigo-800/60 pb-3">
                  <div>
                    <h3 className="font-black text-base md:text-lg flex items-center gap-2 text-amber-300">
                      <Flame className="w-5 h-5 text-orange-400 animate-bounce" />
                      Select Practice Challenge Mode:
                    </h3>
                    <p className="text-xs text-slate-300">Choose mode type and question length (10 Qs, 20 Qs, 50 Qs).</p>
                  </div>
                  
                  {/* Question Count Selector (10 Qs, 20 Qs, 50 Qs) */}
                  <div className="flex items-center gap-2 bg-white/10 p-1 rounded-xl border border-white/20">
                    <span className="text-xs font-bold text-amber-300 px-2 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" /> Qs Count:
                    </span>
                    {([10, 20, 50] as QuestionCountChoice[]).map((count) => (
                      <button
                        key={count}
                        onClick={() => setSelectedCount(count)}
                        className={`px-3 py-1 rounded-lg font-black text-xs transition-all cursor-pointer ${
                          selectedCount === count
                            ? "bg-vibrant-orange text-white shadow-sm"
                            : "text-slate-300 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {count} Qs
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {modeOptions.map((opt) => {
                    const isSelected = selectedMode === opt.mode;
                    return (
                      <button
                        key={opt.mode}
                        onClick={() => setSelectedMode(opt.mode)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? `${opt.color} ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900 scale-102 shadow-lg`
                            : "bg-white/10 text-slate-200 border-white/15 hover:bg-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 font-black text-xs">
                          {opt.icon}
                          <span>{opt.badge}</span>
                        </div>
                        <span className="text-[11px] opacity-80 font-medium">{opt.timeText}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Free Visitor Sample Practice Banner */}
              <div className="mb-8 p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 rounded-3xl shadow-xl border-2 border-amber-300 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>

                <div className="space-y-1 z-10">
                  <div className="inline-flex items-center gap-1.5 bg-slate-950 text-amber-400 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" /> FREE GUEST TRIAL
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                    Try Sample Practice Drills (100 Questions / 10 Mins)
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900/90 max-w-xl">
                    Experience speed math drills from Level SR-1 & SR-2 with email login. Record your score on the live leaderboard and request course access!
                  </p>
                </div>

                <button
                  onClick={() => setIsGuestGatewayOpen(true)}
                  className="z-10 bg-slate-950 hover:bg-slate-900 text-amber-400 text-xs sm:text-sm font-black px-5 py-3 rounded-2xl flex items-center gap-2 shadow-2xl hover:shadow-amber-500/20 active:scale-95 transition-all cursor-pointer border border-amber-400/40 shrink-0"
                >
                  <Zap className="w-4 h-4 fill-amber-400" />
                  START FREE SAMPLE PRACTICE
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Question Sets Grouped by Level with Age Group Filters (Ages 4-8 & Ages 9-14) */}
              <div>
                {/* Kid-Friendly Age Group & Topic Header Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-slate-100 p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-vibrant-orange" />
                    <h2 className="text-lg font-black text-slate-900">
                      {activeCategory === "vedic" ? "Vedic Math Level Curriculum" : "Abacus Level Curriculum"}
                    </h2>
                    <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                      {currentSets.length} Sets
                    </span>
                  </div>

                  {/* Age Group Filter Tabs for Kids Aged 4-14 Years */}
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-300 shadow-xs w-full sm:w-auto overflow-x-auto">
                    <span className="text-[11px] font-black text-slate-700 uppercase px-2 tracking-wider flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-vibrant-orange" /> Age Filter:
                    </span>
                    <button
                      onClick={() => setAgeFilter("all")}
                      className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                        ageFilter === "all"
                          ? "bg-slate-900 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      🌈 All Levels (4-14 Yrs)
                    </button>
                    <button
                      onClick={() => setAgeFilter("junior")}
                      className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                        ageFilter === "junior"
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-xs font-black"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      👧👦 Junior (Ages 4–8)
                    </button>
                    <button
                      onClick={() => setAgeFilter("senior")}
                      className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                        ageFilter === "senior"
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      🎓⚡ Senior (Ages 9–14)
                    </button>
                  </div>
                </div>

                {(() => {
                  const isJuniorLevelName = (lvl: string) => ["JR-0", "JR-1", "JR-2", "JR-3", "JVM-1"].includes(lvl);

                  // Group sets by level
                  const groupedSets = currentSets.reduce((acc, set) => {
                    const lvl = set.level || "General";
                    if (!acc[lvl]) acc[lvl] = [];
                    acc[lvl].push(set);
                    return acc;
                  }, {} as Record<string, typeof currentSets>);

                  const filteredEntries = Object.entries(groupedSets).filter(([levelName]) => {
                    if (ageFilter === "junior") return isJuniorLevelName(levelName);
                    if (ageFilter === "senior") return !isJuniorLevelName(levelName);
                    return true;
                  });

                  if (filteredEntries.length === 0) {
                    return (
                      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm font-semibold">
                        No levels found for the selected age filter. Switch to <strong>All Levels</strong> to view available sets.
                      </div>
                    );
                  }

                  return filteredEntries.map(([levelName, sets]) => {
                    const isJunior = isJuniorLevelName(levelName);
                    // Default to expanded for active kid view
                    const isExpanded = expandedLevels[levelName] ?? true;
                    const lvlInfo = ABACUS_LEVEL_INFO[levelName];
                    const theme = LEVEL_THEMES[levelName] || {
                      gradient: "from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
                      badgeColor: "bg-orange-950/60 text-orange-200 border-orange-400/40",
                      tagIcon: "⚡",
                      rankBadge: "PRACTICE LEVEL",
                    };

                    const quizAccess = checkUserAccess(currentUser?.email, activeCategory, levelName, "quiz");
                    const learnAccess = checkUserAccess(currentUser?.email, activeCategory, levelName, "learn");
                    const isLevelAssigned = quizAccess.isLevelAllowed || learnAccess.isLevelAllowed;

                    return (
                      <div key={levelName} className="mb-8">
                        {/* Collapsible Level Group Header Banner with Kid Age Indicators */}
                        <div
                          onClick={() => toggleLevel(levelName)}
                          className={`bg-gradient-to-r ${theme.gradient} text-white p-5 rounded-3xl flex flex-col md:flex-row md:items-center justify-between shadow-xl border-2 border-white/20 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.005] active:scale-[0.995] gap-4 relative overflow-hidden`}
                        >
                          {/* Background Glow Sphere */}
                          <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

                          <div className="flex items-start sm:items-center gap-4 relative z-10">
                            <div className="bg-white/20 p-3.5 rounded-2xl backdrop-blur-md border border-white/30 shadow-inner flex items-center justify-center shrink-0 text-2xl">
                              {theme.tagIcon}
                            </div>

                            <div className="flex flex-col gap-1.5">
                              {/* Title Row with Age Badge & Access Status */}
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-black text-xl sm:text-2xl tracking-tight text-white flex items-center gap-2 drop-shadow-sm font-display">
                                  LEVEL {levelName}
                                </h3>

                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${theme.badgeColor} shadow-xs`}>
                                  {theme.rankBadge}
                                </span>

                                {/* Age Badge */}
                                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-xs flex items-center gap-1 border ${
                                  isJunior
                                    ? "bg-amber-400 text-slate-950 border-amber-300"
                                    : "bg-purple-900/80 text-purple-200 border-purple-400/50"
                                }`}>
                                  {isJunior ? "👧👦 AGES 4–8 YRS (JUNIOR STAR)" : "🎓⚡ AGES 9–14 YRS (SENIOR CHAMPION)"}
                                </span>

                                {currentUser && !isLevelAssigned && (
                                  <span className="bg-red-950/90 text-red-200 border border-red-500/50 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                                    <Lock className="w-3.5 h-3.5 text-red-400" /> LOCKED - NOT ASSIGNED
                                  </span>
                                )}
                              </div>

                              {/* Focus Area Pill */}
                              {lvlInfo && (
                                <div className="flex items-center gap-2 text-xs text-white/90 font-medium flex-wrap">
                                  <span className="font-bold text-amber-200">🎯 Learning Goal:</span>
                                  <span className="bg-black/25 text-white font-extrabold px-3 py-0.5 rounded-lg backdrop-blur-xs border border-white/20">
                                    {lvlInfo.primaryFocus}
                                  </span>
                                </div>
                              )}

                              {/* Unique Topics Summary */}
                              {lvlInfo && (
                                <p className="text-xs text-white/90 font-medium leading-relaxed flex items-center gap-1.5 flex-wrap">
                                  <span className="font-bold text-yellow-300">📌 Covered Formulae & Topics:</span>
                                  <span className="text-white font-semibold bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-xs">{lvlInfo.uniqueTopics}</span>
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Right Side Control Pills */}
                          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/20 relative z-10">
                            <span className="bg-white/20 hover:bg-white/30 text-white text-xs font-black px-4 py-2 rounded-2xl backdrop-blur-md border border-white/30 shadow-xs flex items-center gap-1.5">
                              <span>{sets.length} Practice Topics</span>
                              <span className="text-amber-300 font-bold">•</span>
                              <span className="text-amber-200">{isExpanded ? "Hide Sets" : "View Sets"}</span>
                            </span>
                            <span className="bg-white/20 p-2.5 rounded-2xl border border-white/30 shadow-xs">
                              {isExpanded ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
                            </span>
                          </div>
                        </div>

                        {/* Expandable Topics Grid for Kids Aged 4 to 14 Years */}
                        {isExpanded && (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {sets.map((set) => {
                              const effectiveQCount = selectedMode.startsWith("speed-100")
                                ? 100
                                : selectedMode === "speed-200-20m"
                                ? 200
                                : selectedCount;

                              const timerText = selectedMode === "speed-100-5m"
                                ? "5 Mins"
                                : selectedMode === "speed-100-10m"
                                ? "10 Mins"
                                : selectedMode === "speed-200-20m"
                                ? "20 Mins"
                                : selectedCount === 10
                                ? "2 Mins"
                                : selectedCount === 50
                                ? "8 Mins"
                                : "4 Mins";

                              const canLearn = learnAccess.allowed;
                              const canQuiz = quizAccess.allowed;
                              const isOverallSet = set.id.endsWith("-overall");

                              return (
                                <div
                                  key={set.id}
                                  className={
                                    isOverallSet
                                      ? "bg-gradient-to-br from-amber-500/15 via-amber-50/80 to-orange-500/15 border-3 border-amber-400 hover:border-amber-500 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between group relative overflow-hidden ring-4 ring-amber-400/20"
                                      : "bg-white border-2 border-slate-200 hover:border-vibrant-orange rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between group relative overflow-hidden"
                                  }
                                >
                                  {/* Decorative Card Accent */}
                                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-400/20 via-orange-400/10 to-transparent rounded-bl-full pointer-events-none"></div>

                                  <div>
                                    {/* Topic Header Badge Bar */}
                                    <div className="flex justify-between items-center mb-3 flex-wrap gap-1.5">
                                      <span
                                        className={
                                          isOverallSet
                                            ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 text-xs font-black px-3 py-1 rounded-xl uppercase tracking-wider shadow-sm flex items-center gap-1 border border-amber-300 animate-pulse"
                                            : "bg-orange-100 text-orange-950 text-xs font-black px-3 py-1 rounded-xl uppercase tracking-wider border border-orange-200 flex items-center gap-1"
                                        }
                                      >
                                        {isOverallSet ? `🏆 ${set.level}-OVERALL GRAND QUIZ` : `🧮 LEVEL ${set.level}`}
                                      </span>

                                      <span className="flex items-center gap-1 text-xs text-slate-800 font-extrabold bg-slate-100 px-3 py-1 rounded-xl border border-slate-200 shadow-2xs">
                                        <Clock className="w-3.5 h-3.5 text-vibrant-orange" />
                                        {timerText} ({effectiveQCount} Qs)
                                      </span>
                                    </div>

                                    {/* Topic Title */}
                                    <h3
                                      className={
                                        isOverallSet
                                          ? "font-black text-slate-950 text-base sm:text-lg leading-snug group-hover:text-amber-700 transition-colors mb-2 font-display"
                                          : "font-black text-slate-900 text-base sm:text-lg leading-snug group-hover:text-vibrant-orange transition-colors mb-2 font-display"
                                      }
                                    >
                                      {set.title}
                                    </h3>

                                    {/* Topic Description */}
                                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 font-medium">
                                      {set.description}
                                    </p>
                                  </div>

                                  {/* Topic Footer & Action Buttons for Kids */}
                                  <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between gap-2 flex-wrap">
                                    <span className="text-xs font-extrabold text-slate-700 truncate max-w-[130px] sm:max-w-[160px]" title={set.topic}>
                                      📌 <span className="text-slate-950">{set.topic}</span>
                                    </span>

                                    <div className="flex items-center gap-2 shrink-0">
                                      {/* Concept Lesson Button */}
                                      <button
                                        onClick={() => {
                                          if (!canLearn) return;
                                          setLearningModalState({
                                            isOpen: true,
                                            topicTitle: set.title,
                                            topicId: set.topic,
                                            setIdToStart: set.id,
                                            category: activeCategory,
                                            level: set.level,
                                          });
                                        }}
                                        disabled={!canLearn}
                                        className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                                          canLearn
                                            ? "bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 shadow-xs hover:scale-105 active:scale-95"
                                            : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-50"
                                        }`}
                                        title={canLearn ? "View Lesson & Concept Formulas" : "Lesson Locked"}
                                      >
                                        <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                                        <span>Learn</span>
                                      </button>

                                      {/* Start Quiz Practice Button */}
                                      <button
                                        onClick={() => {
                                          if (!canQuiz) return;
                                          handleStartSet(set.id);
                                        }}
                                        disabled={!canQuiz}
                                        className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                                          canQuiz
                                            ? isOverallSet
                                              ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 border border-amber-300 shadow-md hover:scale-105 active:scale-95 font-black"
                                              : "bg-gradient-to-r from-vibrant-orange to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md hover:scale-105 active:scale-95 font-black"
                                            : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-50"
                                        }`}
                                        title={canQuiz ? "Start Practice Quiz" : "Quiz Access Locked"}
                                      >
                                        {canQuiz ? <Rocket className="w-3.5 h-3.5 fill-current" /> : <Lock className="w-3.5 h-3.5" />}
                                        <span>{canQuiz ? "Start Quiz" : "Locked"}</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          )}

          {/* TAB 2: PERFORMANCE STATISTICS */}
          {hubTab === "performance" && (
            <div className="space-y-6">
              {(() => {
                const guestObj = JSON.parse(localStorage.getItem("aaa_guest_user") || "{}");
                const activeEmail = (currentUser?.email || guestObj.email || "").toLowerCase().trim();
                const activeName = currentUser?.name || guestObj.name || (activeEmail ? activeEmail.split("@")[0] : "Guest Candidate");

                const userAttempts = attemptsList.filter((a) => {
                  if (!activeEmail) return false;
                  const eMatch = a.userEmail && a.userEmail.toLowerCase().trim() === activeEmail;
                  const idMatch = a.userId && a.userId.toLowerCase().trim() === activeEmail;
                  return eMatch || idMatch;
                });

                return (
                  <>
                    <div className="flex justify-between items-center border-b pb-4">
                      <div>
                        <h2 className="text-xl font-black text-slate-900">
                          Your Personal Practice Statistics
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Active User: <span className="font-bold text-slate-800">{activeName}</span> ({activeEmail || "Unregistered Visitor"})
                        </p>
                      </div>
                    </div>

                    {userAttempts.length === 0 ? (
                      <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto">
                        <Medal className="w-12 h-12 text-slate-350 mx-auto mb-3" />
                        <h3 className="text-base font-black text-slate-800">No Attempts Recorded Yet</h3>
                        <p className="text-xs text-slate-500 mt-2 mb-6">
                          {activeEmail
                            ? `No practice sessions found for ${activeEmail}. Start a practice drill to build your scorecard!`
                            : "Enter your email ID or log in to view your saved practice statistics!"}
                        </p>
                        <button
                          onClick={() => setHubTab("sets")}
                          className="bg-vibrant-orange hover:bg-vibrant-orange/90 text-white text-xs font-black px-5 py-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                        >
                          View Practice Topics
                        </button>
                      </div>
                    ) : (
                      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-900 text-white font-black uppercase tracking-wider">
                                <th className="p-4">Practice Topic</th>
                                <th className="p-4">Level</th>
                                <th className="p-4">Mode</th>
                                <th className="p-4 text-center">Score %</th>
                                <th className="p-4 text-center">Correct Qs</th>
                                <th className="p-4 text-center">Time Taken</th>
                                <th className="p-4">Completed Date</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-250">
                              {userAttempts
                                .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
                                .map((attempt, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 font-medium text-slate-700">
                                  <td className="p-4 font-bold text-slate-900">{attempt.setTitle}</td>
                                  <td className="p-4">
                                    <span className="bg-teal-100 text-teal-800 text-[10px] font-black px-2 py-0.5 rounded">
                                      {attempt.level}
                                    </span>
                                  </td>
                                  <td className="p-4 font-mono font-bold uppercase text-[10px] text-slate-500">
                                    {attempt.mode}
                                  </td>
                                  <td className="p-4 text-center">
                                    <span
                                      className={`font-black text-sm px-2.5 py-1 rounded-lg ${
                                        attempt.scorePercentage >= 90
                                          ? "bg-emerald-100 text-emerald-800"
                                          : attempt.scorePercentage >= 75
                                          ? "bg-blue-100 text-blue-800"
                                          : attempt.scorePercentage >= 50
                                          ? "bg-amber-100 text-amber-800"
                                          : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {attempt.scorePercentage}%
                                    </span>
                                  </td>
                                  <td className="p-4 text-center font-bold">
                                    {attempt.correctCount} / {attempt.totalQuestions}
                                  </td>
                                  <td className="p-4 text-center font-mono font-bold text-slate-800">
                                    {Math.floor(attempt.timeTakenSeconds / 60)}m {attempt.timeTakenSeconds % 60}s
                                  </td>
                                  <td className="p-4 text-slate-500 font-mono text-[11px]">
                                    {new Date(attempt.completedAt).toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}

          {/* TAB 3: LEADERBOARD */}
          {hubTab === "leaderboard" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Trophy className="w-5.5 h-5.5 text-amber-500" />
                    Global Session Leaderboards
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    See who is leading the high score list in the Wakad coaching division.
                  </p>
                </div>

                {/* Session Selector */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-700">Topic:</span>
                  <select
                    value={selectedSetLeaderboard}
                    onChange={(e) => setSelectedSetLeaderboard(e.target.value)}
                    className="bg-white border border-slate-350 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-vibrant-orange/10"
                  >
                    <optgroup label="Abacus Level-Wise Sets">
                      {ABACUS_QUESTION_SETS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title} ({s.level})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Vedic Math Topics">
                      {VEDIC_QUESTION_SETS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title} ({s.level})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Leaderboard calculations */}
              {(() => {
                const filtered = attemptsList
                  .filter((a) => a.setId === selectedSetLeaderboard)
                  .sort((a, b) => {
                    // Sort by score desc, then time Taken asc
                    if (b.scorePercentage !== a.scorePercentage) {
                      return b.scorePercentage - a.scorePercentage;
                    }
                    return a.timeTakenSeconds - b.timeTakenSeconds;
                  });

                if (filtered.length === 0) {
                  return (
                    <div className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-200">
                      <p className="text-xs text-slate-500 font-bold">No scores posted for this set yet. Be the first to attempt!</p>
                      <button
                        onClick={() => {
                          setHubTab("sets");
                          const matchSet = [...ABACUS_QUESTION_SETS, ...VEDIC_QUESTION_SETS].find(s => s.id === selectedSetLeaderboard);
                          if (matchSet) {
                            setActiveCategory(matchSet.category);
                          }
                        }}
                        className="mt-3 bg-vibrant-teal text-white text-xs font-black px-4 py-2 rounded-xl"
                      >
                        Launch Set Challenge
                      </button>
                    </div>
                  );
                }

                const top3 = filtered.slice(0, 3);
                const isAdmin = currentUser && (currentUser.email === "admin@arnavabacus.com" || currentUser.email === "nitinkpatil@gmail.com");

                return (
                  <div className="space-y-8">
                    {/* Visual Podium for Top 3 performers */}
                    <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-xl mx-auto pt-6 items-end text-center">
                      
                      {/* 2nd Place */}
                      {top3[1] && (
                        <div className="flex flex-col items-center">
                          <div className="relative mb-2">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-200 flex items-center justify-center border-2 border-slate-300 shadow-md">
                              <User className="w-6 h-6 text-slate-600" />
                            </div>
                            <span className="absolute -top-2 -right-2 bg-slate-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-black border border-white">2</span>
                          </div>
                          <span className="text-xs font-black text-slate-800 line-clamp-1">{top3[1].userName}</span>
                          {isAdmin && (
                            <span className="text-[10px] font-mono font-bold text-vibrant-teal block line-clamp-1">
                              {top3[1].userEmail || top3[1].userId}
                            </span>
                          )}
                          <span className="text-[10px] font-bold text-slate-500 font-mono">{top3[1].scorePercentage}% ({Math.floor(top3[1].timeTakenSeconds / 60)}m {top3[1].timeTakenSeconds % 60}s)</span>
                          <div className="w-full bg-slate-200 h-20 md:h-24 rounded-t-xl mt-3 flex items-center justify-center text-slate-600 font-black text-sm shadow-inner">
                            🥈 2nd
                          </div>
                        </div>
                      )}

                      {/* 1st Place */}
                      {top3[0] && (
                        <div className="flex flex-col items-center">
                          <div className="relative mb-2 -mt-4">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-amber-50 flex items-center justify-center border-4 border-amber-400 shadow-lg ring-4 ring-amber-300/30">
                              <User className="w-8 h-8 text-amber-700" />
                            </div>
                            <span className="absolute -top-3 -right-3 bg-amber-400 text-slate-900 rounded-full w-7 h-7 flex items-center justify-center text-sm font-black border-2 border-white animate-bounce shadow">👑</span>
                          </div>
                          <span className="text-xs md:text-sm font-black text-slate-900 line-clamp-1">{top3[0].userName}</span>
                          {isAdmin && (
                            <span className="text-[10px] font-mono font-bold text-vibrant-teal block line-clamp-1">
                              {top3[0].userEmail || top3[0].userId}
                            </span>
                          )}
                          <span className="text-xs font-black text-amber-600 font-mono">{top3[0].scorePercentage}% ({Math.floor(top3[0].timeTakenSeconds / 60)}m {top3[0].timeTakenSeconds % 60}s)</span>
                          <div className="w-full bg-gradient-to-b from-amber-400 to-amber-500 text-slate-900 h-28 md:h-32 rounded-t-2xl mt-3 flex items-center justify-center font-black text-base shadow-lg">
                            🥇 Champion
                          </div>
                        </div>
                      )}

                      {/* 3rd Place */}
                      {top3[2] && (
                        <div className="flex flex-col items-center">
                          <div className="relative mb-2">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-50 flex items-center justify-center border-2 border-orange-300 shadow-md">
                              <User className="w-6 h-6 text-orange-800" />
                            </div>
                            <span className="absolute -top-2 -right-2 bg-orange-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-black border border-white">3</span>
                          </div>
                          <span className="text-xs font-black text-slate-800 line-clamp-1">{top3[2].userName}</span>
                          {isAdmin && (
                            <span className="text-[10px] font-mono font-bold text-vibrant-teal block line-clamp-1">
                              {top3[2].userEmail || top3[2].userId}
                            </span>
                          )}
                          <span className="text-[10px] font-bold text-slate-500 font-mono">{top3[2].scorePercentage}% ({Math.floor(top3[2].timeTakenSeconds / 60)}m {top3[2].timeTakenSeconds % 60}s)</span>
                          <div className="w-full bg-orange-200 h-16 md:h-20 rounded-t-xl mt-3 flex items-center justify-center text-orange-800 font-black text-sm shadow-inner">
                            🥉 3rd
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Full Rankings list */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden max-w-3xl mx-auto">
                      <div className="bg-slate-900 text-white p-4 font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <ListOrdered className="w-4 h-4" /> Full Scoring Table Standings
                      </div>
                      <div className="divide-y divide-slate-150">
                        {filtered.map((item, index) => {
                          const guestObj = JSON.parse(localStorage.getItem("aaa_guest_user") || "{}");
                          const activeEmail = (currentUser?.email || guestObj.email || "").toLowerCase().trim();
                          const isMe = Boolean(
                            activeEmail &&
                              ((item.userEmail && item.userEmail.toLowerCase().trim() === activeEmail) ||
                                (item.userId && item.userId.toLowerCase().trim() === activeEmail))
                          );
                          return (
                            <div
                              key={index}
                              className={`flex items-center justify-between p-4 transition-colors text-xs font-medium text-slate-700 ${
                                isMe ? "bg-amber-100/70 border-y-2 border-amber-400 font-bold" : "hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <span className={`w-6 text-center font-black ${
                                  index === 0
                                    ? "text-amber-500 text-sm"
                                    : index === 1
                                    ? "text-slate-500 text-sm"
                                    : index === 2
                                    ? "text-orange-500 text-sm"
                                    : "text-slate-400"
                                }`}>
                                  {index + 1}
                                </span>
                                <div className="flex flex-col">
                                  <span className={`text-slate-900 ${isMe ? "font-black" : ""}`}>
                                    {item.userName} {isMe && <span className="bg-amber-400 text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded-md ml-1.5 uppercase">You</span>}
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-500 font-bold block">
                                    {item.userEmail || item.userId}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-6">
                                <span className="font-mono text-slate-500">
                                  Time: <span className="text-slate-800 font-black">{Math.floor(item.timeTakenSeconds / 60)}m {item.timeTakenSeconds % 60}s</span>
                                </span>
                                <span className={`font-black text-sm px-2 py-1 rounded ${
                                  item.scorePercentage >= 90
                                    ? "text-emerald-700 bg-emerald-50"
                                    : "text-slate-800 bg-slate-100"
                                }`}>
                                  {item.scorePercentage}% Score
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 4: ADMIN PORTAL */}
          {hubTab === "admin" && currentUser && (currentUser.email === "admin@arnavabacus.com" || currentUser.email === "nitinkpatil@gmail.com") && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-vibrant-teal" />
                    Student Access & Verification Control
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add or remove student email addresses approved to request OTP and log in.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search approved emails..."
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      className="pl-3 pr-8 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:border-vibrant-teal outline-none w-56 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Success / Error Banners */}
              {adminError && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-3.5 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}
              {adminSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3.5 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{adminSuccess}</span>
                </div>
              )}

              {/* Add New Email Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setAdminError(null);
                  setAdminSuccess(null);
                  const emailToAdd = newEmail.trim().toLowerCase();
                  if (!emailToAdd || !emailToAdd.includes("@")) {
                    setAdminError("Please enter a valid email address.");
                    return;
                  }
                  if (approvedEmails.includes(emailToAdd)) {
                    setAdminError("This email address is already approved.");
                    return;
                  }

                  const updatedList = [...approvedEmails, emailToAdd];
                  localStorage.setItem("aaa_approved_emails", JSON.stringify(updatedList));
                  setApprovedEmails(updatedList);
                  setNewEmail("");
                  setAdminSuccess(`Successfully registered ${emailToAdd} to approved student database!`);
                }}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-end gap-4"
              >
                <div className="flex-1 w-full">
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-2">
                    Approve New Student Email Address
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Enter student email (e.g. rohan.patil@gmail.com)"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:border-vibrant-teal focus:ring-2 focus:ring-vibrant-teal/10 outline-none bg-white transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-vibrant-teal hover:bg-vibrant-teal/90 text-white font-black px-6 py-2.5 rounded-xl text-xs shadow-md active:scale-98 transition-all cursor-pointer whitespace-nowrap"
                >
                  Register Email
                </button>
              </form>

              {/* Email List Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="py-3 px-6 text-xs font-black text-slate-700 uppercase tracking-wider">
                        Approved Student Email
                      </th>
                      <th className="py-3 px-6 text-xs font-black text-slate-700 uppercase tracking-wider text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const filtered = approvedEmails.filter(email => 
                        email.toLowerCase().includes(adminSearch.toLowerCase().trim())
                      );

                      if (filtered.length === 0) {
                        return (
                          <tr>
                            <td colSpan={2} className="py-8 text-center text-xs font-bold text-slate-400">
                              No approved email matching "{adminSearch}" found.
                            </td>
                          </tr>
                        );
                      }

                      return filtered.map((email, idx) => (
                        <tr key={idx} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                          <td className="py-3.5 px-6 text-sm font-semibold text-slate-800">
                            {email}
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            {email === "nitinkpatil@gmail.com" || email === "admin@arnavabacus.com" ? (
                              <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-1 rounded-md">
                                Protected Admin
                              </span>
                            ) : (
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to remove ${email} from approved list?`)) {
                                    setAdminError(null);
                                    setAdminSuccess(null);
                                    const updatedList = approvedEmails.filter(e => e !== email);
                                    localStorage.setItem("aaa_approved_emails", JSON.stringify(updatedList));
                                    setApprovedEmails(updatedList);
                                    setAdminSuccess(`Removed ${email} from approved list.`);
                                  }
                                }}
                                className="text-xs font-bold text-red-600 hover:text-red-800 hover:underline cursor-pointer"
                              >
                                Revoke Access
                              </button>
                            )}
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Concept & Sutra Learning Modal */}
      <VedicLearningModal
        isOpen={learningModalState.isOpen}
        onClose={() => setLearningModalState((prev) => ({ ...prev, isOpen: false }))}
        onStartPractice={() => handleStartSet(learningModalState.setIdToStart)}
        topicTitle={learningModalState.topicTitle}
        topicId={learningModalState.topicId}
        category={learningModalState.category}
        level={learningModalState.level}
      />

      {/* Admin Student Email Access Control Modal */}
      <AdminEmailAccessModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* Guest Sample Practice Gateway Modal */}
      <GuestSampleGatewayModal
        isOpen={isGuestGatewayOpen}
        onClose={() => setIsGuestGatewayOpen(false)}
        initialSetId={guestInitialSetId}
        onStartSamplePractice={handleStartGuestSamplePractice}
      />
    </div>
  );
}
