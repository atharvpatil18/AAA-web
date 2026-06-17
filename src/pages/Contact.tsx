/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import LeadForm from "../components/LeadForm";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  const handleSupportClick = (source: string) => {
    trackDemoClick(`contact_page_${source}`);
  };

  return (
    <div id="contact-page-container" className="bg-[#FFFDF9] min-h-screen">
      
      {/* 1. Header Banner */}
      <section className="bg-vibrant-dark text-white py-16 md:py-24 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-vibrant-teal/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-4 relative z-10">
          <span className="text-[10px] font-black text-vibrant-gold bg-[#FFF5CC]/15 border border-vibrant-gold/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            {t("contactPageBadge")}
          </span>
          <h1 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-tight">
            {t("contactPageTitle")}
          </h1>
          <p className="text-[#A2C4C9] text-xs md:text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
            {t("contactPageSubtitle")}
          </p>
        </div>
      </section>

      {/* 2. Form & Contacts grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-vibrant-orange bg-[#FFF0E0] border border-[#FFD8B1] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                {t("contactPageDetailsBadge")}
              </span>
              <h2 className="font-display font-black text-3xl text-vibrant-dark leading-tight">
                {t("contactPageDetailsTitle")}
              </h2>
              <p className="text-gray-550 text-xs md:text-sm font-semibold leading-relaxed">
                {t("contactPageDetailsSubtitle")}
              </p>
            </div>

            {/* Direct Icons Lists */}
            <div className="space-y-6">
              {/* Address */}
              <div className="bg-[#FFFDF9] border-4 border-vibrant-dark rounded-[32px] p-6 shadow-[8px_8px_0_0_#1A2E35] flex items-start gap-4">
                <div className="w-12 h-12 bg-vibrant-orange text-white border-2 border-vibrant-dark rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-black text-sm text-vibrant-dark mb-1">
                    {t("contactPageAddrLabel")}
                  </h3>
                  <p className="text-xs text-gray-550 font-bold leading-relaxed">
                    {t("footerAddress")}
                  </p>
                  <span className="block text-[10px] text-vibrant-orange italic mt-1.5 font-black">
                    {t("contactPageAddrNear")}
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-[#FFFDF9] border-4 border-vibrant-dark rounded-[32px] p-6 shadow-[8px_8px_0_0_#1A2E35] flex items-start gap-4">
                <div className="w-12 h-12 bg-vibrant-teal text-white border-2 border-vibrant-dark rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-black text-sm text-vibrant-dark mb-1">
                    {t("contactPagePhoneLabel")}
                  </h3>
                  <a 
                    href="tel:+919021924968" 
                    onClick={() => handleSupportClick("tel_call")}
                    className="font-black text-vibrant-dark hover:text-vibrant-orange text-sm md:text-base block"
                  >
                    +91 90219 24968
                  </a>
                  <span className="text-[10px] text-gray-400 font-bold block mt-0.5">
                    {t("contactPagePhoneSub")}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="bg-[#FFFDF9] border-4 border-vibrant-dark rounded-[32px] p-6 shadow-[8px_8px_0_0_#1A2E35] flex items-start gap-4">
                <div className="w-12 h-12 bg-vibrant-gold text-vibrant-dark border-2 border-vibrant-dark rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 " />
                </div>
                <div>
                  <h3 className="font-display font-black text-sm text-vibrant-dark mb-1">
                    {t("contactPageEmailLabel")}
                  </h3>
                  <a 
                    href="mailto:nehaatharv@gmail.com" 
                    onClick={() => handleSupportClick("email_write")}
                    className="font-black text-vibrant-dark hover:text-vibrant-orange text-sm block"
                  >
                    nehaatharv@gmail.com
                  </a>
                  <span className="text-[10px] text-gray-400 font-bold block mt-0.5">
                    {t("contactPageEmailSub")}
                  </span>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="bg-vibrant-dark text-white rounded-[32px] p-6 flex items-start gap-4 border-4 border-vibrant-dark shadow-[8px_8px_0_0_#E0FAF5]">
                <div className="w-12 h-12 bg-[#233C45] text-vibrant-gold border-2 border-slate-700 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-sm text-white mb-1">
                    {t("contactTimings")}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    {t("contactTimingsDesc")}
                  </p>
                  <p className="text-xs font-black text-vibrant-gold mt-1">
                    {t("contactPageTimingsNote")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-6 bg-[#FFFDF9]">
            <LeadForm sourceCampaign="Direct Contact Page Form" />
          </div>

        </div>
      </section>

      {/* 3. Location Google Maps Section */}
      <section className="py-16 md:py-20 bg-vibrant-cream border-t-4 border-vibrant-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-black text-vibrant-teal bg-[#E0FAF5] border border-vibrant-teal/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              {t("contactPageMapBadge")}
            </span>
            <h2 className="font-display font-black text-3xl text-vibrant-dark leading-tight">
              {t("contactPageMapTitle")}
            </h2>
            <p className="text-gray-550 text-xs md:text-sm font-semibold">
              {t("contactPageMapDesc")}
            </p>
          </div>

          {/* Map Frame wrapper */}
          <div className="h-[400px] md:h-[500px] bg-white rounded-[32px] border-4 border-vibrant-dark overflow-hidden shadow-[6px_6px_0_0_#1A2E35] md:shadow-[12px_12px_0_0_#1A2E35] relative">
            <iframe 
              src="https://maps.google.com/maps?q=18.5936735,73.7656606&z=17&output=embed" 
              className="w-full h-full border-0" 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Arnav Abacus Academy Map"
            />
          </div>

          {/* Travel Help Checks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs text-vibrant-dark font-black">
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
              <span>{t("contactPageTravel1")}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
              <span>{t("contactPageTravel2")}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
              <span>{t("contactPageTravel3")}</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
