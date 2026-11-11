/**
 * ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-17
 * Calendar Invite Generator Acceptance Test Suite (10 Acceptance Tests)
 *
 * Governing Document: AAA-S4-WS-CONF-01, AAA-WS17-STEP0-SCOPE-01
 * Governing Determination: MGT-DET-S4-S3-STEP0-WS17-05
 */

import {
  escapeIcsText,
  formatIcsDateUtc,
  generateDiscoveryCalendarInvite,
  AAA_WAKAD_VENUE_ADDRESS,
  DiscoveryCalendarOptions,
} from './calendarInviteGenerator';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`CALENDAR TEST ASSERTION FAILED: ${message}`);
  }
}

console.log('=== AAA WS-17 CALENDAR INVITE GENERATOR TEST SUITE ===');
console.log('Target Standard: RFC 5545 Internet Calendaring Specification');
console.log('Governing Determination: MGT-DET-S4-S3-STEP0-WS17-05\n');

// TC-CAL-01: RFC 5545 Structural Integrity
console.log('Running TC-CAL-01: RFC 5545 Protocol Envelope...');
const baseOptions: DiscoveryCalendarOptions = {
  leadReference: 'AAA-LEAD-2026-00042',
  studentName: 'Aarav Deshmukh',
  programName: 'Abacus Mathematics',
  startDate: '2026-11-14T11:00:00+05:30',
  durationMinutes: 45,
  deliveryMode: 'offline',
};
const icsOutput = generateDiscoveryCalendarInvite(baseOptions);
assert(icsOutput.includes('BEGIN:VCALENDAR\r\n'), 'Must contain BEGIN:VCALENDAR header');
assert(icsOutput.includes('VERSION:2.0\r\n'), 'Must specify VERSION:2.0');
assert(icsOutput.includes('BEGIN:VEVENT\r\n'), 'Must contain BEGIN:VEVENT');
assert(icsOutput.includes('END:VEVENT\r\n'), 'Must contain END:VEVENT');
assert(icsOutput.includes('END:VCALENDAR\r\n'), 'Must terminate with END:VCALENDAR');
console.log('✅ TC-CAL-01 Passed: Valid RFC 5545 calendar envelope generated.');

// TC-CAL-02: Deterministic UID Mapping
console.log('Running TC-CAL-02: Deterministic UID Mapping...');
assert(
  icsOutput.includes('UID:AAA-DISCOVERY-AAA-LEAD-2026-00042@arnavabacus.com'),
  'UID must be deterministically derived from Lead Reference'
);
console.log('✅ TC-CAL-02 Passed: Deterministic UID mapping prevents calendar event collisions.');

// TC-CAL-03: RFC 5545 Character Escaping
console.log('Running TC-CAL-03: RFC 5545 Character Escaping...');
const rawText = 'Math, Logic; Focus & Fun\\Exploration\nSecond Line';
const escaped = escapeIcsText(rawText);
assert(escaped.includes('\\,'), 'Commas must be escaped with backslash');
assert(escaped.includes('\\;'), 'Semicolons must be escaped with backslash');
assert(escaped.includes('\\\\'), 'Backslashes must be doubled');
assert(escaped.includes('\\nSecond Line'), 'Newlines must be emitted as literal \\n');
console.log('✅ TC-CAL-03 Passed: Semicolons, commas, backslashes, and newlines safely escaped.');

// TC-CAL-04: UTC Timestamp Formatting
console.log('Running TC-CAL-04: UTC Timestamp Formatting (YYYYMMDDTHHmmssZ)...');
const testDate = new Date('2026-11-14T05:30:00.000Z'); // 11:00 AM IST
const formattedUtc = formatIcsDateUtc(testDate);
assert(formattedUtc === '20261114T053000Z', 'Must format UTC correctly with trailing Z');
console.log('✅ TC-CAL-04 Passed: UTC timestamp correctly formatted.');

