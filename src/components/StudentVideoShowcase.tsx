/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Star, Sparkles, Award, Users, CheckCircle2, X, ExternalLink, Volume2, ShieldCheck, Trophy, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../lib/LanguageContext";
import { trackDemoClick } from "../lib/analytics";

export interface VideoTestimonialItem {
  id: string;
  category: "calculation_speed" | "parent_review" | "classroom_drills";
  studentName: string;
  age: string;
  grade: string;
  parentName?: string;
  batchInfo: string;
  highlightStat: string;
  quoteKey: string;
  defaultQuote: string;
  videoUrl?: string; // YouTube / Vimeo embed URL or direct MP4 link
  thumbnailBg: string;
  accentBadge: string;
  tags: string[];
  showcaseStoryId?: string; // Deep-link to /showcase awards to prevent duplication
}

const VIDEO_TESTIMONIALS_DATA: VideoTestimonialItem[] = [
  {
    id: "vid-1",
    category: "calculation_speed",
    studentName: "Aarav Kulkarni",
    age: "8 Years",
    grade: "Grade 3",
    batchInfo: "Abacus Level 3 • Wakad Center",
    highlightStat: "⚡ Solves 10 Additions in 6 Secs",
    quoteKey: "vidAaravQuote",
    defaultQuote: "Watched Aarav calculate faster than our phone calculator. His mental concentration in school has doubled!",
    parentName: "Meera Kulkarni (Mother)",
    videoUrl: "https://www.youtube-nocookie.com/embed/6m6s-cykkDQ",
    thumbnailBg: "from-amber-500/20 via-orange-500/10 to-transparent",
    accentBadge: "bg-amber-100 text-amber-900 border-amber-300",
    tags: ["Mental Speed", "Double Digit", "Finger Free"],
  },
  {
    id: "vid-2",
    category: "parent_review",
    studentName: "Ananya Joshi",
    age: "9 Years",
    grade: "Grade 4",
    parentName: "Rajesh Joshi (Father)",
    batchInfo: "Vedic Maths Junior • Wakad",
    highlightStat: "📈 Exam Score: 62% ➔ 94%",
    quoteKey: "vidAnanyaQuote",
    defaultQuote: "Earlier she used to cry during math homework. After joining Arnav Abacus, math is now her favorite subject!",
    videoUrl: "https://www.youtube-nocookie.com/embed/grnP3mduZkM",
    thumbnailBg: "from-teal-500/20 via-emerald-500/10 to-transparent",
    accentBadge: "bg-teal-100 text-teal-900 border-teal-300",
    tags: ["Math Fear Gone", "Homework Independence", "Confidence"],
  },
  {
    id: "vid-3",
    category: "classroom_drills",
    studentName: "Vihaan Deshmukh",
    age: "10 Years",
    grade: "Grade 5",
    batchInfo: "Abacus Master Level • Wakad Center",
    highlightStat: "🏆 1st Rank - Pune District Abacus Meet",
    quoteKey: "vidVihaanQuote",
    defaultQuote: "Vihaan represented Wakad at the championship. Timed flash drills inside the classroom built his speed under pressure.",
    parentName: "Sneha Deshmukh (Mother)",
    videoUrl: "https://www.youtube-nocookie.com/embed/oP3KqD9pP_c",
    thumbnailBg: "from-blue-500/20 via-indigo-500/10 to-transparent",
    accentBadge: "bg-blue-100 text-blue-900 border-blue-300",
    tags: ["Classroom Speed Drill", "High Focus", "Competition Prep"],
    showcaseStoryId: "showcase", // Linked to verified award in Showcase
  },
  {
    id: "vid-4",
    category: "calculation_speed",
    studentName: "Riya Patil",
    age: "7 Years",
    grade: "Grade 2",
    batchInfo: "Foundation Abacus • Wakad",
    highlightStat: "⚡ Left-to-Right Mental Arithmetic",
    quoteKey: "vidRiyaQuote",
    defaultQuote: "At age 7, she stopped counting on fingers completely within 3 months of enrolling. Her visualization speed is unbelievable!",
    parentName: "Pooja Patil (Mother)",
    videoUrl: "https://www.youtube-nocookie.com/embed/2v64Q0W6D-g",
    thumbnailBg: "from-rose-500/20 via-orange-500/10 to-transparent",
    accentBadge: "bg-rose-100 text-rose-900 border-rose-300",
    tags: ["Finger Counting Stopped", "Visual Bead Recall", "Early Starter"],
  },
];

