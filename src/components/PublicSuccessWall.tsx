import React, { useState, useEffect, useRef, useCallback } from "react";
import { Trophy, Heart, Star, Award, CheckCircle2, Calendar, MapPin, School } from "lucide-react";
import { SuccessStory, getSuccessStories, incrementStoryLikes } from "../lib/successStories";

/* ─── Confetti burst helper ─────────────────────────────────────────────── */
interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  speed: number;
  size: number;
  opacity: number;
}

const CONFETTI_COLORS = ["#f59e0b", "#ef4444", "#10b981", "#6366f1", "#f97316", "#ec4899"];

function useConfetti() {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);
  const frameRef = useRef<number | null>(null);

  const burst = useCallback((originX: number, originY: number) => {
    const newParticles: ConfettiParticle[] = Array.from({ length: 24 }, (_, i) => ({
      id: Date.now() + i,
      x: originX,
      y: originY,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      angle: (i / 24) * 360,
      speed: 2 + Math.random() * 4,
      size: 5 + Math.random() * 5,
      opacity: 1,
    }));
    setParticles(newParticles);

    let tick = 0;
    const animate = () => {
      tick++;
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + Math.cos((p.angle * Math.PI) / 180) * p.speed,
            y: p.y + Math.sin((p.angle * Math.PI) / 180) * p.speed + tick * 0.15,
            opacity: Math.max(0, p.opacity - 0.025),
          }))
          .filter((p) => p.opacity > 0)
      );
      if (tick < 60) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return { particles, burst };
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function PublicSuccessWall() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [likedStories, setLikedStories] = useState<Record<string, boolean>>({});
  const [popStory, setPopStory] = useState<string | null>(null);
  const { particles, burst } = useConfetti();

  useEffect(() => {
    setStories(getSuccessStories());
  }, []);

  const totalApplauds = stories.reduce((sum, s) => sum + (s.likesCount || 0), 0);

  const handleLike = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (likedStories[id]) return;

    // Get button position for confetti origin
    const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
    burst(rect.left + rect.width / 2, rect.top + rect.height / 2);

    // Pop animation trigger
    setPopStory(id);
    setTimeout(() => setPopStory(null), 400);

    const newLikes = incrementStoryLikes(id);
    setLikedStories((prev) => ({ ...prev, [id]: true }));
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, likesCount: newLikes } : s))
    );
  };

  if (stories.length === 0) return null;

  return (
    <>
      {/* Confetti Canvas Layer */}
      {particles.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden="true">
          {particles.map((p) => (
            <div
              key={p.id}
              style={{
                position: "fixed",
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                opacity: p.opacity,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                transform: `rotate(${p.angle}deg)`,
                pointerEvents: "none",
              }}
            />
          ))}
        </div>
      )}

      <section className="space-y-6">
        {/* Section Header with Total Applauds */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-500" /> Our Success Hall of Fame
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 tracking-tight">
            Celebrating Our Young Speed Math Champions 🏆
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Real achievements powered by whole-brain Soroban visualization, NEP 2020 speed math drills, and dedicated master guidance at Wakad, Pune.
          </p>

          {/* Total Applauds Counter */}
          <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 px-4 py-2 rounded-full shadow-sm">
            <div className="flex -space-x-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-5 h-5 rounded-full bg-rose-400 border-2 border-white flex items-center justify-center">
                  <Heart className="w-2.5 h-2.5 fill-white text-white" />
                </div>
              ))}
            </div>
            <span className="text-xs font-black text-rose-600">
              {totalApplauds.toLocaleString()} Total Applauds from our Community
            </span>
          </div>
        </div>

        {/* Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story) => {
            const isLiked = !!likedStories[story.id];
            const isPopping = popStory === story.id;

            return (
              <div
                key={story.id}
                className="bg-white rounded-3xl border-2 border-amber-100 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between space-y-4 group"
              >
                {/* Top Ribbon */}
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] uppercase px-4 py-1 rounded-bl-2xl shadow-sm tracking-wider flex items-center gap-1">
                  <Star className="w-3 h-3 fill-slate-950" />
                  {story.eventLevel === "international"
                    ? "Global Champion"
                    : story.eventLevel === "national_state"
                    ? "National Ranker"
                    : "Academy Star"}
                </div>

                <div className="space-y-4">
                  {/* Student Identity */}
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={story.studentPhotoUrl || "/logo.png"}
                        alt={story.studentName}
                        className="w-20 h-20 rounded-2xl object-cover border-4 border-amber-400 shadow-md group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-1.5 rounded-full shadow-md">
                        <Award className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-slate-900 tracking-tight">{story.studentName}</h3>
                      <p className="text-xs font-extrabold text-amber-600 leading-snug">{story.highlight}</p>

                      {/* Structured Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {story.ageYears && (
                          <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                            {story.ageYears} Years
                          </span>
                        )}
                        {story.schoolName && (
                          <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 flex items-center gap-1">
                            <School className="w-3 h-3 text-slate-500" />
                            {story.schoolName}
                          </span>
                        )}
                        {story.location && (
                          <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            {story.location}
                          </span>
                        )}
                        {story.eventDateFormatted && (
                          <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/80 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-amber-600" />
                            {story.eventDateFormatted}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Story Narrative Box */}
                  <div className="p-4 bg-gradient-to-r from-amber-50/60 to-orange-50/60 rounded-2xl border border-amber-200/80 relative space-y-2">
                    {story.beforeText && story.afterText && (
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-bold pb-2 border-b border-amber-200/60">
                        <div className="text-rose-700 bg-rose-50 p-2 rounded-xl border border-rose-200">
                          <span className="block text-[9px] uppercase font-black text-rose-500">Before</span>
                          {story.beforeText}
                        </div>
                        <div className="text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                          <span className="block text-[9px] uppercase font-black text-emerald-500">After</span>
                          {story.afterText}
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-slate-800 leading-relaxed font-medium">
                      {story.aiGeneratedStory}
                    </p>
                  </div>
                </div>

                {/* Footer: Verified + Applaud Button */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> AAA Verified
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleLike(story.id, e)}
                    disabled={isLiked}
                    title={isLiked ? "You've already applauded!" : "Click to applaud this champion!"}
                    style={{
                      transform: isPopping ? "scale(1.35)" : "scale(1)",
                      transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s, color 0.2s",
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer select-none
                      ${isLiked
                        ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                        : "bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 hover:shadow-md hover:shadow-rose-100"
                      } ${isLiked ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-all duration-200 ${
                        isPopping ? "scale-150" : "scale-100"
                      } ${isLiked ? "fill-white text-white" : "fill-rose-400 text-rose-400"}`}
                    />
                    <span className="tabular-nums">{story.likesCount || 0} Applauds</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
