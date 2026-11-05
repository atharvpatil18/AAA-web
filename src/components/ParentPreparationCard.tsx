/**
 * ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-17
 * Parent Preparation Tips Card
 *
 * Governing Baseline: AAA-S4-WS-CONF-01, AAA-WS17-STEP0-SCOPE-01
 * Governing Determination: MGT-DET-S4-S3-STEP0-WS17-05
 * Academic Lead: Neha Patil (Founder & Academic Director)
 */

import React from 'react';
import { Sparkles, Smile, Pencil, Users, Brain, Clock } from 'lucide-react';

interface ParentPreparationCardProps {
  studentName?: string;
  programName?: string;
  className?: string;
}

export default function ParentPreparationCard({
  studentName,
  programName = 'Mathematics',
  className = '',
}: ParentPreparationCardProps) {
  const childLabel = studentName ? studentName.trim() : 'Your child';

  const prepItems = [
    {
      icon: Smile,
      title: 'Curiosity First, Zero Stress',
      description: `This is an exploratory learning session, not a test! Neha Patil focuses on how ${childLabel} visualizes numbers naturally in a welcoming, encouraging space.`,
      accentBg: 'bg-emerald-50',
      accentBorder: 'border-emerald-200',
      iconColor: 'text-emerald-600',
    },
    {
      icon: Pencil,
      title: 'What to Bring',
      description: 'Just a regular sharpened pencil and eraser. Tactile Soroban abacus tools, Vedic math templates, and discovery activity sheets are provided at the center.',
      accentBg: 'bg-amber-50',
      accentBorder: 'border-amber-200',
      iconColor: 'text-amber-600',
    },
    {
      icon: Users,
      title: 'Dedicated Micro-Batches',
      description: 'Strict maximum of 5 students per batch. You are welcome to observe the first 10 minutes to understand our child-centric teaching methodology.',
      accentBg: 'bg-blue-50',
      accentBorder: 'border-blue-200',
      iconColor: 'text-blue-600',
    },
    {
      icon: Brain,
      title: '6-Dimension Learning Observation',
      description: `Following the exploratory trial, Neha Patil shares personalized observations on sensory number sense, spatial visualization, pattern agility, and optimal batch placement.`,
      accentBg: 'bg-purple-50',
      accentBorder: 'border-purple-200',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className={`bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left ${className}`}>
      <div className="flex items-center gap-2 mb-3.5">
        <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
        <h4 className="font-display font-bold text-sm text-slate-900 tracking-tight">
          How to Prepare for the Discovery Session
        </h4>
      </div>
      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
        Everything you need to know to ensure a positive, empowering experience for {childLabel} during their 30–45 minute exploratory session:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {prepItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border ${item.accentBg} ${item.accentBorder} flex flex-col justify-start transition-all`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-6 h-6 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-xs ${item.iconColor}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="font-display font-bold text-xs text-slate-900">
                  {item.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-normal">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3.5 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          Duration: 30–45 minutes
        </span>
        <span className="font-medium text-slate-600">
          Wakad Pune Center or Online
        </span>
      </div>
    </div>
  );
}
