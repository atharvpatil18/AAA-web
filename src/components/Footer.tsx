/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  const [logoFailed, setLogoFailed] = React.useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-slate-900">
          
          {/* Column 1: Company Branding */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border border-slate-800 shadow-md group-hover:scale-105 transition-transform shrink-0">
                {!logoFailed ? (
                  <img 
                    src="/logo.png" 
                    alt="Arnav Abacus Academy" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                    onError={() => setLogoFailed(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-display font-extrabold text-white text-xs">
                    AA
                  </div>
                )}
              </div>
              <div>
                <span className="font-display font-black text-white text-sm tracking-tight block leading-tight">
                  Arnav Abacus Academy
                </span>
                <span className="text-[9px] text-slate-500 font-medium tracking-wider uppercase block leading-none">
                  &amp; Vedic Maths Classes
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              Empowering children aged 4-14 in Wakad with cognitive skills, speed arithmetic, visual calculation, and complete math confidence.
            </p>
            {/* Social handles */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-orange-500 hover:border-orange-500 flex items-center justify-center transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-orange-500 hover:border-orange-500 flex items-center justify-center transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Program Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-slate-200 uppercase tracking-widest mb-4">
              Our Programs
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/programs" className="hover:text-orange-500 transition-colors">
                  All Courses Overview
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-orange-500 transition-colors">
                  Abacus Math Course (Ages 4-14)
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-orange-500 transition-colors">
                  Vedic Mathematics (Ages 10+)
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-orange-500 transition-colors">
                  School Maths (Class 1-10 CBSE/ICSE)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academy Schedule */}
          <div>
            <h4 className="font-display font-bold text-sm text-slate-200 uppercase tracking-widest mb-4">
              Academy Schedule
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-slate-300">Open Every Day</span>
                  <span className="text-slate-400">Regular Batches &amp; Diagnostics</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-slate-300">Flexible Timings</span>
                  <span className="text-slate-400">Personalized learning paths</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Academy Center Address */}
          <div>
            <h4 className="font-display font-bold text-sm text-slate-200 uppercase tracking-widest mb-4">
              Our Location
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-slate-400 text-[11px]">
                  Flat no. 3, Arnav Abacus Academy, Adv. Balaji Sagar Bungalow, Opp. Creative Cameo, Wakad, Pimpri-Chinchwad, Maharashtra 411057
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="tel:+919021924968" className="hover:text-white transition">
                  +91 90219 24968
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="mailto:nehaatharv@gmail.com" className="hover:text-white transition">
                  nehaatharv@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div>
            <p>&copy; {currentYear} Arnav Abacus Academy and Vedic Maths Classes. All Rights Reserved.</p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="flex items-center gap-1 text-slate-500">
              Founder &amp; Mentor: <strong className="text-slate-300">Neha Patil</strong> (IIVA Certified)
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Government Recognized
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
