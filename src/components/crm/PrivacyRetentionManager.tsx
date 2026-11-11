import React, { useState } from 'react';
import { Shield, Clock, FileCheck, Trash2, CheckCircle2, AlertTriangle, Lock, UserCheck } from 'lucide-react';
import {
  SyntheticPrivacyLead,
  PurgeCertificate,
  RetentionEvaluationResult,
} from '../../types/privacy';
import {
  DATA_CLASSIFICATION_REGISTRY,
  evaluateRetentionClock,
  shredLeadPII,
  processRightToErasure,
  verifyPurgeCertificate,
} from '../../lib/privacyRetentionEngine';

// Initial synthetic mock leads for sandbox testing
const INITIAL_SYNTHETIC_LEADS: SyntheticPrivacyLead[] = [
  {
    leadUID: 'SYNTH-LEAD-001',
    parentName: 'Vikram Joshi',
    parentPhone: '9822011223',
    parentEmail: 'vikram.joshi@example.com',
    childName: 'Aarav Joshi',
    childAgeBracket: '4.5-6',
    courseInterest: 'abacus',
    leadStatus: 'LEAD_DORMANT',
    lastActivityDate: '2026-07-25T10:00:00.000Z', // > 90 days ago
    consentRecord: {
      serviceConsent: true,
      serviceConsentTimestamp: '2026-07-25T10:00:00.000Z',
      marketingConsent: false,
      consentSource: 'WEB_FORM',
      parentGuardianConfirmed: true,
    },
    notes: 'Inquired about weekend morning batches; no response to follow-up.',
  },
  {
    leadUID: 'SYNTH-LEAD-002',
    parentName: 'Priya Kulkarni',
    parentPhone: '9890123456',
    parentEmail: 'priya.k@example.com',
    childName: 'Ananya Kulkarni',
    childAgeBracket: '7-9',
    courseInterest: 'vedic',
    leadStatus: 'DISCOVERY_COMPLETED_PENDING_DECISION',
    lastActivityDate: '2026-10-20T11:30:00.000Z', // ~15 days ago
    consentRecord: {
      serviceConsent: true,
      serviceConsentTimestamp: '2026-10-20T11:30:00.000Z',
      marketingConsent: true,
      marketingConsentTimestamp: '2026-10-20T11:30:00.000Z',
      consentSource: 'WEB_FORM',
      parentGuardianConfirmed: true,
    },
    notes: 'Attended discovery session; evaluating timetable with school schedule.',
  },
  {
    leadUID: 'SYNTH-LEAD-003',
    parentName: 'Sanjay Deshmukh',
    parentPhone: '9765432100',
    parentEmail: 'sanjay.d@example.com',
    childName: 'Rohan Deshmukh',
    childAgeBracket: '10-14',
    courseInterest: 'olympiad',
    leadStatus: 'ENROLLED_ACTIVE',
    lastActivityDate: '2026-11-01T09:00:00.000Z',
    consentRecord: {
      serviceConsent: true,
      serviceConsentTimestamp: '2026-11-01T09:00:00.000Z',
      marketingConsent: false,
      consentSource: 'WALK_IN',
      parentGuardianConfirmed: true,
    },
    notes: 'Formally enrolled in Batch O-2 (5 students). Micro-batch limit respected.',
  },
  {
    leadUID: 'SYNTH-LEAD-004',
    parentName: 'Meera Rao',
    parentPhone: '9823456789',
    parentEmail: 'meera.rao@example.com',
    childName: 'Tanvi Rao',
    childAgeBracket: '4.5-6',
    courseInterest: 'mental-math',
    leadStatus: 'ENQUIRY_CANCELLED',
    lastActivityDate: '2026-07-10T14:00:00.000Z', // > 110 days ago
    consentRecord: {
      serviceConsent: true,
      serviceConsentTimestamp: '2026-07-10T14:00:00.000Z',
      marketingConsent: false,
      consentSource: 'PHONE_INBOUND',
      parentGuardianConfirmed: true,
    },
    notes: 'Relocated to Baner; requested cancellation.',
  },
  {
    leadUID: 'SYNTH-LEAD-005',
    parentName: 'Rajesh Kadam',
    parentPhone: '9922883344',
    parentEmail: 'rajesh.k@example.com',
    childName: 'Omkar Kadam',
    childAgeBracket: '7-9',
    courseInterest: 'school-math',
    leadStatus: 'LEAD_NEW_UNVERIFIED',
    lastActivityDate: '2026-11-03T16:00:00.000Z', // 1 day ago
    consentRecord: {
      serviceConsent: true,
      serviceConsentTimestamp: '2026-11-03T16:00:00.000Z',
      marketingConsent: false,
      consentSource: 'WEB_FORM',
      parentGuardianConfirmed: true,
    },
    notes: 'Submitted discovery form yesterday evening.',
  },
];

