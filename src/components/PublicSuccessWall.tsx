/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Trophy, Heart, Sparkles, Star, Award, CheckCircle2 } from "lucide-react";
import { SuccessStory, getSuccessStories, incrementStoryLikes } from "../lib/successStories";

export default function PublicSuccessWall() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [likedStories, setLikedStories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setStories(getSuccessStories());
  }, []);

  const handleLike = (id: string) => {
    if (likedStories[id]) return;
    const newLikes = incrementStoryLikes(id);
    setLikedStories((prev) => ({ ...prev, [id]: true }));
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, likesCount: newLikes } : s))
    );
  };

  if (stories.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-amber-500" /> Our Success Hall of Fame
        </div>
        <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 tracking-tight">
          Celebrating Our Young Speed Math Champions 🏆
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Real achievements powered by whole-brain Soroban visualization, NEP 2020 speed math drills, and dedicated master guidance at Wakad, Pune.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-3xl border-2 border-amber-100 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between space-y-4 group"
          >
            {/* Top Accent Gold Ribbon */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] uppercase px-4 py-1 rounded-bl-2xl shadow-sm tracking-wider flex items-center gap-1">
              <Star className="w-3 h-3 fill-slate-950" /> Featured Champion
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <img
                    src={story.studentPhotoUrl || "/logo.png"}
                    alt={story.studentName}
                    className="w-20 h-20 rounded-2xl object-cover border-4 border-amber-400 shadow-md group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-1.5 rounded-full shadow-md">
                    <Award className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">{story.studentName}</h3>
                  <p className="text-xs font-extrabold text-amber-600 mt-0.5">{story.achievementTitle}</p>
                  {story.ageOrGrade && (
                    <span className="inline-block mt-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {story.ageOrGrade}
                    </span>
                  )}
                </div>
              </div>

              {/* Success Story Narrative */}
              <div className="p-4 bg-gradient-to-r from-amber-50/60 to-orange-50/60 rounded-2xl border border-amber-200/80 relative">
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {story.aiGeneratedStory}
                </p>
              </div>
            </div>

            {/* Footer with Applauds */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Arnav Abacus Academy Verified
              </span>

              <button
                onClick={() => handleLike(story.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
                  likedStories[story.id]
                    ? "bg-rose-500 text-white"
                    : "bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${likedStories[story.id] ? "fill-white" : "fill-rose-500 text-rose-500"}`} />
                <span>{story.likesCount || 0} Applauds</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
