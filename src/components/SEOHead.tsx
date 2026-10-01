/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Dynamic SEO Head Manager for Client-Side Routed Pages
 * Handles dynamic document titles, meta descriptions, canonical URLs, and structured data injection.
 */

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../lib/analytics";

interface RouteMeta {
  title: string;
  description: string;
  canonicalPath: string;
  schemaType?: "EducationalOrganization" | "Course" | "LocalBusiness" | "FAQPage";
}

const SITE_ORIGIN = "https://arnavabacusacademy-web.vercel.app";

const ROUTE_META_MAP: Record<string, RouteMeta> = {
  "/": {
    title: "Arnav Abacus Academy | Abacus & Vedic Maths Classes in Wakad, Pune",
    description: "Top-rated mental arithmetic, Abacus (ages 4-14) and Vedic Maths in Wakad, Pune. Build calculation speed, visual memory, and math confidence with offline batches. Book a free demo class!",
    canonicalPath: "/",
  },
  "/programs": {
    title: "Abacus, Vedic Maths & School Math Programs | Arnav Abacus Academy Pune",
    description: "Explore specialized child brain development programs: Soroban Abacus (Ages 4-14), High-Speed Vedic Maths (Ages 10+), and School Math syllabus synergy.",
    canonicalPath: "/programs",
  },
  "/programs/abacus": {
    title: "Abacus Maths Classes in Wakad, Pune | Arnav Abacus Academy",
    description: "Certified Japanese Soroban Abacus classes for kids aged 4-14 in Wakad, Pune. Whole-brain visual math, small batches & IIVA mentors. Book a free demo.",
    canonicalPath: "/programs/abacus",
    schemaType: "Course",
  },
  "/programs/vedic-maths": {
    title: "Vedic Maths Classes in Wakad, Pune | Arnav Abacus Academy",
    description: "Fast mental math shortcuts for Class 5-10 students in Wakad, Pune. 16 Vedic Sutras for school boards, Olympiads & IPM. Book a free assessment.",
    canonicalPath: "/programs/vedic-maths",
    schemaType: "Course",
  },
  "/programs/school-maths": {
    title: "School Maths Coaching & IPM Olympiad Prep in Wakad | AAA",
    description: "Board-aligned mathematics coaching for Class 1-10 in Wakad, Pune. Strengthen CBSE/ICSE foundations and excel in Olympiad & IPM exams. Inquire today.",
    canonicalPath: "/programs/school-maths",
    schemaType: "Course",
  },
  "/parent-guides/abacus-vs-vedic-maths": {
    title: "Abacus vs Vedic Maths: What's the Difference? | Arnav Abacus Academy",
    description: "Compare Abacus and Vedic Maths: differences in age suitability (4-14 vs 10+), learning methods, visualization, and exam benefits. An objective guide for parents.",
    canonicalPath: "/parent-guides/abacus-vs-vedic-maths",
  },
  "/parent-guides/does-abacus-confuse-school-math": {
    title: "Does Abacus Confuse School Maths? A Parent Guide | Arnav Abacus Academy",
    description: "Explore how Abacus calculation relates to school column arithmetic. Learn why temporary calculation mixing occurs and how to guide your child with clarity.",
    canonicalPath: "/parent-guides/does-abacus-confuse-school-math",
  },
  "/parent-guides/why-children-use-finger-counting": {
    title: "Why Children Use Finger Counting & Mental Math Habits | AAA",
    description: "Learn why finger counting is a natural concrete stage in early math, how mental calculation strategies develop gradually, and how parents can guide children with patience.",
    canonicalPath: "/parent-guides/why-children-use-finger-counting",
  },
  "/parent-guides/why-smart-children-make-silly-math-mistakes": {
    title: "Why Children Make Calculation Mistakes in Math | Arnav Abacus Academy",
    description: "Understand why children make calculation mistakes even when understanding concepts. Explore procedural error causes, worked examples, and a constructive parent review routine.",
    canonicalPath: "/parent-guides/why-smart-children-make-silly-math-mistakes",
  },
  "/parent-guides/ideal-age-to-start-abacus": {
    title: "What Is the Ideal Age to Start Abacus? A Parent's Guide | AAA",
    description: "Discover the best age considerations for abacus learning (ages 4-14, peak foundation 5-9), readiness factors, age-group breakdowns, and how to evaluate suitability.",
    canonicalPath: "/parent-guides/ideal-age-to-start-abacus",
  },
  "/mentor": {
    title: "Meet Neha Patil | Certified Master Abacus & Vedic Maths Mentor Wakad",
    description: "Learn about Neha Patil, founder and master trainer at Arnav Abacus Academy. IIVA certified, 3+ years experience coaching 200+ Pune and global students.",
    canonicalPath: "/mentor",
  },
  "/contact": {
    title: "Contact Arnav Abacus Academy | Wakad Center, Phone & Location Pune",
    description: "Get in touch with Arnav Abacus Academy in Wakad, Pune. Visit our center near Park Street, behind Wisdom World School or call +91 9021924968 for batch timings and admissions.",
    canonicalPath: "/contact",
  },
  "/showcase": {
    title: "Student Results, Hall of Fame & State Champions | Arnav Abacus Academy",
    description: "Celebrate student milestones, speed calculation transformations, and international competition winners from Arnav Abacus Academy, Wakad, Pune.",
    canonicalPath: "/showcase",
  },
  "/worksheets": {
    title: "Free Abacus & Vedic Maths Practice Worksheets | Arnav Abacus Academy",
    description: "Download free printable mental arithmetic practice worksheets and speed math drills for kids aged 4-14 by Arnav Abacus Academy.",
    canonicalPath: "/worksheets",
  },
  "/faqs": {
    title: "Frequently Asked Questions | Arnav Abacus Academy Wakad, Pune",
    description: "Answers to parent questions on abacus starting age, Vedic maths syllabus, offline classroom batch sizes, and school curriculum integration.",
    canonicalPath: "/faqs",
  },
  "/teacher-franchise": {
    title: "Abacus Teacher Training & Academy Franchise | Arnav Abacus Academy Pune",
    description: "Start your own education franchise or become a certified Abacus & Vedic Maths teacher with certified training, books, and ongoing business guidance.",
    canonicalPath: "/teacher-franchise",
  },
  "/blog": {
    title: "Brain Development & Math Education Blog | Arnav Abacus Academy",
    description: "Parenting guides, tips to overcome math phobia, benefits of mental arithmetic, and visual calculation research from Arnav Abacus Academy.",
    canonicalPath: "/blog",
  },
  "/news": {
    title: "Academy News & Competition Alerts | Arnav Abacus Academy Pune",
    description: "Stay updated on upcoming mental math tournaments, state championship schedules, and student award ceremonies at Arnav Abacus Academy.",
    canonicalPath: "/news",
  },
  "/brochure": {
    title: "Interactive Academy Brochure & Syllabus | Arnav Abacus Academy",
    description: "Explore curriculum levels, batch structure, and download the official Arnav Abacus Academy prospectus PDF.",
    canonicalPath: "/brochure",
  },
};

