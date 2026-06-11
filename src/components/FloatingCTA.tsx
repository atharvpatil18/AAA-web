/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { MessageSquare, X, PhoneCall } from "lucide-react";
import { trackDemoClick } from "../lib/analytics";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Show button after 3 seconds scroll position or time delays
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Trigger small tooltip prompt after 5 seconds
      const notificationTimer = setTimeout(() => {
        setShowNotification(true);
      }, 3000);
      return () => clearTimeout(notificationTimer);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsappClick = () => {
    trackDemoClick("floating_whatsapp_bubble");
    const message = encodeURIComponent("Hello! I visited your website and would like to inquire about your Abacus/Vedic Maths batches.");
    window.open(`https://wa.me/919021924968?text=${message}`, "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-45 flex flex-col items-end gap-3 pointer-events-none">
      {/* Small notification dialog box */}
      {showNotification && (
        <div className="bg-white text-gray-900 px-4 py-3 rounded-2xl shadow-xl border border-gray-100 flex items-start gap-2.5 max-w-xs animate-fade-in pointer-events-auto">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mt-1.5 shrink-0" />
          <div className="flex-1">
            <span className="block text-xs font-bold text-gray-900 leading-tight">Neha Patil (Mentor)</span>
            <span className="block text-[11px] text-gray-500 mt-0.5 leading-relaxed">Let's coordinate a free demo schedule over WhatsApp! 🎯</span>
          </div>
          <button 
            onClick={() => setShowNotification(false)}
            className="text-gray-400 hover:text-gray-600 p-0.5"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={handleWhatsappClick}
        className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-150 flex items-center justify-center pointer-events-auto relative cursor-pointer animate-pulse-slow group"
        aria-label="Direct Chat on WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-current text-white" />
        
        {/* Hover label for desktop users */}
        <span className="absolute right-14 bg-emerald-500 text-white font-bold text-xs py-2 px-3 rounded-xl opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all origin-right pointer-events-none whitespace-nowrap shadow-md">
          Chat with Us
        </span>
      </button>
    </div>
  );
}
