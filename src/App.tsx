/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import InteractiveBrochure from "./pages/InteractiveBrochure";
import PracticeHub from "./pages/PracticeHub";
import PracticeSession from "./pages/PracticeSession";
import PracticeResult from "./pages/PracticeResult";
import Login from "./pages/Login";

import { LanguageProvider } from "./lib/LanguageContext";
import { AuthProvider, useAuth } from "./lib/AuthContext";

// Scroll restorer child to reset window scroll position on route switches
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Protected Route Guard for Practice Hub
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-vibrant-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!currentUser) {
    const fullPath = location.pathname + location.search;
    return <Navigate to={`/login?redirect=${encodeURIComponent(fullPath)}`} replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
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
              
              {/* Authenticated Practice Hub sub-routes */}
              <Route path="/practice" element={<ProtectedRoute><PracticeHub /></ProtectedRoute>} />
              <Route path="/practice/session" element={<ProtectedRoute><PracticeSession /></ProtectedRoute>} />
              <Route path="/practice/results" element={<ProtectedRoute><PracticeResult /></ProtectedRoute>} />
              
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/showcase" element={<Showcase />} />
              <Route path="/gallery" element={<Showcase defaultTab="gallery" />} />
              <Route path="/news" element={<NewsEvents />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/brochure" element={<InteractiveBrochure />} />
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
    </AuthProvider>
  </LanguageProvider>
  );
}


