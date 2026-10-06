/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VaultDocument {
  id: string;
  name: string;
  description?: string;
  folderId: string;
  fileType: "pdf" | "doc" | "image" | "sheet" | "link";
  fileUrl: string; // URL, Google Drive link, or uploaded Data URL
  fileSizeBytes?: number;
  uploadedAt: string;
  isLocked?: boolean;
}

export interface VaultFolder {
  id: string;
  name: string;
  description?: string;
  program: "abacus" | "vedic" | "school" | "general";
  levelOrBatch: string; // e.g. "Level 1", "Batch A", "All Batches"
  accessTag: string; // Used to match parent approved permissions, e.g. "abacus-lvl1", "ALL"
  colorTheme: string;
  createdAt: string;
}

export interface ParentWhitelistedUser {
  id: string;
  studentName: string;
  parentName: string;
  phone: string; // 10 digits
  email?: string;
  program: string;
  batch: string;
  assignedFolderIds: string[]; // ["ALL"] or specific folder IDs
  status: "approved" | "pending";
  approvedAt?: string;
}

const VAULT_FOLDERS_STORAGE_KEY = "aaa_vault_folders_db";
const VAULT_DOCS_STORAGE_KEY = "aaa_vault_documents_db";
const VAULT_PARENT_WHITELIST_KEY = "aaa_vault_parents_whitelist_db";
export const VAULT_ACTIVE_SESSION_KEY = "aaa_vault_parent_session";

// Default initial folders setup for Arnav Abacus Academy
export const DEFAULT_INITIAL_FOLDERS: VaultFolder[] = [
  {
    id: "folder-abacus-lvl1",
    name: "Abacus Level 1 - Worksheets & Practice Drill",
    description: "Weekly test papers, finger-free drills, and direct addition worksheets.",
    program: "abacus",
    levelOrBatch: "Level 1",
    accessTag: "abacus-lvl1",
    colorTheme: "from-blue-600 to-cyan-600",
    createdAt: "2026-10-01",
  },
  {
    id: "folder-abacus-lvl2",
    name: "Abacus Level 2 - Big Friends & Formulas",
    description: "Small & Big Friends formula reference sheets and timed test sets.",
    program: "abacus",
    levelOrBatch: "Level 2",
    accessTag: "abacus-lvl2",
    colorTheme: "from-indigo-600 to-blue-600",
    createdAt: "2026-10-01",
  },
  {
    id: "folder-vedic-junior",
    name: "Vedic Maths Junior - Fast Multiplication & Tricks",
    description: "Sutra practice handouts, Ekadhikena methods, and speed drill keys.",
    program: "vedic",
    levelOrBatch: "Junior Batch",
    accessTag: "vedic-junior",
    colorTheme: "from-amber-600 to-orange-600",
    createdAt: "2026-10-01",
  },
  {
    id: "folder-school-maths",
    name: "School Academic Foundation - Class 5 to 8",
    description: "NCERT & State Board exam question banks and step-by-step solutions.",
    program: "school",
    levelOrBatch: "Class 5-8",
    accessTag: "school-foundations",
    colorTheme: "from-emerald-600 to-teal-600",
    createdAt: "2026-10-01",
  },
];

export const DEFAULT_INITIAL_DOCS: VaultDocument[] = [
  {
    id: "doc-1",
    name: "Level 1 - Weekly Speed Drill 01.pdf",
    description: "10-minute speed calculation test paper with answer grid.",
    folderId: "folder-abacus-lvl1",
    fileType: "pdf",
    fileUrl: "/sample-docs/abacus-level-1-sample.pdf",
    fileSizeBytes: 245000,
    uploadedAt: "2026-10-02",
  },
  {
    id: "doc-2",
    name: "Abacus Bead Finger Guide & Formulas.pdf",
    description: "Comprehensive visual poster of beads movement and rules.",
    folderId: "folder-abacus-lvl1",
    fileType: "pdf",
    fileUrl: "/sample-docs/abacus-bead-guide.pdf",
    fileSizeBytes: 520000,
    uploadedAt: "2026-10-03",
  },
  {
    id: "doc-3",
    name: "Level 2 - Big Friends Mastery Set.pdf",
    description: "Practice questions covering +9 to +1 formulas.",
    folderId: "folder-abacus-lvl2",
    fileType: "pdf",
    fileUrl: "/sample-docs/abacus-level-2-formulas.pdf",
    fileSizeBytes: 310000,
    uploadedAt: "2026-10-03",
  },
  {
    id: "doc-4",
    name: "Vedic Maths Sutra 1 & 2 Fast Mental Drills.pdf",
    description: "Nikhilam and Anurupyena multiplication worksheets.",
    folderId: "folder-vedic-junior",
    fileType: "pdf",
    fileUrl: "/sample-docs/vedic-junior-drills.pdf",
    fileSizeBytes: 410000,
    uploadedAt: "2026-10-04",
  },
  {
    id: "doc-5",
    name: "School Maths Term 1 Foundation Bank.pdf",
    description: "Fractions, Decimals and Integers chapter-wise tests.",
    folderId: "folder-school-maths",
    fileType: "pdf",
    fileUrl: "/sample-docs/school-maths-term1.pdf",
    fileSizeBytes: 650000,
    uploadedAt: "2026-10-04",
  },
];

