/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, Clock, Menu, X, ArrowRight, MessageCircle, Globe, ChevronDown, Sparkles } from "lucide-react";
import { trackWhatsAppClick, trackCallClick, trackDemoRequest, trackCounsellingBook } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";
import { Language } from "../lib/translations";
import { useAuth } from "../lib/AuthContext";
import DemoBookingModal from "./DemoBookingModal";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [programMenuOpen, setProgramMenuOpen] = useState(false);
  const [guideMenuOpen, setGuideMenuOpen] = useState(false);
  const [labMenuOpen, setLabMenuOpen] = useState(false);
  const labMenuRef = useRef<HTMLDivElement>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const programMenuRef = useRef<HTMLDivElement>(null);
  const guideMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (moreMenuRef.current && !moreMenuRef.current.contains(target)) {
        setMoreMenuOpen(false);
      }
      if (programMenuRef.current && !programMenuRef.current.contains(target)) {
        setProgramMenuOpen(false);
      }
      if (labMenuRef.current && !labMenuRef.current.contains(target)) {
        setLabMenuOpen(false);
      }
      if (guideMenuRef.current && !guideMenuRef.current.contains(target)) {
        setGuideMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMoreMenuOpen(false);
    setProgramMenuOpen(false);
    setGuideMenuOpen(false);
    setLabMenuOpen(false);
  }, [location.pathname]);

  if (location.pathname === "/practice/session") {
    return null;
  }

  const handleBookDemoClick = () => {
    trackWhatsAppClick("navbar_header_cta", "book_discovery_session");
    trackCounsellingBook({
      source: "navbar_header",
      program: "Personalised Learning Discovery Session",
      deliveryMode: "offline_and_online",
    });
  };

  const handleCallClick = () => {
    trackCallClick("navbar_top_banner");
  };

  const interactiveLabLinks = [
    { name: t("navLabSimulator"), path: "/abacus-simulator" },
    { name: t("navLabVedic"), path: "/vedic-maths-sutras" },
    { name: t("navLabSpeed"), path: "/speed-challenge" },
  ];

  const programNavLinks = [
    { name: t("navExploreAllPrograms"), path: "/programs" },
    { name: t("navAbacusProgram"), path: "/programs/abacus" },
    { name: t("navVedicProgram"), path: "/programs/vedic-maths" },
    { name: t("navMentalProgram"), path: "/programs/mental-maths" },
    { name: t("navSchoolProgram"), path: "/programs/school-maths" },
    { name: t("navIpmProgram"), path: "/programs/ipm-olympiad" },
  ];

    const parentGuideNavLinks = [
    { name: t("navParentGuidesOverview"), path: "/parent-guides" },
    { name: t("navGuideAbacusVedic"), path: "/parent-guides/abacus-vs-vedic-maths" },
    { name: t("navGuideSchoolConfuse"), path: "/parent-guides/does-abacus-confuse-school-math" },
    { name: t("navGuideFingerCounting"), path: "/parent-guides/why-children-use-finger-counting" },
    { name: t("navGuideSillyMistakes"), path: "/parent-guides/why-smart-children-make-silly-math-mistakes" },
    { name: t("navGuideIdealAge"), path: "/parent-guides/ideal-age-to-start-abacus" },
  ];
  const primaryNavLinks = [
    { name: t("navHome"), path: "/" },
    { name: t("navPrograms"), path: "/programs", hasDropdown: true },
    { name: t("navParentGuides"), path: "/parent-guides", hasGuideDropdown: true },
    { name: t("navInteractiveLabs"), path: "/abacus-simulator", hasLabDropdown: true },
    { name: t("navAchievements"), path: "/showcase" },
    { name: t("navPractice"), path: "/practice" },
    { name: t("navWorksheets"), path: "/worksheets" },
    { name: t("navBlog"), path: "/blog" },
  ];

  const moreNavLinks = [
    { name: t("navMeetFounder"), path: "/mentor" },
    { name: t("navTeacherFranchise"), path: "/teacher-franchise" },
    { name: t("navChampionshipNews"), path: "/news" },
    { name: t("navBrochurePdf"), path: "/brochure" },
    { name: t("navFaqs"), path: "/faqs" },
    { name: t("navContactWakad"), path: "/contact" },
  ];

  const allNavLinks = [
    { name: t("navHome"), path: "/" },
    { name: t("navExploreAllPrograms"), path: "/programs" },
    { name: "↳ " + t("navAbacusProgram"), path: "/programs/abacus" },
    { name: "↳ " + t("navVedicProgram"), path: "/programs/vedic-maths" },
    { name: "↳ " + t("navMentalProgram"), path: "/programs/mental-maths" },
    { name: "↳ " + t("navSchoolProgram"), path: "/programs/school-maths" },
    { name: "↳ " + t("navIpmProgram"), path: "/programs/ipm-olympiad" },
    { name: t("navInteractiveLabs"), path: "/abacus-simulator" },
    { name: "↳ " + t("navLabSimulator"), path: "/abacus-simulator" },
    { name: "↳ " + t("navLabVedic"), path: "/vedic-maths-sutras" },
    { name: "↳ " + t("navLabSpeed"), path: "/speed-challenge" },
    { name: t("navAchievements"), path: "/showcase" },
    { name: t("navPractice"), path: "/practice" },
    { name: t("navWorksheets"), path: "/worksheets" },
    { name: t("navParentGuidesOverview"), path: "/parent-guides" },
    { name: "↳ " + t("navGuideAbacusVedic"), path: "/parent-guides/abacus-vs-vedic-maths" },
    { name: "↳ " + t("navGuideSchoolConfuse"), path: "/parent-guides/does-abacus-confuse-school-math" },
    { name: "↳ " + t("navGuideFingerCounting"), path: "/parent-guides/why-children-use-finger-counting" },
    { name: "↳ " + t("navGuideSillyMistakes"), path: "/parent-guides/why-smart-children-make-silly-math-mistakes" },
    { name: "↳ " + t("navGuideIdealAge"), path: "/parent-guides/ideal-age-to-start-abacus" },
    { name: t("navBlog"), path: "/blog" },
    { name: t("navMeetFounder"), path: "/mentor" },
    { name: t("navTeacherFranchise"), path: "/teacher-franchise" },
    { name: t("navFaqs"), path: "/faqs" },
    { name: t("navContactWakad"), path: "/contact" },
  ];

  const currentPath = location.pathname;

  return (
    <header id="main-header" className="sticky top-0 z-50 w-full shadow-sm bg-white">
      {/* 1. Top Alert Bar */}
      <div className="bg-slate-900 text-slate-100 py-1.5 px-3 md:px-8 text-[11px] border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          {/* Working Details */}
          <div className="hidden md:flex items-center gap-4 text-slate-300 shrink-0">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{t("navTopWorkingDetails")}</span>
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{t("navAdmissionsOpen")}</span>
            </span>
          </div>

          {/* Contact info & Language Toggle */}
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto font-medium text-slate-200">
            <div className="flex items-center gap-3">
              <a 
                href="tel:+919021924968"
                onClick={handleCallClick}
                aria-label="Call Academy at +91 90219 24968"
                className="flex items-center gap-1 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">{t("academyPhoneDisplay")}</span>
              </a>
              <a 
                href="https://wa.me/919021924968" 
                onClick={() => trackWhatsAppClick("navbar_top_bar", "direct_chat")}
                aria-label="Chat with Academy on WhatsApp"
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>
            
            {/* Language Selector Dropdown */}
            <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-slate-200 hover:border-amber-400 transition-colors">
              <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                aria-label="Select website language"
                className="bg-transparent border-none text-[10px] font-bold focus:outline-none cursor-pointer text-slate-200 py-0.5"
              >
                <option value="en" className="bg-slate-900 text-slate-200">English</option>
                <option value="hi" className="bg-slate-900 text-slate-200">हिन्दी</option>
                <option value="mr" className="bg-slate-900 text-slate-200">मराठी</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar */}
      <nav id="navbar-body" className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center overflow-hidden border border-slate-200 shadow-xs group-hover:scale-105 transition-transform shrink-0">
              {!logoFailed ? (
                <img 
                  src="/logo.png" 
                  alt="Arnav Abacus Academy" 
                  className="w-full h-full object-cover" 
                  width={44}
                  height={44}
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <div className="w-full h-full bg-slate-900 flex items-center justify-center text-amber-400 font-black text-xl">
                  AAA
                </div>
              )}
            </div>
            <div>
              <span className="font-display font-black text-slate-900 text-sm md:text-lg tracking-tight block group-hover:text-orange-600 transition-colors leading-none">
                {t("navBrandTitle") || "ARNAV ABACUS ACADEMY"}
              </span>
              <span className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest block mt-0.5 leading-none">
                {t("navBrandSubtitle") || "Wakad, Pune • Certified Mentorship"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <ul className="flex items-center gap-3 xl:gap-5">
              {primaryNavLinks.map((link) => {
                if ((link as any).hasLabDropdown) {
                  const isAnyLabActive = currentPath === "/abacus-simulator" || currentPath === "/vedic-maths-sutras" || currentPath === "/speed-challenge";
                  return (
                    <li key={link.name} className="relative" ref={labMenuRef}>
                      <button
                        type="button"
                        onClick={() => {
                          setLabMenuOpen(!labMenuOpen);
                          setGuideMenuOpen(false);
                          setProgramMenuOpen(false);
                          setMoreMenuOpen(false);
                        }}
                        className={`text-xs font-bold tracking-tight py-1.5 whitespace-nowrap inline-flex items-center gap-1 transition-colors cursor-pointer relative ${
                          isAnyLabActive
                            ? "text-orange-600 after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-orange-600 after:rounded-full"
                            : "text-slate-700 hover:text-orange-600"
                        }`}
                        aria-expanded={labMenuOpen}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${labMenuOpen ? "rotate-180" : ""}`} />
                      </button>

                      {labMenuOpen && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in">
                          {interactiveLabLinks.map((lLink) => {
                            const isLActive = currentPath === lLink.path;
                            return (
                              <Link
                                key={lLink.name}
                                to={lLink.path}
                                onClick={() => setLabMenuOpen(false)}
                                className={`block px-4 py-2.5 text-xs font-bold transition-colors ${
                                  isLActive
                                    ? "bg-orange-50 text-orange-600"
                                    : "text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                                }`}
                              >
                                {lLink.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </li>
                  );
                }

                if ((link as any).hasGuideDropdown) {
                  const isAnyGuideActive = currentPath === "/parent-guides" || currentPath.startsWith("/parent-guides/");
                  return (
                    <li key={link.name} className="relative" ref={guideMenuRef}>
                      <button
                        type="button"
                        onClick={() => {
                          setGuideMenuOpen(!guideMenuOpen);
                          setLabMenuOpen(false);
                          setProgramMenuOpen(false);
                          setMoreMenuOpen(false);
                        }}
                        className={`text-xs font-bold tracking-tight py-1.5 whitespace-nowrap inline-flex items-center gap-1 transition-colors cursor-pointer relative ${
                          isAnyGuideActive
                            ? "text-orange-600 after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-orange-600 after:rounded-full"
                            : "text-slate-700 hover:text-orange-600"
                        }`}
                        aria-expanded={guideMenuOpen}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${guideMenuOpen ? "rotate-180" : ""}`} />
                      </button>

                      {guideMenuOpen && (
                        <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in">
                          {parentGuideNavLinks.map((gLink) => {
                            const isGActive = currentPath === gLink.path;
                            return (
                              <Link
                                key={gLink.name}
                                to={gLink.path}
                                onClick={() => setGuideMenuOpen(false)}
                                className={`block px-4 py-2.5 text-xs font-bold transition-colors ${
                                  isGActive
                                    ? "bg-orange-50 text-orange-600"
                                    : "text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                                }`}
                              >
                                {gLink.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </li>
                  );
                }

                if (link.hasDropdown) {
                  const isAnyProgramActive = currentPath === "/programs" || currentPath.startsWith("/programs/");
                  return (
                    <li key={link.name} className="relative" ref={programMenuRef}>
                      <button
                        type="button"
                        onClick={() => {
                          setProgramMenuOpen(!programMenuOpen);
                          setGuideMenuOpen(false);
                          setLabMenuOpen(false);
                          setMoreMenuOpen(false);
                        }}
                        className={`text-xs font-bold tracking-tight py-1.5 whitespace-nowrap inline-flex items-center gap-1 transition-colors cursor-pointer relative ${
                          isAnyProgramActive
                            ? "text-orange-600 after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-orange-600 after:rounded-full"
                            : "text-slate-700 hover:text-orange-600"
                        }`}
                        aria-expanded={programMenuOpen}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${programMenuOpen ? "rotate-180" : ""}`} />
                      </button>

                      {programMenuOpen && (
                        <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in">
                          {programNavLinks.map((pLink) => {
                            const isPActive = currentPath === pLink.path;
                            return (
                              <Link
                                key={pLink.name}
                                to={pLink.path}
                                onClick={() => setProgramMenuOpen(false)}
                                className={`block px-4 py-2.5 text-xs font-bold transition-colors ${
                                  isPActive
                                    ? "bg-orange-50 text-orange-600"
                                    : "text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                                }`}
                              >
                                {pLink.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </li>
                  );
                }

                const isActive = currentPath === link.path;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`text-xs font-bold tracking-tight transition-colors duration-150 py-1.5 whitespace-nowrap relative ${
                        isActive
                          ? "text-orange-600 after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-orange-600 after:rounded-full"
                          : "text-slate-700 hover:text-orange-600"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}

              {/* More / Explore Dropdown */}
              <li className="relative" ref={moreMenuRef}>
                <button
                  type="button"
                  onClick={() => {
                    setMoreMenuOpen(!moreMenuOpen);
                    setGuideMenuOpen(false);
                    setProgramMenuOpen(false);
                    setLabMenuOpen(false);
                  }}
                  className={`text-xs font-bold tracking-tight py-1.5 whitespace-nowrap inline-flex items-center gap-1 transition-colors cursor-pointer ${
                    moreNavLinks.some((l) => l.path === currentPath)
                      ? "text-orange-600"
                      : "text-slate-700 hover:text-orange-600"
                  }`}
                  aria-expanded={moreMenuOpen}
                >
                  <span>{t("navMore")}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {moreMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in">
                    {moreNavLinks.map((subLink) => {
                      const isSubActive = currentPath === subLink.path;
                      return (
                        <Link
                          key={subLink.name}
                          to={subLink.path}
                          onClick={() => setMoreMenuOpen(false)}
                          className={`block px-4 py-2.5 text-xs font-bold transition-colors ${
                            isSubActive
                              ? "bg-orange-50 text-orange-600"
                              : "text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                          }`}
                        >
                          {subLink.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </li>
            </ul>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2 xl:gap-3 shrink-0">
              <button
                onClick={() => {
                  handleBookDemoClick();
                  setIsDemoModalOpen(true);
                }}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 xl:px-5 py-2.5 rounded-full font-bold text-xs xl:text-sm shadow-xs hover:shadow-md active:scale-95 transition-all inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>{t("navBookDiscoveryCta")}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>

              <Link
                to="/login"
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-full font-bold text-xs shadow-xs active:scale-95 transition-all inline-flex items-center cursor-pointer whitespace-nowrap"
              >
                {t("navSignIn") || "Sign In"}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Action Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-slate-800 hover:text-orange-600 focus:outline-none p-1.5 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 3. Mobile Expanded Drawer */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-screen opacity-100 border-b border-slate-200" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-slate-50 px-5 py-4 space-y-3.5 shadow-inner">
            <ul className="space-y-1 max-h-[60vh] overflow-y-auto">
              {allNavLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 rounded-xl text-xs md:text-sm font-bold transition-colors ${
                        isActive
                          ? "bg-orange-100 text-orange-700"
                          : "text-slate-700 hover:bg-white hover:text-orange-600"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-orange-600" />
                <span>{t("navSelectLanguage")}</span>
              </span>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                {(["en", "hi", "mr"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      language === lang
                        ? "bg-orange-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {lang === "en" ? "EN" : lang === "hi" ? "हिन्दी" : "मराठी"}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleBookDemoClick();
                  setIsDemoModalOpen(true);
                }}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-full text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{t("navBookParentCounselling")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Demo Booking Modal */}
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        source="navbar_button"
      />
    </header>
  );
}
