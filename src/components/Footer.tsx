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
                  &amp; {language === "hi" ? "वैदिक गणित क्लासेस" : language === "mr" ? "वैदिक गणित क्लासेस" : "Vedic Maths Classes"}
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              {language === "hi" ? "4-14 वर्ष के बच्चों को संज्ञानात्मक कौशल, तीव्र अंकगणित, विज़ुअल गणना और पूर्ण गणित आत्मविश्वास के साथ सशक्त बनाना।" : language === "mr" ? "४-१४ वर्षे वयोगटातील मुलांना गणिती कौशल्ये, वेगवान आकडेमोड आणि संपूर्ण गणिताचा आत्मविश्वास मिळवून देणे." : "Empowering children aged 4-14 with cognitive skills, speed arithmetic, visual calculation, and complete math confidence."}
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
              {language === "hi" ? "हमारे कोर्सेस" : language === "mr" ? "आमचे कोर्सेस" : "Our Programs"}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/programs" className="hover:text-orange-500 transition-colors">
                  {language === "hi" ? "सभी कोर्सेस का विवरण" : language === "mr" ? "सर्व कोर्सेसची माहिती" : "All Courses Overview"}
                </Link>
              </li>
              <li>
                <Link to="/programs/abacus" className="hover:text-orange-500 transition-colors">
                  {language === "hi" ? "एबाकस गणित (उम्र 4.5–9)" : language === "mr" ? "ॲबॅकस गणित (वय ४.५–९)" : "Abacus Mathematics (Ages 4.5–9)"}
                </Link>
              </li>
              <li>
                <Link to="/programs/vedic-maths" className="hover:text-orange-500 transition-colors">
                  {language === "hi" ? "वैदिक गणित (उम्र 9–14)" : language === "mr" ? "वैदिक गणित (वय ९–१४)" : "Vedic Mathematics (Ages 9–14)"}
                </Link>
              </li>
              <li>
                <Link to="/programs/mental-maths" className="hover:text-orange-500 transition-colors">
                  {language === "hi" ? "मेंटल मैथ (उम्र 6–14)" : language === "mr" ? "मेंटल मॅथ (वय ६–१४)" : "Mental Mathematics (Ages 6–14)"}
                </Link>
              </li>
              <li>
                <Link to="/programs/school-maths" className="hover:text-orange-500 transition-colors">
                  {language === "hi" ? "स्कूल गणित (कक्षा 1–10)" : language === "mr" ? "शालेय गणित (इयत्ता १ ते १०)" : "School Mathematics (Grades 1–10)"}
                </Link>
              </li>
              <li>
                <Link to="/programs/ipm-olympiad" className="hover:text-orange-500 transition-colors">
                  {language === "hi" ? "IPM और ओलंपियाड (कक्षा 2–9)" : language === "mr" ? "IPM आणि ऑलिम्पियाड (इयत्ता २ ते ९)" : "IPM & Olympiad Prep (Grades 2–9)"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Parent Guides & Educational Insights */}
          <div>
            <h4 className="font-display font-bold text-sm text-slate-200 uppercase tracking-widest mb-4">
              {language === "hi" ? "अभिभावक मार्गदर्शिका" : language === "mr" ? "पालक मार्गदर्शिका" : "Parent Guides"}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/parent-guides" className="text-amber-400 hover:text-white font-semibold transition-colors">
                  &rarr; {language === "hi" ? "मार्गदर्शिका हब देखें" : language === "mr" ? "मार्गदर्शिका हब पहा" : "Parent Guides Hub"}
                </Link>
              </li>
              <li>
                <Link to="/parent-guides/abacus-vs-vedic-maths" className="hover:text-orange-500 transition-colors">
                  Abacus vs Vedic Maths
                </Link>
              </li>
              <li>
                <Link to="/parent-guides/does-abacus-confuse-school-math" className="hover:text-orange-500 transition-colors">
                  Does Abacus Confuse School Math?
                </Link>
              </li>
              <li>
                <Link to="/parent-guides/why-children-use-finger-counting" className="hover:text-orange-500 transition-colors">
                  Stopping Finger Counting
                </Link>
              </li>
              <li>
                <Link to="/parent-guides/why-smart-children-make-silly-math-mistakes" className="hover:text-orange-500 transition-colors">
                  Fixing Silly Math Mistakes
                </Link>
              </li>
              <li>
                <Link to="/parent-guides/ideal-age-to-start-abacus" className="hover:text-orange-500 transition-colors">
                  Ideal Age to Start Abacus
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Academy Center Address */}
          <div>
            <h4 className="font-display font-bold text-sm text-slate-200 uppercase tracking-widest mb-4">
              {language === "hi" ? "हमारा पता" : language === "mr" ? "आमचा पत्ता" : "Our Location"}
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
                {language === "hi" ? "अभिभावक एवं ग्राहक शिकायत संपर्क:" : language === "mr" ? "पालक आणि ग्राहक तक्रार निवारण संपर्क:" : "Parent & Customer Grievance Contact:"}
              </span>
              <p className="text-slate-400">
                Nitin Patil • <a href="tel:+919021924968" className="text-amber-400 hover:underline">+91 90219 24968</a>
              </p>
              <p className="text-[10px] text-slate-500">
                Wakad Center, Pune (Mon–Sat, 9:30 AM – 7:30 PM)
              </p>
            </div>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Arnav Logo" className="w-5 h-5 object-cover rounded-full shrink-0" />
            <p>{language === "hi" ? `© ${currentYear} अर्णव एबाकस एकेडमी और वैदिक गणित क्लासेस। सर्वाधिकार सुरक्षित।` : language === "mr" ? `© ${currentYear} अर्णव ॲबॅकस अकॅडमी आणि वैदिक गणित क्लासेस. सर्व हक्क सुरक्षित.` : `© ${currentYear} Arnav Abacus Academy and Vedic Maths Classes. All Rights Reserved.`}</p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="flex items-center gap-1 text-slate-400">
              {language === "hi" ? "संस्थापक और मेंटर: " : language === "mr" ? "संस्थापक आणि मार्गदर्शक: " : "Founder &amp; Mentor: "} <strong className="text-slate-200">Neha Patil</strong> (Certified Trainer of Abacus & Vedic Maths)
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> {language === "hi" ? "अधिकृत एबाकस कौशल केंद्र (पंजी. CI2023/100000455)" : language === "mr" ? "अधिकृत ॲबॅकस कौशल्य केंद्र (नोंदणी CI2023/100000455)" : "Authorised Skill Centre in Abacus (Reg. CI2023/100000455)"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
