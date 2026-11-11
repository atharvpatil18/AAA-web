/**
 * ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-17
 * Tier 2: Confirmed Discovery Session Appointment & Calendar Invitation Modal
 *
 * Governing Baseline: AAA-S4-WS-CONF-01, AAA-WS17-STEP0-JOURNEY-01, AAA-WS17-STEP0-SCOPE-01
 * Governing Determination: MGT-DET-S4-S3-STEP0-WS17-05
 * Primary Maintainers: Nitin Patil (Operations & Tech Lead) & Neha Patil (Academic Director)
 */

import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Download,
  CheckCircle2,
  Phone,
  Video,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import ParentPreparationCard from './ParentPreparationCard';
import {
  generateDiscoveryCalendarInvite,
  downloadCalendarInviteFile,
  AAA_WAKAD_VENUE_ADDRESS,
  AAA_VENUE_MAP_URL,
} from '../lib/calendarInviteGenerator';

export interface ConfirmedAppointmentDetails {
  leadReference: string;
  parentName: string;
  studentName?: string;
  programName: string;
  sessionStartIso: string; // e.g. "2026-11-14T11:00:00+05:30"
  durationMinutes?: number;
  deliveryMode: 'offline' | 'online';
  venueAddress?: string;
  meetingUrl?: string;
  sequence?: number;
}

export interface AppointmentConfirmedModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: ConfirmedAppointmentDetails;
}

export default function AppointmentConfirmedModal({
  isOpen,
  onClose,
  appointment,
}: AppointmentConfirmedModalProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !appointment) return null;

  const {
    leadReference,
    parentName,
    studentName,
    programName,
    sessionStartIso,
    durationMinutes = 45,
    deliveryMode,
    venueAddress = AAA_WAKAD_VENUE_ADDRESS,
    meetingUrl,
    sequence = 0,
  } = appointment;

  const startDate = new Date(sessionStartIso);
  const isValidDate = !isNaN(startDate.getTime());

  // Format date display (e.g., Saturday, 14 November 2026)
  const formattedDate = isValidDate
    ? startDate.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Kolkata',
      })
    : 'Date Confirmed';

  // Format time display (e.g., 11:00 AM – 11:45 AM IST)
  const formattedStartTime = isValidDate
    ? startDate.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      })
    : '11:00 AM';

  const childName = studentName?.trim() || 'your child';
  const cleanLeadRef = leadReference.trim();

  const handleDownloadCalendar = () => {
    try {
      const ics = generateDiscoveryCalendarInvite({
        leadReference: cleanLeadRef,
        studentName,
        programName,
        startDate,
        durationMinutes,
        deliveryMode,
        venueAddress,
        meetingUrl,
        sequence,
      });

      downloadCalendarInviteFile(`AAA-Discovery-${cleanLeadRef}`, ics);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to generate calendar invite:', err);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-confirmed-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden my-6 sm:my-8">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-5 sm:p-6 text-white text-center relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 min-w-[44px] min-h-[44px] rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20 shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>

          <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white font-mono text-xs font-bold px-4 py-1 rounded-full mb-2">
            Reference: {cleanLeadRef}
          </div>

          <h3
            id="appointment-confirmed-title"
            className="font-display font-bold text-xl md:text-2xl text-white tracking-tight pr-8 sm:pr-0"
          >
            Discovery Session Confirmed!
          </h3>
          <p className="text-emerald-100 text-xs md:text-sm mt-1 max-w-md mx-auto">
            We look forward to meeting {childName} for an engaging hands-on mathematics exploration.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Appointment Schedule Card */}
          <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-4 sm:p-5 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-200/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-800">
                    Confirmed Date & Day
                  </span>
                  <div className="font-display font-bold text-sm md:text-base text-slate-900">
                    {formattedDate}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-teal-800">
                    Scheduled Time Slot
                  </span>
                  <div className="font-display font-bold text-sm md:text-base text-slate-900">
                    {formattedStartTime} ({durationMinutes} mins)
                  </div>
                </div>
              </div>
            </div>

            {/* Location / Meeting Details */}
            <div className="pt-4 flex items-start gap-3">
              {deliveryMode === 'offline' ? (
                <>
                  <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900 block text-xs mb-0.5">
                      Wakad Pune Center Venue:
                    </span>
                    {venueAddress}
                    <div className="mt-1.5">
                      <a
                        href={AAA_VENUE_MAP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-bold hover:underline"
                      >
                        <span>Open Center in Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Video className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900 block text-xs mb-0.5">
                      Online Video Class (Zoom / Google Meet):
                    </span>
                    {meetingUrl ? (
                      <a
                        href={meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 font-bold underline"
                      >
                        {meetingUrl}
                      </a>
                    ) : (
                      <span>Direct video meeting link will be sent to your WhatsApp 24 hours prior to the session.</span>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Calendar Download Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleDownloadCalendar}
              className={`flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-xs md:text-sm font-bold shadow-md transition-all cursor-pointer ${
                downloadSuccess
                  ? 'bg-teal-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>
                {downloadSuccess
                  ? 'Calendar Invite Downloaded (.ics)'
                  : 'Add to Calendar (Google, Apple, Outlook)'}
              </span>
            </button>

            <a
              href={`https://wa.me/919021924968?text=${encodeURIComponent(
                `Hello Neha Patil! My child ${childName} is scheduled for a Discovery Session on ${formattedDate} at ${formattedStartTime} (Ref: ${cleanLeadRef}).`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 px-5 rounded-2xl text-xs md:text-sm border border-slate-200 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Contact Neha Patil</span>
            </a>
          </div>

          {/* Embedded Preparation Tips */}
          <ParentPreparationCard studentName={studentName} programName={programName} />

          {/* Reschedule Policy Footnote */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              Reschedule Policy: Max 2 reschedules with 12h advance notice
            </span>
            <span>Venue: Balaji Sagar Bungalow, Wakad, Pune</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-5 sm:px-6 py-3.5 sm:py-4 border-t border-slate-200/80 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
