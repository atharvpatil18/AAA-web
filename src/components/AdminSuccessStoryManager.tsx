/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Sparkles, Upload, Trash2, Heart, Trophy, CheckCircle2, RefreshCw, Wand2, Image as ImageIcon, Plus } from "lucide-react";
import { SuccessStory, getSuccessStories, saveSuccessStory, deleteSuccessStory } from "../lib/successStories";
import { generateAISuccessStory } from "../lib/aiStoryGenerator";

export default function AdminSuccessStoryManager() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [studentName, setStudentName] = useState("");
  const [achievementTitle, setAchievementTitle] = useState("");
  const [ageOrGrade, setAgeOrGrade] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [promptText, setPromptText] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setStories(getSuccessStories());
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("Image size exceeds 3MB. Please select a smaller photo.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateAI = () => {
    if (!studentName.trim()) {
      alert("Please enter the student's name first.");
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const story = generateAISuccessStory({
        studentName,
        achievementTitle,
        ageOrGrade,
        customPrompt: promptText,
      });
      setGeneratedStory(story);
      setIsGenerating(false);
    }, 600);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !achievementTitle.trim() || !generatedStory.trim()) {
      alert("Please complete Student Name, Achievement Title, and AI Generated Story.");
      return;
    }

    saveSuccessStory({
      id: editingId || undefined,
      studentName,
      studentPhotoUrl: photoUrl || "/logo.png",
      achievementTitle,
      ageOrGrade,
      promptUsed: promptText,
      aiGeneratedStory: generatedStory,
    });

    setStories(getSuccessStories());
    setSuccessMsg(editingId ? "✨ Success story updated!" : "🚀 Success story published to Our Success Wall!");
    setTimeout(() => setSuccessMsg(""), 4000);

    // Reset Form
    setEditingId(null);
    setStudentName("");
    setAchievementTitle("");
    setAgeOrGrade("");
    setPhotoUrl("");
    setPromptText("");
    setGeneratedStory("");
  };

  const handleEdit = (s: SuccessStory) => {
    setEditingId(s.id);
    setStudentName(s.studentName);
    setAchievementTitle(s.achievementTitle);
    setAgeOrGrade(s.ageOrGrade || "");
    setPhotoUrl(s.studentPhotoUrl);
    setPromptText(s.promptUsed || "");
    setGeneratedStory(s.aiGeneratedStory);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this success story from the public showcase?")) {
      deleteSuccessStory(id);
      setStories(getSuccessStories());
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="p-5 bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 text-white rounded-3xl border border-purple-800/40 shadow-xl flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Admin Feature • Nitin Patil Access
          </div>
          <h3 className="text-xl font-black font-display text-white">
            Our Success Stories & AI Publishing Manager
          </h3>
          <p className="text-xs text-purple-200 mt-0.5">
            Upload student photos, enter AI prompts to generate inspiring stories, and publish directly to Our Success Wall.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-900 rounded-2xl flex items-center gap-2 font-bold text-xs shadow-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Editor Form Card */}
      <form onSubmit={handlePublish} className="bg-white rounded-3xl border-2 border-purple-100 p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-purple-600" />
            {editingId ? "Edit Student Success Story" : "Publish New Student Success Story"}
          </h4>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setStudentName("");
                setAchievementTitle("");
                setAgeOrGrade("");
                setPhotoUrl("");
                setPromptText("");
                setGeneratedStory("");
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Photo Uploader Box */}
          <div className="space-y-2 md:col-span-1">
            <label className="text-xs font-black text-slate-800 uppercase tracking-wider block">
              Student Photo
            </label>
            <div className="border-2 border-dashed border-purple-200 hover:border-purple-400 rounded-2xl p-4 text-center bg-purple-50/30 transition flex flex-col items-center justify-center min-h-[160px] relative">
              {photoUrl ? (
                <div className="relative group w-28 h-28 rounded-2xl overflow-hidden shadow-md border-2 border-purple-300">
                  <img src={photoUrl} alt="Student Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setPhotoUrl("")}
                    className="absolute inset-0 bg-slate-950/60 text-white font-bold text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer"
                  >
                    Change Photo
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center space-y-2 w-full h-full">
                  <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shadow-xs">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-purple-900">Click to Upload Student Photo</span>
                  <span className="text-[10px] text-slate-500">PNG, JPG up to 3MB</span>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-black text-slate-800 uppercase tracking-wider block mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arnav Patil"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-800 uppercase tracking-wider block mb-1">
                  Branch / Age / Level
                </label>
                <input
                  type="text"
                  placeholder="e.g. Age 8 • Level 3 Abacus • Wakad"
                  value={ageOrGrade}
                  onChange={(e) => setAgeOrGrade(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-slate-800 uppercase tracking-wider block mb-1">
                Achievement Title / Honor Badge *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Grand Master Abacus Speed Champion • 100 Qs in 120s"
                value={achievementTitle}
                onChange={(e) => setAchievementTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* AI Prompt Input & Generator */}
        <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label className="text-xs font-black text-purple-950 uppercase tracking-wider flex items-center gap-1.5">
              <Wand2 className="w-4 h-4 text-purple-600" />
              AI Story Generator Prompt
            </label>
            <button
              type="button"
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-800 text-white font-black text-xs px-4 py-2 rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
              {isGenerating ? "Synthesizing AI Story..." : "✨ Generate AI Success Story"}
            </button>
          </div>

          <textarea
            rows={2}
            placeholder="Enter custom prompt details or milestones (e.g. 'Solved 100 questions in 2 minutes with 100% accuracy after 3 months of practice at Wakad branch')"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            className="w-full p-3 bg-white border border-purple-200 rounded-xl text-xs font-medium text-slate-800 focus:border-purple-500 focus:outline-none"
          />

          <div>
            <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">
              AI Generated Story Preview (Editable) *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Click 'Generate AI Success Story' or write story narrative directly..."
              value={generatedStory}
              onChange={(e) => setGeneratedStory(e.target.value)}
              className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black text-sm rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
        >
          <Trophy className="w-5 h-5 fill-slate-950" />
          <span>{editingId ? "Update Published Story" : "🚀 Publish to Our Success Wall"}</span>
        </button>
      </form>

      {/* Published Stories Showcase Manager */}
      <div className="space-y-4">
        <h4 className="font-black text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          Published Success Stories ({stories.length})
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-md flex items-start gap-3 relative group">
              <img
                src={story.studentPhotoUrl || "/logo.png"}
                alt={story.studentName}
                className="w-16 h-16 rounded-xl object-cover border-2 border-amber-400 shrink-0"
              />
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <h5 className="font-black text-sm text-slate-900 truncate">{story.studentName}</h5>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {story.ageOrGrade}
                  </span>
                </div>
                <p className="text-xs font-bold text-amber-600 line-clamp-1">{story.achievementTitle}</p>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{story.aiGeneratedStory}</p>
                
                <div className="flex items-center justify-between pt-2 text-[10px] text-slate-500 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-rose-600 font-bold">
                    <Heart className="w-3 h-3 fill-rose-500" /> {story.likesCount || 0} Applauds
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(story)}
                      className="font-bold text-purple-600 hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(story.id)}
                      className="font-bold text-rose-600 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
