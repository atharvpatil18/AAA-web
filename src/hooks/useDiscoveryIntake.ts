/**
 * ARNAV ABACUS ACADEMY (AAA) — WS-16 FORM GATEWAY HOOK
 * Reusable Discovery Intake Form State & Gateway Integration Hook
 *
 * Governing Baseline: AAA-S3-PLAN-MASTER-01, AAA-S3-PLAN-WS16-01
 * Governing Determination: MGT-DET-S4-S3-PLAN-01
 * System Architect & Compliance Lead: Nitin Patil (Operations & Tech Lead)
 * Academic Lead: Neha Patil (Academic Director)
 * Branch: feat/sprint3-integration
 */

import React, { useState, useCallback, useEffect, FormEvent } from 'react';
import {
  DiscoveryIntakePayload,
  GatewayResponse,
  CourseInterest,
  ChildAgeBracket,
  DiscoverySubmissionStatus,
} from '../types/gateway';
import {
  generateWhatsAppFallbackUrl,
  sanitizeStringInput,
  validateIndianMobile,
} from '../lib/intakeGatewayEngine';

export type { DiscoverySubmissionStatus };

export interface UseDiscoveryIntakeOptions {
  defaultCourse?: CourseInterest | string;
  defaultAgeBracket?: ChildAgeBracket | string;
  sourceCampaign?: string;
  onSuccess?: (response: GatewayResponse) => void;
  onError?: (error: string) => void;
}

export interface UseDiscoveryIntakeReturn {
  // Form Fields
  parentName: string;
  setParentName: (val: string) => void;
  parentPhone: string;
  setParentPhone: (val: string) => void;
  parentEmail: string;
  setParentEmail: (val: string) => void;
  childAgeBracket: string;
  setChildAgeBracket: (val: string) => void;
  courseInterest: string;
  setCourseInterest: (val: string) => void;
  serviceConsent: boolean;
  setServiceConsent: (val: boolean) => void;
  marketingConsent: boolean;
  setMarketingConsent: (val: boolean) => void;
  parentGuardianConfirmed: boolean;
  setParentGuardianConfirmed: (val: boolean) => void;
  honeypotField: string;
  setHoneypotField: (val: string) => void;

  // Status & Telemetry
  status: DiscoverySubmissionStatus;
  isSubmitting: boolean;
  isSuccess: boolean;
  isOfflineError: boolean;
  isRateLimited: boolean;
  errorMessage: string | null;
  retryCountdown: number;
  leadUID: string | null;
  gatewayResponse: GatewayResponse | null;

  // Actions
  handleSubmit: (
    e?: React.FormEvent,
    customValues?: Partial<DiscoveryIntakePayload>
  ) => Promise<GatewayResponse | null>;
  resetForm: () => void;
  whatsappFallbackUrl: string;
}

