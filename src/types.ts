/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Program {
  id: string;
  title: string;
  description: string;
  targetAge: string;
  benefits: string[];
  curriculum: string[];
  tagline: string;
  imageTheme: string; // Tailwind bg-gradient or color scheme
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
}

export interface Campaign {
  slug: string;
  title: string;
  subtitle: string;
  features: string[];
  ctaText: string;
  accentColor: string;
  gradient: string;
}

export interface LeadSubmission {
  parentName: string;
  childAge: string;
  program: string;
}
