/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, Clock, Menu, X, ArrowRight, MessageCircle, Globe } from "lucide-react";
import { trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";
import { Language } from "../lib/translations";
import { generateBrochurePDF } from "../lib/brochure";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const location = useLocation();

  const handleBookDemoClick = () => {
    trackDemoClick("navbar_header_cta");
  };

  const navLinks = [
    { name: t("navHome"), path: "/" },
    { name: t("navPrograms"), path: "/programs" },
    { name: t("navSuccess"), path: "/showcase" },
    { name: t("navNews"), path: "/news" },
    { name: t("navMentor"), path: "/mentor" },
    { name: t("navFaqs"), path: "/faqs" },
    { name: t("navContact"), path: "/contact" }
  ];

  const currentPath = location.pathname;

  return (
    <header id="main-header" className="sticky top-0 z-50 w-full shadow-md">


      {/* 1. Top Alert Bar */}
      <div className="bg-slate-900 text-slate-100 py-1.5 px-3 md:px-8 text-[11px] border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          {/* Working Details (Hidden on smaller screens to save space) */}
          <div className="hidden md:flex items-center gap-4 text-slate-300 shrink-0">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              {t("workingCenter")}
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {t("batchesOngoing")}
            </span>
          </div>

          {/* Social Handles / Contact info & Language Toggle */}
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto font-medium text-slate-200">
            <div className="flex items-center gap-3">
              <a 
                href="mailto:nehaatharv@gmail.com" 
                className="flex items-center gap-1 hover:text-orange-400 transition-colors"
                title="Email nehaatharv@gmail.com"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">nehaatharv@gmail.com</span>
              </a>
              <a 
                href="https://wa.me/919021924968" 
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>+91 90219 24968</span>
              </a>
            </div>
            
            {/* Language Selector Dropdown */}
            <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-slate-200 hover:border-vibrant-orange transition-colors">
              <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent border-none text-[10px] font-black focus:outline-none cursor-pointer text-slate-200 py-0.5"
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
      <nav id="navbar-body" className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex justify-between items-center">
          {/* Logo Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-10 h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center overflow-hidden border border-slate-200 shadow-xs group-hover:scale-105 transition-transform shrink-0">
                {!logoFailed ? (
                  <img 
                    src="/logo.png" 
                    alt="Arnav Abacus Academy" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                    onError={() => setLogoFailed(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-vibrant-orange flex items-center justify-center text-white font-black text-2xl">
                    A
                  </div>
                )}
              </div>
            </div>
            <div>
              <span className="font-display font-black text-vibrant-dark text-sm md:text-lg tracking-tight block group-hover:text-vibrant-orange transition-colors leading-none">
                ARNAV ABACUS
              </span>
              <span className="text-[9px] md:text-[10px] text-vibrant-orange font-bold uppercase tracking-widest block mt-0.5 leading-none">
                Vedic Maths Academy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`text-sm font-semibold tracking-wide transition-colors duration-150 py-1.5 relative ${
                        isActive
                          ? "text-vibrant-orange after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-vibrant-orange after:rounded-full"
                          : "text-gray-660 hover:text-vibrant-orange"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTA Button with Flat shadow replacement */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://wa.me/919021924968"
                onClick={handleBookDemoClick}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-vibrant-teal hover:bg-vibrant-teal/95 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-xs hover:shadow-md active:scale-95 transition-all inline-flex items-center gap-1.5 cursor-pointer text-center"
              >
                {t("bookFreeDemo")}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <Link
                to="/brochure"
                className="bg-vibrant-orange hover:bg-vibrant-orange/95 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-xs hover:shadow-md active:scale-95 transition-all inline-flex items-center gap-1.5 cursor-pointer text-center"
                title="View & Download 1-Page Brochure"
              >
                <span>{t("downloadBrochure")}</span>
                <span className="text-[9px] bg-white text-vibrant-orange px-1.5 py-0.5 rounded font-black">Interactive</span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Action Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-vibrant-dark hover:text-vibrant-orange focus:outline-none p-1.5"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 3. Mobile Expanded Drawer */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-screen opacity-100 border-b border-gray-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-vibrant-cream px-5 py-4 space-y-3.5 shadow-inner">
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                        isActive
                          ? "bg-vibrant-orange/10 text-vibrant-orange"
                          : "text-gray-655 hover:bg-white hover:text-vibrant-orange"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2.5">
              <a
                href="https://wa.me/919021924968"
                onClick={() => {
                  setIsOpen(false);
                  handleBookDemoClick();
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-vibrant-teal hover:bg-vibrant-teal/95 text-white py-3 rounded-xl font-bold shadow-xs hover:shadow-md active:scale-95 transition-all text-center text-xs md:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {t("bookTrial")}
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/brochure"
                onClick={() => setIsOpen(false)}
                className="w-full bg-vibrant-orange hover:bg-vibrant-orange/95 text-white py-3 rounded-xl font-bold shadow-xs hover:shadow-md active:scale-95 transition-all text-center text-xs md:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{t("downloadBrochure")}</span>
                <span className="text-[9px] bg-white text-vibrant-orange px-1.5 py-0.5 rounded font-black">Interactive</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
