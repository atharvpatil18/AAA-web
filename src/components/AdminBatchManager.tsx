/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Edit3, Trash2, Plus, Check, X, Clock, School, Calendar, User, Sparkles, BookOpen } from "lucide-react";
import { BatchSchedule } from "../types";
import { getBatches, saveBatch, deleteBatch, updateBatchName, BATCHES_UPDATED_EVENT } from "../lib/batchManager";

export default function AdminBatchManager() {
  const [batches, setBatches] = useState<BatchSchedule[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Quick Edit Name state
  const [editNameValue, setEditNameValue] = useState("");

  // Full Edit / Add Form modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBatchId, setModalBatchId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [teacherName, setTeacherName] = useState("Neha Patil");
  const [course, setCourse] = useState<"abacus" | "vedic" | "mental" | "school_math">("abacus");
  const [days, setDays] = useState("Tue + Thu");
  const [timeSlot, setTimeSlot] = useState("04:30 PM - 05:30 PM");
  const [status, setStatus] = useState<"active" | "full" | "upcoming">("active");

  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener(BATCHES_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(BATCHES_UPDATED_EVENT, handleUpdate);
  }, []);

  const loadData = () => {
    setBatches(getBatches());
  };

  const handleStartQuickEdit = (batch: BatchSchedule) => {
    setEditingId(batch.id);
    setEditNameValue(batch.name);
  };

  const handleSaveQuickEdit = (batchId: string) => {
    if (!editNameValue.trim()) return;
    updateBatchName(batchId, editNameValue.trim());
    setEditingId(null);
    setNotice("✓ Batch name updated successfully!");
    setTimeout(() => setNotice(null), 3000);
  };

  const handleOpenAddModal = () => {
    setModalBatchId(null);
    setName("");
    setTeacherName("Neha Patil");
    setCourse("abacus");
    setDays("Tue + Thu");
    setTimeSlot("04:30 PM - 05:30 PM");
    setStatus("active");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (batch: BatchSchedule) => {
    setModalBatchId(batch.id);
    setName(batch.name);
    setTeacherName(batch.teacherName);
    setCourse(batch.course);
    setDays(batch.days);
    setTimeSlot(batch.timeSlot);
    setStatus(batch.status || "active");
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newOrUpdatedBatch: BatchSchedule = {
      id: modalBatchId || `batch-${Date.now()}`,
      name: name.trim(),
      teacherName: teacherName.trim(),
      course,
      days: days.trim(),
      timeSlot: timeSlot.trim(),
      status,
      createdAt: new Date().toISOString(),
    };

    saveBatch(newOrUpdatedBatch);
    setIsModalOpen(false);
    setNotice(modalBatchId ? "✓ Batch details saved!" : "✓ New batch schedule created!");
    setTimeout(() => setNotice(null), 3000);
  };

  const handleDelete = (batchId: string, batchName: string) => {
    if (confirm(`Are you sure you want to delete "${batchName}"?`)) {
      deleteBatch(batchId);
      setNotice(`Deleted "${batchName}".`);
      setTimeout(() => setNotice(null), 3000);
    }
  };

  const getCourseBadgeStyle = (c: string) => {
    switch (c) {
      case "abacus":
        return "bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]";
      case "vedic":
        return "bg-[#FEF7E0] text-[#B06000] border border-[#FDE293]";
      case "mental":
        return "bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC]";
      default:
        return "bg-[#F1F3F4] text-[#3C4043] border border-[#DADCE0]";
    }
  };

  const formatCourseName = (c: string) => {
    switch (c) {
      case "abacus":
        return "Abacus";
      case "vedic":
        return "Vedic Math";
      case "mental":
        return "Mental Speed Math";
      default:
        return "School Math";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl">
        <div>
          <h3 className="font-display font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <School className="w-5 h-5 text-orange-500" />
            Batch Schedules & Timings Manager
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, or customize batch names, schedules, mentors, and timing slots.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add New Batch
        </button>
      </div>

      {/* Notice Banner */}
      {notice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-4 py-3 rounded-xl flex items-center justify-between animate-fadeIn">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Batch Cards List - Styled to match exact screenshot design */}
      <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 shadow-sm overflow-hidden">
        {batches.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            No batch schedules available. Click "Add New Batch" to create one.
          </div>
        ) : (
          batches.map((batch) => (
            <div
              key={batch.id}
              className="p-4 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              {/* Left & Center: Details Row */}
              <div className="flex items-center gap-4 flex-1 min-w-0 w-full md:w-auto">
                {/* School Icon */}
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center shrink-0">
                  <span className="text-xl">🏫</span>
                </div>

                {/* Batch Main Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center flex-1 min-w-0">
                  {/* Batch Name (Editable) */}
                  <div className="sm:col-span-5 min-w-0">
                    {editingId === batch.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={editNameValue}
                          onChange={(e) => setEditNameValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveQuickEdit(batch.id);
                            if (e.key === "Escape") setEditingId(null);
                          }}
                          autoFocus
                          className="w-full px-2.5 py-1 text-sm font-extrabold text-slate-900 bg-white border-2 border-orange-500 rounded-lg focus:outline-none"
                          placeholder="Batch Name"
                        />
                        <button
                          onClick={() => handleSaveQuickEdit(batch.id)}
                          className="p-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 shrink-0"
                          title="Save Batch Name"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-1.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 shrink-0"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 group">
                        <h4 className="font-extrabold text-slate-900 text-sm md:text-base tracking-tight truncate">
                          {batch.name}
                        </h4>
                        <button
                          onClick={() => handleStartQuickEdit(batch)}
                          className="opacity-60 group-hover:opacity-100 p-1 text-slate-400 hover:text-orange-600 rounded transition-all"
                          title="Edit batch name"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Teacher Name */}
                  <div className="sm:col-span-2 text-xs md:text-sm font-bold text-slate-700 truncate">
                    {batch.teacherName}
                  </div>

                  {/* Course Pill Badge */}
                  <div className="sm:col-span-2">
                    <span
                      className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${getCourseBadgeStyle(
                        batch.course
                      )}`}
                    >
                      {formatCourseName(batch.course)}
                    </span>
                  </div>

                  {/* Schedule Days */}
                  <div className="sm:col-span-1 text-xs md:text-sm font-semibold text-slate-600 truncate">
                    {batch.days}
                  </div>

                  {/* Time Slot */}
                  <div className="sm:col-span-2 flex items-center gap-1 text-xs md:text-sm font-medium text-slate-800">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{batch.timeSlot}</span>
                  </div>
                </div>
              </div>

              {/* Right Action Controls */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center border-t md:border-t-0 pt-2 md:pt-0 w-full md:w-auto justify-end">
                <button
                  onClick={() => handleOpenEditModal(batch)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                  title="Full Edit Details"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(batch.id, batch.name)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  title="Delete Batch"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Full Edit / Add New Batch */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-scaleUp">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-display font-extrabold text-slate-900 text-lg flex items-center gap-2">
                <School className="w-5 h-5 text-orange-500" />
                {modalBatchId ? "Edit Batch Schedule" : "Create New Batch Schedule"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              {/* Batch Name (Editable) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Batch Name / Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Online - Tue/Thu (4:00 PM - 5:00 PM)"
                  className="w-full px-3.5 py-2.5 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-orange-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  This title is displayed on batch cards and parent schedules.
                </p>
              </div>

              {/* Grid 2-col: Teacher & Course */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mentor / Teacher
                  </label>
                  <input
                    type="text"
                    required
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="e.g. Neha Patil"
                    className="w-full px-3.5 py-2 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Course Program
                  </label>
                  <select
                    value={course}
                    onChange={(e: any) => setCourse(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-orange-500 focus:outline-none"
                  >
                    <option value="abacus">Abacus</option>
                    <option value="vedic">Vedic Math</option>
                    <option value="mental">Mental Speed Math</option>
                    <option value="school_math">School Math</option>
                  </select>
                </div>
              </div>

              {/* Grid 2-col: Days & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Days Offered
                  </label>
                  <input
                    type="text"
                    required
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    placeholder="e.g. Tue + Thu"
                    className="w-full px-3.5 py-2 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Time Slot
                  </label>
                  <input
                    type="text"
                    required
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    placeholder="e.g. 04:30 PM - 05:30 PM"
                    className="w-full px-3.5 py-2 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  {modalBatchId ? "Save Changes" : "Create Batch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
