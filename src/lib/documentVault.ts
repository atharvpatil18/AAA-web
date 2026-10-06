/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// 1. Root Level: Competition / Event / Purpose Container
export interface VaultEvent {
  id: string;
  name: string; // e.g. "NLC-18Oct2026-IIVA-Abacus", "State Level Olympiad 2026", "Weekly Term Exams"
  description?: string;
  category: "competition" | "exam" | "academic" | "workshop";
  eventDate?: string;
  createdAt: string;
}

// 2. Second Level: Section (e.g. "Junior Category", "Senior Category", "Mock Tests", "Official Question Papers")
export interface VaultSection {
  id: string;
  eventId: string;
  name: string;
  description?: string;
  orderIndex: number;
}

// 3. Third Level: Sub-Section (e.g. "Level 1", "Level 2", "Set A", "Set B", "Evaluation Keys")
export interface VaultSubSection {
  id: string;
  sectionId: string;
  eventId: string;
  name: string;
  description?: string;
  orderIndex: number;
}

// 4. Fourth Level: Folder (The granular permission access unit where parents are assigned)
export interface VaultFolder {
  id: string;
  subSectionId: string;
  sectionId: string;
  eventId: string;
  name: string; // e.g. "Mock Papers - Level 1", "Sample Answer Sheets"
  description?: string;
  createdAt: string;
}

// 5. Fifth Level: Documents inside Folders
export interface VaultDocument {
  id: string;
  folderId: string;
  name: string;
  description?: string;
  fileType: "pdf" | "doc" | "image" | "sheet" | "link";
  fileUrl: string; // File URL or Google Drive link
  fileSizeBytes?: number;
  uploadedAt: string;
}

// Parent User Permission Record mapped to specific folders or whole event/sections
export interface ParentWhitelistedUser {
  id: string;
  studentName: string;
  parentName: string;
  phone: string; // 10 digits
  email?: string;
  program: string;
  batch: string;
  assignedFolderIds: string[]; // List of folder IDs or ["ALL"]
  status: "approved" | "pending";
  approvedAt?: string;
}

// Storage Keys
const STORAGE_EVENTS_KEY = "aaa_vault_events_db_v2";
const STORAGE_SECTIONS_KEY = "aaa_vault_sections_db_v2";
const STORAGE_SUBSECTIONS_KEY = "aaa_vault_subsections_db_v2";
const STORAGE_FOLDERS_KEY = "aaa_vault_folders_db_v2";
const STORAGE_DOCS_KEY = "aaa_vault_documents_db_v2";
const STORAGE_WHITELIST_KEY = "aaa_vault_parents_whitelist_db_v2";
export const VAULT_ACTIVE_SESSION_KEY = "aaa_vault_parent_session_v2";

// Seeded Initial Data with the exact NLC Competition structure from your screenshot
export const DEFAULT_EVENTS: VaultEvent[] = [
  {
    id: "evt-nlc-2026",
    name: "NLC-18Oct2026-IIVA-Abacus",
    description: "National Level Competition 2026 by IIVA - Mock tests, rules, and question sets.",
    category: "competition",
    eventDate: "18-Oct-2026",
    createdAt: "2026-10-06",
  },
  {
    id: "evt-term-exam",
    name: "Term Evaluation & Speed Drills 2026",
    description: "Quarterly assessment series and internal speed qualification tests.",
    category: "exam",
    createdAt: "2026-10-01",
  },
];

export const DEFAULT_SECTIONS: VaultSection[] = [
  {
    id: "sec-nlc-mock",
    eventId: "evt-nlc-2026",
    name: "IIVA Mock Test Papers",
    description: "Preparation practice papers by levels",
    orderIndex: 1,
  },
  {
    id: "sec-nlc-guidelines",
    eventId: "evt-nlc-2026",
    name: "Rules, Timetable & Syllabus",
    description: "Official guidelines and hall ticket instructions",
    orderIndex: 2,
  },
];

