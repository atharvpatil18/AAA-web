/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BatchSchedule } from "../types";

export const BATCHES_STORAGE_KEY = "aaa_batch_schedules_db";
export const BATCHES_UPDATED_EVENT = "aaa_batches_updated";

export const DEFAULT_BATCH_SCHEDULES: BatchSchedule[] = [
  {
    id: "batch-1",
    name: "Online - Tue/Thu (4:00 PM - 5:00 PM)",
    teacherName: "Neha Patil",
    course: "abacus",
    days: "Tue + Thu",
    timeSlot: "04:30 PM - 05:30 PM",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "batch-2",
    name: "Offline Wakad Hub - Sat/Sun (10:00 AM - 11:30 AM)",
    teacherName: "Neha Patil",
    course: "abacus",
    days: "Sat + Sun",
    timeSlot: "10:00 AM - 11:30 AM",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "batch-3",
    name: "Vedic Math Global - Mon/Wed (6:00 PM - 7:00 PM)",
    teacherName: "Nitin Patil",
    course: "vedic",
    days: "Mon + Wed",
    timeSlot: "06:00 PM - 07:00 PM",
    status: "active",
    createdAt: new Date().toISOString(),
  },
];

/**
 * Get all batch schedules from localStorage (or initialize defaults)
 */
export function getBatches(): BatchSchedule[] {
  const raw = localStorage.getItem(BATCHES_STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.warn("Failed to parse batch schedules from storage", e);
    }
  }

  // Initialize with defaults if empty
  localStorage.setItem(BATCHES_STORAGE_KEY, JSON.stringify(DEFAULT_BATCH_SCHEDULES));
  return DEFAULT_BATCH_SCHEDULES;
}

/**
 * Save or update a batch schedule record
 */
export function saveBatch(batch: BatchSchedule): BatchSchedule[] {
  const batches = getBatches();
  const index = batches.findIndex((b) => b.id === batch.id);

  let updated: BatchSchedule[];
  if (index >= 0) {
    updated = [...batches];
    updated[index] = { ...batch };
  } else {
    updated = [batch, ...batches];
  }

  localStorage.setItem(BATCHES_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(BATCHES_UPDATED_EVENT, { detail: updated }));
  return updated;
}

/**
 * Convenience method to quickly update a batch's name
 */
export function updateBatchName(batchId: string, newName: string): BatchSchedule[] {
  const batches = getBatches();
  const target = batches.find((b) => b.id === batchId);
  if (!target) return batches;

  const updatedBatch: BatchSchedule = {
    ...target,
    name: newName.trim(),
  };

  return saveBatch(updatedBatch);
}

/**
 * Delete a batch schedule
 */
export function deleteBatch(batchId: string): BatchSchedule[] {
  const batches = getBatches();
  const filtered = batches.filter((b) => b.id !== batchId);
  localStorage.setItem(BATCHES_STORAGE_KEY, JSON.stringify(filtered));
  window.dispatchEvent(new CustomEvent(BATCHES_UPDATED_EVENT, { detail: filtered }));
  return filtered;
}
