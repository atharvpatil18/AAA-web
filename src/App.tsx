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

  const isGuestUser = Boolean(localStorage.getItem("aaa_guest_user"));
  const isSessionOrResults = location.pathname.startsWith("/practice/session") || location.pathname.startsWith("/practice/results");

  // /practice (Practice Hub catalog) is ONLY for registered student login (currentUser).
  // Guest login users are restricted from viewing the Practice Hub page.
  if (!currentUser && !(isGuestUser && isSessionOrResults)) {
    const fullPath = location.pathname + location.search;
    return <Navigate to={`/login?redirect=${encodeURIComponent(fullPath)}`} replace />;
  }

  return <>{children}</>;
}

// Global Error Boundary to prevent blank white screens on runtime errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught application error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-amber-300 rounded-3xl p-8 max-w-md w-full text-center shadow-xl space-y-4">
            <div className="bg-amber-100 text-amber-900 p-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2">
              ⚡ Arnav Abacus Practice Gateway
            </div>
            <h3 className="text-lg font-black text-slate-900">
              Practice Session Ready to Reload
            </h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              We updated practice modules with dynamic calculations. Click below to refresh your session immediately.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black py-3 rounded-xl text-xs transition-all shadow-md cursor-pointer uppercase tracking-tight"
            >
              Reload Practice Gateway
            </button>
            <button
              onClick={() => {
                window.location.href = "/#/login";
                window.location.reload();
              }}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer"
            >
              Open Free Guest Practice
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
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


