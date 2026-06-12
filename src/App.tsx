/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";
import Home from "./pages/Home";
import Mentor from "./pages/Mentor";
import Programs from "./pages/Programs";
import Contact from "./pages/Contact";
import Faqs from "./pages/Faqs";
import CampaignPage from "./pages/CampaignPage";
import Showcase from "./pages/Showcase";
import NewsEvents from "./pages/NewsEvents";

// Scroll restorer child to reset window scroll position on route switches
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50 font-sans antialiased text-gray-800">
        
        {/* Sticky Header with alert bar and links */}
        <Navbar />

        {/* Core dynamic route component view */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mentor" element={<Mentor />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/news" element={<NewsEvents />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/campaigns/:slug" element={<CampaignPage />} />
            {/* Fallback routing */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Footers for branding, socials and locations */}
        <Footer />

        {/* Contact WhatsApp balloon */}
        <FloatingCTA />

      </div>
    </Router>
  );
}

