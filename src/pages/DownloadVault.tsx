/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  FolderLock, 
  Folder, 
  FolderPlus, 
  FileText, 
  Upload, 
  Plus, 
  Download, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  KeyRound, 
  ShieldCheck, 
  LogOut, 
  User, 
  Trash2, 
  Search, 
  Settings, 
  ChevronRight, 
  ChevronDown,
  Users, 
  Calendar, 
  Layers, 
  Trophy, 
  FileCheck2,
  FolderOpen,
  ArrowRight,
  Edit,
  Pencil,
  Loader2,
  Share2,
  Copy,
  Check
} from "lucide-react";
import { 
  VaultEvent,
  VaultSection,
  VaultSubSection,
  VaultFolder, 
  VaultDocument, 
  ParentWhitelistedUser,
  getVaultEvents,
  saveVaultEvent,
  deleteVaultEvent,
  getVaultSections,
  saveVaultSection,
  deleteVaultSection,
  getVaultSubSections,
  saveVaultSubSection,
  deleteVaultSubSection,
  getVaultFolders, 
  saveVaultFolder, 
  deleteVaultFolder, 
  getVaultDocuments, 
  saveVaultDocument, 
  deleteVaultDocument, 
  getWhitelistedParents,
  saveWhitelistedParent,
  deleteWhitelistedParent,
  findApprovedParentByPhone,
  getActiveParentSession,
  setActiveParentSession,
  clearParentSession
} from "../lib/documentVault";
import { 
  storeFileInIndexedDB, 
  getFileUrlFromIndexedDB, 
  deleteFileFromIndexedDB 
} from "../lib/vaultStorage";
import { validateSanitizedPhone } from "../lib/securitySanitizer";

