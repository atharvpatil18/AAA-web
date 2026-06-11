/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import LeadForm from "../components/LeadForm";
import TrustBar from "../components/TrustBar";
import { CAMPAIGNS } from "../data";
import { Sparkles, CheckCircle2, ArrowLeft, MessageSquare, PhoneCall, Award } from "lucide-react";
import { trackDemoClick } from "../lib/analytics";

export default function CampaignPage() {
  const { slug } = useParams<{ slug: string }>();

  // Fail-safe redirect if campaign doesn't exist
  if (!slug || !CAMPAIGNS[slug]) {
    return <Navigate to="/" replace />;
  }

  const campaign = CAMPAIGNS[slug];

  const handleCampaignCta = () => {
    trackDemoClick("campaign_landing_page_direct_cta", { campaignSlug: slug });
    
    const messages: Record<string, string> = {
      "math-phobia": "Hello Arnav Abacus Academy! I am looking at your Math Phobia campaign. I'd love to book a Free Confidence-Booster Demo Session for my child to turn math fear into fun!",
      "competitive-exam": "Hello Arnav Abacus Academy! My child is looking at Olympiads/Academic competitive preparation. I'd love to book a Free Speed Assessment to compute 10x faster!",
      "brain-development": "Hello Arnav Abacus Academy! We want to activate our child's photographic visual memory. I'd love to sign up for a Free Brain Skills Demo Session!"
    };

    const text = encodeURIComponent(messages[slug] || "Hello Arnav Abacus Academy! We are interested in a free Demo Class, please activate our 10% enrollment discount.");
    window.location.href = `https://wa.me/919021924968?text=${text}`;
  };

  // Pre-selected program default depending on campaign focus
  const getDefaultProgram = (slugStr: string): string => {
    switch (slugStr) {
      case "competitive-exam":
        return "Vedic Math";
      case "brain-development":
        return "Abacus";
      case "math-phobia":
      default:
        return "Abacus";
    }
  };

  return (
    <div id="campaign-landing-wrapper" className="bg-slate-50 min-h-screen">
      
      {/* 1. Header Hero Banner matching theme parameters */}
      <section className={`bg-gradient-to-r ${campaign.gradient} text-white py-16 md:py-24 relative overflow-hidden`}>
        {/* Particle circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-6">
          
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> High-impact trial campaign
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight max-w-4xl mx-auto">
            {campaign.title}
          </h1>

          <p className="text-white/90 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            {campaign.subtitle}
          </p>

          <div className="pt-2">
            <button
              onClick={handleCampaignCta}
              className="bg-white hover:bg-slate-100 text-gray-900 font-bold px-8 py-4 px-6 rounded-2xl shadow-xl hover:scale-101 active:scale-95 transition-all text-xs md:text-sm uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-orange-600 fill-current shrink-0" />
              {campaign.ctaText}
            </button>
          </div>

        </div>
      </section>

      {/* 2. Standard Statistics Counters Bar */}
      <div className="px-4 md:px-8">
        <TrustBar />
      </div>

      {/* 3. Core Lead capture & Core features details */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column Left: Benefits Checklist */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-3.5 py-1 rounded-full uppercase tracking-widest inline-block">
                Exclusive Parental Program Benefits
              </span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-gray-900 leading-tight">
                Designed to secure immediate academic milestones
              </h2>
              <p className="text-gray-650 text-xs md:text-sm leading-relaxed">
                Unlock double digit evaluations, photographic memorization structure, and complete peace of mind. Neha Patil (IIVA Certified) coordinates our Wakad center, giving attention to child confidence progression.
              </p>
            </div>

            {/* Checklist Box */}
            <div className="bg-white border border-gray-150 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
              <h3 className="font-display font-bold text-sm text-gray-950 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-500 shrink-0" /> Why this works:
              </h3>
              <div className="space-y-4.5">
                {campaign.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="p-0.5 rounded-full bg-emerald-50 text-emerald-500 shrink-0 mt-0.5 border border-emerald-100">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs md:text-sm text-gray-800 font-semibold block">
                        {feat}
                      </span>
                      <span className="text-[11px] text-gray-400 block mt-0.5">
                        Aligned with certified child educational milestones
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Back action */}
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-orange-600 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Arnav Academy Homepage
              </Link>
            </div>
          </div>

          {/* Column Right: Responsive Lead Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-gray-50 p-1 shadow-2xl">
            <LeadForm 
              sourceCampaign={`Campaign: ${campaign.title}`} 
              defaultProgram={getDefaultProgram(slug)} 
            />
          </div>

        </div>
      </section>

      {/* 4. Mini Footer CTA info */}
      <section className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-center text-xs md:text-sm">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="block font-bold text-slate-200">Arnav Abacus Academy and Vedic Maths Classes</span>
          <span className="block text-slate-500 leading-relaxed text-[11px] lg:text-xs">
            Flat no. 3, Adv. Balaji Sagar Bungalow, Opp. Creative Cameo, Wakad, Pimpri-Chinchwad, Maharashtra 411057 (Near Park Street, Wakad).
          </span>
          <span className="block text-[10px] text-orange-400/80 font-medium">
            Contact phone: +91 90219 24968 | Founder Neha Patil (IIVA Certified)
          </span>
        </div>
      </section>

    </div>
  );
}