export const DEFAULT_SUBSECTIONS: VaultSubSection[] = [
  {
    id: "sub-nlc-lvl1",
    sectionId: "sec-nlc-mock",
    eventId: "evt-nlc-2026",
    name: "Level 1 (Junior)",
    description: "Direct Addition & 1-Digit 5-Row calculations",
    orderIndex: 1,
  },
  {
    id: "sub-nlc-lvl2",
    sectionId: "sec-nlc-mock",
    eventId: "evt-nlc-2026",
    name: "Level 2 (Senior)",
    description: "Small & Big Friends 2-Digit combinations",
    orderIndex: 2,
  },
];

export const DEFAULT_FOLDERS: VaultFolder[] = [
  {
    id: "fld-nlc-lvl1-papers",
    subSectionId: "sub-nlc-lvl1",
    sectionId: "sec-nlc-mock",
    eventId: "evt-nlc-2026",
    name: "Level 1 - Mock Question Papers",
    description: "Complete 10-minute competition sample papers with timer guidelines",
    createdAt: "2026-10-06",
  },
  {
    id: "fld-nlc-lvl1-answers",
    subSectionId: "sub-nlc-lvl1",
    sectionId: "sec-nlc-mock",
    eventId: "evt-nlc-2026",
    name: "Level 1 - Evaluated Answer Keys",
    description: "Official answer solutions for self-checking",
    createdAt: "2026-10-06",
  },
  {
    id: "fld-nlc-lvl2-papers",
    subSectionId: "sub-nlc-lvl2",
    sectionId: "sec-nlc-mock",
    eventId: "evt-nlc-2026",
    name: "Level 2 - Mock Question Papers",
    description: "Senior category 100 questions timed sets",
    createdAt: "2026-10-06",
  },
];

export const DEFAULT_DOCUMENTS: VaultDocument[] = [
  {
    id: "doc-nlc-mock1",
    folderId: "fld-nlc-lvl1-papers",
    name: "NLC 2026 - Level 1 Mock Test 01.pdf",
    description: "Official mock format (100 questions / 5 minutes)",
    fileType: "pdf",
    fileUrl: "/sample-docs/abacus-level-1-sample.pdf",
    fileSizeBytes: 240000,
    uploadedAt: "2026-10-06",
  },
  {
    id: "doc-nlc-mock2",
    folderId: "fld-nlc-lvl1-papers",
    name: "NLC 2026 - Level 1 Mock Test 02.pdf",
    description: "Timed speed test with scoring instructions",
    fileType: "pdf",
    fileUrl: "/sample-docs/abacus-level-1-sample.pdf",
    fileSizeBytes: 260000,
    uploadedAt: "2026-10-06",
  },
  {
    id: "doc-nlc-key1",
    folderId: "fld-nlc-lvl1-answers",
    name: "Level 1 Mock 01 - Answer Key.pdf",
    description: "Solutions and scoring criteria",
    fileType: "pdf",
    fileUrl: "/sample-docs/abacus-bead-guide.pdf",
    fileSizeBytes: 180000,
    uploadedAt: "2026-10-06",
  },
];