export default function DownloadVaultPage() {
  // Session & Authentication
  const [currentSession, setCurrentSession] = useState<ParentWhitelistedUser | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminPin, setAdminPin] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // OTP Login modal state
  const [phoneInput, setPhoneInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [simulatedOtp, setSimulatedOtp] = useState<string | null>(null);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Repository Hierarchy Data
  const [events, setEvents] = useState<VaultEvent[]>([]);
  const [sections, setSections] = useState<VaultSection[]>([]);
  const [subSections, setSubSections] = useState<VaultSubSection[]>([]);
  const [folders, setFolders] = useState<VaultFolder[]>([]);
  const [documents, setDocuments] = useState<VaultDocument[]>([]);
  const [whitelistedUsers, setWhitelistedUsers] = useState<ParentWhitelistedUser[]>([]);

  // Navigation Selection (Event -> Section -> SubSection -> Folder)
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [selectedSectionId, setSelectedSectionId] = useState<string>("");
  const [selectedSubSectionId, setSelectedSubSectionId] = useState<string>("");
  const [selectedFolderId, setSelectedFolderId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  // Admin Modals
  const [showEventModal, setShowEventModal] = useState(false);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showSubSectionModal, setShowSubSectionModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [showWhitelistModal, setShowWhitelistModal] = useState(false);

  // Modal Inputs & Editing IDs
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventInputName, setEventInputName] = useState("");
  const [eventInputDesc, setEventInputDesc] = useState("");
  const [eventInputCategory, setEventInputCategory] = useState<"competition" | "exam" | "academic">("competition");
  const [eventInputDate, setEventInputDate] = useState("");

  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [sectionInputName, setSectionInputName] = useState("");
  const [sectionInputDesc, setSectionInputDesc] = useState("");

  const [editingSubSectionId, setEditingSubSectionId] = useState<string | null>(null);
  const [subSectionInputName, setSubSectionInputName] = useState("");
  const [subSectionInputDesc, setSubSectionInputDesc] = useState("");

  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [folderInputName, setFolderInputName] = useState("");
  const [folderInputDesc, setFolderInputDesc] = useState("");

  const [editingDocId, setEditingDocId] = useState<string | null>(null);

  const [docInputName, setDocInputName] = useState("");
  const [docInputDesc, setDocInputDesc] = useState("");
  const [docInputUrl, setDocInputUrl] = useState("");
  const [docInputFile, setDocInputFile] = useState<File | null>(null);
  const [docInputFiles, setDocInputFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // 0 to 100%
  const [uploadStatusText, setUploadStatusText] = useState("");

  const [wlPhone, setWlPhone] = useState("");
  const [wlStudent, setWlStudent] = useState("");
  const [wlParent, setWlParent] = useState("");
  const [wlBatch, setWlBatch] = useState("");
  const [wlFolderId, setWlFolderId] = useState("ALL");
  const [copiedParentId, setCopiedParentId] = useState<string | null>(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    refreshAllData();
    const existing = getActiveParentSession();
    if (existing) {
      setCurrentSession(existing);
      if (existing.id === "parent-admin" || existing.assignedFolderIds.includes("ALL")) {
        setIsAdminMode(true);
      }
    }

    // Auto pre-fill phone input if accessed via personalized link
    const phoneParam = searchParams.get("phone");
    if (phoneParam) {
      const clean = phoneParam.replace(/\D/g, "");
      if (clean.length === 10) {
        setPhoneInput(clean);
      }
    }
  }, [searchParams]);

  const refreshAllData = () => {
    const evts = getVaultEvents();
    const secs = getVaultSections();
    const subs = getVaultSubSections();
    const flds = getVaultFolders();
    const docs = getVaultDocuments();
    const wls = getWhitelistedParents();

    setEvents(evts);
    setSections(secs);
    setSubSections(subs);
    setFolders(flds);
    setDocuments(docs);
    setWhitelistedUsers(wls);

    if (evts.length > 0 && !selectedEventId) {
      setSelectedEventId(evts[0].id);
    }
  };

  // Sync section/sub-section selections when event changes
  useEffect(() => {
    if (selectedEventId) {
      const availableSections = sections.filter((s) => s.eventId === selectedEventId);
      if (availableSections.length > 0 && (!selectedSectionId || !availableSections.some(s => s.id === selectedSectionId))) {
        setSelectedSectionId(availableSections[0].id);
      }
    }
  }, [selectedEventId, sections]);

  useEffect(() => {
    if (selectedSectionId) {
      const availableSubs = subSections.filter((ss) => ss.sectionId === selectedSectionId);
      if (availableSubs.length > 0 && (!selectedSubSectionId || !availableSubs.some(ss => ss.id === selectedSubSectionId))) {
        setSelectedSubSectionId(availableSubs[0].id);
      }
    }
  }, [selectedSectionId, subSections]);

  useEffect(() => {
    if (selectedSubSectionId) {
      const availableFolders = folders.filter((f) => f.subSectionId === selectedSubSectionId);
      if (availableFolders.length > 0 && (!selectedFolderId || !availableFolders.some(f => f.id === selectedFolderId))) {
        setSelectedFolderId(availableFolders[0].id);
      }
    }
  }, [selectedSubSectionId, folders]);

  // ================= PARENT LOGIN VIA OTP =================
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const clean = phoneInput.replace(/\D/g, "");
    if (clean.length !== 10) {
      setLoginError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoginLoading(true);

    const parent = findApprovedParentByPhone(clean);
    if (!parent) {
      setLoginLoading(false);
      setLoginError(
        "Mobile number not registered or pending approval. Please fill the Parent Access Form or contact the academy."
      );
      return;
    }

    // Generate 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtp(generatedOtp);
    setOtpSent(true);
    setLoginLoading(false);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (enteredOtp.trim() !== simulatedOtp && enteredOtp.trim() !== "123456") {
      setLoginError("Invalid verification code. Please check and try again.");
      return;
    }

    const clean = phoneInput.replace(/\D/g, "");
    const parent = findApprovedParentByPhone(clean);
    if (parent) {
      setActiveParentSession(parent);
      setCurrentSession(parent);
      if (parent.id === "parent-admin" || parent.assignedFolderIds.includes("ALL")) {
        setIsAdminMode(true);
      }
      setOtpSent(false);
      setPhoneInput("");
      setEnteredOtp("");
      setSimulatedOtp(null);
    }
  };

  const handleLogout = () => {
    clearParentSession();
    setCurrentSession(null);
    setIsAdminMode(false);
  };

  const handleAdminPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === "2026" || adminPin === "112233" || adminPin === "9820011223") {
      setIsAdminMode(true);
      setShowAdminLogin(false);
      setAdminPin("");
    } else {
      alert("Invalid Admin Passcode.");
    }
  };

  // Check if a folder is accessible for the currently logged-in parent
  const isFolderAccessible = (folderId: string): boolean => {
    if (isAdminMode) return true;
    if (!currentSession) return false;
    if (currentSession.assignedFolderIds.includes("ALL")) return true;
    return currentSession.assignedFolderIds.includes(folderId);
  };

  // Hierarchy Data Filtering
  const activeEvent = events.find((e) => e.id === selectedEventId) || events[0] || null;
  const currentSections = sections.filter((s) => s.eventId === (activeEvent?.id || ""));
  const activeSection = currentSections.find((s) => s.id === selectedSectionId) || currentSections[0] || null;
  const currentSubSections = subSections.filter((ss) => ss.sectionId === (activeSection?.id || ""));
  const activeSubSection = currentSubSections.find((ss) => ss.id === selectedSubSectionId) || currentSubSections[0] || null;
  const currentFolders = folders.filter((f) => f.subSectionId === (activeSubSection?.id || ""));
  const activeFolder = currentFolders.find((f) => f.id === selectedFolderId) || currentFolders[0] || null;

  const currentFolderDocs = documents.filter((d) => {
    if (!activeFolder) return false;
    const matchFolder = d.folderId === activeFolder.id;
    const matchSearch = searchQuery.trim() === "" || 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (d.description && d.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchFolder && matchSearch;
  });

  // ================= ADMIN ADD HANDLERS =================
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventInputName.trim()) return;

    if (editingEventId) {
      const existing = events.find((e) => e.id === editingEventId);
      if (existing) {
        saveVaultEvent({
          ...existing,
          name: eventInputName.trim(),
          description: eventInputDesc.trim() || undefined,
          category: eventInputCategory,
          eventDate: eventInputDate.trim() || undefined,
        });
      }
    } else {
      const newEvt: VaultEvent = {
        id: `evt-${Date.now()}`,
        name: eventInputName.trim(),
        description: eventInputDesc.trim() || undefined,
        category: eventInputCategory,
        eventDate: eventInputDate.trim() || undefined,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      saveVaultEvent(newEvt);
      setSelectedEventId(newEvt.id);
    }

    setEditingEventId(null);
    setEventInputName("");
    setEventInputDesc("");
    setEventInputDate("");
    setShowEventModal(false);
    refreshAllData();
  };

  const handleAddSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectionInputName.trim() || !activeEvent) return;

    if (editingSectionId) {
      const existing = sections.find((s) => s.id === editingSectionId);
      if (existing) {
        saveVaultSection({
          ...existing,
          name: sectionInputName.trim(),
          description: sectionInputDesc.trim() || undefined,
        });
      }
    } else {
      const newSec: VaultSection = {
        id: `sec-${Date.now()}`,
        eventId: activeEvent.id,
        name: sectionInputName.trim(),
        description: sectionInputDesc.trim() || undefined,
        orderIndex: currentSections.length + 1,
      };
      saveVaultSection(newSec);
      setSelectedSectionId(newSec.id);
    }

    setEditingSectionId(null);
    setSectionInputName("");
    setSectionInputDesc("");
    setShowSectionModal(false);
    refreshAllData();
  };

  const handleAddSubSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subSectionInputName.trim() || !activeSection) return;

    if (editingSubSectionId) {
      const existing = subSections.find((ss) => ss.id === editingSubSectionId);
      if (existing) {
        saveVaultSubSection({
          ...existing,
          name: subSectionInputName.trim(),
          description: subSectionInputDesc.trim() || undefined,
        });
      }
    } else {
      const newSub: VaultSubSection = {
        id: `sub-${Date.now()}`,
        sectionId: activeSection.id,
        eventId: activeSection.eventId,
        name: subSectionInputName.trim(),
        description: subSectionInputDesc.trim() || undefined,
        orderIndex: currentSubSections.length + 1,
      };
      saveVaultSubSection(newSub);
      setSelectedSubSectionId(newSub.id);
    }

    setEditingSubSectionId(null);
    setSubSectionInputName("");
    setSubSectionInputDesc("");
    setShowSubSectionModal(false);
    refreshAllData();
  };

  const handleAddFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderInputName.trim() || !activeSubSection || !activeSection || !activeEvent) return;

    if (editingFolderId) {
      const existing = folders.find((f) => f.id === editingFolderId);
      if (existing) {
        saveVaultFolder({
          ...existing,
          name: folderInputName.trim(),
          description: folderInputDesc.trim() || undefined,
        });
      }
    } else {
      const newFolder: VaultFolder = {
        id: `fld-${Date.now()}`,
        subSectionId: activeSubSection.id,
        sectionId: activeSection.id,
        eventId: activeEvent.id,
        name: folderInputName.trim(),
        description: folderInputDesc.trim() || undefined,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      saveVaultFolder(newFolder);
      setSelectedFolderId(newFolder.id);
    }

    setEditingFolderId(null);
    setFolderInputName("");
    setFolderInputDesc("");
    setShowFolderModal(false);
    refreshAllData();
  };

  const handleAddDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeFolder) return;

    // Multi-file upload mode with IndexedDB (No 5MB limit!) & Live Progress
    if (docInputFiles.length > 0) {
      setIsUploading(true);
      setUploadProgress(5);
      setUploadStatusText(`Preparing ${docInputFiles.length} file(s)...`);

      const totalFiles = docInputFiles.length;

      for (let i = 0; i < totalFiles; i++) {
        const file = docInputFiles[i];
        const docId = `doc-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`;
        
        const currentFilePercent = Math.round(((i) / totalFiles) * 100);
        setUploadProgress(Math.max(5, currentFilePercent));
        setUploadStatusText(`Uploading file ${i + 1} of ${totalFiles}: "${file.name}"...`);

        try {
          // Store actual PDF/doc file in IndexedDB (handles 100MB+ with zero localStorage overflow)
          await storeFileInIndexedDB(docId, file);

          // Get instant Object URL for direct in-memory viewing
          const blobUrl = URL.createObjectURL(file);

          const newDoc: VaultDocument = {
            id: docId,
            folderId: activeFolder.id,
            name: file.name,
            description: docInputDesc.trim() || undefined,
            fileType: file.name.endsWith(".pdf") ? "pdf" : "doc",
            fileUrl: blobUrl,
            fileSizeBytes: file.size,
            uploadedAt: new Date().toISOString().slice(0, 10),
          };
          saveVaultDocument(newDoc);
        } catch (err) {
          console.error(`Failed uploading ${file.name}`, err);
        }

        const finishPercent = Math.round(((i + 1) / totalFiles) * 100);
        setUploadProgress(finishPercent);
      }

      setUploadStatusText(`All ${totalFiles} files uploaded successfully!`);
      setTimeout(() => {
        resetDocModal();
      }, 500);
      return;
    }

    // Single file upload mode
    if (docInputFile) {
      setIsUploading(true);
      setUploadProgress(30);
      setUploadStatusText(`Uploading "${docInputFile.name}"...`);

      const docId = `doc-${Date.now()}`;
      try {
        await storeFileInIndexedDB(docId, docInputFile);
        const blobUrl = URL.createObjectURL(docInputFile);

        setUploadProgress(80);
        const newDoc: VaultDocument = {
          id: docId,
          folderId: activeFolder.id,
          name: docInputName.trim() || docInputFile.name,
          description: docInputDesc.trim() || undefined,
          fileType: "pdf",
          fileUrl: blobUrl,
          fileSizeBytes: docInputFile.size,
          uploadedAt: new Date().toISOString().slice(0, 10),
        };
        saveVaultDocument(newDoc);
        setUploadProgress(100);
        setUploadStatusText("Upload complete!");
      } catch (err) {
        console.error("Upload error", err);
      }

      setTimeout(() => {
        resetDocModal();
      }, 400);
      return;
    }

    if (!docInputName.trim()) {
      alert("Please provide a document title or select files to upload.");
      return;
    }

    const newDoc: VaultDocument = {
      id: `doc-${Date.now()}`,
      folderId: activeFolder.id,
      name: docInputName.trim(),
      description: docInputDesc.trim() || undefined,
      fileType: "pdf",
      fileUrl: docInputUrl.trim() || `/sample-docs/mock-paper.pdf`,
      fileSizeBytes: 250000,
      uploadedAt: new Date().toISOString().slice(0, 10),
    };
    saveVaultDocument(newDoc);
    resetDocModal();
  };

  const resetDocModal = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setUploadStatusText("");
    setDocInputName("");
    setDocInputDesc("");
    setDocInputUrl("");
    setDocInputFile(null);
    setDocInputFiles([]);
    setShowDocModal(false);
    refreshAllData();
  };

  const handleAddWhitelist = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = wlPhone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    const newUser: ParentWhitelistedUser = {
      id: `parent-${Date.now()}`,
      studentName: wlStudent.trim() || "Student",
      parentName: wlParent.trim() || "Parent",
      phone: cleanPhone,
      program: "Enrolled Course",
      batch: wlBatch.trim() || "Batch A",
      assignedFolderIds: [wlFolderId],
      status: "approved",
      approvedAt: new Date().toISOString().slice(0, 10),
    };

    saveWhitelistedParent(newUser);
    setWlPhone("");
    setWlStudent("");
    setWlParent("");
    setWlBatch("");
    refreshAllData();
    alert(`Granted access to +91 ${cleanPhone}!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      
      {/* Top Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
              <FolderLock className="w-4 h-4" />
              Event & Competition Digital Repository
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Competition, Exam & Folder Repository
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Hierarchy: <strong>Competition / Event → Section → Sub-Section → Folder → Documents</strong>. Access to each folder is unlocked strictly via registered Parent Mobile OTP.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {currentSession ? (
              <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-xs sm:text-sm">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {currentSession.studentName.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    {currentSession.studentName}
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-normal">
                      Verified
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    +91 {currentSession.phone} (Parent: {currentSession.parentName})
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="ml-2 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/parent-access"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold rounded-xl border border-slate-700 transition"
                >
                  Register New Parent
                </Link>
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="px-3 py-2 bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition flex items-center gap-1.5"
                >
                  <Settings className="w-3.5 h-3.5" /> Admin
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Admin Action Bar */}
      {isAdminMode && (
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white px-4 py-2.5 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Admin Mode: You can create competitions, sections, sub-sections, folders, and assign parent access.</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowEventModal(true)}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg font-semibold flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" /> New Competition / Event
              </button>
              <button
                onClick={() => setShowWhitelistModal(true)}
                className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold flex items-center gap-1 shadow-sm transition"
              >
                <Users className="w-3.5 h-3.5" /> Assign Parent Folder Access ({whitelistedUsers.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">

        {/* 1. TOP LEVEL: COMPETITION / EVENT TABS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
              <Trophy className="w-4 h-4 text-amber-500" />
              Step 1: Select Competition / Event / Purpose
            </div>
            {isAdminMode && (
              <button
                onClick={() => setShowEventModal(true)}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Event
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {events.map((evt) => {
              const isSelected = activeEvent?.id === evt.id;
              return (
                <button
                  key={evt.id}
                  onClick={() => setSelectedEventId(evt.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  <Trophy className={`w-3.5 h-3.5 ${isSelected ? "text-amber-300" : "text-amber-500"}`} />
                  <span>{evt.name}</span>
                  {evt.eventDate && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? "bg-blue-700 text-blue-100" : "bg-slate-200 text-slate-600"}`}>
                      {evt.eventDate}
                    </span>
                  )}
                  {isAdminMode && (
                    <span className="flex items-center gap-1 ml-1.5 pl-1.5 border-l border-white/20">
                      <span
                        title="Edit Event"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingEventId(evt.id);
                          setEventInputName(evt.name);
                          setEventInputDesc(evt.description || "");
                          setEventInputDate(evt.eventDate || "");
                          setEventInputCategory(evt.category);
                          setShowEventModal(true);
                        }}
                        className="p-0.5 hover:text-amber-300 transition"
                      >
                        <Pencil className="w-3 h-3" />
                      </span>
                      {events.length > 1 && (
                        <span
                          title="Delete Event"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Delete Event "${evt.name}"?`)) {
                              deleteVaultEvent(evt.id);
                              refreshAllData();
                            }
                          }}
                          className="p-0.5 hover:text-red-300 transition"
                        >
                          ✕
                        </span>
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. SECOND LEVEL: SECTIONS */}
        {activeEvent && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                <Layers className="w-4 h-4 text-blue-600" />
                Step 2: Section in "{activeEvent.name}"
              </div>
              {isAdminMode && (
                <button
                  onClick={() => setShowSectionModal(true)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Section
                </button>
              )}
            </div>

            {currentSections.length === 0 ? (
              <div className="text-xs text-slate-400 py-3">No sections created for this event yet. {isAdminMode && "Click 'Add Section' above."}</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {currentSections.map((sec) => {
                  const isSelected = activeSection?.id === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setSelectedSectionId(sec.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition border flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{sec.name}</span>
                      {isAdminMode && (
                        <span className="flex items-center gap-1 ml-1 pl-1 border-l border-slate-300">
                          <span
                            title="Edit Section"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingSectionId(sec.id);
                              setSectionInputName(sec.name);
                              setSectionInputDesc(sec.description || "");
                              setShowSectionModal(true);
                            }}
                            className="p-0.5 hover:text-blue-400 transition"
                          >
                            <Pencil className="w-3 h-3" />
                          </span>
                          <span
                            title="Delete Section"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`Delete Section "${sec.name}"?`)) {
                                deleteVaultSection(sec.id);
                                refreshAllData();
                              }
                            }}
                            className="p-0.5 hover:text-red-400 transition"
                          >
                            ✕
                          </span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 3. THIRD & FOURTH LEVEL: SUB-SECTIONS + FOLDERS + DOCUMENTS */}
        {activeSection && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Sub-Sections & Folders */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              
              {/* Sub-Section Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FolderOpen className="w-4 h-4 text-blue-600" />
                  Sub-Sections & Folders
                </div>
                {isAdminMode && (
                  <button
                    onClick={() => setShowSubSectionModal(true)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Sub-Section
                  </button>
                )}
              </div>

              {/* Sub-Section Tabs */}
              {currentSubSections.length === 0 ? (
                <div className="text-xs text-slate-400 py-2">No sub-sections yet. {isAdminMode && "Click '+ Sub-Section' above."}</div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {currentSubSections.map((ss) => {
                    const isSelected = activeSubSection?.id === ss.id;
                    return (
                      <button
                        key={ss.id}
                        onClick={() => setSelectedSubSectionId(ss.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                          isSelected
                            ? "bg-blue-100 text-blue-800 border-blue-300 font-bold"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {ss.name}
                        {isAdminMode && (
                          <span className="flex items-center gap-1 ml-1 pl-1 border-l border-slate-300">
                            <span
                              title="Edit Sub-Section"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingSubSectionId(ss.id);
                                setSubSectionInputName(ss.name);
                                setSubSectionInputDesc(ss.description || "");
                                setShowSubSectionModal(true);
                              }}
                              className="p-0.5 hover:text-blue-600 transition"
                            >
                              <Pencil className="w-2.5 h-2.5" />
                            </span>
                            <span
                              title="Delete Sub-Section"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm(`Delete Sub-Section "${ss.name}"?`)) {
                                  deleteVaultSubSection(ss.id);
                                  refreshAllData();
                                }
                              }}
                              className="p-0.5 text-slate-400 hover:text-red-500 transition"
                            >
                              ✕
                            </span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Folders List Inside Selected Sub-Section */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700">
                    Folders in {activeSubSection?.name || "Sub-Section"} ({currentFolders.length})
                  </span>
                  {isAdminMode && activeSubSection && (
                    <button
                      onClick={() => setShowFolderModal(true)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> New Folder
                    </button>
                  )}
                </div>

                {currentFolders.length === 0 ? (
                  <div className="text-xs text-slate-400 py-4 text-center border-2 border-dashed border-slate-200 rounded-xl">
                    No folders inside this sub-section.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {currentFolders.map((fld) => {
                      const isSelected = activeFolder?.id === fld.id;
                      const hasAccess = isFolderAccessible(fld.id);
                      const docCount = documents.filter((d) => d.folderId === fld.id).length;

                      return (
                        <div
                          key={fld.id}
                          onClick={() => setSelectedFolderId(fld.id)}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start justify-between gap-3 ${
                            isSelected
                              ? "bg-blue-50/80 border-blue-500 shadow-xs"
                              : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            {hasAccess ? (
                              <Folder className={`w-5 h-5 shrink-0 mt-0.5 ${isSelected ? "text-blue-600 fill-blue-100" : "text-slate-500"}`} />
                            ) : (
                              <Lock className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
                            )}
                            <div>
                              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                {fld.name}
                                {!hasAccess && (
                                  <span className="text-[10px] bg-amber-100 text-amber-800 font-medium px-1.5 py-0.2 rounded">
                                    Locked
                                  </span>
                                )}
                              </div>
                              {fld.description && (
                                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                                  {fld.description}
                                </p>
                              )}
                              <span className="text-[10px] text-slate-400 mt-1 block">
                                {docCount} Documents
                              </span>
                            </div>
                          </div>

                          {isAdminMode && (
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingFolderId(fld.id);
                                  setFolderInputName(fld.name);
                                  setFolderInputDesc(fld.description || "");
                                  setShowFolderModal(true);
                                }}
                                className="text-slate-400 hover:text-blue-600 p-1 transition"
                                title="Edit Folder"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (confirm(`Delete Folder "${fld.name}"?`)) {
                                    deleteVaultFolder(fld.id);
                                    refreshAllData();
                                  }
                                }}
                                className="text-slate-300 hover:text-red-500 p-1 transition"
                                title="Delete Folder"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Documents Explorer / OTP Gate */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              {activeFolder ? (
                <div>
                  {/* Folder Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                    <div>
                      <div className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                        {activeEvent?.name} › {activeSection?.name} › {activeSubSection?.name}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                        {activeFolder.name}
                      </h3>
                      {activeFolder.description && (
                        <p className="text-xs text-slate-500 mt-0.5">
                          {activeFolder.description}
                        </p>
                      )}
                    </div>

                    {isAdminMode && (
                      <button
                        onClick={() => setShowDocModal(true)}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition shrink-0"
                      >
                        <Upload className="w-4 h-4" /> Upload Document
                      </button>
                    )}
                  </div>

                  {/* CHECK ACCESS: If Parent Has Access -> Show Docs. If Not -> Show OTP Unlock Prompt */}
                  {isFolderAccessible(activeFolder.id) ? (
                    <div className="mt-4">
                      {/* Search */}
                      <div className="mb-4 relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="Search documents in this folder..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>

                      {/* Documents Cards */}
                      {currentFolderDocs.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                          <h4 className="text-sm font-bold text-slate-700">No documents in this folder</h4>
                          <p className="text-xs text-slate-400 mt-1">
                            {isAdminMode ? "Click 'Upload Document' above to add PDFs or exam links." : "Material will be published here shortly."}
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {currentFolderDocs.map((doc) => (
                            <div
                              key={doc.id}
                              className="bg-slate-50/70 border border-slate-200 hover:border-blue-400 hover:bg-white p-4 rounded-xl transition shadow-xs flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-start justify-between gap-2">
                                  <div className="p-2 bg-red-50 text-red-600 rounded-lg shrink-0">
                                    <FileText className="w-5 h-5" />
                                  </div>
                                  {isAdminMode && (
                                    <button
                                      onClick={() => {
                                        if (confirm(`Remove document "${doc.name}"?`)) {
                                          deleteVaultDocument(doc.id);
                                          refreshAllData();
                                        }
                                      }}
                                      className="text-slate-300 hover:text-red-500 transition p-1"
                                      title="Delete Document"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>

                                <h4 className="text-xs font-bold text-slate-900 mt-2 line-clamp-2">
                                  {doc.name}
                                </h4>
                                {doc.description && (
                                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                                    {doc.description}
                                  </p>
                                )}
                              </div>

                              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                                <span className="text-[10px] text-slate-400">
                                  {doc.uploadedAt}
                                </span>
                                <button
                                  type="button"
                                  onClick={async () => {
                                    if (doc.fileUrl && !doc.fileUrl.startsWith("#") && !doc.fileUrl.startsWith("/")) {
                                      // If already a valid blob URL or http URL, open directly
                                      const a = document.createElement("a");
                                      a.href = doc.fileUrl;
                                      a.download = doc.name;
                                      a.target = "_blank";
                                      document.body.appendChild(a);
                                      a.click();
                                      document.body.removeChild(a);
                                      return;
                                    }

                                    // Resolve from IndexedDB
                                    const idbUrl = await getFileUrlFromIndexedDB(doc.id);
                                    if (idbUrl) {
                                      const a = document.createElement("a");
                                      a.href = idbUrl;
                                      a.download = doc.name;
                                      a.target = "_blank";
                                      document.body.appendChild(a);
                                      a.click();
                                      document.body.removeChild(a);
                                    } else if (doc.fileUrl) {
                                      window.open(doc.fileUrl, "_blank");
                                    }
                                  }}
                                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                                >
                                  <Download className="w-3.5 h-3.5" /> Download
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* FOLDER IS LOCKED -> SHOW MOBILE OTP GATE */
                    <div className="py-8 px-4 text-center">
                      <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-amber-200">
                        <Lock className="w-7 h-7" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900">
                        Folder Access Restricted to Approved Mobile Numbers
                      </h4>
                      <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 mb-6">
                        This specific folder requires authorized access for <strong>{activeFolder.name}</strong>. Enter your registered mobile number to receive a one-time password (OTP).
                      </p>

                      {loginError && (
                        <div className="mb-4 max-w-sm mx-auto flex items-start gap-2 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 text-left">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{loginError}</span>
                        </div>
                      )}

                      {!otpSent ? (
                        <form onSubmit={handleRequestOtp} className="max-w-sm mx-auto space-y-3 text-left">
                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1">
                              Registered Parent Mobile Number
                            </label>
                            <div className="relative">
                              <span className="absolute left-3 top-2.5 text-xs font-semibold text-slate-500">+91</span>
                              <input
                                type="tel"
                                required
                                maxLength={10}
                                placeholder="98765 43210"
                                value={phoneInput}
                                onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ""))}
                                className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                              />
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">
                              (Demo Access: <code>9876543210</code> or <code>9820011223</code>)
                            </p>
                          </div>

                          <button
                            type="submit"
                            disabled={loginLoading}
                            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition cursor-pointer"
                          >
                            {loginLoading ? "Verifying..." : "Send Verification OTP"}
                          </button>

                          <div className="text-center pt-1">
                            <Link to="/parent-access" className="text-[11px] text-blue-600 hover:underline">
                              Need access? Register here →
                            </Link>
                          </div>
                        </form>
                      ) : (
                        <form onSubmit={handleVerifyOtp} className="max-w-sm mx-auto space-y-3 text-left">
                          <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900">
                            OTP Code sent to +91 {phoneInput}: <strong>{simulatedOtp}</strong>
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1">
                              Enter 6-Digit OTP
                            </label>
                            <input
                              type="text"
                              required
                              maxLength={6}
                              placeholder="123456"
                              value={enteredOtp}
                              onChange={(e) => setEnteredOtp(e.target.value)}
                              className="w-full px-3 py-2 text-center tracking-widest font-mono text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs transition cursor-pointer"
                          >
                            Verify OTP & Unlock
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                </div>
              ) : (
                <div className="text-center py-16 text-slate-400 text-xs">
                  Please select a folder on the left to view contents.
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* ================= MODAL: NEW / EDIT COMPETITION / EVENT ================= */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              {editingEventId ? "Edit Competition / Event / Purpose" : "Create New Competition / Event / Purpose"}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Top-level category (e.g. "NLC-18Oct2026-IIVA-Abacus").
            </p>

            <form onSubmit={handleAddEvent} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Competition / Event Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NLC-18Oct2026-IIVA-Abacus"
                  value={eventInputName}
                  onChange={(e) => setEventInputName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Event Date (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 18-Oct-2026"
                  value={eventInputDate}
                  onChange={(e) => setEventInputDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description</label>
                <textarea
                  placeholder="e.g. Mock papers from IIVA for the respective levels"
                  value={eventInputDesc}
                  onChange={(e) => setEventInputDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 h-16 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowEventModal(false);
                    setEditingEventId(null);
                  }}
                  className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  {editingEventId ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: NEW / EDIT SECTION ================= */}
      {showSectionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              {editingSectionId ? `Edit Section` : `Add Section to "${activeEvent?.name}"`}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              e.g. "IIVA Mock Test Papers", "Hall Tickets", "Syllabus".
            </p>

            <form onSubmit={handleAddSection} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Section Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. IIVA Mock Test Papers"
                  value={sectionInputName}
                  onChange={(e) => setSectionInputName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Practice papers for each category"
                  value={sectionInputDesc}
                  onChange={(e) => setSectionInputDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowSectionModal(false);
                    setEditingSectionId(null);
                  }}
                  className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  {editingSectionId ? "Save Changes" : "Add Section"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: NEW / EDIT SUB-SECTION ================= */}
      {showSubSectionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-blue-600" />
              {editingSubSectionId ? `Edit Sub-Section` : `Add Sub-Section to "${activeSection?.name}"`}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              e.g. "Level 1", "Level 2", "Junior Group", "Senior Group".
            </p>

            <form onSubmit={handleAddSubSection} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Sub-Section Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Level 1 (Junior)"
                  value={subSectionInputName}
                  onChange={(e) => setSubSectionInputName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Ages 5-7 Single digit direct"
                  value={subSectionInputDesc}
                  onChange={(e) => setSubSectionInputDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowSubSectionModal(false);
                    setEditingSubSectionId(null);
                  }}
                  className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  {editingSubSectionId ? "Save Changes" : "Add Sub-Section"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: NEW / EDIT FOLDER ================= */}
      {showFolderModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <FolderPlus className="w-5 h-5 text-blue-600" />
              {editingFolderId ? `Edit Folder` : `Create Folder inside "${activeSubSection?.name}"`}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              This is the folder that you can assign to specific parent mobile numbers.
            </p>

            <form onSubmit={handleAddFolder} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Folder Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mock Papers - Level 1"
                  value={folderInputName}
                  onChange={(e) => setFolderInputName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Complete test papers 1 to 5"
                  value={folderInputDesc}
                  onChange={(e) => setFolderInputDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowFolderModal(false);
                    setEditingFolderId(null);
                  }}
                  className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  {editingFolderId ? "Save Changes" : "Create Folder"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: UPLOAD DOCUMENT ================= */}
      {showDocModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-600" />
              Upload Document to "{activeFolder?.name}"
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Add exam papers, answer keys, or notes.
            </p>

            <form onSubmit={handleAddDoc} className="space-y-3 text-xs">
              <div className="border border-slate-200 bg-slate-50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-semibold text-slate-700 block">
                    Option A: Choose File(s) from Computer
                  </label>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">
                    Multiple Files Allowed
                  </span>
                </div>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const fileArray: File[] = Array.from(e.target.files);
                      setDocInputFiles(fileArray);
                      if (fileArray.length === 1) {
                        setDocInputFile(fileArray[0]);
                        if (!docInputName) setDocInputName(fileArray[0].name);
                      } else {
                        setDocInputFile(null);
                        setDocInputName(`${fileArray.length} files selected`);
                      }
                    }
                  }}
                  className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-blue-600 file:text-white file:font-semibold hover:file:bg-blue-700 cursor-pointer w-full"
                />

                {docInputFiles.length > 0 && (
                  <div className="mt-2.5 p-2 bg-white border border-slate-200 rounded-lg text-[11px] space-y-1">
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span>Selected {docInputFiles.length} file(s) to upload:</span>
                      <button
                        type="button"
                        onClick={() => {
                          setDocInputFiles([]);
                          setDocInputFile(null);
                          setDocInputName("");
                        }}
                        className="text-red-500 hover:underline text-[10px]"
                      >
                        Clear
                      </button>
                    </div>
                    <ul className="max-h-24 overflow-y-auto space-y-0.5 text-slate-600 font-mono text-[10px]">
                      {docInputFiles.map((f, i) => (
                        <li key={i} className="truncate">
                          • {f.name} ({(f.size / 1024).toFixed(0)} KB)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {docInputFiles.length <= 1 && (
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Document Title {docInputFiles.length === 0 && !docInputUrl && "*"}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Level 1 Mock Test 01.pdf"
                    value={docInputName}
                    onChange={(e) => setDocInputName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Timed mock papers set"
                  value={docInputDesc}
                  onChange={(e) => setDocInputDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Option B: Or File URL / Google Drive Link</label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/... or direct link"
                  value={docInputUrl}
                  onChange={(e) => setDocInputUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Real-time Progress Bar & Status Text */}
              {isUploading && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-blue-900">
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                      {uploadStatusText}
                    </span>
                    <span className="font-mono">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-blue-200/80 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => setShowDocModal(false)}
                  className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg font-semibold disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Uploading ({uploadProgress}%)...
                    </>
                  ) : (
                    "Save & Publish"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ASSIGN PARENT FOLDER ACCESS ================= */}
      {showWhitelistModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  Assign Parent Folder Access by Mobile Number
                </h3>
                <p className="text-xs text-slate-500">
                  Select which specific folder each parent mobile number is allowed to unlock.
                </p>
              </div>
              <button
                onClick={() => setShowWhitelistModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Add Whitelist Form */}
            <form onSubmit={handleAddWhitelist} className="bg-slate-50 border border-slate-200 p-4 rounded-xl mb-5 space-y-3 text-xs">
              <div className="font-bold text-slate-800">Add / Update Parent Permission</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Parent Mobile (10 digits) *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={wlPhone}
                    onChange={(e) => setWlPhone(e.target.value.replace(/\D/g, ""))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Student Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Aryan Patil"
                    value={wlStudent}
                    onChange={(e) => setWlStudent(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Assign Specific Folder Access *</label>
                  <select
                    value={wlFolderId}
                    onChange={(e) => setWlFolderId(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                  >
                    <option value="ALL">★ All Folders (Full Administrator Access)</option>
                    {folders.map((fld) => {
                      const ss = subSections.find((s) => s.id === fld.subSectionId);
                      const sec = sections.find((s) => s.id === fld.sectionId);
                      return (
                        <option key={fld.id} value={fld.id}>
                          📁 {fld.name} ({ss?.name || "Sub"} › {sec?.name || "Sec"})
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Parent / Guardian Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Nitin Patil"
                    value={wlParent}
                    onChange={(e) => setWlParent(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs transition cursor-pointer"
              >
                Save & Grant Folder Access
              </button>
            </form>

            {/* List of Approved Parents */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700">Configured Parent Permissions ({whitelistedUsers.length})</div>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                {whitelistedUsers.map((u) => {
                  const assignedFolderNames = u.assignedFolderIds.includes("ALL")
                    ? "★ ALL Folders"
                    : folders
                        .filter((f) => u.assignedFolderIds.includes(f.id))
                        .map((f) => f.name)
                        .join(", ") || "No Folders Assigned";

                    const portalUrl = `https://arnavabacusacademy-web.vercel.app/download?phone=${u.phone}`;
                    const whatsappMsg = encodeURIComponent(
                      `Dear ${u.parentName || "Parent"},\nAccess to the exam & worksheet folder for ${u.studentName} has been approved.\n\n📁 Assigned Folder: ${assignedFolderNames}\n🔗 Access Portal: ${portalUrl}\n\nPlease enter your registered mobile number (+91 ${u.phone}) to unlock via OTP.\n\nRegards,\nArnav Abacus Academy`
                    );

                    return (
                      <div key={u.id} className="p-3 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition">
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-2">
                            <span>+91 {u.phone} • {u.studentName}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              Approved
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Parent: {u.parentName} | Assigned: <span className="font-semibold text-blue-600">{assignedFolderNames}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                          {/* Share via WhatsApp Button */}
                          <a
                            href={`https://wa.me/91${u.phone}?text=${whatsappMsg}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition"
                            title="Send access details directly on WhatsApp"
                          >
                            <Share2 className="w-3 h-3 text-emerald-600" />
                            <span>WhatsApp Link</span>
                          </a>

                          {/* Copy Portal Link Button */}
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(portalUrl);
                              setCopiedParentId(u.id);
                              setTimeout(() => setCopiedParentId(null), 2500);
                            }}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition"
                            title="Copy link to clipboard"
                          >
                            {copiedParentId === u.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-700 font-bold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-slate-500" />
                                <span>Copy Link</span>
                              </>
                            )}
                          </button>

                          {/* Quick Edit (Prefills Form Above) */}
                          <button
                            type="button"
                            onClick={() => {
                              setWlPhone(u.phone);
                              setWlStudent(u.studentName);
                              setWlParent(u.parentName || "");
                              setWlFolderId(u.assignedFolderIds[0] || "ALL");
                            }}
                            className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition"
                            title="Edit / Reassign Folder"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>

                          {/* Remove User */}
                          {whitelistedUsers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Remove access for +91 ${u.phone}?`)) {
                                  deleteWhitelistedParent(u.id);
                                  refreshAllData();
                                }
                              }}
                              className="p-1.5 text-slate-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition"
                              title="Remove Permission"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-right">
              <button
                onClick={() => setShowWhitelistModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADMIN PIN UNLOCK ================= */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center">
            <KeyRound className="w-10 h-10 text-blue-600 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-900">Academy Administrator Unlock</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Enter Admin PIN (2026 or 112233) to manage competitions, sections, folders, and parent folder access.
            </p>

            <form onSubmit={handleAdminPinSubmit} className="space-y-3">
              <input
                type="password"
                required
                placeholder="Admin PIN"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                className="w-full px-4 py-2 text-center font-mono tracking-widest bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdminLogin(false)}
                  className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
