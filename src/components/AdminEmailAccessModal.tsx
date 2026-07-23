/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { X, ShieldCheck, UserPlus, Trash2, Edit3, Plus, Check, Search, BookOpen, HelpCircle, Key, AlertCircle, MessageSquare, Star, Sparkles } from "lucide-react";
import { ApprovedEmailRecord, LevelPermission, AccessFeatureMode, CourseType } from "../types";
import {
  getAllApprovedRecords,
  saveApprovedRecord,
  deleteApprovedRecord,
  syncApprovedRecordsFromCloud,
  ACCESS_UPDATED_EVENT,
} from "../lib/accessControl";
import {
  VisitorFeedback,
  getAllVisitorFeedbacks,
  deleteVisitorFeedback,
  syncVisitorFeedbacksFromCloud,
} from "../lib/cloudSync";
import { validateSanitizedEmail, validateSanitizedName } from "../lib/securitySanitizer";

interface AdminEmailAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ABACUS_LEVELS = ["JR-0", "JR-1", "JR-2", "JR-3", "SR-1", "SR-2", "SR-3", "SR-4", "SR-5", "SR-6", "SR-7", "SR-8", "SR-9", "SR-10"];
const VEDIC_LEVELS = ["JVM-1", "SVM-0", "SVM-1", "SVM-2", "SVM-3", "SVM-4", "SVM-5", "SVM-6"];