export function useDiscoveryIntake(options: UseDiscoveryIntakeOptions = {}): UseDiscoveryIntakeReturn {
  const {
    defaultCourse = 'abacus',
    defaultAgeBracket = '4.5-6',
    onSuccess,
    onError,
  } = options;

  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [childAgeBracket, setChildAgeBracket] = useState(defaultAgeBracket);
  const [courseInterest, setCourseInterest] = useState(defaultCourse);
  const [serviceConsent, setServiceConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [parentGuardianConfirmed, setParentGuardianConfirmed] = useState(true);
  const [honeypotField, setHoneypotField] = useState('');

  // Truthful 8-state submission machine
  const [status, setStatus] = useState<DiscoverySubmissionStatus>('IDLE');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCountdown, setRetryCountdown] = useState<number>(0);
  const [leadUID, setLeadUID] = useState<string | null>(null);
  const [gatewayResponse, setGatewayResponse] = useState<GatewayResponse | null>(null);
  const [activeIdempotencyKey, setActiveIdempotencyKey] = useState<string | null>(null);

  // Live countdown timer for rate limiting
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'RATE_LIMITED' && retryCountdown > 0) {
      timer = setInterval(() => {
        setRetryCountdown((prev) => {
          if (prev <= 1) {
            setStatus('IDLE');
            setErrorMessage(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status, retryCountdown]);

  const resetForm = useCallback(() => {
    setParentName('');
    setParentPhone('');
    setParentEmail('');
    setChildAgeBracket(defaultAgeBracket);
    setCourseInterest(defaultCourse);
    setServiceConsent(true);
    setMarketingConsent(false);
    setParentGuardianConfirmed(true);
    setHoneypotField('');
    setStatus('IDLE');
    setErrorMessage(null);
    setLeadUID(null);
    setGatewayResponse(null);
    setActiveIdempotencyKey(null);
  }, [defaultAgeBracket, defaultCourse]);

  const handleSubmit = useCallback(
    async (
      e?: React.FormEvent,
      customValues?: Partial<DiscoveryIntakePayload>
    ): Promise<GatewayResponse | null> => {
      if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }

      setErrorMessage(null);
      setStatus('VALIDATING');

      const rawParentName = customValues?.parentName ?? parentName;
      const rawParentPhone = customValues?.parentPhone ?? parentPhone;
      const rawParentEmail = customValues?.parentEmail ?? parentEmail;
      const rawAgeBracket = customValues?.childAgeBracket ?? childAgeBracket;
      const rawCourseInterest = customValues?.courseInterest ?? courseInterest;
      const rawServiceConsent = customValues?.serviceConsent ?? serviceConsent;
      const rawMarketingConsent = customValues?.marketingConsent ?? marketingConsent;
      const rawGuardianConfirmed = customValues?.parentGuardianConfirmed ?? parentGuardianConfirmed;
      const rawHoneypot = customValues?.website_url_hp ?? honeypotField;

      // 0. Honeypot check (quiet synthetic drop)
      if (rawHoneypot && rawHoneypot.trim().length > 0) {
        const synthDrop: GatewayResponse = {
          statusCode: 200,
          success: true,
          leadUID: 'AAA-LEAD-BOT-TRAP',
          leadReference: 'AAA-LEAD-BOT-TRAP',
          isBotDropped: true,
          message: 'Inquiry received.',
        };
        setStatus('SERVER_CONFIRMED');
        setGatewayResponse(synthDrop);
        onSuccess?.(synthDrop);
        return synthDrop;
      }

      // 1. Client-Side Sanitization & Validation
      const sanitizedName = sanitizeStringInput(rawParentName);
      if (sanitizedName.length < 2) {
        const err = 'Please enter a valid parent name (at least 2 letters).';
        setStatus('SERVER_REJECTED');
        setErrorMessage(err);
        onError?.(err);
        return null;
      }

      const phoneVal = validateIndianMobile(rawParentPhone);
      if (!phoneVal.isValid) {
        const err = phoneVal.error || 'Please enter a valid 10-digit Indian mobile number.';
        setStatus('SERVER_REJECTED');
        setErrorMessage(err);
        onError?.(err);
        return null;
      }

      if (!rawServiceConsent) {
        const err = 'Service communication consent is required to coordinate Discovery Session.';
        setStatus('SERVER_REJECTED');
        setErrorMessage(err);
        onError?.(err);
        return null;
      }

      if (!rawGuardianConfirmed) {
        const err = 'Parent/guardian authority confirmation is required.';
        setStatus('SERVER_REJECTED');
        setErrorMessage(err);
        onError?.(err);
        return null;
      }

      // Map friendly course label to backend key if necessary
      let mappedCourse = String(rawCourseInterest).toLowerCase();
      if (mappedCourse.includes('abacus')) mappedCourse = 'abacus';
      else if (mappedCourse.includes('vedic')) mappedCourse = 'vedic';
      else if (mappedCourse.includes('mental')) mappedCourse = 'mental-math';
      else if (mappedCourse.includes('school')) mappedCourse = 'school-math';
      else if (mappedCourse.includes('olympiad') || mappedCourse.includes('ipm')) mappedCourse = 'olympiad';

      // Map age bracket to supported key if necessary
      let mappedAge = String(rawAgeBracket);
      if (!['4.5-6', '7-9', '10-14'].includes(mappedAge)) {
        if (
          mappedAge.includes('10') ||
          mappedAge.includes('11') ||
          mappedAge.includes('12') ||
          mappedAge.includes('13') ||
          mappedAge.includes('14') ||
          mappedAge.includes('Grade 6')
        ) {
          mappedAge = '10-14';
        } else if (
          mappedAge.includes('6') ||
          mappedAge.includes('7') ||
          mappedAge.includes('8') ||
          mappedAge.includes('9') ||
          mappedAge.includes('Grade 2') ||
          mappedAge.includes('Grade 3') ||
          mappedAge.includes('Grade 4') ||
          mappedAge.includes('Grade 5')
        ) {
          mappedAge = '7-9';
        } else {
          mappedAge = '4.5-6';
        }
      }

      // Preserve existing idempotency key on retry, or generate new UUIDv4
      const idempotencyKey =
        activeIdempotencyKey ||
        (typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `INTAKE-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`);

      setActiveIdempotencyKey(idempotencyKey);

      const payload: DiscoveryIntakePayload = {
        parentName: sanitizedName,
        parentPhone: phoneVal.normalized!,
        parentEmail: rawParentEmail ? sanitizeStringInput(rawParentEmail) : null,
        childAgeBracket: mappedAge,
        courseInterest: mappedCourse,
        serviceConsent: rawServiceConsent,
        marketingConsent: rawMarketingConsent,
        parentGuardianConfirmed: rawGuardianConfirmed,
        website_url_hp: rawHoneypot,
        idempotencyKey,
      };

      setStatus('SUBMITTING');

      try {
        let serverRes: Response;
        try {
          serverRes = await fetch('/api/discovery-intake', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Idempotency-Key': idempotencyKey,
            },
            body: JSON.stringify(payload),
          });
        } catch {
          // Network connection drop, offline mode, or DNS failure
          const offlineErr = 'Network offline or server unreachable. Your inquiry was NOT submitted online. Please retry or click below to connect directly with Neha Patil on WhatsApp.';
          setStatus('NETWORK_OFFLINE_ERROR');
          setErrorMessage(offlineErr);
          setLeadUID(null);
          onError?.(offlineErr);
          return {
            statusCode: 503,
            success: false,
            error: offlineErr,
            message: 'Network Offline',
          };
        }

        // Handle HTTP 404 (Server endpoint unprovisioned / dev static preview)
        if (serverRes.status === 404) {
          const endpointErr = 'Admissions intake gateway endpoint is currently unavailable. Your inquiry was NOT registered online. Please connect directly via verified WhatsApp.';
          setStatus('NETWORK_OFFLINE_ERROR');
          setErrorMessage(endpointErr);
          setLeadUID(null);
          onError?.(endpointErr);
          return {
            statusCode: 404,
            success: false,
            error: endpointErr,
            message: 'Endpoint Unavailable',
          };
        }

        // Parse JSON response safely
        let serverData: any;
        try {
          serverData = await serverRes.json();
        } catch {
          const parseErr = 'Unexpected server response format. Please retry or contact the academy directly.';
          setStatus('SERVER_REJECTED');
          setErrorMessage(parseErr);
          onError?.(parseErr);
          return null;
        }

        const gatewayResult: GatewayResponse = {
          statusCode: serverRes.status,
          success: serverRes.ok,
          leadUID: serverData.leadReference || serverData.leadUID,
          leadReference: serverData.leadReference,
          id: serverData.id,
          isPersisted: serverRes.ok && !!serverData.leadReference,
          message: serverData.message || (serverRes.ok ? 'Inquiry registered' : 'Error'),
          error: serverData.error,
          retryAfterSeconds: serverData.retryAfterSeconds,
          isBotDropped: serverData.isBotDropped,
          sanitizedPayload: {
            parentName: sanitizedName,
            parentPhone: phoneVal.normalized!,
            childAgeBracket: mappedAge,
            courseInterest: mappedCourse,
          },
        };

        setGatewayResponse(gatewayResult);

        // Server-Confirmed Success strictly upon HTTP 200 or 201
        if (serverRes.ok && (serverRes.status === 200 || serverRes.status === 201)) {
          setStatus('SERVER_CONFIRMED');
          setLeadUID(gatewayResult.leadReference || gatewayResult.leadUID || null);
          onSuccess?.(gatewayResult);
          return gatewayResult;
        } else if (serverRes.status === 429) {
          setStatus('RATE_LIMITED');
          const waitTime = gatewayResult.retryAfterSeconds || 900;
          setRetryCountdown(waitTime);
          setErrorMessage(gatewayResult.error || 'Rate limit exceeded. Please wait before retrying.');
          onError?.(gatewayResult.error || 'Rate limit exceeded.');
          return gatewayResult;
        } else {
          setStatus('SERVER_REJECTED');
          setErrorMessage(gatewayResult.error || 'Submission could not be completed.');
          onError?.(gatewayResult.error || 'Submission failed.');
          return gatewayResult;
        }
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : 'Unexpected submission error.';
        setStatus('NETWORK_OFFLINE_ERROR');
        setErrorMessage(errMsg);
        onError?.(errMsg);
        return null;
      }
    },
    [
      parentName,
      parentPhone,
      parentEmail,
      childAgeBracket,
      courseInterest,
      serviceConsent,
      marketingConsent,
      parentGuardianConfirmed,
      honeypotField,
      activeIdempotencyKey,
      onSuccess,
      onError,
    ]
  );

  const whatsappFallbackUrl = generateWhatsAppFallbackUrl(parentName, courseInterest);

  return {
    parentName,
    setParentName,
    parentPhone,
    setParentPhone,
    parentEmail,
    setParentEmail,
    childAgeBracket,
    setChildAgeBracket,
    courseInterest,
    setCourseInterest,
    serviceConsent,
    setServiceConsent,
    marketingConsent,
    setMarketingConsent,
    parentGuardianConfirmed,
    setParentGuardianConfirmed,
    honeypotField,
    setHoneypotField,

    status,
    isSubmitting: status === 'SUBMITTING',
    isSuccess: status === 'SERVER_CONFIRMED',
    isOfflineError: status === 'NETWORK_OFFLINE_ERROR',
    isRateLimited: status === 'RATE_LIMITED',
    errorMessage,
    retryCountdown,
    leadUID,
    gatewayResponse,

    handleSubmit,
    resetForm,
    whatsappFallbackUrl,
  };
}
