/**
 * ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-17
 * Tier 1: Post-Submission Enquiry Receipt & Fast-Track Coordination Modal
 *
 * Governing Baseline: AAA-S4-WS-CONF-01, AAA-WS17-STEP0-JOURNEY-01
 * Governing Determination: MGT-DET-S4-S3-STEP0-WS17-05
 * Primary Maintainers: Nitin Patil (Operations & Tech Lead) & Neha Patil (Academic Director)
 */

import React from 'react';
import {
  X,
  CheckCircle2,
  Phone,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileDown,
  Sparkles,
} from 'lucide-react';
import ParentPreparationCard from './ParentPreparationCard';

export interface EnquiryReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadReference: string;
  parentName: string;
  studentName?: string;
  programName: string;
  deliveryMode?: 'offline' | 'online';
  onDownloadWorkbook?: () => void;
}

export default function EnquiryReceiptModal({
  isOpen,
  onClose,
  leadReference,
  parentName,
  studentName,
  programName,
  deliveryMode = 'offline',
  onDownloadWorkbook,
}: EnquiryReceiptModalProps) {
  if (!isOpen) return null;

  const childName = studentName?.trim() || 'your child';
  const cleanLeadRef = leadReference?.trim() || 'AAA-LEAD-PENDING';

  // Pre-filled WhatsApp fast-track coordination link
  const waFastTrackText = encodeURIComponent(
    `Hello Neha Patil! I submitted an inquiry on the Arnav Abacus Academy website.\n\n` +
      `• Lead Ref: ${cleanLeadRef}\n` +
      `• Parent Name: ${parentName.trim()}\n` +
      `• Student: ${childName}\n` +
      `• Course Interest: ${programName}\n` +
      `• Preferred Mode: ${deliveryMode === 'offline' ? 'Offline (Wakad Pune Center)' : 'Online Live Class'}\n\n` +
      `I would like to fast-track coordination for our trial class date and time slot.`
  );

  const whatsappFastTrackUrl = `https://wa.me/919021924968?text=${waFastTrackText}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-receipt-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden my-8">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 p-6 text-white text-center relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20 shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>

          <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white font-mono text-xs font-bold px-4 py-1 rounded-full mb-2.5">
            Official Reference: {cleanLeadRef}
          </div>

          <h3
            id="enquiry-receipt-title"
            className="font-display font-bold text-xl md:text-2xl text-white tracking-tight"
          >
            Inquiry Registered with Admissions
          </h3>
          <p className="text-emerald-100 text-xs md:text-sm mt-1 max-w-md mx-auto">
            Thank you, {parentName}! We have safely received your inquiry for {childName}.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Scheduling Status Notice */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4.5 flex items-start gap-3.5">
            <Clock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-left text-xs text-emerald-950 leading-relaxed">
              <span className="font-bold block text-sm mb-0.5 text-emerald-900">
                Discovery Session Scheduling in Progress
              </span>
              Because Neha Patil mentors dedicated micro-batches of a maximum of 5 students per batch, our academic team will review {childName}'s profile and contact you within{' '}
              <strong className="text-emerald-900 font-bold">4 business hours</strong> to finalize an optimal trial time slot.
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappFastTrackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-5 rounded-2xl text-xs md:text-sm shadow-md transition-all group"
            >
              <Phone className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
              <span>Fast-Track Scheduling on WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-1 opacity-80" />
            </a>

            {onDownloadWorkbook && (
              <button
                type="button"
                onClick={onDownloadWorkbook}
                className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 px-5 rounded-2xl text-xs md:text-sm border border-slate-200 transition-colors"
              >
                <FileDown className="w-4 h-4 text-slate-600" />
                <span>Download Diagnostic Workbook (PDF)</span>
              </button>
            )}
          </div>

          {/* Embedded Preparation Tips */}
          <ParentPreparationCard studentName={studentName} programName={programName} />

          {/* Trust & DPDP Privacy Footnote */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              DPDP Act 2023 Statutory Privacy Protection
            </span>
            <span>Direct Coordinator: Neha Patil (+91 90219 24968)</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200/80 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
          >
            Close & Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}
