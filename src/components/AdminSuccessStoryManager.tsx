import React, { useState, useEffect, useRef } from "react";
import { SuccessStory, getSuccessStories, saveSuccessStory, deleteSuccessStory, formatDateToDdMmmYy, syncSuccessStoriesToCloud, getCloudUrl } from "../lib/successStories";
import { generateAISuccessStory } from "../lib/aiStoryGenerator";
import { Sparkles, Plus, Trash2, Edit3, Trophy, Calendar, MapPin, School, X, RefreshCw } from "lucide-react";

export default function AdminSuccessStoryManager() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form Field States
  const [studentName, setStudentName] = useState("");
  const [ageYears, setAgeYears] = useState<number>(9);
  const [schoolName, setSchoolName] = useState("");
  const [location, setLocation] = useState("Wakad, Pune");
  const [studentPhotoUrl, setStudentPhotoUrl] = useState("");
  
  const [eventLevel, setEventLevel] = useState<"international" | "national_state" | "academy_level">("academy_level");
  const [course, setCourse] = useState<"abacus" | "vedic_math" | "mental_math" | "school_math" | "competitive_math">("abacus");
  const [courseLevel, setCourseLevel] = useState("Level 1");
  
  const [highlight, setHighlight] = useState("");
  const [rawDate, setRawDate] = useState(new Date().toISOString().split("T")[0]);
  const [storyType, setStoryType] = useState<"competition" | "transformation" | "gallery">("competition");
  
  const [aiStory, setAiStory] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [beforeText, setBeforeText] = useState("");
  const [afterText, setAfterText] = useState("");
  
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadStories();
    // Push any locally-stored stories to cloud on admin panel open.
    // This ensures stories created before cloud sync was added are visible to parents.
    syncSuccessStoriesToCloud().catch(() => {});
  }, []);

  const loadStories = () => {
    setStories(getSuccessStories());
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      const before = getSuccessStories();
      if (before.length === 0) {
        alert("⚠️ No stories found locally. Please publish a story first from this device.");
        return;
      }
      await syncSuccessStoriesToCloud();
      const count = before.filter((s) => s.id && !s.id.startsWith("test_") && s.studentName).length;
      alert(`✅ Cloud sync successful! ${count} story/stories are now live on all devices.`);
    } catch (e: any) {
      const is429 = e?.message?.includes("429");
      if (is429) {
        alert("⚡ Cloud Sync Queued!\n\nThe cloud provider temporarily rate-limited rapid sync requests. Your stories are safe and saved locally on this device.");
      } else {
        const errDetail = e?.message ? ` (${e.message})` : "";
        alert(`⚠️ Cloud sync temporary connection error${errDetail}.\n\nYour stories are safe and saved locally on this device. Please check internet connection or retry in a few moments.`);
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setStudentName("");
    setAgeYears(9);
    setSchoolName("");
    setLocation("Wakad, Pune");
    setStudentPhotoUrl("");
    setEventLevel("academy_level");
    setCourse("abacus");
    setCourseLevel("Level 1");
    setHighlight("");
    setRawDate(new Date().toISOString().split("T")[0]);
    setStoryType("competition");
    setAiStory("");
    setCustomPrompt("");
    setBeforeText("");
    setAfterText("");
    setNotice(null);
    setFormError(null);
  };

  const handleEditClick = (story: SuccessStory) => {
    setEditingId(story.id);
    setStudentName(story.studentName);
    setAgeYears(story.ageYears || 9);
    setSchoolName(story.schoolName || "");
    setLocation(story.location || "Wakad, Pune");
    setStudentPhotoUrl(story.studentPhotoUrl || "");
    setEventLevel(story.eventLevel || "academy_level");
    setCourse(story.course || "abacus");
    setCourseLevel(story.courseLevel || "Level 1");
    setHighlight(story.highlight);
    setStoryType(story.storyType || "competition");
    setAiStory(story.aiGeneratedStory);
    setCustomPrompt(story.promptUsed || "");
    setBeforeText(story.beforeText || "");
    setAfterText(story.afterText || "");
    setIsFormOpen(true);
    // Scroll form into view after a tick
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  // Helper to downscale base64 images so payload easily fits in JsonBlob cloud store (< 100KB)
  const compressImageBase64 = (dataUrl: string, maxDim = 500, quality = 0.75): Promise<string> => {
    return new Promise((resolve) => {
      if (!dataUrl || !dataUrl.startsWith("data:image")) {
        resolve(dataUrl);
        return;
      }
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", quality));
        } else {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const raw = reader.result as string;
        compressImageBase64(raw).then((compressed) => {
          setStudentPhotoUrl(compressed);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateAI = async () => {
    if (!studentName || !highlight) {
      alert("Please enter Student Name and Highlight Title first!");
      return;
    }
    setIsAiLoading(true);
    try {
      const generated = generateAISuccessStory({
        studentName,
        achievementTitle: highlight,
        ageOrGrade: `${ageYears} Years • ${schoolName || "Wakad Pune"}`,
        customPrompt: customPrompt.trim() ||
          `Achieved ${highlight} in ${courseLevel} (${course.toUpperCase()}) on ${formatDateToDdMmmYy(rawDate)}.`,
      });
      setAiStory(generated);
      setNotice("✨ AI Draft story generated successfully!");
    } catch (err) {
      setNotice("Failed to auto-generate draft. You can type the narrative directly.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSave = async (e?: React.MouseEvent | React.FormEvent) => {
    if (e) e.preventDefault();
    setFormError(null);

    if (!studentName.trim()) {
      setFormError("⚠️ Student Name is required.");
      return;
    }
    if (!highlight.trim()) {
      setFormError("⚠️ Highlight Title is required.");
      return;
    }

    // Auto-fill narrative if admin left it blank
    const finalStory = aiStory.trim() ||
      `${studentName.trim()} achieved "${highlight.trim()}" — a remarkable milestone at Arnav Abacus Academy, ${location || "Wakad, Pune"}. This achievement reflects consistent dedication and focused practice in ${courseLevel || course}.`;

    const formattedDate = formatDateToDdMmmYy(rawDate);

    // Ensure photo URL is downscaled/compressed so cloud upload never exceeds size limits
    const photoUrlToSave = await compressImageBase64(studentPhotoUrl || "/logo.png");

    saveSuccessStory({
      id: editingId || undefined,
      studentName,
      studentPhotoUrl: photoUrlToSave,
      ageYears: Number(ageYears) || 9,
      schoolName,
      location,
      course,
      courseLevel,
      eventLevel,
      highlight,
      eventDateFormatted: formattedDate,
      storyType,
      aiGeneratedStory: finalStory,
      promptUsed: customPrompt.trim() || undefined,
      beforeText,
      afterText,
    });

    // Push to cloud so parents can access via shared links on any device
    await syncSuccessStoriesToCloud().catch(() => {});

    loadStories();
    setIsFormOpen(false);
    resetForm();
    alert(`Success story published successfully under ${eventLevel.toUpperCase()} category!`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this published success story?")) {
      deleteSuccessStory(id);
      // Sync deletion to cloud
      syncSuccessStoriesToCloud().catch(() => {});
      loadStories();
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            <Trophy className="w-3.5 h-3.5" /> Root Admin Portal
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Manage Published Success Stories</h2>
          <p className="text-xs text-slate-400">
            Publish student achievements to specific categories (International, National/State, School & Academy).
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleManualSync}
            disabled={isSyncing}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-xl text-xs transition border border-amber-500/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            title="Force push published stories to cloud"
          >
            <RefreshCw className={`w-4 h-4 text-amber-400 ${isSyncing ? "animate-spin" : ""}`} />
            <span>{isSyncing ? "Syncing..." : "Sync Stories to Cloud"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              resetForm();
              setIsFormOpen(!isFormOpen);
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black rounded-xl text-xs transition shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
          >
            {isFormOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{isFormOpen ? "Close Editor" : "Create New Story"}</span>
          </button>
        </div>
      </div>

      {/* Editor Modal / Form Container */}
      {isFormOpen && (
        <div ref={formRef} className="bg-slate-950/80 border border-slate-800 p-6 md:p-8 rounded-2xl space-y-6 animate-in fade-in duration-200">
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <h3 className="text-lg font-bold text-amber-400">
              {editingId ? "✏️ Edit Student Achievement Story" : "➕ Create New Student Achievement Story"}
            </h3>
            <button type="button" onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section 1: Student Identity */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1">
              1. Student Identity & Location
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Student Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arnav Patil"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Age in Years *</label>
                <input
                  type="number"
                  required
                  min="4"
                  max="18"
                  value={ageYears}
                  onChange={(e) => setAgeYears(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">School Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vibgyor High School"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wakad, Pune"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-1">Student Photo (Upload or URL)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Paste Google Drive link or any image URL..."
                    value={studentPhotoUrl}
                    onChange={(e) => {
                      let url = e.target.value.trim();
                      // Auto-convert Google Drive sharing links to direct image URLs
                      const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
                      if (driveMatch) {
                        url = `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
                      }
                      // Also handle drive.google.com/open?id=FILE_ID
                      const driveOpenMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
                      if (driveOpenMatch) {
                        url = `https://lh3.googleusercontent.com/d/${driveOpenMatch[1]}`;
                      }
                      setStudentPhotoUrl(url);
                    }}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 outline-none"
                  />
                  <label className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold cursor-pointer transition border border-slate-700 shrink-0">
                    <span>Upload Photo</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  💡 <strong>Tip:</strong> For cross-device visibility, paste a Google Drive link (make sure sharing is set to "Anyone with the link"). Uploaded photos only show on this device.
                </p>
                {studentPhotoUrl && !studentPhotoUrl.startsWith("data:") && studentPhotoUrl !== "/logo.png" && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={studentPhotoUrl} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-slate-700" onError={(e) => { (e.target as HTMLImageElement).src = "/logo.png"; }} />
                    <span className="text-[10px] text-green-400 font-bold">✅ URL photo will sync to all devices</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Course & Competition Categorization */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1">
              2. Competition Tier & Course Program Categorization
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-amber-400 mb-1">Level of Event / Competition *</label>
                <select
                  value={eventLevel}
                  onChange={(e) => setEventLevel(e.target.value as any)}
                  className="w-full bg-slate-900 border border-amber-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 outline-none font-bold"
                >
                  <option value="international">🌐 International Level</option>
                  <option value="national_state">🇮🇳 National & State Level</option>
                  <option value="academy_level">🏫 School & Academy Level</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-400 mb-1">Course Program *</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value as any)}
                  className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-400 outline-none font-bold"
                >
                  <option value="abacus">🧮 Abacus Math</option>
                  <option value="vedic_math">⚡ Vedic Math</option>
                  <option value="mental_math">🧠 Mental Math</option>
                  <option value="school_math">📐 School Math</option>
                  <option value="competitive_math">🏆 Olympiad & Competitive Prep</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Level of Course *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Level 4 Abacus, SVM-1"
                  value={courseLevel}
                  onChange={(e) => setCourseLevel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Highlight & Date */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1">
              3. Achievement Highlight & Date (dd-mmm-yy)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-1">Highlight Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grand Master Abacus Speed Champion • 100 Qs in 120s"
                  value={highlight}
                  onChange={(e) => setHighlight(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Date of Achievement *</label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    required
                    value={rawDate}
                    onChange={(e) => setRawDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 outline-none"
                  />
                  <span className="text-xs font-mono font-bold text-amber-300 shrink-0 bg-slate-900 px-2 py-2 rounded-lg border border-slate-800">
                    {formatDateToDdMmmYy(rawDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Narrative & Layout */}
          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                4. Story Type & Detailed Narrative
              </h4>
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={isAiLoading}
                className="px-3 py-1 bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-500/40 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>{isAiLoading ? "Generating..." : "Auto-Draft Narrative with AI"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Story Layout Type</label>
                <select
                  value={storyType}
                  onChange={(e) => setStoryType(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 outline-none"
                >
                  <option value="competition">🥇 Competition Medal / Trophy Win</option>
                  <option value="transformation">📈 Before & After Transformation</option>
                  <option value="gallery">📸 Academy Event & Workshop Gallery</option>
                </select>
              </div>

              {storyType === "transformation" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-rose-400 mb-1">Before Practice (Challenges)</label>
                    <input
                      type="text"
                      placeholder="e.g. Struggled with silly addition mistakes & exam anxiety"
                      value={beforeText}
                      onChange={(e) => setBeforeText(e.target.value)}
                      className="w-full bg-slate-900 border border-rose-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-rose-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-400 mb-1">After Practice (Results)</label>
                    <input
                      type="text"
                      placeholder="e.g. Computes 100 sums in 2 mins with 100% accuracy!"
                      value={afterText}
                      onChange={(e) => setAfterText(e.target.value)}
                      className="w-full bg-slate-900 border border-emerald-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-400 outline-none"
                    />
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-300 mb-1">
                Custom AI Command / Prompt <span className="text-slate-500 font-normal">(Optional — guides the AI draft)</span>
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Achieved 100 Qs in 2 minutes with 100% accuracy. First place at state competition. Very disciplined student."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="w-full bg-slate-900 border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-purple-400 outline-none placeholder:text-slate-600"
              />
              <p className="text-[10px] text-slate-500 mt-1">Type key highlights here, then click <span className="text-purple-400 font-bold">Auto-Draft Narrative with AI ↑</span> to generate a story from your notes.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Detailed Story Narrative <span className="text-slate-500 font-normal">(Auto-filled if left blank)</span></label>
              <textarea
                rows={3}
                placeholder="Story auto-generates from your AI command above, or type it manually here..."
                value={aiStory}
                onChange={(e) => setAiStory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          {notice && <p className="text-xs font-semibold text-emerald-400">{notice}</p>}
          {formError && <p className="text-xs font-black text-rose-400 bg-rose-950/40 border border-rose-500/30 px-3 py-2 rounded-lg">{formError}</p>}

          {/* Form Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black rounded-xl text-xs shadow-lg transition cursor-pointer"
            >
              {editingId ? "Save Changes" : "Publish Achievement Story"}
            </button>
          </div>
        </div>
      )}

      {/* Published Stories List */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">
          Currently Published Stories ({stories.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stories.map((story) => (
            <div key={story.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-start gap-4 justify-between">
              <div className="flex items-start gap-3 overflow-hidden">
                <img
                  src={story.studentPhotoUrl || "/logo.png"}
                  alt={story.studentName}
                  className="w-14 h-14 rounded-xl object-cover border-2 border-amber-400 shrink-0"
                />
                <div className="space-y-1 truncate">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-white truncate">{story.studentName}</h4>
                    <span className="text-[10px] bg-slate-800 text-amber-400 px-2 py-0.5 rounded font-mono font-bold uppercase">
                      {story.eventLevel}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-amber-500 truncate">{story.highlight}</p>
                  <div className="text-[11px] text-slate-400 truncate flex items-center gap-2">
                    <span>{story.schoolName || "Wakad Pune"}</span> • <span>{story.eventDateFormatted}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleEditClick(story)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl transition"
                  title="Edit Story"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(story.id)}
                  className="p-2 bg-slate-800 hover:bg-rose-900/60 text-rose-400 rounded-xl transition"
                  title="Delete Story"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