export default function StudentVideoShowcase() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<"all" | "calculation_speed" | "parent_review" | "classroom_drills">("all");
  const [activeVideo, setActiveVideo] = useState<VideoTestimonialItem | null>(null);

  const categories = [
    { id: "all", label: language === "hi" ? "सभी वीडियो" : language === "mr" ? "सर्व व्हिडिओ" : "All Stories", icon: Sparkles },
    { id: "calculation_speed", label: language === "hi" ? "स्पीड कैलकुलेशन" : language === "mr" ? "स्पीड कॅल्क्युलेशन" : "⚡ Mental Math Demos", icon: Star },
    { id: "parent_review", label: language === "hi" ? "पालक अनुभव" : language === "mr" ? "पालकांचे अनुभव" : "👨‍👩‍👧 Parent Reviews", icon: Users },
    { id: "classroom_drills", label: language === "hi" ? "क्लासरूम ड्रिल्स" : language === "mr" ? "क्लासरूम ड्रिल्स" : "🎓 Classroom Energy", icon: Award },
  ];

  const filteredVideos = selectedCategory === "all"
    ? VIDEO_TESTIMONIALS_DATA
    : VIDEO_TESTIMONIALS_DATA.filter((v) => v.category === selectedCategory);

  const handleOpenVideo = (item: VideoTestimonialItem) => {
    setActiveVideo(item);
    trackDemoClick("video_testimonial_watch", { studentName: item.studentName, category: item.category });
  };

  const handleBookDemo = (studentName: string) => {
    trackDemoClick("video_testimonial_modal_cta", { referencedStudent: studentName });
    const targetElement = document.getElementById("speed-challenge-widget-section") || document.getElementById("lead-form");
    if (targetElement) {
      setActiveVideo(null);
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="student-video-showcase" className="py-16 md:py-24 bg-gradient-to-b from-[#FFFDF9] via-amber-50/20 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#FFF0E0] border border-[#FFD8B1] text-vibrant-orange shadow-xs">
            <Volume2 className="w-3.5 h-3.5" />
            <span>
              {language === "hi"
                ? "असली बच्चे • असली गति • असली परिणाम"
                : language === "mr"
                ? "प्रत्यक्ष मुले • खरी गती • खरे निकाल"
                : "Real Kids • Real Speed • Verified Progress"}
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-vibrant-dark tracking-tight leading-tight">
            {language === "hi"
              ? "हमारे चैंपियंस को गणित हल करते देखें"
              : language === "mr"
              ? "आमच्या विद्यार्थ्यांचे प्रत्यक्ष गणित प्रात्यक्षिक पहा"
              : "Watch Our Wakad Champions in Action"}
          </h2>
          <p className="text-gray-600 text-xs md:text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
            {language === "hi"
              ? "कैलकुलेटर से भी तेज़ मानसिक गणना, और माता-पिता के अनुभव जिन्होंने अपने बच्चों के आत्मविश्वास में बदलाव देखा."
              : language === "mr"
              ? "कॅल्क्युलेटरपेक्षा वेगवान तोंडी हिशोब आणि मुलांमध्ये गणित भीती नाहीशी झाल्याचे पालकांचे थेट अनुभव."
              : "Witness lightning-speed mental arithmetic and hear candid stories from Wakad parents on how their kids conquered math anxiety."}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs md:text-sm font-bold border-2 transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? "bg-vibrant-dark text-white border-vibrant-dark shadow-[3px_3px_0_0_#F97316] -translate-y-0.5"
                    : "bg-white text-gray-700 border-slate-200 hover:border-vibrant-orange/50 hover:bg-orange-50/30"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-amber-300" : "text-gray-400"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}

          {/* Direct Outbound Link to Showcase (Wall of Fame) */}
          <Link
            to="/showcase"
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs md:text-sm font-black border-2 border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 transition-all shadow-xs hover:-translate-y-0.5"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {language === "hi"
                ? "50+ पुरस्कार विजेता देखें"
                : language === "mr"
                ? "५०+ पदक विजेते पहा"
                : "Explore 50+ Award Winners on Wall of Fame"}
            </span>
            <ArrowRight className="w-3 h-3 text-amber-600" />
          </Link>
        </div>

        {/* Video Cards Grid (9:16 vertical smartphone aesthetic) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenVideo(item)}
              className="group relative bg-white border-2 border-vibrant-dark rounded-3xl overflow-hidden shadow-[4px_4px_0_0_#1A2E35] hover:shadow-[6px_6px_0_0_#F97316] hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              {/* Card Thumbnail Area with Video Facade */}
              <div className="relative aspect-[9/13] w-full bg-slate-900 overflow-hidden flex flex-col justify-between p-4">
                {/* Background Gradient & Pattern */}
                <div className={`absolute inset-0 bg-gradient-to-t ${item.thumbnailBg} opacity-90`} />
                <div className="absolute inset-0 bg-radial from-transparent to-black/75 pointer-events-none" />

                {/* Top Stat Badge */}
                <div className="relative z-10 flex items-start justify-between gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-xs ${item.accentBadge}`}>
                    {item.highlightStat}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white group-hover:scale-110 transition-transform">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Center Play Button Pulse */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                  <div className="w-14 h-14 rounded-full bg-vibrant-orange text-white flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-115 transition-transform group-hover:bg-amber-400 group-hover:text-vibrant-dark">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                  <span className="mt-2 text-[10px] font-black uppercase tracking-widest text-white/90 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/10">
                    Watch Clip (45s)
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="relative z-10 space-y-1 text-white">
                  <div className="flex items-center gap-1.5 text-xs font-black text-amber-300">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{item.batchInfo}</span>
                  </div>
                  <h3 className="font-display font-black text-base text-white leading-snug">
                    {item.studentName}
                  </h3>
                  <p className="text-[11px] text-slate-300 font-medium">
                    {item.age} • {item.grade} {item.parentName && `• ${item.parentName}`}
                  </p>
                </div>
              </div>

              {/* Card Footer: Pull Quote & Tags */}
              <div className="p-4 bg-white flex flex-col justify-between flex-1 border-t-2 border-slate-100 space-y-3">
                <p className="text-xs text-gray-700 font-semibold italic line-clamp-3 leading-relaxed">
                  "{item.defaultQuote}"
                </p>

                {item.showcaseStoryId && (
                  <Link
                    to="/showcase"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-[11px] font-black text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-xl transition-colors w-fit"
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    <span>View Verified Trophy on Wall of Fame</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="text-[9px] font-bold text-gray-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Free Assessment Action Strip */}
        <div className="mt-12 bg-white border-2 border-vibrant-dark rounded-3xl p-6 md:p-8 shadow-[6px_6px_0_0_#1A2E35] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display font-black text-lg md:text-xl text-vibrant-dark">
              {language === "hi"
                ? "क्या आपका बच्चा भी ऐसा आत्मविश्वास हासिल कर सकता है?"
                : language === "mr"
                ? "तुमचा मुलगाही असाच आत्मविश्वास मिळवू शकेल का?"
                : "Want to see your child calculate with this speed & confidence?"}
            </h4>
            <p className="text-gray-500 text-xs md:text-sm font-semibold">
              {language === "hi"
                ? "वाकड सेंटर पर एक निःशुल्क डायग्नोस्टिक डेमो सेशन बुक करें."
                : language === "mr"
                ? "वाकड सेंटरवर मोफत ॲबॅकस व वैदिक गणित डेमो क्लास नक्की करा."
                : "Book a 1-on-1 Diagnostic Demo at our Wakad Center or online batch."}
            </p>
          </div>
          <button
            onClick={() => handleBookDemo("Showcase Strip")}
            className="w-full sm:w-auto px-6 py-3.5 bg-vibrant-orange hover:bg-vibrant-orange/95 text-white font-black text-xs md:text-sm rounded-2xl border-2 border-vibrant-dark shadow-[3px_3px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none transition-all uppercase tracking-wider whitespace-nowrap cursor-pointer"
          >
            {language === "hi" ? "फ्री डेमो बुक करें" : language === "mr" ? "मोफत डेमो बुक करा" : "Book Free Demo Session"}
          </button>
        </div>

      </div>

      {/* Lightbox Video Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border-4 border-vibrant-dark rounded-3xl max-w-2xl w-full overflow-hidden shadow-[8px_8px_0_0_#1A2E35] relative flex flex-col max-h-[90vh]"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between p-4 border-b-2 border-slate-200 bg-amber-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-display font-black text-sm text-vibrant-dark">
                    {activeVideo.studentName} — {activeVideo.highlightStat}
                  </span>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="w-8 h-8 rounded-full border-2 border-vibrant-dark flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
                  aria-label="Close video"
                >
                  <X className="w-4 h-4 text-vibrant-dark" />
                </button>
              </div>

              {/* Video Embed Container (16:9 or 9:16 responsive viewport) */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                {activeVideo.videoUrl ? (
                  <iframe
                    src={`${activeVideo.videoUrl}?autoplay=1&rel=0`}
                    title={`${activeVideo.studentName} Testimonial Video`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="text-center p-6 text-white space-y-2">
                    <Play className="w-10 h-10 mx-auto text-amber-400 opacity-60" />
                    <p className="text-sm font-bold">Video stream loading...</p>
                  </div>
                )}
              </div>

              {/* Modal Footer: Context & Direct Conversion Action */}
              <div className="p-5 bg-white space-y-4 overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-vibrant-teal mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{activeVideo.batchInfo}</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 italic leading-relaxed font-semibold">
                    "{activeVideo.defaultQuote}"
                  </p>
                  {activeVideo.parentName && (
                    <p className="text-[11px] text-gray-500 font-bold mt-1">
                      — {activeVideo.parentName}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-gray-500 font-semibold">
                    Experience this method with your child:
                  </span>
                  <button
                    onClick={() => handleBookDemo(activeVideo.studentName)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-vibrant-orange hover:bg-vibrant-orange/95 text-white font-black text-xs rounded-xl border-2 border-vibrant-dark shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none transition-all uppercase tracking-wider cursor-pointer"
                  >
                    Book Diagnostic Demo
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