export const PrivacyRetentionManager: React.FC = () => {
  const [leads, setLeads] = useState<SyntheticPrivacyLead[]>(INITIAL_SYNTHETIC_LEADS);
  const [certificates, setCertificates] = useState<PurgeCertificate[]>([]);
  const [activeTab, setActiveTab] = useState<'queue' | 'classification' | 'certificates'>('queue');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Trigger 90-day automated purge simulation for eligible leads
  const handleRunScheduledPurge = () => {
    let purgedCount = 0;
    const newCerts: PurgeCertificate[] = [];

    const updatedLeads = leads.map((lead) => {
      const evaluation: RetentionEvaluationResult = evaluateRetentionClock(lead);
      if (evaluation.isPurgeEligible && lead.leadStatus !== 'RECORD_PURGED') {
        const { shreddedLead, certificate } = shredLeadPII(
          lead,
          'SCHEDULED_90_DAY_RETENTION',
          'SYSTEM_AUTOPURGE'
        );
        newCerts.push(certificate);
        purgedCount++;
        return shreddedLead;
      }
      return lead;
    });

    setLeads(updatedLeads);
    setCertificates((prev) => [...newCerts, ...prev]);
    setStatusMessage(`Auto-Purge executed: ${purgedCount} expired prospective leads shredded under 90-day retention rule.`);
  };

  // Process Parent Right-to-Erasure Request
  const handleParentRightToErasure = (leadUID: string) => {
    const target = leads.find((l) => l.leadUID === leadUID);
    if (!target) return;

    if (target.leadStatus === 'ENROLLED_ACTIVE') {
      alert('Cannot erase active enrolled student via prospective lead erasure. Enrolled records require formal withdrawal protocol.');
      return;
    }

    const { shreddedLead, certificate } = processRightToErasure(target, target.parentPhone);

    setLeads((prev) => prev.map((l) => (l.leadUID === leadUID ? shreddedLead : l)));
    setCertificates((prev) => [certificate, ...prev]);
    setStatusMessage(`Parent Right-to-Erasure executed for ${leadUID} within 24h SLA. Certificate ${certificate.certificateId} generated.`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-6 h-6 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                DPDP Act 2023 Compliance & Retention Engine
              </span>
            </div>
            <h2 className="text-2xl font-bold">Privacy & Automated Retention Manager</h2>
            <p className="text-slate-300 text-sm mt-1">
              Internal Compliance Oversight: <strong>Nitin Patil</strong> | Operational Baseline: 90-Day Retention Clock
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRunScheduledPurge}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
              Execute 90-Day Nightly Purge
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'queue'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Retention Queue ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('classification')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'classification'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            4-Tier Data Classification Schema
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'certificates'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Purge Certificates Log ({certificates.length})
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {statusMessage && (
        <div className="bg-emerald-50 border-b border-emerald-200 p-4 text-emerald-900 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-emerald-700 font-bold hover:text-emerald-900"
          >
            ✕
          </button>
        </div>
      )}

      {/* Legal & Compliance Safeguard Notice */}
      <div className="bg-amber-50 border-b border-amber-200 p-4 text-amber-900 text-xs">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Statutory Governance Notice:</strong> Operating strictly on isolated synthetic test data (<code>SYNTH-LEAD-*</code>).
            Nitin Patil&apos;s internal review governs architectural data operations and does not constitute external legal counsel.
            The 90-day retention period is an operational design standard subject to final DPDP statutory notification.
          </p>
        </div>
      </div>

      {/* Tab 1: Retention Queue */}
      {activeTab === 'queue' && (
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-xs border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Lead UID</th>
                  <th className="py-3 px-4">Parent PII Status</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Consent Status</th>
                  <th className="py-3 px-4">Days Elapsed</th>
                  <th className="py-3 px-4">Days Remaining</th>
                  <th className="py-3 px-4">Retention State</th>
                  <th className="py-3 px-4 text-right">Compliance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => {
                  const evalResult = evaluateRetentionClock(lead);
                  const isPurged = lead.leadStatus === 'RECORD_PURGED';

                  return (
                    <tr key={lead.leadUID} className={isPurged ? 'bg-slate-50 opacity-70' : 'hover:bg-slate-50'}>
                      <td className="py-3 px-4 font-mono font-medium text-slate-900">
                        {lead.leadUID}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">
                          {lead.parentName}
                        </div>
                        <div className="text-xs text-slate-500 font-mono">
                          {lead.parentPhone}
                        </div>
                      </td>
                      <td className="py-3 px-4 capitalize font-medium text-slate-800">
                        {lead.courseInterest}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-1 text-xs">
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                            <CheckCircle2 className="w-3 h-3" /> Service: Granted
                          </span>
                          <span className={`inline-flex items-center gap-1 font-medium ${
                            lead.consentRecord.marketingConsent ? 'text-indigo-600' : 'text-slate-400'
                          }`}>
                            {lead.consentRecord.marketingConsent ? '● Mktg: Opt-in' : '○ Mktg: Unticked'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono">
                        {evalResult.isExempt ? '—' : `${evalResult.daysElapsed}d`}
                      </td>
                      <td className="py-3 px-4 font-mono">
                        {evalResult.isExempt ? (
                          <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                            3-Yr Student
                          </span>
                        ) : isPurged ? (
                          <span className="text-xs text-slate-400">Purged</span>
                        ) : (
                          <span className={`font-bold ${evalResult.daysRemaining === 0 ? 'text-red-600' : 'text-slate-800'}`}>
                            {evalResult.daysRemaining}d
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {isPurged ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-700">
                            <Lock className="w-3 h-3" /> PII Shredded
                          </span>
                        ) : evalResult.isExempt ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                            <UserCheck className="w-3 h-3" /> Enrolled (Exempt)
                          </span>
                        ) : evalResult.isPurgeEligible ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 animate-pulse">
                            <AlertTriangle className="w-3 h-3" /> 90d Purge Due
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                            <Clock className="w-3 h-3" /> Active Window
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {!isPurged && !evalResult.isExempt && (
                          <button
                            onClick={() => handleParentRightToErasure(lead.leadUID)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded text-xs font-semibold transition-colors"
                            title="Execute Parent Right-to-Erasure (<24h SLA)"
                          >
                            <Trash2 className="w-3 h-3" /> Erase PII
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: 4-Tier Data Classification */}
      {activeTab === 'classification' && (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(DATA_CLASSIFICATION_REGISTRY).map(([field, desc]) => (
              <div key={field} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-bold text-slate-900">{desc.fieldName}</span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    desc.tier === 'TIER_1_PROSPECTIVE' ? 'bg-amber-100 text-amber-800' :
                    desc.tier === 'TIER_2_DIAGNOSTIC' ? 'bg-blue-100 text-blue-800' :
                    desc.tier === 'TIER_3_ENROLLED_PII' ? 'bg-purple-100 text-purple-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {desc.tier}
                  </span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p><strong>Storage Store:</strong> {desc.storageTarget}</p>
                  <p><strong>Retention Rule:</strong> {desc.retentionPolicy}</p>
                  <p><strong>PII Sensitivity:</strong> {desc.isPii ? '🔴 Direct PII (Shredded on Purge)' : '🟢 Non-PII (Preserved for Aggregates)'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Cryptographic Purge Certificates */}
      {activeTab === 'certificates' && (
        <div className="p-6">
          {certificates.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <FileCheck className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="font-medium">No purge certificates generated yet in this session.</p>
              <p className="text-xs text-slate-400 mt-1">Execute a 90-day purge or parent right-to-erasure to view tamper-proof certificates.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {certificates.map((cert) => {
                const isValid = verifyPurgeCertificate(cert);
                return (
                  <div key={cert.certificateId} className="p-4 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-slate-900">{cert.certificateId}</span>
                        <span className="text-slate-500">Target: {cert.leadUID}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-sans">
                          {cert.purgeReason}
                        </span>
                        <span className={`px-2 py-0.5 rounded font-sans font-semibold ${
                          isValid ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {isValid ? '✅ Tamper-Proof Verified' : '❌ Hash Invalid'}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-600">
                      <p><strong>Purged At:</strong> {cert.purgedAt}</p>
                      <p><strong>Authorized By:</strong> {cert.authorizedBy}</p>
                      <p className="col-span-1 md:col-span-2">
                        <strong>Fields Erased:</strong> {cert.fieldsPurged.join(', ')}
                      </p>
                      <p className="col-span-1 md:col-span-2 break-all text-slate-500">
                        <strong>HMAC-SHA256 Signature:</strong> {cert.tamperProofHash}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
