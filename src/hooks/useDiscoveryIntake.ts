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
} from '../types/gateway';
import {
  processDiscoveryIntake,
  generateWhatsAppFallbackUrl,
  sanitizeStringInput,
  validateIndianMobile,
} from '../lib/intakeGatewayEngine';

export type SubmissionStatus =
  | 'IDLE'
  | 'SUBMITTING'
  | 'SUCCESS'
  | 'ERROR'
  | 'RATE_LIMITED';

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
  status: SubmissionStatus;
  isSubmitting: boolean;
  isSuccess: boolean;
  isRateLimited: boolean;
  errorMessage: string | null;
  retryCountdown: number;
  leadUID: string | null;
  gatewayResponse: GatewayResponse | null;

  // Actions
  handleSubmit: (e?: React.FormEvent) => Promise<GatewayResponse | null>;
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

  const [status, setStatus] = useState<SubmissionStatus>('IDLE');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCountdown, setRetryCountdown] = useState<number>(0);
  const [leadUID, setLeadUID] = useState<string | null>(null);
  const [gatewayResponse, setGatewayResponse] = useState<GatewayResponse | null>(null);

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
  }, [defaultAgeBracket, defaultCourse]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent): Promise<GatewayResponse | null> => {
      if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }

      setErrorMessage(null);

      // 1. Client-Side Sanitization & Validation
      const sanitizedName = sanitizeStringInput(parentName);
      if (sanitizedName.length < 2) {
        const err = 'Please enter a valid parent name (at least 2 letters).';
        setStatus('ERROR');
        setErrorMessage(err);
        onError?.(err);
        return null;
      }

      const phoneVal = validateIndianMobile(parentPhone);
      if (!phoneVal.isValid) {
        const err = phoneVal.error || 'Please enter a valid 10-digit Indian mobile number.';
        setStatus('ERROR');
        setErrorMessage(err);
        onError?.(err);
        return null;
      }

      if (!serviceConsent) {
        const err = 'Service communication consent is required to coordinate Discovery Session.';
        setStatus('ERROR');
        setErrorMessage(err);
        onError?.(err);
        return null;
      }

      if (!parentGuardianConfirmed) {
        const err = 'Parent/guardian authority confirmation is required.';
        setStatus('ERROR');
        setErrorMessage(err);
        onError?.(err);
        return null;
      }

      // Map friendly course label to backend key if necessary
      let mappedCourse = courseInterest.toLowerCase();
      if (mappedCourse.includes('abacus')) mappedCourse = 'abacus';
      else if (mappedCourse.includes('vedic')) mappedCourse = 'vedic';
      else if (mappedCourse.includes('mental')) mappedCourse = 'mental-math';
      else if (mappedCourse.includes('school')) mappedCourse = 'school-math';
      else if (mappedCourse.includes('olympiad') || mappedCourse.includes('ipm')) mappedCourse = 'olympiad';

      // Map age bracket to supported key if necessary
      let mappedAge = childAgeBracket;
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

      // Generate client-side idempotency key
      const idempotencyKey = `INTAKE-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const payload: DiscoveryIntakePayload = {
        parentName: sanitizedName,
        parentPhone: phoneVal.normalized!,
        parentEmail: parentEmail ? sanitizeStringInput(parentEmail) : null,
        childAgeBracket: mappedAge,
        courseInterest: mappedCourse,
        serviceConsent,
        marketingConsent,
        parentGuardianConfirmed,
        website_url_hp: honeypotField,
        idempotencyKey,
      };

      setStatus('SUBMITTING');

      try {
        const response = processDiscoveryIntake(payload);
        setGatewayResponse(response);

        if (response.statusCode === 200 && response.success) {
          setStatus('SUCCESS');
          setLeadUID(response.leadUID || null);
          onSuccess?.(response);
          return response;
        } else if (response.statusCode === 429) {
          setStatus('RATE_LIMITED');
          const waitTime = response.retryAfterSeconds || 900;
          setRetryCountdown(waitTime);
          setErrorMessage(response.error || 'Rate limit exceeded. Please wait before retrying.');
          onError?.(response.error || 'Rate limit exceeded.');
          return response;
        } else {
          setStatus('ERROR');
          setErrorMessage(response.error || 'Submission could not be completed.');
          onError?.(response.error || 'Submission failed.');
          return response;
        }
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : 'Network error during submission.';
        setStatus('ERROR');
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
    isSuccess: status === 'SUCCESS',
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
