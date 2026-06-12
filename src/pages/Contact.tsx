/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import LeadForm from "../components/LeadForm";
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck, CheckCircle } from "lucide-react";
import { trackDemoClick } from "../lib/analytics";

export default function Contact() {
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
            Connect With Our Center
          </span>
          <h1 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-tight">
            Contact Arnav Abacus Academy
          </h1>
          <p className="text-[#A2C4C9] text-xs md:text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
            Have questions about fees, timetables, or child evaluation classes? Visit our Wakad center or get in touch below.
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
                DIRECT CONTACT DETAILS
              </span>
              <h2 className="font-display font-black text-3xl text-vibrant-dark leading-tight">
                Reach Neha Patil &amp; Nitin Sir Directly
              </h2>
              <p className="text-gray-500 text-xs md:text-sm font-semibold leading-relaxed">
                Parents are free to call us, write an email, or initiate a WhatsApp chat anytime. We are open every day to solve your queries!
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
                    Academy Center Address
                  </h3>
                  <p className="text-xs text-gray-500 font-bold leading-relaxed">
                    Flat no. 3, 1st Floor, Advocate Balaji Sagar Bungalow, Opp. Creative Cameo, Near Park Street, Wakad, Pune, Maharashtra 411057
                  </p>
                  <span className="block text-[10px] text-vibrant-orange italic mt-1.5 font-black">
                    ★ Near Park Street, Wakad
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
                    Phone Support
                  </h3>
                  <a 
                    href="tel:+919021924968" 
                    onClick={() => handleSupportClick("tel_call")}
                    className="font-black text-vibrant-dark hover:text-vibrant-orange text-sm md:text-base block"
                  >
                    +91 90219 24968
                  </a>
                  <span className="text-[10px] text-gray-400 font-bold block mt-0.5">
                    Call Neha Patil (Mentor/Founder)
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
                    Email Inquiries
                  </h3>
                  <a 
                    href="mailto:nehaatharv@gmail.com" 
                    onClick={() => handleSupportClick("email_write")}
                    className="font-black text-vibrant-dark hover:text-vibrant-orange text-sm block"
                  >
                    nehaatharv@gmail.com
                  </a>
                  <span className="text-[10px] text-gray-400 font-bold block mt-0.5">
                    Usually replies within 24 hours
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
                    Academy Timings
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    9 AM to 9 PM (All Days)
                  </p>
                  <p className="text-xs font-black text-vibrant-gold mt-1">
                    Flexible and customized batches to fit your routine
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
              LIVE ACCURATE LOCATION MAPS
            </span>
            <h2 className="font-display font-black text-3xl text-vibrant-dark leading-tight">
              Locate Our Wakad Classroom Center
            </h2>
            <p className="text-gray-550 text-xs md:text-sm font-semibold">
              Flat no. 3, 1st Floor, Advocate Balaji Sagar Bungalow, Opp. Creative Cameo, Near Park Street, Wakad, Pune. Use the interactive map details below to coordinate easy travel directions.
            </p>
          </div>

          {/* Map Frame wrapper */}
          <div className="h-[400px] md:h-[500px] bg-white rounded-[32px] border-4 border-vibrant-dark overflow-hidden shadow-[12px_12px_0_0_#1A2E35] relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.5646394200424!2d73.7656606!3d18.5936735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9beebda0335%3A0xcb13e9a405527f31!2sArnav%20Abacus%20Academy%20%26%20Vedic%20Maths%20Classes!5e0!3m2!1sen!2sin!4v1716500000000!5m2!1sen!2sin" 
              className="w-full h-full border-0" 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Arnav Abacus Academy Map Wakad"
            />
          </div>

          {/* Travel Help Checks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs text-vibrant-dark font-black">
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
              <span><strong>Parking:</strong> Free street parking for two-wheelers &amp; family cars outside Adv. Balaji Sagar Bungalow gates.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
              <span><strong>Landmarks:</strong> Right across from Creative Cameo, and just a fast 2-minute drive from Park Street housing gates.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
              <span><strong>Security:</strong> Secure residential street ensuring excellent child safety rules before and after tuition slots.</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