// Pre-seeded approved parents (admins + demo student)
export const DEFAULT_WHITELISTED_PARENTS: ParentWhitelistedUser[] = [
  {
    id: "parent-admin-1",
    studentName: "Academy Admin",
    parentName: "Nitin Patil",
    phone: "9820011223",
    email: "nitinkpatil@gmail.com",
    program: "All Programs",
    batch: "All Batches",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-01",
  },
  {
    id: "parent-demo-1",
    studentName: "Aryan Patil",
    parentName: "Rajesh Patil",
    phone: "9876543210",
    program: "Abacus Mental Arithmetic",
    batch: "Level 1",
    assignedFolderIds: ["folder-abacus-lvl1"],
    status: "approved",
    approvedAt: "2026-10-02",
  },
];

// ================= FOLDER MANAGEMENT =================
export function getVaultFolders(): VaultFolder[] {
  try {
    const raw = localStorage.getItem(VAULT_FOLDERS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Failed reading folders from storage, using defaults", e);
  }
  localStorage.setItem(VAULT_FOLDERS_STORAGE_KEY, JSON.stringify(DEFAULT_INITIAL_FOLDERS));
  return DEFAULT_INITIAL_FOLDERS;
}

export function saveVaultFolder(folder: VaultFolder): void {
  const folders = getVaultFolders();
  const existingIdx = folders.findIndex((f) => f.id === folder.id);
  if (existingIdx >= 0) {
    folders[existingIdx] = folder;
  } else {
    folders.unshift(folder);
  }
  localStorage.setItem(VAULT_FOLDERS_STORAGE_KEY, JSON.stringify(folders));
}

export function deleteVaultFolder(folderId: string): void {
  const folders = getVaultFolders().filter((f) => f.id !== folderId);
  localStorage.setItem(VAULT_FOLDERS_STORAGE_KEY, JSON.stringify(folders));

  // Also clean up documents in that folder
  const docs = getVaultDocuments().filter((d) => d.folderId !== folderId);
  localStorage.setItem(VAULT_DOCS_STORAGE_KEY, JSON.stringify(docs));
}

// ================= DOCUMENT MANAGEMENT =================
export function getVaultDocuments(): VaultDocument[] {
  try {
    const raw = localStorage.getItem(VAULT_DOCS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Failed reading documents from storage, using defaults", e);
  }
  localStorage.setItem(VAULT_DOCS_STORAGE_KEY, JSON.stringify(DEFAULT_INITIAL_DOCS));
  return DEFAULT_INITIAL_DOCS;
}

export function saveVaultDocument(doc: VaultDocument): void {
  const docs = getVaultDocuments();
  const existingIdx = docs.findIndex((d) => d.id === doc.id);
  if (existingIdx >= 0) {
    docs[existingIdx] = doc;
  } else {
    docs.unshift(doc);
  }
  localStorage.setItem(VAULT_DOCS_STORAGE_KEY, JSON.stringify(docs));
}

export function deleteVaultDocument(docId: string): void {
  const docs = getVaultDocuments().filter((d) => d.id !== docId);
  localStorage.setItem(VAULT_DOCS_STORAGE_KEY, JSON.stringify(docs));
}

// ================= WHITELIST & APPROVAL MANAGEMENT =================
export function getWhitelistedParents(): ParentWhitelistedUser[] {
  try {
    const raw = localStorage.getItem(VAULT_PARENT_WHITELIST_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Failed reading whitelist, using defaults", e);
  }
  localStorage.setItem(VAULT_PARENT_WHITELIST_KEY, JSON.stringify(DEFAULT_WHITELISTED_PARENTS));
  return DEFAULT_WHITELISTED_PARENTS;
}

export function saveWhitelistedParent(user: ParentWhitelistedUser): void {
  const users = getWhitelistedParents();
  const existingIdx = users.findIndex((u) => u.phone.trim() === user.phone.trim());
  if (existingIdx >= 0) {
    users[existingIdx] = user;
  } else {
    users.unshift(user);
  }
  localStorage.setItem(VAULT_PARENT_WHITELIST_KEY, JSON.stringify(users));
}

export function findApprovedParentByPhone(phone: string): ParentWhitelistedUser | null {
  const cleanPhone = phone.replace(/\D/g, "");
  const parents = getWhitelistedParents();
  const found = parents.find((p) => p.phone.replace(/\D/g, "") === cleanPhone);
  if (found && found.status === "approved") {
    return found;
  }
  return null;
}

// ================= AUTH SESSION =================
export function getActiveParentSession(): ParentWhitelistedUser | null {
  try {
    const raw = sessionStorage.getItem(VAULT_ACTIVE_SESSION_KEY) || localStorage.getItem(VAULT_ACTIVE_SESSION_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    return null;
  }
  return null;
}

export function setActiveParentSession(parent: ParentWhitelistedUser, persist = true): void {
  const str = JSON.stringify(parent);
  sessionStorage.setItem(VAULT_ACTIVE_SESSION_KEY, str);
  if (persist) {
    localStorage.setItem(VAULT_ACTIVE_SESSION_KEY, str);
  }
}

export function clearParentSession(): void {
  sessionStorage.removeItem(VAULT_ACTIVE_SESSION_KEY);
  localStorage.removeItem(VAULT_ACTIVE_SESSION_KEY);
}
