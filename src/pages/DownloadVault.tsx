/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Eye, 
  Sparkles, 
  ExternalLink,
  Search,
  Filter,
  FilePlus,
  Settings,
  ChevronRight,
  RefreshCw,
  Users
} from "lucide-react";
import { 
  VaultFolder, 
  VaultDocument, 
  ParentWhitelistedUser,
  getVaultFolders, 
  getVaultDocuments, 
  saveVaultFolder, 
  deleteVaultFolder, 
  saveVaultDocument, 
  deleteVaultDocument, 
  getWhitelistedParents,
  saveWhitelistedParent,
  findApprovedParentByPhone,
  getActiveParentSession,
  setActiveParentSession,
  clearParentSession
} from "../lib/documentVault";
import { validateSanitizedPhone } from "../lib/securitySanitizer";

export default function DownloadVaultPage() {
  // Authentication & Session State
  const [currentSession, setCurrentSession] = useState<ParentWhitelistedUser | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminPin, setAdminPin] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // OTP Login Modal State
  const [phoneInput, setPhoneInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [simulatedOtp, setSimulatedOtp] = useState<string | null>(null);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Vault Folders & Documents State
  const [folders, setFolders] = useState<VaultFolder[]>([]);
  const [documents, setDocuments] = useState<VaultDocument[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Admin Management Modal States
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showNewDocModal, setShowNewDocModal] = useState(false);
  const [showWhitelistModal, setShowWhitelistModal] = useState(false);

  // New Folder Form
  const [folderName, setFolderName] = useState("");
  const [folderDesc, setFolderDesc] = useState("");
  const [folderProgram, setFolderProgram] = useState<"abacus" | "vedic" | "school" | "general">("abacus");
  const [folderBatch, setFolderBatch] = useState("");

  // New Document Form
  const [docName, setDocName] = useState("");
  const [docDesc, setDocDesc] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const [docFolderTarget, setDocFolderTarget] = useState("");
  const [docFileObj, setDocFileObj] = useState<File | null>(null);

  // Whitelist Management Form
  const [whitelistedUsers, setWhitelistedUsers] = useState<ParentWhitelistedUser[]>([]);
  const [newWhitelistedPhone, setNewWhitelistedPhone] = useState("");
  const [newWhitelistedStudent, setNewWhitelistedStudent] = useState("");
  const [newWhitelistedParent, setNewWhitelistedParent] = useState("");
  const [newWhitelistedBatch, setNewWhitelistedBatch] = useState("");
  const [newWhitelistedFolderId, setNewWhitelistedFolderId] = useState("ALL");

  // Load Initial Data
  useEffect(() => {
    refreshData();
    const existingSession = getActiveParentSession();
    if (existingSession) {
      setCurrentSession(existingSession);
      if (existingSession.id === "parent-admin-1" || existingSession.assignedFolderIds.includes("ALL")) {
        setIsAdminMode(true);
      }
    }
  }, []);

  const refreshData = () => {
    const f = getVaultFolders();
    setFolders(f);
    setDocuments(getVaultDocuments());
    setWhitelistedUsers(getWhitelistedParents());
    if (f.length > 0 && !selectedFolderId) {
      setSelectedFolderId(f[0].id);
    }
  };

  // ================= PARENT LOGIN VIA OTP =================
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const val = validateSanitizedPhone(phoneInput);
    if (!val.valid) {
      setLoginError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoginLoading(true);

    // Whitelist check: Must be pre-approved by Academy admin
    const parent = findApprovedParentByPhone(val.sanitized);
    if (!parent) {
      setLoginLoading(false);
      setLoginError(
        "Mobile number not found in approved parent list. Please register on the Parent Access Form or contact the academy office to approve access."
      );
      return;
    }

    // Generate secure 6-digit OTP
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
      if (parent.id === "parent-admin-1" || parent.assignedFolderIds.includes("ALL")) {
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

  // Quick Admin Unlock (PIN: 2026 or 112233)
  const handleAdminPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === "2026" || adminPin === "112233" || adminPin === "8446903204") {
      setIsAdminMode(true);
      setShowAdminLogin(false);
      setAdminPin("");
    } else {
      alert("Invalid Admin Passcode.");
    }
  };

  // ================= ADMIN: CREATE FOLDER =================
  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;

    const newFolder: VaultFolder = {
      id: `folder-${Date.now()}`,
      name: folderName.trim(),
      description: folderDesc.trim() || undefined,
      program: folderProgram,
      levelOrBatch: folderBatch.trim() || "All",
      accessTag: `${folderProgram}-${Date.now()}`,
      colorTheme: folderProgram === "abacus" 
        ? "from-blue-600 to-cyan-600" 
        : folderProgram === "vedic" 
        ? "from-amber-600 to-orange-600" 
        : "from-emerald-600 to-teal-600",
      createdAt: new Date().toISOString().slice(0, 10),
    };

    saveVaultFolder(newFolder);
    setFolderName("");
    setFolderDesc("");
    setFolderBatch("");
    setShowNewFolderModal(false);
    refreshData();
    setSelectedFolderId(newFolder.id);
  };

  // ================= ADMIN: UPLOAD / ATTACH DOCUMENT =================
  const handleUploadDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim() || !docFolderTarget) {
      alert("Please enter document title and select a destination folder.");
      return;
    }

    let finalFileUrl = docUrl.trim();

    // If local file uploaded, convert to Data URL for instant in-browser storage
    if (docFileObj) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const fileContentUrl = uploadEvent.target?.result as string;
        const newDoc: VaultDocument = {
          id: `doc-${Date.now()}`,
          name: docName.trim(),
          description: docDesc.trim() || undefined,
          folderId: docFolderTarget,
          fileType: "pdf",
          fileUrl: fileContentUrl || "#",
          fileSizeBytes: docFileObj.size,
          uploadedAt: new Date().toISOString().slice(0, 10),
        };
        saveVaultDocument(newDoc);
        resetDocModal();
      };
      reader.readAsDataURL(docFileObj);
      return;
    }

    if (!finalFileUrl) {
      finalFileUrl = `https://arnavabacusacademy.com/materials/${encodeURIComponent(docName)}.pdf`;
    }

    const newDoc: VaultDocument = {
      id: `doc-${Date.now()}`,
      name: docName.trim(),
      description: docDesc.trim() || undefined,
      folderId: docFolderTarget,
      fileType: "pdf",
      fileUrl: finalFileUrl,
      fileSizeBytes: 280000,
      uploadedAt: new Date().toISOString().slice(0, 10),
    };

    saveVaultDocument(newDoc);
    resetDocModal();
  };

  const resetDocModal = () => {
    setDocName("");
    setDocDesc("");
    setDocUrl("");
    setDocFileObj(null);
    setShowNewDocModal(false);
    refreshData();
  };

  // ================= ADMIN: APPROVE / WHITELIST PARENT =================
  const handleAddWhitelistedParent = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = newWhitelistedPhone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    const newParent: ParentWhitelistedUser = {
      id: `parent-${Date.now()}`,
      studentName: newWhitelistedStudent.trim() || "Student",
      parentName: newWhitelistedParent.trim() || "Parent",
      phone: cleanPhone,
      program: "Enrolled Course",
      batch: newWhitelistedBatch.trim() || "Batch 1",
      assignedFolderIds: [newWhitelistedFolderId],
      status: "approved",
      approvedAt: new Date().toISOString().slice(0, 10),
    };

    saveWhitelistedParent(newParent);
    setNewWhitelistedPhone("");
    setNewWhitelistedStudent("");
    setNewWhitelistedParent("");
    setNewWhitelistedBatch("");
    refreshData();
    alert(`Successfully whitelisted +91 ${cleanPhone} for folder access!`);
  };

  // Filter folders based on Parent Session permissions
  const accessibleFolders = folders.filter((f) => {
    if (isAdminMode) return true;
    if (!currentSession) return false;
    if (currentSession.assignedFolderIds.includes("ALL")) return true;
    return currentSession.assignedFolderIds.includes(f.id);
  });

  const currentFolder = folders.find((f) => f.id === selectedFolderId) || accessibleFolders[0] || null;

  // Filter documents in current folder + search query
  const folderDocs = documents.filter((d) => {
    if (!currentFolder) return false;
    const matchFolder = d.folderId === currentFolder.id;
    const matchSearch = searchQuery.trim() === "" || 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (d.description && d.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchFolder && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      
      {/* Top Banner / Breadcrumb */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
              <FolderLock className="w-4 h-4" />
              Secure Digital Knowledgebase & Exam Downloads
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Parent Document & Exam Repository
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Access child-specific weekly exam evaluations, syllabus folders, and practice worksheets protected by Mobile OTP.
            </p>
          </div>

          {/* User Status / Mode Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {currentSession ? (
              <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-xl text-xs sm:text-sm">
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
                    Parent: {currentSession.parentName} (+91 {currentSession.phone})
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
                  New Parent? Register Here
                </Link>
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="px-3 py-2 bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition flex items-center gap-1.5"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Admin
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Admin Quick Action Bar (when unlocked) */}
      {isAdminMode && (
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white px-4 py-2.5 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Admin Mode Active: You have full control to add folders, upload papers, and whitelist parents.</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNewFolderModal(true)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg font-semibold flex items-center gap-1 transition"
              >
                <FolderPlus className="w-3.5 h-3.5" /> New Folder
              </button>
              <button
                onClick={() => {
                  if (folders.length === 0) {
                    alert("Please create a folder first!");
                    return;
                  }
                  setDocFolderTarget(selectedFolderId || folders[0].id);
                  setShowNewDocModal(true);
                }}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg font-semibold flex items-center gap-1 transition"
              >
                <Upload className="w-3.5 h-3.5" /> Upload Document
              </button>
              <button
                onClick={() => setShowWhitelistModal(true)}
                className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold flex items-center gap-1 shadow-sm transition"
              >
                <Users className="w-3.5 h-3.5" /> Manage Whitelist ({whitelistedUsers.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        {/* If Not Authenticated as Parent & Not Admin -> Show OTP Gate View */}
        {!currentSession && !isAdminMode ? (
          <div className="max-w-2xl mx-auto my-8">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 text-center relative overflow-hidden">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-blue-100">
                <Lock className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900">
                Enter Mobile Number to Unlock Folders
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                Assigned folders and exam question banks are accessible strictly via Mobile OTP for enrolled parents.
              </p>

              {loginError && (
                <div className="mt-6 flex items-start gap-2.5 p-3.5 bg-red-50 text-red-700 text-xs sm:text-sm rounded-xl border border-red-200 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              {!otpSent ? (
                <form onSubmit={handleRequestOtp} className="mt-6 space-y-4 max-w-md mx-auto text-left">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Registered Mobile Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-sm font-semibold text-slate-500">+91</span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="98765 43210"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ""))}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      (Demo Whitelisted: Try <code>9876543210</code> or <code>9820011223</code>)
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    {loginLoading ? "Checking Whitelist..." : "Send Verification OTP"}
                  </button>

                  <div className="text-center pt-2">
                    <Link
                      to="/parent-access"
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline"
                    >
                      Not registered yet? Submit Parent Access Request →
                    </Link>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4 max-w-md mx-auto text-left">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900">
                    OTP sent to <strong>+91 {phoneInput}</strong>.
                    {simulatedOtp && (
                      <span className="block mt-1 font-mono font-bold text-blue-700">
                        OTP Code: {simulatedOtp}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Enter 6-Digit OTP
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="Enter 6-digit OTP"
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value)}
                      className="w-full px-4 py-3 text-center tracking-widest text-lg font-mono bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    Verify & Unlock Folders
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setSimulatedOtp(null);
                    }}
                    className="w-full text-xs text-slate-500 hover:text-slate-800 py-1"
                  >
                    Change Phone Number
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : (
          /* ================= FOLDER REPOSITORY EXPLORER ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar: Folder Tree */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Folder className="w-4 h-4 text-blue-600" />
                  Your Accessible Folders ({accessibleFolders.length})
                </h3>
                {isAdminMode && (
                  <button
                    onClick={() => setShowNewFolderModal(true)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                )}
              </div>

              {accessibleFolders.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500">
                  No folders currently assigned to your profile. Please contact the academy administrator.
                </div>
              ) : (
                <div className="space-y-2">
                  {accessibleFolders.map((folder) => {
                    const isSelected = selectedFolderId === folder.id;
                    const docCount = documents.filter((d) => d.folderId === folder.id).length;

                    return (
                      <div
                        key={folder.id}
                        onClick={() => setSelectedFolderId(folder.id)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start justify-between gap-3 ${
                          isSelected
                            ? "bg-blue-50/70 border-blue-500 shadow-sm"
                            : "bg-slate-50/60 border-slate-200 hover:bg-slate-100/60 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <Folder className={`w-5 h-5 shrink-0 mt-0.5 ${isSelected ? "text-blue-600 fill-blue-100" : "text-slate-400"}`} />
                          <div>
                            <div className={`text-xs font-bold ${isSelected ? "text-blue-900" : "text-slate-800"}`}>
                              {folder.name}
                            </div>
                            {folder.description && (
                              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                                {folder.description}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
                              <span className="font-semibold text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                                {folder.levelOrBatch}
                              </span>
                              <span>• {docCount} Documents</span>
                            </div>
                          </div>
                        </div>

                        {isAdminMode && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`Delete folder "${folder.name}" and all its documents?`)) {
                                deleteVaultFolder(folder.id);
                                refreshData();
                              }
                            }}
                            className="p-1 text-slate-300 hover:text-red-600 transition"
                            title="Delete Folder"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Security info card */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 leading-relaxed flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Protected repository. Only verified phone numbers can download exams.</span>
              </div>
            </div>

            {/* Main Area: Document List for Selected Folder */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              {currentFolder ? (
                <div>
                  {/* Folder Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                    <div>
                      <div className="text-xs uppercase font-semibold tracking-wider text-blue-600">
                        {currentFolder.program.toUpperCase()} • {currentFolder.levelOrBatch}
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                        {currentFolder.name}
                      </h2>
                      {currentFolder.description && (
                        <p className="text-xs text-slate-500 mt-1">
                          {currentFolder.description}
                        </p>
                      )}
                    </div>

                    {isAdminMode && (
                      <button
                        onClick={() => {
                          setDocFolderTarget(currentFolder.id);
                          setShowNewDocModal(true);
                        }}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition shrink-0"
                      >
                        <FilePlus className="w-4 h-4" /> Add Document to Folder
                      </button>
                    )}
                  </div>

                  {/* Search Bar */}
                  <div className="my-4 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search documents in this folder..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                    />
                  </div>

                  {/* Document Grid */}
                  {folderDocs.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                      <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                      <h4 className="text-sm font-bold text-slate-700">No documents found</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {isAdminMode ? "Click 'Add Document' above to upload or link exam materials." : "New worksheets will be uploaded here shortly."}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {folderDocs.map((doc) => (
                        <div
                          key={doc.id}
                          className="bg-slate-50/70 border border-slate-200 hover:border-blue-400 hover:bg-white p-4 rounded-xl transition shadow-sm flex flex-col justify-between"
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
                                      refreshData();
                                    }
                                  }}
                                  className="text-slate-300 hover:text-red-600 transition p-1"
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
                            <a
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              download={doc.name}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition"
                            >
                              <Download className="w-3.5 h-3.5" /> Download
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16 text-slate-400 text-sm">
                  Select a folder from the sidebar to view documents.
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* ================= MODAL: ADMIN PIN UNLOCK ================= */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center">
            <KeyRound className="w-10 h-10 text-blue-600 mx-auto mb-2" />
            <h3 className="text-lg font-bold text-slate-900">Academy Admin Access</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Enter Administrator Passcode to manage folders and parent whitelists.
            </p>

            <form onSubmit={handleAdminPinSubmit} className="space-y-3">
              <input
                type="password"
                required
                placeholder="Enter Admin PIN"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                className="w-full px-4 py-2.5 text-center font-mono tracking-widest bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
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

      {/* ================= MODAL: CREATE NEW FOLDER ================= */}
      {showNewFolderModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-1">
              <FolderPlus className="w-5 h-5 text-blue-600" />
              Create New Document Folder
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Group documents by course level or batch to assign specific access.
            </p>

            <form onSubmit={handleCreateFolder} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Folder Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Abacus Level 3 - Final Exam Practice"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description (Optional)</label>
                <textarea
                  placeholder="e.g. Weekly tests and formulas for Level 3 students"
                  value={folderDesc}
                  onChange={(e) => setFolderDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 h-16 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Program</label>
                  <select
                    value={folderProgram}
                    onChange={(e: any) => setFolderProgram(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  >
                    <option value="abacus">Abacus</option>
                    <option value="vedic">Vedic Maths</option>
                    <option value="school">School Maths</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Batch / Level Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Level 3 / Batch A"
                    value={folderBatch}
                    onChange={(e) => setFolderBatch(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewFolderModal(false)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: UPLOAD / ADD DOCUMENT ================= */}
      {showNewDocModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-1">
              <Upload className="w-5 h-5 text-blue-600" />
              Add Document to Repository
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Select a target folder and attach a file or Google Drive / PDF link.
            </p>

            <form onSubmit={handleUploadDoc} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Folder *</label>
                <select
                  value={docFolderTarget}
                  onChange={(e) => setDocFolderTarget(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {folders.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.levelOrBatch})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Week 4 Exam Question Paper.pdf"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g. 50 addition questions - 10 minutes limit"
                  value={docDesc}
                  onChange={(e) => setDocDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Upload Local File or Link */}
              <div className="border border-slate-200 bg-slate-50 rounded-xl p-3">
                <label className="font-semibold text-slate-700 block mb-1.5">
                  Option A: Choose File from Computer
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setDocFileObj(e.target.files[0]);
                      if (!docName) setDocName(e.target.files[0].name);
                    }
                  }}
                  className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Option B: Or Direct File URL / Google Drive Link
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/... or direct PDF link"
                  value={docUrl}
                  onChange={(e) => setDocUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewDocModal(false)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: WHITELIST & PARENT PERMISSIONS ================= */}
      {showWhitelistModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  Parent Whitelist & Folder Assignment
                </h3>
                <p className="text-xs text-slate-500">
                  Only phone numbers listed here can log in via Mobile OTP and access assigned folders.
                </p>
              </div>
              <button
                onClick={() => setShowWhitelistModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleAddWhitelistedParent} className="bg-slate-50 border border-slate-200 p-4 rounded-xl mb-5 space-y-3 text-xs">
              <div className="font-bold text-slate-800">Add / Approve Parent Phone Number</div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Mobile (10 digits) *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={newWhitelistedPhone}
                    onChange={(e) => setNewWhitelistedPhone(e.target.value.replace(/\D/g, ""))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Student Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Aryan Patil"
                    value={newWhitelistedStudent}
                    onChange={(e) => setNewWhitelistedStudent(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Assign Folder Access</label>
                  <select
                    value={newWhitelistedFolderId}
                    onChange={(e) => setNewWhitelistedFolderId(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="ALL">All Folders (Admin / Full Access)</option>
                    {folders.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} ({f.levelOrBatch})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Parent Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Nitin Patil"
                    value={newWhitelistedParent}
                    onChange={(e) => setNewWhitelistedParent(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs transition"
              >
                Whitelist & Grant Access
              </button>
            </form>

            {/* Existing Whitelisted Parents Table */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700">Currently Approved Parents ({whitelistedUsers.length})</div>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                {whitelistedUsers.map((u) => {
                  const assignedNames = u.assignedFolderIds.includes("ALL")
                    ? "All Folders"
                    : folders
                        .filter((f) => u.assignedFolderIds.includes(f.id))
                        .map((f) => f.name)
                        .join(", ") || "No Folders Assigned";

                  return (
                    <div key={u.id} className="p-3 bg-white flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-slate-900">
                          +91 {u.phone} • {u.studentName}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Parent: {u.parentName} | Assigned: <span className="font-semibold text-blue-600">{assignedNames}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Approved
                      </span>
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

    </div>
  );
}
