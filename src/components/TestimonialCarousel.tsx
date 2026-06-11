/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Testimonial } from "../types";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from "lucide-react";

export default function TestimonialCarousel() {
  const testimonials: Testimonial[] = [
    {
      id: "t1",
      author: "Chandra Gupta",
      role: "Parent of Vedant",
      content: "When we joined the abacus class, it was more of an experiment. But over time, it has become something really special. Thanks to Neha Ma’am and Nitin Sir, who take such good care of him, he has developed a genuine interest in learning. Their patience and creative way of teaching have helped Vedant improve his focus and confidence.",
      rating: 5,
    },
    {
      id: "t2",
      author: "Tejasweeni Zope",
      role: "Parent",
      content: "I am truly impressed with the Abacus classes conducted by Neha ma’am. She gives personal attention to each and every student, ensuring that every child learns at their own pace with confidence. Since joining the classes, my son’s calculation speed has improved significantly, and he now approaches maths with much more enthusiasm and accuracy.",
      rating: 5,
    },
    {
      id: "t3",
      author: "Khushbu Desai",
      role: "Supermom of Dhyan & Dyana",
      content: "I would like to share my genuine feedback for Neha Ma’am and Nitin Sir from Arnav Abacus Academy. They create such a positive and friendly learning environment that children feel completely at ease as soon as they enter the class. Their calm approach, clear communication, and the way they connect with every child truly make a difference.",
      rating: 5,
    },
    {
      id: "t4",
      author: "Priya Sharma",
      role: "Parent",
      content: "Arnav Abacus Academy is the best place for kids to learn Vedic Maths. The teachers are very supportive and the environment is great for learning. Highly recommended!",
      rating: 5,
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Automatic Rotation Logic
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000); // 7s auto-rotation

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
      <div className="bg-[#FFFDF9] border-4 border-vibrant-dark rounded-[32px] p-8 md:p-12 shadow-[12px_12px_0_0_#1A2E35] relative overflow-hidden">
        
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
                VERIFIED GOOGLE REVIEW
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
              <div className="w-10 h-10 bg-vibrant-orange text-white rounded-full flex items-center justify-center font-display font-black border-2 border-vibrant-dark shadow-sm text-sm">
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

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 bg-white border-2 border-vibrant-dark rounded-full flex items-center justify-center text-vibrant-dark shadow-[0_3px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none hover:bg-vibrant-cream transition-all cursor-pointer"
                aria-label="Previous testimony Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 bg-white border-2 border-vibrant-dark rounded-full flex items-center justify-center text-vibrant-dark shadow-[0_3px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none hover:bg-vibrant-cream transition-all cursor-pointer"
                aria-label="Next testimony Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
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
