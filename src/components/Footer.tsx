/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, ShieldCheck, Heart } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

export default function Footer() {
  const { language, t } = useLanguage();
  const location = useLocation();
  const [logoFailed, setLogoFailed] = React.useState(false);
  const currentYear = new Date().getFullYear();

  if (location.pathname === "/practice/session") {
    return null;
  }

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
                  &amp; {t("footerVedicClasses")}
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              {t("footerEmpoweringDesc")}
            </p>
            {/* Social handles */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://www.facebook.com/groups/1031935784445726/?ref=share&mibextid=NSMWBT" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Visit Arnav Abacus Academy Facebook Group"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-orange-500 hover:border-orange-500 flex items-center justify-center transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/lakshmi_narayan_1303?igsh=cDlwM2ZxNWltYXFr" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Visit Arnav Abacus Academy on Instagram"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-orange-500 hover:border-orange-500 flex items-center justify-center transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Program Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-slate-200 uppercase tracking-widest mb-4">
              {t("footerOurPrograms")}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/programs" className="hover:text-orange-500 transition-colors">
                  {t("footerAllCourses")}
                </Link>
              </li>
              <li>
                <Link to="/programs/abacus" className="hover:text-orange-500 transition-colors">
                  {t("navAbacusProgram")}
                </Link>
              </li>
              <li>
                <Link to="/programs/vedic-maths" className="hover:text-orange-500 transition-colors">
                  {t("navVedicProgram")}
                </Link>
              </li>
              <li>
                <Link to="/programs/mental-maths" className="hover:text-orange-500 transition-colors">
                  {t("navMentalProgram")}
                </Link>
              </li>
              <li>
                <Link to="/programs/school-maths" className="hover:text-orange-500 transition-colors">
                  {t("navSchoolProgram")}
                </Link>
              </li>
              <li>
                <Link to="/programs/ipm-olympiad" className="hover:text-orange-500 transition-colors">
                  {t("navIpmProgram")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Parent Guides & Educational Insights */}
          <div>
            <h4 className="font-display font-bold text-sm text-slate-200 uppercase tracking-widest mb-4">
              {t("footerParentGuidesTitle")}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/parent-guides" className="text-amber-400 hover:text-white font-semibold transition-colors">
                  &rarr; {t("footerParentGuidesHub")}
                </Link>
              </li>
              <li>
                <Link to="/parent-guides/abacus-vs-vedic-maths" className="hover:text-orange-500 transition-colors">
                  {t("footerGuide1")}
                </Link>
              </li>
              <li>
                <Link to="/parent-guides/does-abacus-confuse-school-math" className="hover:text-orange-500 transition-colors">
                  {t("footerGuide2")}
                </Link>
              </li>
              <li>
                <Link to="/parent-guides/why-children-use-finger-counting" className="hover:text-orange-500 transition-colors">
                  {t("footerGuide3")}
                </Link>
              </li>
              <li>
                <Link to="/parent-guides/why-smart-children-make-silly-math-mistakes" className="hover:text-orange-500 transition-colors">
                  {t("footerGuide4")}
                </Link>
              </li>
              <li>
                <Link to="/parent-guides/ideal-age-to-start-abacus" className="hover:text-orange-500 transition-colors">
                  {t("footerGuide5")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Academy Center Address */}
          <div>
            <h4 className="font-display font-bold text-sm text-slate-200 uppercase tracking-widest mb-4">
              {t("footerOurLocation")}
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-slate-400 text-[11px]">
                  {t("footerAddress")}
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
            <div className="mt-4 pt-3.5 border-t border-slate-800/80 text-[11px] space-y-1">
              <span className="font-bold text-slate-300 block">
                {t("footerGrievanceTitle")}
              </span>
              <p className="text-slate-400">
                Nitin Patil • <a href="tel:+919021924968" className="text-amber-400 hover:underline">+91 90219 24968</a>
              </p>
              <p className="text-[10px] text-slate-500">
                {t("footerGrievanceTiming")}
              </p>
            </div>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Arnav Logo" className="w-5 h-5 object-cover rounded-full shrink-0" />
            <p>© {currentYear} {t("footerCopyrightNotice")}</p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="flex items-center gap-1 text-slate-400">
              {t("footerFounderMentor")} <strong className="text-slate-200">Neha Patil</strong> {t("footerFounderRole")}
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> {t("footerSkillCenter")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