// TC-CAL-05: Verified Wakad Center Venue Address
console.log('Running TC-CAL-05: Authoritative Wakad Center Venue Inclusion...');
assert(
  icsOutput.includes('Balaji Sagar Bungalow'),
  'Must include Balaji Sagar Bungalow in event location'
);
assert(
  icsOutput.includes('Wakad\\, Pune 411057'),
  'Must include Wakad Pune pincode 411057 with escaped comma'
);
console.log('✅ TC-CAL-05 Passed: Authoritative Wakad Center venue address verified in location.');

// TC-CAL-06: Online Mode Meeting Link Guidance
console.log('Running TC-CAL-06: Online Delivery Mode Handling...');
const onlineOptions: DiscoveryCalendarOptions = {
  ...baseOptions,
  deliveryMode: 'online',
  meetingUrl: 'https://meet.google.com/aaa-discovery-test',
};
const onlineIcs = generateDiscoveryCalendarInvite(onlineOptions);
assert(
  onlineIcs.includes('https://meet.google.com/aaa-discovery-test'),
  'Online event must include direct video class URL'
);
assert(
  onlineIcs.includes('Online Live Video Class'),
  'Location must state Online Video Class'
);
console.log('✅ TC-CAL-06 Passed: Online delivery mode correctly configures meeting link.');

// TC-CAL-07: Reschedule Sequence Incrementing
console.log('Running TC-CAL-07: Reschedule Sequence Revision Handling...');
const rescheduleOptions: DiscoveryCalendarOptions = {
  ...baseOptions,
  sequence: 1,
};
const rescheduledIcs = generateDiscoveryCalendarInvite(rescheduleOptions);
assert(rescheduledIcs.includes('SEQUENCE:1'), 'Rescheduled invite must increment SEQUENCE to 1');
assert(
  rescheduledIcs.includes('UID:AAA-DISCOVERY-AAA-LEAD-2026-00042@arnavabacus.com'),
  'Must preserve identical UID to replace existing event in calendar'
);
console.log('✅ TC-CAL-07 Passed: Reschedule retains UID and increments SEQUENCE for OS calendar updates.');

// TC-CAL-08: Invalid Date Input Rejection
console.log('Running TC-CAL-08: Invalid Date Input Rejection...');
let threwDateError = false;
try {
  generateDiscoveryCalendarInvite({
    ...baseOptions,
    startDate: 'invalid-date-string-xyz',
  });
} catch (err: any) {
  threwDateError = true;
  assert(err.message.includes('Invalid start date'), 'Must report invalid start date error');
}
assert(threwDateError, 'Must throw exception on invalid date input');
console.log('✅ TC-CAL-08 Passed: Invalid date input safely intercepted.');

// TC-CAL-09: One-Hour Audio/Display Alarm (VALARM)
console.log('Running TC-CAL-09: 1-Hour Reminder Alarm Specification...');
assert(icsOutput.includes('BEGIN:VALARM'), 'Must contain VALARM block');
assert(icsOutput.includes('TRIGGER:-PT1H'), 'Alarm trigger must be 1 hour prior (-PT1H)');
assert(icsOutput.includes('ACTION:DISPLAY'), 'Alarm action must be DISPLAY');
console.log('✅ TC-CAL-09 Passed: Standard 1-hour pre-session display reminder configured.');

// TC-CAL-10: PII Minimisation Guard
console.log('Running TC-CAL-10: Zero-PII Summary Guard (DPDP Act 2023)...');
assert(
  !icsOutput.includes('9823012345'),
  'Phone number must never be embedded in public calendar invite'
);
assert(
  icsOutput.includes('SUMMARY:Discovery Session: Abacus Mathematics with Neha Patil (Aarav Deshmukh)'),
  'Summary must remain professional and limited to student name and mentor'
);
console.log('✅ TC-CAL-10 Passed: Zero sensitive PII embedded in calendar metadata.');

console.log('\n================================================================');
console.log('🎉 ALL 10/10 WS-17 CALENDAR INVITE ACCEPTANCE TESTS PASSED');
console.log('================================================================');