export default function SEOHead() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.toLowerCase();
    
    // Dynamic matching for blog and campaign routes
    let meta: RouteMeta;
    if (ROUTE_META_MAP[pathname]) {
      meta = ROUTE_META_MAP[pathname];
    } else if (pathname.startsWith("/blog/")) {
      const slug = pathname.replace("/blog/", "");
      meta = {
        title: "Blog & Brain Insights | Arnav Abacus Academy",
        description: "Educational insights on mental math, abacus development, and child cognitive focus from Arnav Abacus Academy Wakad, Pune.",
        canonicalPath: `/blog/${slug}`,
      };
    } else if (pathname.startsWith("/campaigns/")) {
      const slug = pathname.replace("/campaigns/", "");
      meta = {
        title: "Free Math Demo Assessment & Programs | Arnav Abacus Academy",
        description: "Specialized math programs to build speed, accuracy, and confidence. Book a free evaluation session at Arnav Abacus Academy Wakad, Pune.",
        canonicalPath: `/campaigns/${slug}`,
      };
    } else if (pathname === "/gallery") {
      meta = {
        title: "Student Gallery & Activities | Arnav Abacus Academy",
        description: "Explore photos and videos of our student competitions, classroom sessions, and abacus milestones in Wakad, Pune.",
        canonicalPath: "/gallery",
      };
    } else if (pathname === "/news-events") {
      meta = {
        title: "Academy News & Competition Alerts | Arnav Abacus Academy Pune",
        description: "Stay updated on upcoming mental math tournaments, state championship schedules, and student award ceremonies.",
        canonicalPath: "/news",
      };
    } else {
      // 404 or unknown page
      meta = {
        title: "Page Not Found | Arnav Abacus Academy",
        description: "The page you are looking for does not exist on Arnav Abacus Academy.",
        canonicalPath: pathname,
      };
    }

    // 1. Update Title
    document.title = meta.title;

    // 2. Update Meta Description
    let metaDescEl = document.querySelector('meta[name="description"]');
    if (!metaDescEl) {
      metaDescEl = document.createElement("meta");
      metaDescEl.setAttribute("name", "description");
      document.head.appendChild(metaDescEl);
    }
    metaDescEl.setAttribute("content", meta.description);

    // 3. Update OpenGraph Title & Description
    let ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) ogTitleEl.setAttribute("content", meta.title);

    let ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) ogDescEl.setAttribute("content", meta.description);

    // 4. Update Canonical Link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    const cleanCanonical = `${SITE_ORIGIN}${meta.canonicalPath === "/" ? "/" : meta.canonicalPath}`;
    canonicalEl.setAttribute("href", cleanCanonical);

    // 5. Track GA4 Page View on Route Transition
    trackPageView(pathname, meta.title);
  }, [location.pathname]);

  return null;
}
