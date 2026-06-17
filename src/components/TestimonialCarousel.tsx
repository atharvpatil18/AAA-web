/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Testimonial } from "../types";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

export default function TestimonialCarousel() {
  const { language, t } = useLanguage();

  const testimonials: Testimonial[] = [
    {
      id: "t1",
      author: t("t1Author"),
      role: t("t1Role"),
      content: t("t1Content"),
      rating: 5,
    },
    {
      id: "t2",
      author: t("t2Author"),
      role: t("t2Role"),
      content: t("t2Content"),
      rating: 5,
    },
    {
      id: "t3",
      author: t("t3Author"),
      role: t("t3Role"),
      content: t("t3Content"),
      rating: 5,
    },
    {
      id: "t7",
      author: t("t7Author"),
      role: t("t7Role"),
      content: t("t7Content"),
      rating: 5,
    },
    {
      id: "t11",
      author: t("t11Author"),
      role: t("t11Role"),
      content: t("t11Content"),
      rating: 5,
    },
    {
      id: "t12",
      author: t("t12Author"),
      role: t("t12Role"),
      content: t("t12Content"),
      rating: 5,
    },
    {
      id: "t13",
      author: t("t13Author"),
      role: t("t13Role"),
      content: t("t13Content"),
      rating: 5,
    },
    {
      id: "t14",
      author: t("t14Author"),
      role: t("t14Role"),
      content: t("t14Content"),
      rating: 5,
    },
    {
      id: "t15",
      author: t("t15Author"),
      role: t("t15Role"),
      content: t("t15Content"),
      rating: 5,
    },
    {
      id: "t16",
      author: t("t16Author"),
      role: t("t16Role"),
      content: t("t16Content"),
      rating: 5,
    },
    {
      id: "t17",
      author: t("t17Author"),
      role: t("t17Role"),
      content: t("t17Content"),
      rating: 5,
    },
    {
      id: "t18",
      author: t("t18Author"),
      role: t("t18Role"),
      content: t("t18Content"),
      rating: 5,
    },
    {
      id: "t19",
      author: t("t19Author"),
      role: t("t19Role"),
      content: t("t19Content"),
      rating: 5,
    },
    {
      id: "t20",
      author: t("t20Author"),
      role: t("t20Role"),
      content: t("t20Content"),
      rating: 5,
    },
    {
      id: "t21",
      author: t("t21Author"),
      role: t("t21Role"),
      content: t("t21Content"),
      rating: 5,
    },
    {
      id: "t22",
      author: t("t22Author"),
      role: t("t22Role"),
      content: t("t22Content"),
      rating: 5,
    },
    {
      id: "t23",
      author: t("t23Author"),
      role: t("t23Role"),
      content: t("t23Content"),
      rating: 5,
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Automatic Rotation Logic
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000); // 8s auto-rotation

    return () => clearInterval(slideInterval);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <div 
      id="parent-testimonials-carousel" 
      className="bg-transparent max-w-4xl mx-auto px-4 relative"
    >
      {/* Testimonial card bubble */}
      <div className="bg-[#FFFDF9] border-4 border-vibrant-dark rounded-[32px] p-6 md:p-12 shadow-[6px_6px_0_0_#1A2E35] md:shadow-[12px_12px_0_0_#1A2E35] relative overflow-hidden">
        
        {/* Floating background quotation marks */}
        <Quote className="absolute -top-4 -right-4 w-40 h-40 text-vibrant-orange/10 rotate-185 pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between h-full min-h-[220px]">
          <div>
            {/* Stars Row */}
            <div className="flex items-center gap-1 mb-5">
              {[...Array(activeTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-vibrant-gold fill-current" />
              ))}
              <span className="text-xs text-vibrant-dark font-black uppercase tracking-wider ml-2">
                {language === "hi" ? "सत्यापित गूगल समीक्षा" : language === "mr" ? "अधिकृत गुगल रिव्ह्यू" : "VERIFIED GOOGLE REVIEW"}
              </span>
            </div>

            {/* Testimonial Quote Speech */}
            <blockquote>
              <p className="text-vibrant-dark text-sm md:text-base md:leading-relaxed font-sans font-bold text-left leading-relaxed">
                "{activeTestimonial.content}"
              </p>
            </blockquote>
          </div>

          {/* Review Author credentials */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t-2 border-vibrant-dark pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-vibrant-orange text-white rounded-full flex items-center justify-center font-display font-black border-2 border-vibrant-dark shadow-sm text-sm shrink-0">
                {activeTestimonial.author[0]}
              </div>
              <div>
                <cite className="not-italic font-display font-black text-vibrant-dark text-sm flex items-center gap-1.5 leading-none">
                  {activeTestimonial.author}
                  <CheckCircle2 className="w-4 h-4 text-vibrant-teal shrink-0" />
                </cite>
                <span className="text-xs text-gray-500 font-bold block mt-1 leading-none">
                  {activeTestimonial.role}
                </span>
              </div>
            </div>

            {/* Pagination Controls and Google Link */}
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
              <a
                href="https://share.google/fFcUhDGoBJ5M27dX5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-black text-white bg-vibrant-orange hover:bg-vibrant-orange/95 px-4 py-2 rounded-xl shadow-[0_3px_0_0_#B33A00] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer shrink-0"
              >
                {language === "hi" ? "गूगल पर देखें" : language === "mr" ? "गुगलवर पहा" : "View on Google"}
              </a>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 bg-white border-2 border-vibrant-dark rounded-full flex items-center justify-center text-vibrant-dark shadow-[0_3px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none hover:bg-vibrant-cream transition-all cursor-pointer"
                  aria-label={language === "hi" ? "पिछली समीक्षा" : language === "mr" ? "मागील रिव्ह्यू" : "Previous testimony Review"}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 bg-white border-2 border-vibrant-dark rounded-full flex items-center justify-center text-vibrant-dark shadow-[0_3px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none hover:bg-vibrant-cream transition-all cursor-pointer"
                  aria-label={language === "hi" ? "अगली समीक्षा" : language === "mr" ? "पुढील रिव्ह्यू" : "Next testimony Review"}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bullet Dot indicators */}
      <div className="flex items-center justify-center gap-2.5 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-3.5 rounded-full border border-vibrant-dark transition-all duration-300 cursor-pointer ${
              index === activeIndex ? "w-10 bg-vibrant-orange" : "w-3.5 bg-white hover:bg-gray-150"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
