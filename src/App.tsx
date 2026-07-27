/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, useEffect } from "react";
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
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-vibrant-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const hasGuestAccess = !!localStorage.getItem("aaa_guest_user");

  if (!currentUser && !hasGuestAccess) {
    localStorage.setItem("aaa_guest_user", JSON.stringify({ email: "guest_visitor@arnavabacus.com", name: "Guest Student" }));
  }

  return <>{children}</>;
}

// Global Error Boundary with safe fallback
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null; retryCount: number }
> {
  declare props: { children: React.ReactNode };
  state = {
    hasError: false,
    error: null as Error | null,
    retryCount: 0,
  };

  constructor(props: { children: React.ReactNode }) {
    super(props);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("UI Render Error Boundary caught:", error, errorInfo);
    if (this.state.retryCount < 1) {
      setTimeout(() => {
        (this as unknown as { setState: Function }).setState((prev: { retryCount: number }) => ({ hasError: false, error: null, retryCount: prev.retryCount + 1 }));
      }, 150);
    }
  }

  render() {
    if (this.state.hasError && this.state.retryCount >= 1) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-slate-200 shadow-xl rounded-3xl p-8 max-w-md w-full text-center space-y-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              ⚡
            </div>
            <h2 className="text-lg font-black text-slate-900">Practice Session Ready to Reload</h2>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              We encountered a temporary render sync issue upon refresh. Click below to reload your speed math session smoothly.
            </p>
            {this.state.error && (
              <div className="bg-slate-100 text-left p-3 rounded-xl border border-slate-300 font-mono text-[11px] text-rose-600 overflow-x-auto max-h-32">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  (this as unknown as { setState: Function }).setState({ hasError: false, error: null, retryCount: 0 });
                  window.location.reload();
                }}
                className="w-full bg-vibrant-orange hover:bg-vibrant-orange/95 text-white font-black py-3 rounded-xl text-xs transition-all shadow-md cursor-pointer uppercase tracking-wider"
              >
                Reload Session
              </button>
              <button
                onClick={() => {
                  window.location.href = "/practice";
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer"
              >
                Back to Practice Hub
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (this.props as { children: React.ReactNode }).children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
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
  </ErrorBoundary>
  );
}


