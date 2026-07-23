/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { X, ShieldCheck, UserPlus, Trash2, Edit3, Plus, Check, Search, BookOpen, HelpCircle, Key, AlertCircle } from "lucide-react";
import { ApprovedEmailRecord, LevelPermission, AccessFeatureMode, CourseType } from "../types";
import {
  getAllApprovedRecords,
  saveApprovedRecord,
  deleteApprovedRecord,
  ACCESS_UPDATED_EVENT,
} from "../lib/accessControl";

interface AdminEmailAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ABACUS_LEVELS = ["JR-0", "JR-1", "JR-2", "JR-3", "SR-1", "SR-2", "SR-3", "SR-4", "SR-5", "SR-6", "SR-7", "SR-8", "SR-9", "SR-10"];
const VEDIC_LEVELS = ["JVM-1", "SVM-0", "SVM-1", "SVM-2", "SVM-3", "SVM-4", "SVM-5", "SVM-6"];

export default function AdminEmailAccessModal({ isOpen, onClose }: AdminEmailAccessModalProps) {
  const [records, setRecords] = useState<ApprovedEmailRecord[]>([]);
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
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => loadData();
    window.addEventListener(ACCESS_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(ACCESS_UPDATED_EVENT, handleUpdate);
  }, []);

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
    if (window.confirm(`Are you sure you want to delete access for ${emailToDelete}?`)) {
      const ok = deleteApprovedRecord(emailToDelete);
      if (ok) {
        setSuccess(`Removed access for ${emailToDelete}`);
        loadData();
        if (editingEmail === emailToDelete) {
          resetForm();
        }
      } else {
        setError(`Cannot delete system root admin (${emailToDelete})`);
      }
    }
  };

  const handleAddPermissionRule = () => {
    setPermissions((prev) => [
      ...prev,
      { course: "abacus", levels: ["JR-1"], accessMode: "both" },
    ]);
  };

  const handleRemovePermissionRule = (index: number) => {
    setPermissions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRuleCourseChange = (index: number, course: "abacus" | "vedic") => {
    setPermissions((prev) =>
      prev.map((rule, i) => {
        if (i !== index) return rule;
        const defaultLevel = course === "abacus" ? ["JR-1"] : ["SVM-0"];
        return { ...rule, course, levels: defaultLevel };
      })
    );
  };

  const handleRuleAccessModeChange = (index: number, accessMode: AccessFeatureMode) => {
    setPermissions((prev) =>
      prev.map((rule, i) => (i === index ? { ...rule, accessMode } : rule))
    );
  };

  const handleLevelToggle = (ruleIndex: number, level: string) => {
    setPermissions((prev) =>
      prev.map((rule, i) => {
        if (i !== ruleIndex) return rule;

        if (level === "ALL") {
          return { ...rule, levels: ["ALL"] };
        }

        let currentLevels = rule.levels.filter((l) => l !== "ALL");
        if (currentLevels.includes(level)) {
          currentLevels = currentLevels.filter((l) => l !== level);
        } else {
          currentLevels.push(level);
        }

        if (currentLevels.length === 0) {
          currentLevels = ["ALL"];
        }

        return { ...rule, levels: currentLevels };
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isAdmin && permissions.length === 0) {
      setError("Please add at least one course & level access rule.");
      return;
    }

    const recordToSave: ApprovedEmailRecord = {
      email: cleanEmail,
      studentName: studentName.trim() || cleanEmail.split("@")[0],
      isAdmin,
      permissions: isAdmin ? [{ course: "abacus", levels: ["ALL"], accessMode: "both" }, { course: "vedic", levels: ["ALL"], accessMode: "both" }] : permissions,
    };

    saveApprovedRecord(recordToSave);
    setSuccess(`Successfully saved access permissions for ${cleanEmail}!`);
    loadData();
    resetForm();
  };

  if (!isOpen) return null;

  const filteredRecords = records.filter(
    (r) =>
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.studentName && r.studentName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amber-900/40 via-purple-900/40 to-slate-900 border-b border-slate-700/60">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                Student Access Control Manager
              </h2>
              <p className="text-xs text-slate-400">
                Grant approved email permissions for Abacus & Vedic Math courses, levels, and modes (Quiz / Learn).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          {/* Left Form Column */}
          <div className="lg:col-span-6 p-6 space-y-5 bg-slate-900/60">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-amber-300 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-amber-400" />
                {editingEmail ? `Edit Access: ${editingEmail}` : "Add New Student Email Permission"}
              </h3>
              {editingEmail && (
                <button
                  onClick={resetForm}
                  className="text-xs text-slate-400 hover:text-slate-200 underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-950/60 border border-red-500/40 text-red-300 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Student Approved Email ID *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. student@gmail.com"
                  disabled={!!editingEmail}
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none disabled:opacity-60"
                  required
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
                  placeholder="e.g. Aarav Patel"
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Admin Checkbox */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-amber-200 block">
                    Full Admin Role
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Grant unlimited access to all courses, levels, and features.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                />
              </div>

              {!isAdmin && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-slate-200">
                      Assigned Course & Level Permissions
                    </span>
                    <button
                      type="button"
                      onClick={handleAddPermissionRule}
                      className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Rule
                    </button>
                  </div>

                  {permissions.map((rule, idx) => {
                    const availableLevels = rule.course === "abacus" ? ABACUS_LEVELS : VEDIC_LEVELS;
                    return (
                      <div
                        key={idx}
                        className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 relative group"
                      >
                        {permissions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemovePermissionRule(idx)}
                            className="absolute top-2 right-2 p-1 text-slate-500 hover:text-red-400"
                            title="Remove Rule"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}

                        {/* Course & Access Mode Selection */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">
                              Selected Course
                            </label>
                            <select
                              value={rule.course}
                              onChange={(e) =>
                                handleRuleCourseChange(idx, e.target.value as "abacus" | "vedic")
                              }
                              className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 text-white rounded-lg outline-none"
                            >
                              <option value="abacus">Abacus Course</option>
                              <option value="vedic">Vedic Math Course</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">
                              Defined Access Mode
                            </label>
                            <select
                              value={rule.accessMode}
                              onChange={(e) =>
                                handleRuleAccessModeChange(idx, e.target.value as AccessFeatureMode)
                              }
                              className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 text-white rounded-lg outline-none"
                            >
                              <option value="both">Both (Quiz + Learn)</option>
                              <option value="quiz">Quiz Only</option>
                              <option value="learn">Learn Only</option>
                            </select>
                          </div>
                        </div>

                        {/* Levels Selector */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-[11px] text-slate-400">
                              Selected Level(s)
                            </label>
                            <button
                              type="button"
                              onClick={() => handleLevelToggle(idx, "ALL")}
                              className={`text-[10px] px-2 py-0.5 rounded ${
                                rule.levels.includes("ALL")
                                  ? "bg-amber-500 text-slate-950 font-bold"
                                  : "bg-slate-800 text-slate-400 hover:text-slate-200"
                              }`}
                            >
                              All Levels
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1.5 bg-slate-900/90 rounded-lg border border-slate-800">
                            {availableLevels.map((lvl) => {
                              const isSelected =
                                rule.levels.includes("ALL") || rule.levels.includes(lvl);
                              return (
                                <button
                                  type="button"
                                  key={lvl}
                                  onClick={() => handleLevelToggle(idx, lvl)}
                                  className={`text-[11px] px-2 py-1 rounded-md transition-all font-medium ${
                                    isSelected
                                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                                      : "bg-slate-800/60 text-slate-400 border border-transparent hover:bg-slate-800"
                                  }`}
                                >
                                  {lvl}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-all"
                >
                  {editingEmail ? "Save Updated Permissions" : "Grant Approved Access"}
                </button>
              </div>
            </form>
          </div>

          {/* Right Records List Column */}
          <div className="lg:col-span-6 p-6 space-y-4 bg-slate-950/40">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-200">
                Approved Emails ({records.length})
              </h3>
              <div className="relative w-48">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 text-white rounded-lg outline-none"
                />
              </div>
            </div>

            <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
              {filteredRecords.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  No approved student emails match search.
                </div>
              ) : (
                filteredRecords.map((r) => (
                  <div
                    key={r.email}
                    className={`p-3 bg-slate-900 border rounded-xl transition-all ${
                      editingEmail === r.email
                        ? "border-amber-500/80 bg-amber-950/20"
                        : "border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-xs text-white">
                            {r.studentName || r.email.split("@")[0]}
                          </span>
                          {r.isAdmin && (
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold border border-amber-500/30">
                              ADMIN
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">{r.email}</p>
                      </div>

                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleEdit(r)}
                          className="p-1.5 text-slate-400 hover:text-amber-300 hover:bg-slate-800 rounded-md transition-colors"
                          title="Edit Access"
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

                    {/* Permissions summary tags */}
                    {!r.isAdmin && r.permissions && (
                      <div className="mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                        {r.permissions.map((p, i) => (
                          <div
                            key={i}
                            className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700 flex items-center gap-1"
                          >
                            <span className="font-semibold text-amber-400 uppercase">
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
      </div>
    </div>
  );
}
