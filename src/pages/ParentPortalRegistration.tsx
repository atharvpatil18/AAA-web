/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  User, 
  Phone, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  FolderLock, 
  Lock, 
  Sparkles, 
  KeyRound,
  FileCheck2,
  Clock,
  ArrowRight
} from "lucide-react";
import { dispatchLeadToWebhook } from "../lib/leadWebhook";
import { validateSanitizedName, validateSanitizedPhone } from "../lib/securitySanitizer";

export default function ParentPortalRegistration() {
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    phone: "",
    program: "Abacus Mental Arithmetic",
    levelOrBatch: "",
    studentId: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate Student Name
    const sNameVal = validateSanitizedName(formData.studentName);
    if (!sNameVal.valid) {
      setErrorMessage("Please enter a valid student name (letters and spaces only).");
      return;
    }

    // Validate Parent Name
    const pNameVal = validateSanitizedName(formData.parentName);
    if (!pNameVal.valid) {
      setErrorMessage("Please enter a valid parent/guardian name.");
      return;
    }

    // Validate 10-Digit Mobile Number
    const phoneVal = validateSanitizedPhone(formData.phone);
    if (!phoneVal.valid) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number for OTP access.");
      return;
    }

    if (!formData.levelOrBatch.trim()) {
      setErrorMessage("Please specify the current batch or level of your child.");
      return;
    }

    setLoading(true);

    try {
      const dispatched = await dispatchLeadToWebhook({
        leadType: "Parent Portal Access Request",
        parentName: pNameVal.sanitized,
        studentName: sNameVal.sanitized,
        phone: phoneVal.sanitized,
        program: formData.program,
        curriculumOrRole: formData.levelOrBatch,
        notes: `Student Roll/ID: ${formData.studentId.trim() || "N/A"} | Access Request Status: PENDING_APPROVAL | Requested Mobile: +91 ${phoneVal.sanitized}`,
      });

      // Even if webhook is disabled in preview, UI marks as submitted gracefully
      setSuccess(true);
    } catch (err) {
      setErrorMessage("Unable to submit registration right now. Please try again or reach out on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/20 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Breadcrumb / Top Tag */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <Lock className="w-3.5 h-3.5" />
            Enrolled Parent & Student Security Gate
          </span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Parent Portal Access Registration
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Register your authorized mobile number to access your child's weekly exam papers, evaluation sheets, and batch study folders via secure Mobile OTP.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Submitted!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                  Thank you, <strong>{formData.parentName}</strong>. Your request for student <strong>{formData.studentName}</strong> has been received by our academy administration.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs sm:text-sm text-slate-700 space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Registered Mobile:</span>
                    <span className="font-semibold text-slate-900">+91 {formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Program & Batch:</span>
                    <span className="font-semibold text-slate-900">{formData.program} ({formData.levelOrBatch})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Approval Status:</span>
                    <span className="inline-flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      <Clock className="w-3.5 h-3.5" /> Pending Verification
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 text-left mb-6">
                  <strong>What happens next?</strong>
                  <ul className="list-disc list-inside mt-1.5 space-y-1">
                    <li>Our team verifies active enrollment and assigns the designated folder.</li>
                    <li>Once approved, you will receive confirmation and can log in at the Parent Portal using Mobile OTP.</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setFormData({
                        studentName: "",
                        parentName: "",
                        phone: "",
                        program: "Abacus Mental Arithmetic",
                        levelOrBatch: "",
                        studentId: "",
                      });
                    }}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition"
                  >
                    Register Another Child
                  </button>
                  <Link
                    to="/worksheets"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow transition inline-flex items-center justify-center gap-1.5"
                  >
                    Go to Worksheets Vault <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-4 mb-4">
                  <h2 className="text-lg font-bold text-slate-900">Enrolled Student & Parent Details</h2>
                  <p className="text-xs text-slate-500">All fields marked with an asterisk (*) are required.</p>
                </div>

                {errorMessage && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Student Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Student Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aryan Nitin Patil"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                    />
                  </div>
                </div>

                {/* Parent Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Parent / Guardian Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nitin Patil"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                    />
                  </div>
                </div>

                {/* Mobile Number for OTP */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Mobile Number for Mobile OTP Access *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-sm font-semibold text-slate-500">+91</span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                      className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition font-medium"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter the primary mobile number where you want to receive login OTPs.
                  </p>
                </div>

                {/* Program & Level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Enrolled Program *
                    </label>
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                    >
                      <option value="Abacus Mental Arithmetic">Abacus Mental Arithmetic</option>
                      <option value="Vedic Mathematics">Vedic Mathematics</option>
                      <option value="School Academic Maths">School Foundation Maths</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Batch / Current Level *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Level 3 / Sat 10 AM"
                      value={formData.levelOrBatch}
                      onChange={(e) => setFormData({ ...formData, levelOrBatch: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                    />
                  </div>
                </div>

                {/* Roll No / Student ID (Optional) */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Student ID / Admission Roll No. (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AAA-2026-104 (if known)"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                  />
                  <p className="text-xs text-slate-400 mt-1">Accelerates instant verification from academy records.</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer text-sm"
                >
                  {loading ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit for Folder Access Approval
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Process & Privacy Explanation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                <FolderLock className="w-5 h-5 text-blue-600" />
                How Folder Access Works
              </h3>
              
              <ol className="space-y-4 text-xs sm:text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold shrink-0 text-xs">
                    1
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Submit Your Mobile Number</strong>
                    Parents register the primary phone number they want to use for OTP verification.
                  </div>
                </li>

                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold shrink-0 text-xs">
                    2
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Teacher / Admin Approval</strong>
                    Our academy staff cross-references your child's batch and assigns the specific learning & exam folder.
                  </div>
                </li>

                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold shrink-0 text-xs">
                    3
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-semibold">One-Click Mobile OTP Access</strong>
                    No passwords to remember. Simply enter your mobile number on our portal, verify the 4-6 digit OTP, and open your child's assigned folder.
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-2 text-blue-100 text-xs font-semibold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                Student Privacy Guarantee
              </div>
              <h4 className="text-lg font-bold text-white mb-2">
                100% Secure & Child-Specific
              </h4>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                By restricting folders to approved phone numbers, your child's personal test marks, weekly answer evaluations, and level-specific test sheets remain strictly confidential between you and the academy.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-900 text-xs">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-sm">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Need Assistance?
              </div>
              <p>
                If your child recently transferred batches or you wish to update your registered phone number, please contact our academy administrative desk or WhatsApp support.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
