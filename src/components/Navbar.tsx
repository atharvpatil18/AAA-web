/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, Clock, Menu, X, ArrowRight, MessageCircle } from "lucide-react";
import { trackDemoClick } from "../lib/analytics";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const location = useLocation();

  const handleBookDemoClick = () => {
    trackDemoClick("navbar_header_cta");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Programs", path: "/programs" },
    { name: "Success & Gallery", path: "/showcase" },
    { name: "News & Events", path: "/news" },
    { name: "Meet Mentor", path: "/mentor" },
    { name: "FAQs", path: "/faqs" },
    { name: "Contact", path: "/contact" }
  ];

  const currentPath = location.pathname;

  return (
    <header id="main-header" className="sticky top-0 z-50 w-full shadow-md">


      {/* 1. Top Alert Bar */}
      <div className="bg-slate-900 text-slate-100 py-2.5 px-4 md:px-8 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Working Details */}
          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              Brain Center • Open Every Day
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Batches Ongoing
            </span>
          </div>

          {/* Social Handles / Contact info */}
          <div className="flex items-center gap-4 font-medium text-slate-200">
            <a 
              href="mailto:nehaatharv@gmail.com" 
              className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              nehaatharv@gmail.com
            </a>
            <a 
              href="https://wa.me/919021924968" 
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              +91 90219 24968
            </a>
          </div>
        </div>
      </div>      {/* 2. Main Navbar */}
      <nav id="navbar-body" className="bg-white border-b-4 border-vibrant-orange shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex justify-between items-center">
          {/* Logo Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-10 h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-vibrant-dark shadow-md group-hover:scale-105 transition-transform shrink-0">
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
                      className={`text-sm font-black tracking-wide transition-colors duration-150 py-1.5 ${
                        isActive
                          ? "text-vibrant-orange border-b-2 border-vibrant-orange"
                          : "text-gray-650 hover:text-vibrant-orange"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTA Button with Flat Brutallist Shadow */}
            <a
              href="https://wa.me/919021924968"
              onClick={handleBookDemoClick}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-vibrant-teal text-white px-6 py-2.5 rounded-full font-black text-sm shadow-[0_4px_0_0_#00897B] active:translate-y-1 active:shadow-none hover:brightness-105 transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              Book Free Demo
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
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
                          : "text-gray-650 hover:bg-white hover:text-vibrant-orange"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="pt-2 border-t border-gray-100">
              <a
                href="https://wa.me/919021924968"
                onClick={() => {
                  setIsOpen(false);
                  handleBookDemoClick();
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-vibrant-teal text-white py-3 rounded-xl font-bold shadow-[0_4px_0_0_#00897B] active:translate-y-0.5 active:shadow-none text-center text-xs md:text-sm flex items-center justify-center gap-1.5"
              >
                Book Free Demo Now
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
