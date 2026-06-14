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
      role: "Parent of Om",
      content: "I am truly impressed with the Abacus classes conducted by Neha ma’am. She gives personal attention to each and every student, ensuring that every child learns at their own pace with confidence. Since joining the classes, my son Om's calculation speed has improved significantly, and he now approaches maths with much more enthusiasm and accuracy.",
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
      author: "Rajesh Kumar",
      role: "Parent of Sneha",
      content: "We joined the Vedic Maths program for our daughter Sneha who is in 7th grade. The 16 sutras and cross-multiplication shortcuts taught by Nitin Sir are magical. She now completes her school math papers 20 minutes before time.",
      rating: 5,
    },
    {
      id: "t5",
      author: "Deepali Shah",
      role: "Parent of Aarav & Ananya",
      content: "Both my kids Aarav and Ananya attend Arnav Abacus Academy. The environment is extremely positive. Neha Ma'am and Nitin Sir focus not just on calculations but on overall logical and analytical development. Their confidence has skyrocketed!",
      rating: 5,
    },
    {
      id: "t6",
      author: "Vikram Malhotra",
      role: "Parent of Kabir",
      content: "Kabir was preparing for the Olympiad and was struggling with time management. Nitin Sir's speed checks and diagnostic worksheets helped him secure a top state rank. Best place for competitive math preparation!",
      rating: 5,
    },
    {
      id: "t7",
      author: "Dr. Shalini Deshmukh",
      role: "Parent of Riya",
      content: "As a doctor, I wanted a structured brain development program for my daughter. Arnav Abacus's scientific way of teaching has improved Riya's photographic memory, auditory listening capacity, and focus. Very happy with the offline academy.",
      rating: 5,
    },
    {
      id: "t8",
      author: "Amit Joshi",
      role: "Parent of Parth",
      content: "Very convenient offline center near Park Street. The personal attention, regular assessments, and positive feedback loop keep the kids motivated. Parth actually looks forward to his math sessions now!",
      rating: 5,
    },
    {
      id: "t9",
      author: "Shruti Nair",
      role: "Parent of Meera (Online)",
      content: "Even though we are based in London, we join their online interactive classroom sessions. The virtual abacus tool and Neha Ma'am's high-energy teaching make Meera feel like she's in a physical class. Her response speed is phenomenal!",
      rating: 5,
    },
    {
      id: "t10",
      author: "Sandeep Salunkhe",
      role: "Parent of Aditya",
      content: "Special thanks to Nitin Sir for helping Aditya zero down on silly arithmetic mistakes. His number sense and spatial awareness have improved. The focus on discipline and consistency is what sets this academy apart.",
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
                View on Google
              </a>
              <div className="flex items-center gap-1.5 shrink-0">
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