export const DEFAULT_WHITELIST: ParentWhitelistedUser[] = [
  {
    id: "parent-admin",
    studentName: "Administrator",
    parentName: "Nitin Patil",
    phone: "9820011223",
    program: "All Programs",
    batch: "All Batches",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-01",
  },
  {
    id: "parent-arnav-nitin-patil",
    studentName: "Arnav Nitin Patil",
    parentName: "Nitin Patil",
    phone: "9021924968",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-hitansh-agarwal",
    studentName: "Hitansh Agarwal",
    parentName: "Daizy Agarwal",
    phone: "7028827005",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-hitanshi-agarwal",
    studentName: "Hitanshi Agarwal",
    parentName: "Daizy Agarwal",
    phone: "7028827005",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-mayank-agarwal",
    studentName: "Mayank Agarwal",
    parentName: "Daizy Agarwal",
    phone: "7028827005",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-atharv-titave",
    studentName: "Atharv Titave",
    parentName: "Nitin Titave",
    phone: "9049333183",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-arnish-jhamtani",
    studentName: "Arnish Jhamtani",
    parentName: "Sameer Jhamtani",
    phone: "8888300003",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-kriyansh-chhabria",
    studentName: "Kriyansh Rahul Chhabria",
    parentName: "Rahul Chhabria",
    phone: "7875093393",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-paridhi-singh",
    studentName: "Paridhi Singh",
    parentName: "Inderjeet Singh",
    phone: "7042577817",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-ruhaan-motwani",
    studentName: "Ruhaan Motwani",
    parentName: "Hitesh Motwani",
    phone: "9552556111",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-agastya-patil",
    studentName: "Agastya Dhanvijay Patil",
    parentName: "Dhanvijay Patil",
    phone: "9370799944",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-ashwath-patil",
    studentName: "Ashwath Dhanvijay Patil",
    parentName: "Dhanvijay Patil",
    phone: "9370799944",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-shreya-asarma",
    studentName: "Shreya Asarma",
    parentName: "Rahul Asarma",
    phone: "8871198062",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-manasvi-bagul",
    studentName: "Manasvi Bagul",
    parentName: "Yogesh Bagul",
    phone: "7506172724",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-maneet-muttepawar",
    studentName: "Maneet Muttepawar",
    parentName: "Manoj Muttepawar",
    phone: "9823825269",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-zeel-patil",
    studentName: "Zeel Patil",
    parentName: "Rohit Patil",
    phone: "8554820413",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-shlok-mahajan",
    studentName: "Shlok Mahajan",
    parentName: "Chandan Mahajan",
    phone: "7738123874",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-aarya-chaudhary",
    studentName: "Aarya Pawar Chaudhary",
    parentName: "Aakash Chaudhary",
    phone: "8879679944",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-navya-patil",
    studentName: "Navya Patil",
    parentName: "Rajiv Patil",
    phone: "8329420374",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-akshada-arya",
    studentName: "Akshada Arya",
    parentName: "Pawan Aarya",
    phone: "9980452106",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-aarav-vora",
    studentName: "Aarav Vora",
    parentName: "Malay Vora",
    phone: "9422357233",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-ovi-vora",
    studentName: "Ovi Vora",
    parentName: "Malay Vora",
    phone: "9422357233",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-spriha-kamath",
    studentName: "Spriha Kamath",
    parentName: "Sameer Kamath",
    phone: "9545501225",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-trisha-sable",
    studentName: "Trisha Sable",
    parentName: "Sachin Sable",
    phone: "7738141882",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-sharvil-sable",
    studentName: "Sharvil Sable",
    parentName: "Sachin Sable",
    phone: "7738141882",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-krishiv-khandelwal",
    studentName: "Krishiv Khandelwal",
    parentName: "Ankit Khandelwal",
    phone: "8806229984",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-sushmit-arakhrao",
    studentName: "Sushmit Arakhrao",
    parentName: "Prashant Arakhrao",
    phone: "8600600428",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-devaansh-ganjoo",
    studentName: "Devaansh Ganjoo",
    parentName: "Sachin Ganjoo",
    phone: "9049054466",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-ira-sonawane",
    studentName: "IRA SONAWANE",
    parentName: "PRAMOD SONAWANE",
    phone: "9075022266",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-prisha-satapathy",
    studentName: "Prisha Satapathy",
    parentName: "Anjan Satapathy",
    phone: "9730648505",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-pranjal-satapathy",
    studentName: "Pranjal Satapathy",
    parentName: "Anjan Satapathy",
    phone: "9730648505",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-vrushank-upadhye",
    studentName: "Vrushank Upadhye",
    parentName: "Vrushank Upadhye",
    phone: "9604314556",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-advika-ghorpade",
    studentName: "ADVIKA GHORPADE",
    parentName: "RAJVARDHAN GHORPADE",
    phone: "8805018506",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-shantanu-ghorpade",
    studentName: "SHANTANU GHORPADE",
    parentName: "KIRAN GHORPADE",
    phone: "9422303398",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-hriday-patnaik",
    studentName: "HRIDAY PATNAIK",
    parentName: "RUPESH PATNAIK",
    phone: "9373432397",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
  {
    id: "parent-adiyaa-deshmukh",
    studentName: "ADIYAA DESHMUKH",
    parentName: "HEMANTH KUMAR DESHMUKH",
    phone: "7875639922",
    program: "Abacus",
    batch: "Regular Batch",
    assignedFolderIds: ["ALL"],
    status: "approved",
    approvedAt: "2026-10-06",
  },
];

// Helper to safely fetch from localStorage
function getStore<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn(`Failed to read ${key}`);
  }
  localStorage.setItem(key, JSON.stringify(fallback));
  return fallback;
}