export default function AdminEmailAccessModal({ isOpen, onClose }: AdminEmailAccessModalProps) {
  const [activeTab, setActiveTab] = useState<"access" | "feedback">("access");
  const [records, setRecords] = useState<ApprovedEmailRecord[]>([]);
  const [feedbacks, setFeedbacks] = useState<VisitorFeedback[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEmail, setEditingEmail] = useState<string | null>(null);

  // Form State
  const [email, setEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [permissions, setPermissions] = useState<LevelPermission[]>([
    { course: "abacus", levels: ["JR-1"], accessMode: "both" },
  ]);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadData = () => {
    setRecords(getAllApprovedRecords());
    setFeedbacks(getAllVisitorFeedbacks());
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
      resetForm();
      syncVisitorFeedbacksFromCloud().then((list) => setFeedbacks(list));
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => loadData();
    window.addEventListener(ACCESS_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(ACCESS_UPDATED_EVENT, handleUpdate);
  }, []);

  const handleDeleteFeedback = async (id: string) => {
    const updated = await deleteVisitorFeedback(id);
    setFeedbacks(updated);
    setSuccess("Visitor feedback deleted successfully.");
  };

  const resetForm = () => {
    setEmail("");
    setStudentName("");
    setIsAdmin(false);
    setPermissions([{ course: "abacus", levels: ["JR-1"], accessMode: "both" }]);
    setEditingEmail(null);
    setError(null);
    setSuccess(null);
  };

  const handleEdit = (record: ApprovedEmailRecord) => {
    setEditingEmail(record.email);
    setEmail(record.email);
    setStudentName(record.studentName || "");
    setIsAdmin(!!record.isAdmin);
    setPermissions(
      record.permissions && record.permissions.length > 0
        ? record.permissions
        : [{ course: "abacus", levels: ["ALL"], accessMode: "both" }]
    );
    setError(null);
    setSuccess(null);
  };

  const handleDelete = (emailToDelete: string) => {
    if (confirm(`Are you sure you want to revoke access for ${emailToDelete}?`)) {
      deleteApprovedRecord(emailToDelete);
      setSuccess(`Revoked access for ${emailToDelete}.`);
      loadData();
      if (editingEmail === emailToDelete) {
        resetForm();
      }
    }
  };

  const handleAddPermission = () => {
    setPermissions((prev) => [...prev, { course: "abacus", levels: ["JR-1"], accessMode: "both" }]);
  };

  const handleRemovePermission = (index: number) => {
    setPermissions((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePermissionChange = (index: number, field: keyof LevelPermission, value: any) => {
    setPermissions((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleToggleLevel = (permIndex: number, lvl: string) => {
    setPermissions((prev) => {
      const next = [...prev];
      const currentLevels = next[permIndex].levels || [];
      if (lvl === "ALL") {
        next[permIndex].levels = ["ALL"];
      } else {
        const withoutAll = currentLevels.filter((l) => l !== "ALL");
        if (withoutAll.includes(lvl)) {
          const updated = withoutAll.filter((l) => l !== lvl);
          next[permIndex].levels = updated.length === 0 ? ["ALL"] : updated;
        } else {
          next[permIndex].levels = [...withoutAll, lvl];
        }
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const emailVal = validateSanitizedEmail(email);
    if (!emailVal.valid) {
      setError(emailVal.error || "Please enter a valid student email address.");
      return;
    }

    let cleanStudentName = "Student User";
    if (studentName.trim()) {
      const nameVal = validateSanitizedName(studentName);
      if (!nameVal.valid) {
        setError(nameVal.error || "Please enter a valid student name.");
        return;
      }
      cleanStudentName = nameVal.sanitized;
    }

    const cleanEmail = emailVal.sanitized;

    if (!isAdmin && permissions.length === 0) {
      setError("Please add at least one course & level access rule.");
      return;
    }

    const recordToSave: ApprovedEmailRecord = {
      email: cleanEmail,
      studentName: cleanStudentName,
      isAdmin,
      permissions: isAdmin ? [{ course: "abacus", levels: ["ALL"], accessMode: "both" }, { course: "vedic", levels: ["ALL"], accessMode: "both" }] : permissions,
    };

    saveApprovedRecord(recordToSave);
    setSuccess(`Successfully saved access permissions for ${cleanEmail}!`);
    loadData();
    resetForm();
  };

  const [isSyncing, setIsSyncing] = useState(false);

  const handleManualSync = async () => {
    setIsSyncing(true);
    setError(null);
    setSuccess(null);
    try {
      await syncApprovedRecordsFromCloud();
      const fbList = await syncVisitorFeedbacksFromCloud();
      setRecords(getAllApprovedRecords());
      setFeedbacks(fbList);
      setSuccess("Successfully synced access permissions & visitor feedbacks with cloud server!");
    } catch (e) {
      setError("Cloud sync encountered a network issue.");
    } finally {
      setIsSyncing(false);
    }
  };

  if (!isOpen) return null;

  const filteredRecords = records.filter(
    (r) =>
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.studentName && r.studentName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredFeedbacks = feedbacks.filter(
    (f) =>
      f.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.guestName && f.guestName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      f.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-amber-900/40 via-purple-900/40 to-slate-900 border-b border-slate-700/60 gap-3 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 sm:p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30 shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                Admin Control & Feedback Manager
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-tight">
                Manage student access permissions, view visitor feedbacks, and review guest practice requests.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all disabled:opacity-50"
              title="Sync with cloud database across mobile & desktop"
            >
              <Key className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Syncing..." : "Sync Cloud Now"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher Header */}
        <div className="flex items-center bg-slate-950/80 px-4 py-2 border-b border-slate-800 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab("access")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "access"
                ? "bg-amber-500 text-slate-950 shadow-md font-extrabold"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Student Access Permissions ({records.length})
          </button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "feedback"
                ? "bg-amber-500 text-slate-950 shadow-md font-extrabold"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-amber-400" />
            Visitor Feedback Manager ({feedbacks.length})
          </button>
        </div>

        {/* Content Body */}
        {activeTab === "feedback" ? (
          <div className="p-6 space-y-4 overflow-y-auto flex-1 bg-slate-900/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
              <div>
                <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-400" /> Recorded Visitor Feedbacks & Access Inquiries
                </h3>
                <p className="text-xs text-slate-400">
                  Website feedback submissions and sample practice inquiries from guests and visitors.
                </p>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search feedback..."
                  className="pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 w-full sm:w-64"
                />
              </div>
            </div>

            {filteredFeedbacks.length === 0 ? (
              <div className="p-8 text-center bg-slate-950/50 rounded-xl border border-slate-800 text-slate-400 text-xs font-semibold">
                No visitor feedbacks recorded yet. Submissions from free sample practice will appear here.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredFeedbacks.map((fb) => (
                  <div
                    key={fb.id}
                    className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 relative group hover:border-slate-700 transition"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-bold text-amber-300 text-sm block">{fb.guestName || "Guest Visitor"}</span>
                        <span className="text-xs font-mono text-slate-400 block">{fb.guestEmail}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteFeedback(fb.id)}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Delete Feedback"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="flex text-amber-400 gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= fb.rating ? "fill-amber-400" : "text-slate-700 fill-slate-800"
                            }`}
                          />
                        ))}
                      </div>
                      <span>•</span>
                      <span className="text-[11px] font-semibold">{fb.submittedAt}</span>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 leading-relaxed font-sans">
                      "{fb.message}"
                    </div>

                    {fb.sampleScore && (
                      <div className="text-[10px] text-amber-400 font-bold bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-md inline-block">
                        Sample Quiz Score: {fb.sampleScore}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Content Body Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 overflow-y-auto flex-1">
            {/* Left Form Column */}
            <div className="lg:col-span-6 p-4 sm:p-6 space-y-4 sm:space-y-5 bg-slate-900/60">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-semibold text-amber-300 flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-amber-400 shrink-0" />
                  {editingEmail ? `Edit Access: ${editingEmail}` : "Add New Student Permission"}
                </h3>
                {editingEmail && (
                  <button
                    onClick={resetForm}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              {error && (
                <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-xl text-red-300 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 bg-emerald-900/30 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Student Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      disabled={!!editingEmail}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Student Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Student Full Name"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <input
                    type="checkbox"
                    id="isAdminCheck"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-900 border-slate-700 cursor-pointer"
                  />
                  <label htmlFor="isAdminCheck" className="text-xs font-medium text-slate-200 cursor-pointer">
                    Grant Full Root Admin Access (Unrestricted Access to All Courses)
                  </label>
                </div>

                {!isAdmin && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        Course & Level Access Rules
                      </label>
                      <button
                        type="button"
                        onClick={handleAddPermission}
                        className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Rule
                      </button>
                    </div>

                    {permissions.map((perm, pIndex) => (
                      <div key={pIndex} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <select
                              value={perm.course}
                              onChange={(e) => handlePermissionChange(pIndex, "course", e.target.value)}
                              className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs text-amber-300 font-bold"
                            >
                              <option value="abacus">Abacus Course</option>
                              <option value="vedic">Vedic Math Course</option>
                            </select>

                            <select
                              value={perm.accessMode}
                              onChange={(e) => handlePermissionChange(pIndex, "accessMode", e.target.value)}
                              className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs text-emerald-400 font-bold"
                            >
                              <option value="both">Both (Quiz + Learn)</option>
                              <option value="quiz">Quiz Only</option>
                              <option value="learn">Learn Only</option>
                            </select>
                          </div>

                          {permissions.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemovePermission(pIndex)}
                              className="text-slate-500 hover:text-red-400 transition cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <div>
                          <div className="text-[11px] font-medium text-slate-400 mb-1.5 flex items-center justify-between">
                            <span>Select Allowed Levels:</span>
                            <button
                              type="button"
                              onClick={() => handleToggleLevel(pIndex, "ALL")}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded transition ${
                                perm.levels?.includes("ALL")
                                  ? "bg-amber-500 text-slate-950"
                                  : "bg-slate-800 text-slate-400 hover:text-white"
                              }`}
                            >
                              ALL LEVELS
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {(perm.course === "abacus" ? ABACUS_LEVELS : VEDIC_LEVELS).map((lvl) => {
                              const isSelected = perm.levels?.includes("ALL") || perm.levels?.includes(lvl);
                              return (
                                <button
                                  key={lvl}
                                  type="button"
                                  onClick={() => handleToggleLevel(pIndex, lvl)}
                                  className={`text-[10px] font-bold px-2 py-1 rounded transition cursor-pointer ${
                                    isSelected
                                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                                      : "bg-slate-900 text-slate-500 border border-slate-800 hover:text-slate-300"
                                  }`}
                                >
                                  {lvl}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black text-xs rounded-xl shadow-lg transition cursor-pointer"
                >
                  {editingEmail ? "Save Permission Changes" : "Grant Student Permission"}
                </button>
              </form>
            </div>

            {/* Right List Column */}
            <div className="lg:col-span-6 p-4 sm:p-6 space-y-4 bg-slate-900/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-semibold text-slate-200">
                  Approved Student Emails ({filteredRecords.length})
                </h3>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search student email..."
                    className="pl-8 pr-3 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 w-full sm:w-48"
                  />
                </div>
              </div>

              <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                {filteredRecords.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500 bg-slate-950/40 rounded-xl border border-slate-800">
                    No approved student records found matching "{searchTerm}".
                  </div>
                ) : (
                  filteredRecords.map((r) => (
                    <div
                      key={r.email}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 transition"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-slate-200">{r.studentName || r.email}</span>
                            {r.isAdmin && (
                              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-extrabold px-2 py-0.5 rounded border border-amber-500/30">
                                ROOT ADMIN
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono block">{r.email}</span>
                        </div>

                        <div className="flex items-center space-x-1 shrink-0">
                          <button
                            onClick={() => handleEdit(r)}
                            className="p-1.5 text-slate-400 hover:text-amber-300 hover:bg-slate-800 rounded-md transition-colors"
                            title="Edit Permissions"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(r.email)}
                            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-md transition-colors"
                            title="Delete Access"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {!r.isAdmin && r.permissions && (
                        <div className="mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                          {r.permissions.map((p, i) => (
                            <div
                              key={i}
                              className="text-[10px] bg-slate-800/90 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700 flex items-center gap-1"
                            >
                              <span className="font-bold text-amber-400 uppercase">
                                {p.course}:
                              </span>
                              <span>{p.levels.join(", ")}</span>
                              <span className="text-slate-500">|</span>
                              <span className="text-emerald-400 capitalize">{p.accessMode}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
