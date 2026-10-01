/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MessageSquare, X, Calendar, Sparkles } from "lucide-react";
import { trackWhatsAppClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";
import DemoBookingModal from "./DemoBookingModal";

export default function FloatingCTA() {
  const { t } = useLanguage();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  if (location.pathname === "/practice/session") {
    return null;
  }

  useEffect(() => {
    // Show buttons after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Trigger prompt bubble after 4 seconds
      const notificationTimer = setTimeout(() => {
        setShowNotification(true);
      }, 4000);
      return () => clearTimeout(notificationTimer);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsappDirect = () => {
    trackWhatsAppClick("floating_whatsapp_bubble", "parent_direct_chat");
    const message = encodeURIComponent(
      "Hello! I visited your website and would like to know more about Abacus and Vedic Maths classes for my child at Wakad Center / Online."
    );
    window.open(`https://wa.me/919021924968?text=${message}`, "_blank");
  };

  const handleOpenDemoModal = () => {
    trackWhatsAppClick("floating_book_demo_pill", "open_demo_modal");
    setShowNotification(false);
    setIsDemoModalOpen(true);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-6 right-5 z-45 flex flex-col items-end gap-3 pointer-events-none">
        {/* Interactive Chat / Demo Prompt Bubble */}
        {showNotification && (
          <div
            onClick={handleOpenDemoModal}
            className="bg-white text-gray-900 px-4 py-3 rounded-2xl shadow-2xl border border-orange-100 flex items-start gap-3 max-w-xs animate-fade-in pointer-events-auto cursor-pointer hover:bg-orange-50/40 transition-all hover:scale-102"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="block text-xs font-black text-slate-900 leading-tight">
                  Free Demo Class Available!
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="block text-[11px] text-slate-500 mt-1 leading-snug">
                Book a 1-on-1 assessment for your child at our Wakad center or online.
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 mt-1.5 hover:underline">
                Book in 30 seconds &rarr;
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotification(false);
              }}
              className="text-gray-400 hover:text-gray-600 p-0.5"
              aria-label="Close message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Dual Floating Buttons (Book Demo Pill + WhatsApp Circle) */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          {/* Quick Book Free Demo Pill */}
          <button
            onClick={handleOpenDemoModal}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs py-2.5 px-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-white/20"
            aria-label="Book Free Demo Class"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Free Demo</span>
          </button>

          {/* WhatsApp Action Button */}
          <button
            onClick={handleWhatsappDirect}
            className="bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center relative cursor-pointer group"
            aria-label="Direct Chat on WhatsApp"
          >
            <MessageSquare className="w-6 h-6 fill-current text-white" />

            {/* Hover tooltip for desktop users */}
            <span className="absolute right-14 bg-slate-900 text-white font-bold text-xs py-1.5 px-3 rounded-xl opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all origin-right pointer-events-none whitespace-nowrap shadow-lg">
              Chat on WhatsApp (+91 90219 24968)
            </span>
          </button>
        </div>
      </div>

      {/* Demo Booking Modal */}
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        source="floating_pill_cta"
      />
    </>
  );
}