function setStore<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// ---------------- EVENTS ----------------
export function getVaultEvents(): VaultEvent[] {
  return getStore<VaultEvent>(STORAGE_EVENTS_KEY, DEFAULT_EVENTS);
}

export function saveVaultEvent(event: VaultEvent): void {
  const events = getVaultEvents();
  const idx = events.findIndex((e) => e.id === event.id);
  if (idx >= 0) events[idx] = event;
  else events.unshift(event);
  setStore(STORAGE_EVENTS_KEY, events);
}

export function deleteVaultEvent(eventId: string): void {
  const events = getVaultEvents().filter((e) => e.id !== eventId);
  setStore(STORAGE_EVENTS_KEY, events);
}

// ---------------- SECTIONS ----------------
export function getVaultSections(eventId?: string): VaultSection[] {
  const sections = getStore<VaultSection>(STORAGE_SECTIONS_KEY, DEFAULT_SECTIONS);
  return eventId ? sections.filter((s) => s.eventId === eventId) : sections;
}

export function saveVaultSection(section: VaultSection): void {
  const sections = getStore<VaultSection>(STORAGE_SECTIONS_KEY, DEFAULT_SECTIONS);
  const idx = sections.findIndex((s) => s.id === section.id);
  if (idx >= 0) sections[idx] = section;
  else sections.push(section);
  setStore(STORAGE_SECTIONS_KEY, sections);
}

export function deleteVaultSection(sectionId: string): void {
  const sections = getStore<VaultSection>(STORAGE_SECTIONS_KEY, DEFAULT_SECTIONS).filter((s) => s.id !== sectionId);
  setStore(STORAGE_SECTIONS_KEY, sections);
}

// ---------------- SUB-SECTIONS ----------------
export function getVaultSubSections(sectionId?: string): VaultSubSection[] {
  const subSections = getStore<VaultSubSection>(STORAGE_SUBSECTIONS_KEY, DEFAULT_SUBSECTIONS);
  return sectionId ? subSections.filter((s) => s.sectionId === sectionId) : subSections;
}

export function saveVaultSubSection(subSection: VaultSubSection): void {
  const subSections = getStore<VaultSubSection>(STORAGE_SUBSECTIONS_KEY, DEFAULT_SUBSECTIONS);
  const idx = subSections.findIndex((s) => s.id === subSection.id);
  if (idx >= 0) subSections[idx] = subSection;
  else subSections.push(subSection);
  setStore(STORAGE_SUBSECTIONS_KEY, subSections);
}

export function deleteVaultSubSection(subSectionId: string): void {
  const subSections = getStore<VaultSubSection>(STORAGE_SUBSECTIONS_KEY, DEFAULT_SUBSECTIONS).filter((s) => s.id !== subSectionId);
  setStore(STORAGE_SUBSECTIONS_KEY, subSections);
}

// ---------------- FOLDERS ----------------
export function getVaultFolders(subSectionId?: string): VaultFolder[] {
  const folders = getStore<VaultFolder>(STORAGE_FOLDERS_KEY, DEFAULT_FOLDERS);
  return subSectionId ? folders.filter((f) => f.subSectionId === subSectionId) : folders;
}

export function saveVaultFolder(folder: VaultFolder): void {
  const folders = getStore<VaultFolder>(STORAGE_FOLDERS_KEY, DEFAULT_FOLDERS);
  const idx = folders.findIndex((f) => f.id === folder.id);
  if (idx >= 0) folders[idx] = folder;
  else folders.push(folder);
  setStore(STORAGE_FOLDERS_KEY, folders);
}

