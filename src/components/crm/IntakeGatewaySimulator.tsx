import React, { useState } from 'react';
import { ShieldAlert, Send, RefreshCw, AlertOctagon, CheckCircle2, MessageCircle, Bug } from 'lucide-react';
import { DiscoveryIntakePayload, GatewayResponse } from '../../types/gateway';
import {
  processDiscoveryIntake,
  GatewayRateLimiter,
  generateWhatsAppFallbackUrl,
} from '../../lib/intakeGatewayEngine';

export const IntakeGatewaySimulator: React.FC = () => {
  const [parentName, setParentName] = useState('Vikram Joshi');
  const [parentPhone, setParentPhone] = useState('9822011223');
  const [courseInterest, setCourseInterest] = useState('abacus');
  const [childAgeBracket, setChildAgeBracket] = useState('4.5-6');
  const [serviceConsent, setServiceConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [parentGuardianConfirmed, setParentGuardianConfirmed] = useState(true);
  const [honeypotField, setHoneypotField] = useState('');
  const [clientIp, setClientIp] = useState('192.168.1.50');

  // Dedicated simulator rate limiter so tests don't pollute global instance
  const [simulatorLimiter] = useState(() => new GatewayRateLimiter());
  const [lastResponse, setLastResponse] = useState<GatewayResponse | null>(null);
  const [floodLog, setFloodLog] = useState<string[]>([]);

  // Execute Gateway Request
  const handleDispatch = () => {
    const payload: DiscoveryIntakePayload = {
      parentName,
      parentPhone,
      courseInterest,
      childAgeBracket,
      serviceConsent,
      marketingConsent,
      parentGuardianConfirmed,
      website_url_hp: honeypotField,
      clientIp,
      idempotencyKey: `SIM-${Date.now()}`,
    };

    const res = processDiscoveryIntake(payload, { rateLimiter: simulatorLimiter });
    setLastResponse(res);
  };

  // Simulate 6-request flood to trigger rate limiting
  const handleFloodTest = () => {
    const logs: string[] = [];
    const testIp = '10.0.0.99';
    simulatorLimiter.reset(testIp);

    for (let i = 1; i <= 6; i++) {
      const payload: DiscoveryIntakePayload = {
        parentName: `Flood Parent ${i}`,
        parentPhone: '9822011223',
        courseInterest: 'abacus',
        childAgeBracket: '4.5-6',
        serviceConsent: true,
        marketingConsent: false,
        parentGuardianConfirmed: true,
        clientIp: testIp,
        idempotencyKey: `FLOOD-REQ-${i}-${Date.now()}`,
      };

      const res = processDiscoveryIntake(payload, { rateLimiter: simulatorLimiter });
      logs.push(`Request #${i}: HTTP ${res.statusCode} — ${res.success ? 'SUCCESS (UID: ' + res.leadUID + ')' : 'BLOCKED (' + res.error + ')'}`);
    }

    setFloodLog(logs);
  };

  // Attack Preset Loaders
  const loadNormalPreset = () => {
    setParentName('Vikram Joshi');
    setParentPhone('9822011223');
    setHoneypotField('');
    setCourseInterest('abacus');
  };

  const loadFormulaAttackPreset = () => {
    setParentName('=SUM(A1:A10)');
    setParentPhone('9822011223');
    setHoneypotField('');
  };

  const loadXssAttackPreset = () => {
    setParentName('<script>alert("XSS")</script>Neha Sharma');
    setParentPhone('9822011223');
    setHoneypotField('');
  };

  const loadHoneypotBotPreset = () => {
    setParentName('Automated Web Scraper');
    setParentPhone('9822011223');
    setHoneypotField('https://malicious-spam-url.xyz/phish');
  };

  const whatsappUrl = generateWhatsAppFallbackUrl(parentName, courseInterest);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6">
        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert className="w-6 h-6 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            WS-15 Perimeter Security & Anti-Abuse Gateway
          </span>
        </div>
        <h2 className="text-2xl font-bold">Intake Backend Gateway Simulator</h2>
        <p className="text-slate-300 text-sm mt-1">
          Architectural Verification Harness | System Architect: <strong>Nitin Patil</strong>
        </p>

        {/* Preset Attack Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-800">
          <span className="text-xs font-semibold text-slate-400 mr-2">Attack Test Presets:</span>
          <button
            onClick={loadNormalPreset}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded text-xs font-medium transition-colors"
          >
            Normal Parent
          </button>
          <button
            onClick={loadFormulaAttackPreset}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded text-xs font-medium transition-colors"
          >
            Formula Injection (=SUM)
          </button>
          <button
            onClick={loadXssAttackPreset}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-purple-400 rounded text-xs font-medium transition-colors"
          >
            XSS Script Tag
          </button>
          <button
            onClick={loadHoneypotBotPreset}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-rose-400 rounded text-xs font-medium transition-colors"
          >
            Honeypot Bot Trap
          </button>
          <button
            onClick={handleFloodTest}
            className="px-3 py-1 bg-indigo-900 hover:bg-indigo-800 text-indigo-200 rounded text-xs font-medium transition-colors ml-auto"
          >
            Simulate 6-Req Flood Test
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Input Form */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Simulator Payload Input
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Parent Full Name (Tests Anti-Formula & XSS)
            </label>
            <input
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Parent Mobile (Indian 10-Digit)
              </label>
              <input
                type="text"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Simulated Client IP
              </label>
              <input
                type="text"
                value={clientIp}
                onChange={(e) => setClientIp(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Course Interest
              </label>
              <select
                value={courseInterest}
                onChange={(e) => setCourseInterest(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
              >
                <option value="abacus">Abacus Mathematics</option>
                <option value="vedic">Vedic Mathematics</option>
                <option value="mental-math">Mental Mathematics</option>
                <option value="school-math">School Mathematics</option>
                <option value="olympiad">IPM & Olympiad</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Age Bracket
              </label>
              <select
                value={childAgeBracket}
                onChange={(e) => setChildAgeBracket(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
              >
                <option value="4.5-6">4.5 – 6 Years</option>
                <option value="7-9">7 – 9 Years</option>
                <option value="10-14">10 – 14 Years</option>
              </select>
            </div>
          </div>

          {/* Honeypot Input (Visibly shown in simulator for testing) */}
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 mb-1">
              <Bug className="w-3.5 h-3.5" />
              <span>Honeypot Hidden Input Trap (website_url_hp)</span>
            </div>
            <p className="text-[11px] text-rose-700 mb-2">
              Hidden via CSS from real parents. If filled by scrapers, submission is dropped with synthetic HTTP 200.
            </p>
            <input
              type="text"
              placeholder="Leave empty for real users; fill to test bot drop"
              value={honeypotField}
              onChange={(e) => setHoneypotField(e.target.value)}
              className="w-full px-3 py-1.5 border border-rose-300 rounded text-xs font-mono bg-white text-rose-900"
            />
          </div>

          {/* Consents */}
          <div className="space-y-2 pt-2 text-xs text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={parentGuardianConfirmed}
                onChange={(e) => setParentGuardianConfirmed(e.target.checked)}
                className="rounded text-indigo-600"
              />
              <span>Parent/Guardian Authority Confirmed (Mandatory)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={serviceConsent}
                onChange={(e) => setServiceConsent(e.target.checked)}
                className="rounded text-indigo-600"
              />
              <span>Service Communication Consent (Mandatory for scheduling)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="rounded text-indigo-600"
              />
              <span>Optional Marketing Insights (Unticked by default)</span>
            </label>
          </div>

          <button
            onClick={handleDispatch}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Send className="w-4 h-4" />
            Dispatch Request to Gateway
          </button>
        </div>

        {/* Right Column: Gateway Response & Security Telemetry */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Gateway Telemetry & Response
            </h3>
            <button
              onClick={() => {
                simulatorLimiter.reset();
                setLastResponse(null);
                setFloodLog([]);
              }}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
            >
              <RefreshCw className="w-3 h-3" /> Reset Engine State
            </button>
          </div>

          {lastResponse ? (
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 font-sans">
                <span className="font-bold text-slate-700">HTTP Status:</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  lastResponse.statusCode === 200 ? 'bg-emerald-100 text-emerald-800' :
                  lastResponse.statusCode === 429 ? 'bg-amber-100 text-amber-800 animate-pulse' :
                  'bg-red-100 text-red-800'
                }`}>
                  HTTP {lastResponse.statusCode} {lastResponse.statusCode === 200 ? 'OK' : lastResponse.statusCode === 429 ? 'TOO MANY REQUESTS' : 'ERROR'}
                </span>
              </div>

              {lastResponse.isBotDropped && (
                <div className="p-2.5 bg-rose-100 border border-rose-300 text-rose-900 rounded font-sans text-xs flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-rose-700 shrink-0" />
                  <span><strong>Honeypot Bot Trap Triggered:</strong> Bot quietly dropped with synthetic 200 OK. Zero CRM database records created.</span>
                </div>
              )}

              {lastResponse.isDuplicateThrottled && (
                <div className="p-2.5 bg-amber-100 border border-amber-300 text-amber-900 rounded font-sans text-xs flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-amber-700 shrink-0" />
                  <span><strong>Duplicate Alert Throttled:</strong> Request received within 180s. Duplicate WhatsApp notification suppressed.</span>
                </div>
              )}

              <div className="space-y-1 text-slate-700">
                <p><strong>Message:</strong> {lastResponse.message}</p>
                {lastResponse.leadUID && <p><strong>Assigned Lead UID:</strong> {lastResponse.leadUID}</p>}
                {lastResponse.error && <p className="text-red-600"><strong>Error:</strong> {lastResponse.error}</p>}
                {lastResponse.retryAfterSeconds && (
                  <p className="text-amber-700"><strong>Retry After:</strong> {lastResponse.retryAfterSeconds} seconds</p>
                )}
              </div>

              {lastResponse.sanitizedPayload && (
                <div className="mt-2 pt-2 border-t border-slate-200">
                  <span className="text-[11px] font-sans font-bold text-slate-600 block mb-1">
                    Sanitized Payload (Stored Safely):
                  </span>
                  <pre className="p-2 bg-slate-900 text-emerald-400 rounded overflow-x-auto text-[11px]">
                    {JSON.stringify(lastResponse.sanitizedPayload, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-400 text-xs">
              Select an attack preset or click &quot;Dispatch Request to Gateway&quot; to inspect perimeter security responses.
            </div>
          )}

          {/* Flood Test Results */}
          {floodLog.length > 0 && (
            <div className="p-3 bg-slate-900 rounded-xl text-[11px] font-mono text-slate-300 space-y-1">
              <span className="text-emerald-400 font-sans font-bold block mb-1">
                6-Request Flood Telemetry:
              </span>
              {floodLog.map((log, idx) => (
                <p key={idx} className={log.includes('429') ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                  {log}
                </p>
              ))}
            </div>
          )}

          {/* WhatsApp Direct Fallback Preview */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1">
              <MessageCircle className="w-4 h-4 text-emerald-700" />
              <span>Offline Direct WhatsApp Fallback</span>
            </div>
            <p className="text-[11px] text-emerald-800 mb-2">
              If client connectivity fails, UI activates this 1-click fallback directly to Neha Patil (+91 90219 24968):
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Open Direct WhatsApp Booking
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
