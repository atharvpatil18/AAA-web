/**
 * ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-17
 * Zero-Dependency RFC 5545 (.ics) Calendar Invite Generator
 *
 * Governing Baseline: AAA-S4-WS-CONF-01, AAA-WS17-STEP0-SCOPE-01
 * Governing Determination: MGT-DET-S4-S3-STEP0-WS17-05
 * System Architect: Nitin Patil (Operations & Tech Lead)
 * Academic Director: Neha Patil (Founder & Academic Director)
 */

export interface DiscoveryCalendarOptions {
  leadReference: string;
  studentName?: string;
  programName: string;
  startDate: Date | string;
  durationMinutes?: number;
  deliveryMode: 'offline' | 'online';
  venueAddress?: string;
  meetingUrl?: string;
  sequence?: number;
}

export const AAA_WAKAD_VENUE_ADDRESS =
  'Flat No. 3, 1st Floor, Adv. Balaji Sagar Bungalow, Opp. Creative Cameo, Near Park Street, Behind Wisdom World School, Wakad, Pune 411057, Maharashtra, India';

export const AAA_VENUE_MAP_URL =
  'https://maps.google.com/?q=Arnav+Abacus+Academy+Wakad+Pune+411057';

/**
 * Escapes characters for RFC 5545 text compliance
 * Semicolons, commas, backslashes, and newlines must be escaped
 */
export function escapeIcsText(text: string | undefined | null): string {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/**
 * Formats date into UTC ICS standard: YYYYMMDDTHHmmssZ
 */
export function formatIcsDateUtc(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Generates an RFC 5545 compliant .ics string for Discovery Sessions
 */
export function generateDiscoveryCalendarInvite(options: DiscoveryCalendarOptions): string {
  const {
    leadReference,
    studentName,
    programName,
    startDate,
    durationMinutes = 45,
    deliveryMode,
    venueAddress = AAA_WAKAD_VENUE_ADDRESS,
    meetingUrl,
    sequence = 0,
  } = options;

  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  if (isNaN(start.getTime())) {
    throw new Error('Invalid start date provided for calendar invite generation.');
  }

  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
  const now = new Date();

  const dtStamp = formatIcsDateUtc(now);
  const dtStart = formatIcsDateUtc(start);
  const dtEnd = formatIcsDateUtc(end);

  const cleanLeadRef = leadReference.trim();
  const uid = `AAA-DISCOVERY-${cleanLeadRef}@arnavabacus.com`;

  const childDescriptor = studentName ? studentName.trim() : 'Your Child';
  const summary = `Discovery Session: ${programName} with Neha Patil (${childDescriptor})`;

  const locationText =
    deliveryMode === 'offline'
      ? `${venueAddress} (Map: ${AAA_VENUE_MAP_URL})`
      : `Online Live Video Class (Zoom/Meet: ${meetingUrl || 'Link will be sent 24 hours prior via WhatsApp'})`;

  const descriptionLines = [
    `Arnav Abacus Academy (AAA) — Personalised Learning Discovery Session`,
    `Lead Reference: ${cleanLeadRef}`,
    `Student: ${childDescriptor}`,
    `Course: ${programName}`,
    `Mentor: Neha Patil (Founder & Academic Director, Certified Trainer of Abacus & Vedic Mathematics)`,
    `Batch Format: Dedicated Micro-Batch (Maximum 5 Students per Batch)`,
    ``,
    `Session Logistics:`,
    `- Mode: ${deliveryMode === 'offline' ? 'Offline at Wakad Pune Center' : 'Online Video Class'}`,
    `- Location: ${locationText}`,
    `- Contact: Neha Patil (+91 90219 24968)`,
    ``,
    `Preparation Tips:`,
    `- Please arrive 5 minutes early.`,
    `- No preparation needed! Neha Patil focuses on curiosity and spatial thinking.`,
    `- Worksheets, Soroban abacus instruments, and materials are provided at the center.`,
    ``,
    `Rescheduling Policy: Maximum 2 reschedules permitted with 12 hours advance notice.`,
  ];

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Arnav Abacus Academy//Admissions Discovery v1.0//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SEQUENCE:${sequence}`,
    'STATUS:CONFIRMED',
    `SUMMARY:${escapeIcsText(summary)}`,
    `DESCRIPTION:${escapeIcsText(descriptionLines.join('\n'))}`,
    `LOCATION:${escapeIcsText(locationText)}`,
    'ORGANIZER;CN=Neha Patil (Arnav Abacus Academy):mailto:admissions@arnavabacus.com',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Arnav Abacus Academy Discovery Session starts in 1 hour',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return icsLines.join('\r\n') + '\r\n';
}

/**
 * Triggers client-side file download of .ics calendar file
 */
export function downloadCalendarInviteFile(filename: string, icsContent: string): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename.endsWith('.ics') ? filename : `${filename}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