export function deleteVaultFolder(folderId: string): void {
  const folders = getStore<VaultFolder>(STORAGE_FOLDERS_KEY, DEFAULT_FOLDERS).filter((f) => f.id !== folderId);
  setStore(STORAGE_FOLDERS_KEY, folders);
  // Remove docs inside folder
  const docs = getStore<VaultDocument>(STORAGE_DOCS_KEY, DEFAULT_DOCUMENTS).filter((d) => d.folderId !== folderId);
  setStore(STORAGE_DOCS_KEY, docs);
}

// ---------------- DOCUMENTS ----------------
export function getVaultDocuments(folderId?: string): VaultDocument[] {
  const docs = getStore<VaultDocument>(STORAGE_DOCS_KEY, DEFAULT_DOCUMENTS);
  return folderId ? docs.filter((d) => d.folderId === folderId) : docs;
}

export function saveVaultDocument(doc: VaultDocument): void {
  const docs = getStore<VaultDocument>(STORAGE_DOCS_KEY, DEFAULT_DOCUMENTS);
  const idx = docs.findIndex((d) => d.id === doc.id);
  if (idx >= 0) docs[idx] = doc;
  else docs.unshift(doc);
  setStore(STORAGE_DOCS_KEY, docs);
}

export function deleteVaultDocument(docId: string): void {
  const docs = getStore<VaultDocument>(STORAGE_DOCS_KEY, DEFAULT_DOCUMENTS).filter((d) => d.id !== docId);
  setStore(STORAGE_DOCS_KEY, docs);
}

// ---------------- WHITELIST & OTP PERMISSIONS ----------------
export function getWhitelistedParents(): ParentWhitelistedUser[] {
  const stored = getStore<ParentWhitelistedUser>(STORAGE_WHITELIST_KEY, DEFAULT_WHITELIST);
  
  // Merge default entries so newly added enrolled students are always present even if browser already had cached state
  const mergedMap = new Map<string, ParentWhitelistedUser>();
  
  // First insert all DEFAULT_WHITELIST
  for (const def of DEFAULT_WHITELIST) {
    const clean = def.phone.replace(/\D/g, "");
    mergedMap.set(`${clean}-${def.studentName.toLowerCase().trim()}`, def);
  }
  
  // Then overlay or add any stored records
  for (const st of stored) {
    const clean = st.phone.replace(/\D/g, "");
    mergedMap.set(`${clean}-${st.studentName.toLowerCase().trim()}`, st);
  }

  const result = Array.from(mergedMap.values());
  // Keep cache synced
  setStore(STORAGE_WHITELIST_KEY, result);
  return result;
}

export function saveWhitelistedParent(user: ParentWhitelistedUser): void {
  const users = getWhitelistedParents();
  const cleanPhone = user.phone.replace(/\D/g, "");
  const idx = users.findIndex((u) => u.phone.replace(/\D/g, "") === cleanPhone);
  if (idx >= 0) {
    users[idx] = { ...user, phone: cleanPhone };
  } else {
    users.unshift({ ...user, phone: cleanPhone });
  }
  setStore(STORAGE_WHITELIST_KEY, users);
}

export function deleteWhitelistedParent(id: string): void {
  const users = getWhitelistedParents().filter((u) => u.id !== id);
  setStore(STORAGE_WHITELIST_KEY, users);
}

export function findApprovedParentByPhone(phone: string): ParentWhitelistedUser | null {
  const clean = phone.replace(/\D/g, "");
  const users = getWhitelistedParents();
  return users.find((u) => u.phone.replace(/\D/g, "") === clean && u.status === "approved") || null;
}

// ---------------- SESSION ----------------
export function getActiveParentSession(): ParentWhitelistedUser | null {
  try {
    const raw = sessionStorage.getItem(VAULT_ACTIVE_SESSION_KEY) || localStorage.getItem(VAULT_ACTIVE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setActiveParentSession(parent: ParentWhitelistedUser, persist = true): void {
  const str = JSON.stringify(parent);
  sessionStorage.setItem(VAULT_ACTIVE_SESSION_KEY, str);
  if (persist) localStorage.setItem(VAULT_ACTIVE_SESSION_KEY, str);
}

export function clearParentSession(): void {
  sessionStorage.removeItem(VAULT_ACTIVE_SESSION_KEY);
  localStorage.removeItem(VAULT_ACTIVE_SESSION_KEY);
}
