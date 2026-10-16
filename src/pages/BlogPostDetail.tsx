import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BlogPost, BlogComment } from "../types";
import { INITIAL_BLOG_POSTS, getLocalizedBlogPost } from "../data/blogData";
import { useLanguage } from "../lib/LanguageContext";

import { validateSanitizedName, validateSanitizedMessage } from "../lib/securitySanitizer";
import { ChevronDown, ChevronUp, ChevronRight, Compass, Sparkles, BookOpen, Layers, CheckCircle2, Eye, EyeOff, LayoutGrid, Plus, Minus } from "lucide-react";

export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language, t, formatNumber } = useLanguage();

  // Synchronously initialize with direct match from INITIAL_BLOG_POSTS so first render never fails
  const initialFound = INITIAL_BLOG_POSTS.find((p) => p.slug === slug) || INITIAL_BLOG_POSTS[0];
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [post, setPost] = useState<BlogPost | null>(initialFound);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Interactive Poll state
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);

  // Comment Form state
  const [commentName, setCommentName] = useState("");
  const [commentRole, setCommentRole] = useState<"Parent" | "Student" | "Educator" | "Visitor">("Parent");
  const [commentText, setCommentText] = useState("");
  const [commentHoneypot, setCommentHoneypot] = useState(""); // Bot trap
  const [commentError, setCommentError] = useState<string | null>(null);

  // Quick Mental Math Mini Game state inside the post
  const [userMathAns, setUserMathAns] = useState("");
  const [mathSolved, setMathSolved] = useState<boolean | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Section Navigation & Interactive Accordion States (All chapters start in Glance Summary mode as requested)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (secId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [secId]: !prev[secId]
    }));
  };

  const handleToggleAllSections = (allSecIds: string[]) => {
    const areAllExpanded = allSecIds.every(id => !!expandedSections[id]);
    const nextState: Record<string, boolean> = {};
    allSecIds.forEach(id => {
      nextState[id] = !areAllExpanded;
    });
    setExpandedSections(nextState);
  };

  useEffect(() => {
    let allPosts: BlogPost[] = INITIAL_BLOG_POSTS;
    try {
      const stored = localStorage.getItem("aaa_blog_posts");
      if (stored) {
        const parsed: BlogPost[] = JSON.parse(stored);
        const hasAllInitial = INITIAL_BLOG_POSTS.every((initP) => parsed.some((p) => p.id === initP.id));
        const champUpdated = parsed.find(p => p.id === "blog-4")?.content.includes("Who Is This For");
        if (hasAllInitial && champUpdated && parsed[0]?.id === "blog-0" && parsed[0]?.content.includes("[CLAIM_FREE_DEMO_BUTTON]")) {
          // Merge user comments from localStorage into allPosts
          allPosts = INITIAL_BLOG_POSTS.map(initP => {
            const cached = parsed.find(cp => cp.id === initP.id);
            return cached ? { ...initP, reactions: cached.reactions || initP.reactions, comments: cached.comments || initP.comments } : initP;
          });
        } else {
          localStorage.setItem("aaa_blog_posts", JSON.stringify(INITIAL_BLOG_POSTS));
        }
      } else {
        localStorage.setItem("aaa_blog_posts", JSON.stringify(INITIAL_BLOG_POSTS));
      }
    } catch {
      allPosts = INITIAL_BLOG_POSTS;
    }

    setPosts(allPosts);
    const found = allPosts.find((p) => p.slug === slug) || INITIAL_BLOG_POSTS.find((p) => p.slug === slug) || allPosts[0];
    setPost(found);

    if (found) {
      document.title = `${found.title} | Arnav Abacus Academy Pune`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", found.excerpt);
      }
    }

    // Check if user already voted on poll
    if (found?.poll) {
      const pollKey = `aaa_poll_voted_${found.poll.id}`;
      const existingVote = localStorage.getItem(pollKey);
      if (existingVote) {
        setVotedOptionId(existingVote);
      }
    }
  }, [slug]);

  // Scroll Progress Bar listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-vibrant-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle Article Reactions
  const handleReaction = (type: keyof typeof post.reactions) => {
    if (!post) return;
    const updatedPost = {
      ...post,
      reactions: {
        ...post.reactions,
        [type]: post.reactions[type] + 1,
      },
    };
    setPost(updatedPost);

    const updatedPostsList = posts.map((p) => (p.id === post.id ? updatedPost : p));
    setPosts(updatedPostsList);
    localStorage.setItem("aaa_blog_posts", JSON.stringify(updatedPostsList));
  };

  // Handle In-Blog Poll Vote & Save Team Analytics Data
  const handlePollVote = (optionId: string) => {
    if (!post || !post.poll || votedOptionId) return;

    const updatedPoll = {
      ...post.poll,
      totalVotes: post.poll.totalVotes + 1,
      options: post.poll.options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      ),
    };

    const updatedPost = { ...post, poll: updatedPoll };
    setPost(updatedPost);
    setVotedOptionId(optionId);
    localStorage.setItem(`aaa_poll_voted_${post.poll.id}`, optionId);

    // Save to Team Analytics Database (for parent psychology & curriculum research)
    const analytics = JSON.parse(localStorage.getItem("aaa_poll_analytics") || "[]");
    analytics.push({
      pollId: post.poll.id,
      question: post.poll.question,
      selectedOptionId: optionId,
      selectedOptionText: post.poll.options.find(o => o.id === optionId)?.text,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("aaa_poll_analytics", JSON.stringify(analytics));

    const updatedPostsList = posts.map((p) => (p.id === post.id ? updatedPost : p));
    setPosts(updatedPostsList);
    localStorage.setItem("aaa_blog_posts", JSON.stringify(updatedPostsList));
  };


  // Handle Adding New Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    setCommentError(null);

    // Honeypot check
    if (commentHoneypot.trim()) {
      return;
    }

    if (!commentName.trim() || !commentText.trim() || !post) return;

    // Security & Anti-Vulgarity / Anti-Spam checks
    const nameVal = validateSanitizedName(commentName);
    if (!nameVal.valid) {
      setCommentError(nameVal.error || "Please enter a valid name.");
      return;
    }

    const msgVal = validateSanitizedMessage(commentText);
    if (!msgVal.valid) {
      setCommentError(msgVal.error || "Please enter a constructive, respectful comment.");
      return;
    }

    const bgColors = ["bg-purple-500", "bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500"];
    const newComment: BlogComment = {
      id: `c-${Date.now()}`,
      author: nameVal.sanitized,
      role: commentRole,
      avatarBg: bgColors[Math.floor(Math.random() * bgColors.length)],
      content: msgVal.sanitized,
      createdAt: "Just now",
      likes: 0,
    };

    const updatedPost = {
      ...post,
      comments: [newComment, ...post.comments],
    };

    setPost(updatedPost);
    setCommentName("");
    setCommentText("");

    const updatedPostsList = posts.map((p) => (p.id === post.id ? updatedPost : p));
    setPosts(updatedPostsList);
    localStorage.setItem("aaa_blog_posts", JSON.stringify(updatedPostsList));
  };


  // Handle Comment Upvote
  const handleLikeComment = (commentId: string) => {
    if (!post) return;
    const updatedComments = post.comments.map((c) =>
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    );
    const updatedPost = { ...post, comments: updatedComments };
    setPost(updatedPost);

    const updatedPostsList = posts.map((p) => (p.id === post.id ? updatedPost : p));
    setPosts(updatedPostsList);
    localStorage.setItem("aaa_blog_posts", JSON.stringify(updatedPostsList));
  };

  // Handle Mental Math Widget check (e.g. 97 x 93 = 9021)
  const handleVerifyMath = (e: React.FormEvent) => {
    e.preventDefault();
    if (userMathAns.trim() === "9021") {
      setMathSolved(true);
    } else {
      setMathSolved(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative pb-20">
      {/* Top Scroll Reading Indicator */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-200 z-50">
        <div
          className="h-full bg-vibrant-orange transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header Cover Banner */}
      <div className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            {t("blogBackToBlog")}
          </button>
          
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full font-bold border border-amber-500/30">
              {post.category}
            </span>
            <span>•</span>
            <span>⏱️ {formatNumber(post.readTime)}</span>
            <span>•</span>
            <span>📅 {formatNumber(post.publishedAt)}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
            {post.author.name.includes("Neha Patil") ? (
              <img
                src="/neha_patil_director.jpg"
                alt="Neha Patil - Director & Founder"
                className="w-13 h-13 rounded-full object-cover border-2 border-amber-400 shadow-md bg-white shrink-0 ring-2 ring-amber-400/40"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shadow-inner">
                {post.author.avatar}
              </div>
            )}
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>{post.author.name}</span>
                {post.author.name.includes("Neha Patil") && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    O+ Certified
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-400">{t("blogAuthorRole")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-10">
        {/* Cover Image Banner with Crystal-Clear Aspect Ratio & Sharp Text Legibility */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-950 flex flex-col items-center justify-center">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-auto object-contain block"
            loading="eager"
          />
        </div>

        {/* Interactive "At-A-Glance" Directory: View all blog sections instantly without scrolling */}
        {(() => {
          // Extract section titles from content
          const sections: { id: string; title: string; icon: string }[] = [];
          const headingMatches = post.content.match(/^###?\s+(.+)$/gm) || [];
          
          headingMatches.forEach((h, i) => {
            const rawTitle = h.replace(/^###?\s+/, "").trim();
            // Extract leading emoji if any
            const emojiMatch = rawTitle.match(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic}|\S+)\s+/u);
            const icon = emojiMatch ? emojiMatch[1] : `${i + 1}`;
            const cleanTitle = rawTitle.replace(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic}|\S+)\s+/u, "").trim();
            const secId = `section-${i}`;
            sections.push({ id: secId, title: cleanTitle || rawTitle, icon });
          });

          if (sections.length === 0) return null;

          const scrollToSection = (secId: string) => {
            setActiveSectionId(secId);
            setExpandedSections(prev => ({ ...prev, [secId]: true }));
            setTimeout(() => {
              const el = document.getElementById(secId);
              if (el) {
                const yOffset = -90;
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }, 60);
          };

          return (
            <div id="story-glance-directory" className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-400/40 shadow-2xl rounded-3xl p-5 sm:p-8 text-white space-y-6 scroll-mt-24">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 bg-amber-400/15 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
                    <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                    Story At A Glance • Instant Navigation
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                    <span>Explore All {sections.length} Chapters</span>
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">
                    Tap any topic below to jump directly to its details—no need to scroll through the full article!
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono text-amber-300/80 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
                    ⏱️ {formatNumber(post.readTime)}
                  </span>
                </div>
              </div>

              {/* Grid of Section Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                {sections.map((sec, idx) => {
                  const isActive = activeSectionId === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`text-left p-3 sm:p-3.5 rounded-2xl border transition-all flex items-start gap-3 group cursor-pointer ${
                        isActive
                          ? "bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-400/20 scale-[1.02]"
                          : "bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700/80 hover:border-amber-400/60 hover:text-white"
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-sm transition-transform group-hover:scale-110 ${
                        isActive ? "bg-slate-950 text-amber-400" : "bg-slate-900 text-amber-400 border border-slate-700"
                      }`}>
                        {sec.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className={`text-[10px] font-bold uppercase tracking-wider font-mono ${isActive ? "text-slate-800" : "text-amber-400/90"}`}>
                            Chapter {idx + 1}
                          </span>
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${isActive ? "text-slate-950" : "text-slate-400"}`} />
                        </div>
                        <h4 className={`text-xs font-bold leading-snug line-clamp-2 mt-0.5 ${isActive ? "text-slate-950 font-black" : "text-white"}`}>
                          {sec.title}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 text-center border-t border-slate-800/80">
                <p className="text-[11px] text-slate-400">
                  💡 <strong>Tip:</strong> Each section heading below also includes an expand/collapse toggle so you can view only what you want!
                </p>
              </div>
            </div>
          );
        })()}

        {/* Article Body with Premium Blog Typography and Interactive Quick-Glance Sections */}
        <div className="bg-white rounded-3xl p-5 sm:p-10 shadow-sm border border-slate-200 space-y-8">
          <div className="article-body text-slate-800 leading-relaxed text-base space-y-6">
            {(() => {
              // Standard Inline Text Formatter: [Text](url), **bold**, *italic*
              const renderFormattedInlineText = (text: string) => {
                const linkRegex = /(\[[^\]]+\]\([^)]+\))/g;
                const linkSegments = text.split(linkRegex);

                return linkSegments.map((segment, sIdx) => {
                  const match = segment.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
                  if (match) {
                    const linkText = match[1];
                    const url = match[2];
                    const isInternal = url.startsWith("/");
                    if (isInternal) {
                      return (
                        <Link
                          key={sIdx}
                          to={url}
                          className="text-vibrant-orange hover:text-amber-700 font-bold underline underline-offset-2 transition-colors inline"
                        >
                          {linkText}
                        </Link>
                      );
                    }
                    return (
                      <a
                        key={sIdx}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-vibrant-orange hover:text-amber-700 font-bold underline underline-offset-2 transition-colors inline"
                      >
                        {linkText}
                      </a>
                    );
                  }

                  const boldParts = segment.split(/(\*\*.*?\*\*)/g);
                  return boldParts.map((bPart, bIdx) => {
                    if (bPart.startsWith("**") && bPart.endsWith("**")) {
                      return (
                        <strong
                          key={`${sIdx}-${bIdx}`}
                          className="font-extrabold text-slate-900 bg-amber-100/60 px-1.5 py-0.5 rounded-md border border-amber-200/50"
                        >
                          {bPart.slice(2, -2)}
                        </strong>
                      );
                    }

                    const italicParts = bPart.split(/(\*[^*]+?\*)/g);
                    return italicParts.map((iPart, iIdx) => {
                      if (iPart.startsWith("*") && iPart.endsWith("*") && iPart.length > 2) {
                        return (
                          <em key={`${sIdx}-${bIdx}-${iIdx}`} className="italic text-slate-800">
                            {iPart.slice(1, -1)}
                          </em>
                        );
                      }
                      return iPart;
                    });
                  });
                });
              };

              // Render an individual markdown block inside a section or intro
              const renderBlock = (trimmed: string, key: string | number) => {
                // H2 Headings
                if (trimmed.startsWith("## ")) {
                  return (
                    <h2 key={key} className="text-2xl sm:text-3xl font-black text-slate-900 pt-6 pb-2 border-b-2 border-amber-300 flex items-center gap-2">
                      <span className="w-2.5 h-7 bg-vibrant-orange rounded-full inline-block"></span>
                      {trimmed.replace("## ", "")}
                    </h2>
                  );
                }

                // H4 Headings
                if (trimmed.startsWith("#### ")) {
                  return (
                    <h4 key={key} className="text-lg font-black text-slate-900 pt-3 text-vibrant-orange">
                      {trimmed.replace("#### ", "")}
                    </h4>
                  );
                }

                // Custom Interactive Action Button Callout
                if (trimmed === "[CLAIM_FREE_DEMO_BUTTON]") {
                  return (
                    <div key={key} className="my-6 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl text-center space-y-4">
                      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                        ✨ Limited Free Assessment Seats Available in Wakad, Pune
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                        Ready to Unlock Your Child's Full Brain Potential?
                      </h3>
                      <p className="text-sm text-amber-100 max-w-xl mx-auto">
                        Book a 1-on-1 Free Abacus & Vedic Math Skill Assessment Session with Neha Patil & Nitin Patil.
                      </p>
                      <div className="pt-2">
                        <button
                          onClick={() => navigate("/contact")}
                          className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-2xl shadow-2xl hover:scale-105 transition-all cursor-pointer inline-flex items-center gap-2 border border-slate-700"
                        >
                          🎁 Claim Free Demo & Math Assessment →
                        </button>
                      </div>
                    </div>
                  );
                }

                // Blockquotes / Founder Messages
                if (trimmed.startsWith("> ")) {
                  const quoteText = trimmed.replace(/^>\s*/gm, "").replace(/[\*\_>"]+/g, "").trim();
                  return (
                    <div key={key} className="my-6 bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-amber-50/90 border-2 border-amber-300/80 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
                      <div className="absolute top-2 left-4 text-5xl text-vibrant-orange/30 font-serif leading-none select-none">“</div>
                      <p className="text-base sm:text-lg font-semibold text-slate-800 italic leading-relaxed relative z-10 pt-4 pb-2 px-2 text-center">
                        “{quoteText}”
                      </p>
                      <div className="absolute bottom-16 right-6 text-5xl text-vibrant-orange/30 font-serif leading-none select-none">”</div>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-4 border-t border-amber-200/80 relative z-10 text-center sm:text-left">
                        <img
                          src="/neha_patil_director.jpg"
                          alt="Neha Patil - Founder & Director, Certified Professional (O+ Grade)"
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-amber-400 shadow-md shrink-0 bg-white ring-2 ring-amber-300/60"
                        />
                        <div>
                          <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-2">
                            <span>Neha Patil</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                              O+ Grade Certified
                            </span>
                          </h4>
                          <p className="text-xs text-vibrant-orange font-bold">
                            Founder & Director • Arnav Abacus Academy, Wakad, Pune, India
                          </p>
                          <p className="text-[11px] text-slate-500 font-medium">
                            Certified Professional in Abacus, Vedic & Mental Math (IIVA)
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Markdown Images: ![alt](url)
                if (trimmed.startsWith("![") && trimmed.includes("](") && trimmed.endsWith(")")) {
                  const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
                  if (imgMatch) {
                    const alt = imgMatch[1];
                    const src = imgMatch[2];
                    return (
                      <figure key={key} className="my-6 rounded-3xl overflow-hidden border-2 border-amber-200/80 shadow-lg bg-slate-950">
                        <img
                          src={src}
                          alt={alt}
                          className="w-full max-h-[520px] object-contain sm:object-cover object-center"
                          loading="lazy"
                        />
                        {alt && (
                          <figcaption className="p-4 text-center text-xs sm:text-sm font-bold text-slate-700 bg-amber-50/90 border-t border-amber-200/80">
                            📸 {alt}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }
                }

                // Horizontal Divider
                if (trimmed === "---") {
                  return <hr key={key} className="my-6 border-slate-200" />;
                }

                // Markdown Tables with Rich Typography & Link Parsing
                if (trimmed.includes("|")) {
                  const rows = trimmed.split("\n").filter(r => !r.includes(":---"));
                  if (rows.length > 0) {
                    return (
                      <div key={key} className="my-5 overflow-x-auto rounded-3xl border border-amber-200/80 shadow-sm bg-white">
                        <table className="w-full text-left text-xs sm:text-sm">
                          {rows.map((row, rIdx) => {
                            const cols = row.split("|").filter(c => c.trim() !== "");
                            if (rIdx === 0) {
                              return (
                                <thead key={rIdx} className="bg-slate-900 text-amber-300 font-bold uppercase text-[11px] sm:text-xs tracking-wider border-b border-slate-800">
                                  <tr>
                                    {cols.map((c, cIdx) => (
                                      <th key={cIdx} className="p-4 sm:p-5">{c.replace(/\*\*/g, "").trim()}</th>
                                    ))}
                                  </tr>
                                </thead>
                              );
                            }
                            return (
                              <tbody key={rIdx} className="divide-y divide-slate-100 bg-white">
                                <tr className="hover:bg-amber-50/40 transition-colors">
                                  {cols.map((c, cIdx) => (
                                    <td key={cIdx} className="p-4 sm:p-5 text-slate-700 font-medium leading-relaxed">
                                      {renderFormattedInlineText(c.trim())}
                                    </td>
                                  ))}
                                </tr>
                              </tbody>
                            );
                          })}
                        </table>
                      </div>
                    );
                  }
                }

                // Numbered List Items
                if (/^\d+\.\s/.test(trimmed)) {
                  const numItems = trimmed.split(/(?=\d+\.\s)/).filter(Boolean);
                  return (
                    <div key={key} className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
                      {numItems.map((item, nIdx) => {
                        const clean = item.replace(/^\d+\.\s*/, "").replace(/\*\*/g, "").trim();
                        return (
                          <div key={nIdx} className="bg-gradient-to-r from-amber-50 to-orange-50/50 p-3.5 rounded-2xl border border-amber-200/70 flex items-center gap-3 shadow-xs">
                            <span className="w-7 h-7 bg-vibrant-orange text-white font-black text-xs rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                              {nIdx + 1}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-800">
                              {clean}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                // Bullet List Items with Uniform Typography & Formatting
                if (trimmed.startsWith("- ")) {
                  const items = trimmed.split("\n- ");
                  return (
                    <ul key={key} className="space-y-3 my-4">
                      {items.map((item, iIdx) => {
                        const cleanItem = item.replace(/^- /, "").trim();
                        const parts = cleanItem.split(/:(.+)/);
                        return (
                          <li key={iIdx} className="flex items-start gap-3.5 bg-slate-50/80 hover:bg-amber-50/40 transition-colors p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                            <span className="w-6 h-6 bg-amber-500/15 text-vibrant-orange border border-amber-300 rounded-xl flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-2xs">
                              ✓
                            </span>
                            <div className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal flex-1">
                              {parts.length > 1 ? (
                                <>
                                  <strong className="text-slate-950 font-bold tracking-tight block sm:inline mr-1">
                                    {renderFormattedInlineText(parts[0].replace(/\*\*/g, "").trim())}:
                                  </strong>
                                  <span>{renderFormattedInlineText(parts[1].trim())}</span>
                                </>
                              ) : (
                                renderFormattedInlineText(cleanItem)
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  );
                }

                // Standard Paragraph
                return (
                  <p key={key} className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                    {renderFormattedInlineText(trimmed)}
                  </p>
                );
              };

              // Parse post.content into Intro Blocks and Chapter Sections
              const blocks = post.content.split("\n\n").map(b => b.trim()).filter(Boolean);
              const introBlocks: string[] = [];
              interface SectionData {
                id: string;
                rawTitle: string;
                cleanTitle: string;
                icon: string;
                blocks: string[];
                chapterIndex: number;
              }
              const sections: SectionData[] = [];
              let currentSection: SectionData | null = null;
              let sCount = 0;

              for (const b of blocks) {
                if (b.startsWith("### ")) {
                  if (currentSection) {
                    sections.push(currentSection);
                  }
                  const rawTitle = b.replace("### ", "").trim();
                  const emojiMatch = rawTitle.match(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic}|\S+)\s+/u);
                  const icon = emojiMatch ? emojiMatch[1] : `${sCount + 1}`;
                  const cleanTitle = rawTitle.replace(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic}|\S+)\s+/u, "").trim();
                  const secId = `section-${sCount}`;
                  sCount++;

                  currentSection = {
                    id: secId,
                    rawTitle,
                    cleanTitle: cleanTitle || rawTitle,
                    icon,
                    blocks: [],
                    chapterIndex: sCount,
                  };
                } else if (currentSection) {
                  if (b !== "---") {
                    currentSection.blocks.push(b);
                  }
                } else {
                  if (b !== "---") {
                    introBlocks.push(b);
                  }
                }
              }

              if (currentSection) {
                sections.push(currentSection);
              }

              // Dynamic & Curated Glance Summaries for each Chapter
              const getSectionGlance = (sec: SectionData) => {
                const titleLower = sec.rawTitle.toLowerCase();

                if (titleLower.includes("executive brief")) {
                  return {
                    badgeText: "5 Core Highlights",
                    readTime: "2 min",
                    highlights: [
                      { icon: "🎯", label: "Core Philosophy", text: "Zero exam anxiety & calm cognitive confidence over shallow medal races." },
                      { icon: "💡", label: "AAA Learning Model™", text: "6-stage cognitive cycle converting repetitive drills into deep visual retention." },
                      { icon: "🧮", label: "56 Personalized Paths", text: "Stage-specific mentoring across 15 developmental tiers from KG-1 to Senior Vedic." },
                      { icon: "🚀", label: "40% Accuracy Benchmark", text: "40% of AAA champions solve 100 questions with 100% accuracy in <20 mins." },
                      { icon: "👨‍👩‍👧", label: "Parent Reflection Kit", text: "5 transformative questions moving beyond 'What was your score?'." },
                    ]
                  };
                }

                if (titleLower.includes("targeted value") || titleLower.includes("who is this for")) {
                  return {
                    badgeText: "3 Reader Tracks",
                    readTime: "1 min",
                    highlights: [
                      { icon: "👨‍👩‍👧", label: "For Parents", text: "Practical ways to replace exam panic with calm confidence and home visualization." },
                      { icon: "🎒", label: "For Students", text: "Owning your own rhythmic pace so peer page-turning never rattles your focus." },
                      { icon: "🎓", label: "For Educators", text: "Child-centric blueprint for running high-stakes national competitions with dignity." },
                    ]
                  };
                }

                if (titleLower.includes("redefining success") || titleLower.includes("true mastery")) {
                  return {
                    badgeText: "Core Mindset",
                    readTime: "1.5 min",
                    highlights: [
                      { icon: "⏱️", label: "Beyond Speed", text: "Speed without clarity is fragile; true mastery is calm, self-reliant execution." },
                      { icon: "💡", label: "Breakthrough Moment", text: "When a student pauses with steady breath and knows: 'I can solve this myself.'" },
                      { icon: "📍", label: "National Stage", text: "AAA Wakad serves as Official Offline Exam Center on Sunday, 18 Oct 2026." },
                    ]
                  };
                }

                if (titleLower.includes("56 champions") || titleLower.includes("15 distinct")) {
                  return {
                    badgeText: "15 Learning Levels",
                    readTime: "2 min",
                    highlights: [
                      { icon: "🧮", label: "Abacus Soroban (KG-1 to SR-3)", text: "Tactile bead mechanics & 2-hand bilateral brain activation." },
                      { icon: "✨", label: "Vedic Maths (JVM-0 to VM)", text: "16 Sanskrit Sutras, lightning vertical & crosswise mental multiplication." },
                      { icon: "🌟", label: "56 Individual Stories", text: "Tailored milestones honoring each child's cognitive fingerprint." },
                    ]
                  };
                }

                if (titleLower.includes("mock-diagnostic") || titleLower.includes("precision over speed")) {
                  return {
                    badgeText: "Diagnostic Milestone",
                    readTime: "1.5 min",
                    highlights: [
                      { icon: "📊", label: "The 40% Milestone", text: "Approximately 40% of students completed 100 questions with 100% accuracy in <20 mins." },
                      { icon: "🔍", label: "Mistakes as Data", text: "Errors are treated as diagnostic clues to calibrate concepts, not failures." },
                      { icon: "💭", label: "Growth Reflection", text: "'What did this attempt teach you, and what will you try differently next time?'" },
                    ]
                  };
                }

                if (titleLower.includes("5 superpowers")) {
                  return {
                    badgeText: "5 Lifelong Habits",
                    readTime: "2 min",
                    highlights: [
                      { icon: "🎯", label: "1. Laser Precision", text: "Deliberate calculation and accuracy before rushing to write." },
                      { icon: "👁️", label: "2. Deep Focus", text: "Sustained concentration locked across 100 consecutive problems." },
                      { icon: "⏱️", label: "3. Pacing Mastery", text: "Steady rhythm immune to surrounding peer distractions." },
                      { icon: "💡", label: "4. Autonomous Execution", text: "Self-reliant mental arithmetic without waiting for hints." },
                      { icon: "🦁", label: "5. Exam Fearlessness", text: "Curiosity and an eager smile over numerical panic." },
                    ]
                  };
                }

                if (titleLower.includes("learning model") || titleLower.includes("practice into progress")) {
                  return {
                    badgeText: "6-Stage Pedagogy",
                    readTime: "1.5 min",
                    highlights: [
                      { icon: "🔁", label: "The Cognitive Cycle", text: "Inspire → Explore → Understand → Practice → Apply → Reflect." },
                      { icon: "🧠", label: "Whole-Brain Balance", text: "Stimulating both analytical (left) and creative/visual (right) hemispheres." },
                    ]
                  };
                }

                if (titleLower.includes("mind-over-beads") || titleLower.includes("anzan")) {
                  return {
                    badgeText: "Neuroscience of Anzan",
                    readTime: "1.5 min",
                    highlights: [
                      { icon: "🧠", label: "Photographic Soroban", text: "Transitioning from physical beads to an internal mental abacus." },
                      { icon: "⚡", label: "High-Speed Calculation", text: "Sub-second mental arithmetic via spatial memory & tactile recall." },
                    ]
                  };
                }

                if (titleLower.includes("diagnostic mock") || titleLower.includes("insights, not labels")) {
                  return {
                    badgeText: "Mock Paper Strategy",
                    readTime: "1.5 min",
                    highlights: [
                      { icon: "📈", label: "Error Heatmaps", text: "Pinpointing speed friction points rather than judging test marks." },
                      { icon: "🛡️", label: "Stress-Free Simulation", text: "Familiarizing exam duration so championship day feels like home practice." },
                    ]
                  };
                }

                if (titleLower.includes("golden rules")) {
                  return {
                    badgeText: "4 Championship Rules",
                    readTime: "1.5 min",
                    highlights: [
                      { icon: "🧘", label: "Rule 1 - The 10-Second Pause", text: "Deep belly breath before flipping the first page." },
                      { icon: "🔇", label: "Rule 2 - Blindfold Your Ears", text: "Ignore how fast neighbors turn pages; stick to your own rhythm." },
                      { icon: "🔍", label: "Rule 3 - The Checksum Habit", text: "Quick Vedic digit-sum sanity check on multi-digit problems." },
                      { icon: "🏆", label: "Rule 4 - Post-Exam Celebration", text: "Celebrate effort and courage immediately after the exam." },
                    ]
                  };
                }

                if (titleLower.includes("parent reflection kit")) {
                  return {
                    badgeText: "Home Conversation Kit",
                    readTime: "1.5 min",
                    highlights: [
                      { icon: "💬", label: "5 Reflective Questions", text: "'Which problem challenged you most?', 'How did your breathing feel?', 'What made you proud?'" },
                      { icon: "🏡", label: "Intrinsic Motivation", text: "Building self-worth rooted in perseverance rather than exam ranks." },
                    ]
                  };
                }

                if (titleLower.includes("championship snapshot") || titleLower.includes("examination center")) {
                  return {
                    badgeText: "Event Snapshot",
                    readTime: "1 min",
                    highlights: [
                      { icon: "🗓️", label: "Championship Date", text: "Sunday, 18 October 2026." },
                      { icon: "📍", label: "Official Offline Center", text: "Arnav Abacus Academy, Wakad, Pune, Maharashtra." },
                      { icon: "🏅", label: "Organisers & Accreditations", text: "Organised by AVAS & powered by IIVA Book of Records (NSDC Approved Partner)." },
                    ]
                  };
                }

                if (titleLower.includes("neha patil") || titleLower.includes("message to our 56")) {
                  return {
                    badgeText: "Founder's Address",
                    readTime: "1.5 min",
                    hasDirectorPhoto: true,
                    highlights: [
                      { icon: "💌", label: "Letter to 56 Champions", text: "'You have already won by daring to challenge yourself with courage.'" },
                      { icon: "🎁", label: "Free Math Assessment", text: "Book 1-on-1 Free Abacus & Vedic Math Assessment Session at AAA Wakad." },
                    ]
                  };
                }

                // Dynamic Fallback Generator for other blog posts / arbitrary sections
                const firstTable = sec.blocks.find(b => b.includes("|"));
                if (firstTable) {
                  const rows = firstTable.split("\n").filter(r => !r.includes(":---") && r.includes("|"));
                  const dataRows = rows.slice(1, 4);
                  const highlights = dataRows.map((r, i) => {
                    const cols = r.split("|").filter(c => c.trim());
                    const label = cols[0]?.replace(/\*\*/g, "").trim() || `Item ${i + 1}`;
                    const text = cols[1]?.replace(/\*\*/g, "").trim() || cols[0]?.replace(/\*\*/g, "").trim();
                    return { icon: "📊", label, text };
                  });
                  return {
                    badgeText: "Table Highlights",
                    readTime: "1 min",
                    highlights: highlights.length > 0 ? highlights : [{ icon: "📌", label: "Overview", text: "Key analytical comparison and structured guidance inside." }]
                  };
                }

                const firstList = sec.blocks.find(b => b.startsWith("- ") || /^\d+\.\s/.test(b));
                if (firstList) {
                  const items = (firstList.startsWith("- ") ? firstList.split("\n- ") : firstList.split(/(?=\d+\.\s)/)).slice(0, 3);
                  return {
                    badgeText: `${items.length} Key Points`,
                    readTime: "1 min",
                    highlights: items.map(it => ({
                      icon: "✓",
                      label: "",
                      text: it.replace(/^- /, "").replace(/^\d+\.\s*/, "").replace(/\*\*/g, "").slice(0, 120)
                    }))
                  };
                }

                const firstPara = sec.blocks[0] || "";
                return {
                  badgeText: "Section Overview",
                  readTime: "1 min",
                  highlights: [
                    {
                      icon: "💡",
                      label: "Summary",
                      text: firstPara.replace(/\*\*/g, "").slice(0, 160) + (firstPara.length > 160 ? "..." : "")
                    }
                  ]
                };
              };

              const allSecIds = sections.map(s => s.id);
              const areAllExpanded = allSecIds.length > 0 && allSecIds.every(id => !!expandedSections[id]);

              return (
                <div className="space-y-8">
                  {/* Any introductory blocks before Chapter 1 */}
                  {introBlocks.length > 0 && (
                    <div className="space-y-4 pb-4 border-b border-slate-100">
                      {introBlocks.map((b, bIdx) => renderBlock(b, `intro-${bIdx}`))}
                    </div>
                  )}

                  {/* Master Section Toolbar: Quick Glance vs Expand All */}
                  {sections.length > 0 && (
                    <div className="bg-gradient-to-r from-amber-50 via-orange-50/60 to-amber-50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-vibrant-orange text-white flex items-center justify-center font-black text-sm shadow-sm shrink-0">
                          <Layers className="w-5 h-5" />
                        </span>
                        <div>
                          <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                            <span>All {sections.length} Chapters In One Glance</span>
                            <span className="text-[10px] font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Time-Saver Mode
                            </span>
                          </h4>
                          <p className="text-xs text-slate-600 font-medium">
                            Scan highlights in seconds. Tap <strong>"✨ Deep Dive"</strong> on any chapter to read its complete details, or unfold everything below.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end shrink-0">
                        <button
                          type="button"
                          onClick={() => handleToggleAllSections(allSecIds)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-amber-100/60 text-slate-800 hover:text-vibrant-orange font-bold text-xs border border-amber-300 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                        >
                          {areAllExpanded ? (
                            <>
                              <Minus className="w-3.5 h-3.5 text-vibrant-orange stroke-[2.5]" />
                              <span>Fold All to Glance View</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3.5 h-3.5 text-vibrant-orange stroke-[2.5]" />
                              <span>✨ Unfold All Deep Dives ({sections.length})</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Interactive Section Cards */}
                  <div className="space-y-6">
                    {sections.map((sec) => {
                      const isExpanded = !!expandedSections[sec.id];
                      const isSelected = activeSectionId === sec.id;
                      const glance = getSectionGlance(sec);

                      return (
                        <section
                          key={sec.id}
                          id={sec.id}
                          className={`scroll-mt-24 transition-all duration-300 rounded-3xl ${
                            isExpanded
                              ? `bg-white border-2 ${
                                  isSelected
                                    ? "border-amber-500 ring-4 ring-amber-400/25 shadow-xl"
                                    : "border-amber-300/90 shadow-md"
                                } p-5 sm:p-8 space-y-6`
                              : `border hover:border-amber-400/90 ${
                                  isSelected
                                    ? "border-amber-500 bg-amber-50/50 ring-2 ring-amber-400/30"
                                    : "border-slate-200/90 bg-gradient-to-br from-white via-slate-50/70 to-amber-50/30"
                                } p-4 sm:p-6 shadow-xs hover:shadow-md cursor-pointer`
                          }`}
                          onClick={() => {
                            if (!isExpanded) {
                              toggleSection(sec.id);
                            }
                          }}
                        >
                          {/* Chapter Header Bar */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                            <div className="space-y-1.5 flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider px-2.5 py-0.5 rounded-lg bg-slate-900 text-amber-400">
                                  Chapter {sec.chapterIndex}
                                </span>
                                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">
                                  ⏱️ {glance.readTime}
                                </span>
                                {glance.badgeText && (
                                  <span className="text-[11px] font-bold text-vibrant-orange bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded-lg">
                                    {glance.badgeText}
                                  </span>
                                )}
                              </div>
                              <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug flex items-center gap-2.5">
                                <span className={`w-2.5 h-6 rounded-full inline-block shrink-0 transition-colors ${isExpanded ? "bg-vibrant-orange" : "bg-amber-400"}`}></span>
                                <span>{sec.rawTitle}</span>
                              </h3>
                            </div>

                            {/* Prominent Innovative Toggle Button */}
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSection(sec.id);
                                }}
                                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer shadow-xs ${
                                  isExpanded
                                    ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300"
                                    : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-amber-500/20 hover:scale-105"
                                }`}
                              >
                                {isExpanded ? (
                                  <>
                                    <Minus className="w-4 h-4 stroke-[2.5]" />
                                    <span>Fold Chapter</span>
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="w-4 h-4 stroke-[2.5]" />
                                    <span>✨ Deep Dive</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          {/* When Collapsed: Show Brief Details / Glance Summary */}
                          {!isExpanded && (
                            <div className="pt-2 space-y-3">
                              <div className="bg-amber-50/75 border border-amber-200/70 rounded-2xl p-4 sm:p-5 space-y-2.5">
                                {glance.hasDirectorPhoto && (
                                  <div className="flex items-center gap-3 pb-2.5 mb-1 border-b border-amber-200/80">
                                    <img
                                      src="/neha_patil_director.jpg"
                                      alt="Neha Patil - Founder & Director"
                                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-sm shrink-0 bg-white ring-2 ring-amber-300/70"
                                    />
                                    <div>
                                      <h5 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
                                        <span>Neha Patil's Direct Message</span>
                                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-200/80 text-amber-900">
                                          O+ Certified
                                        </span>
                                      </h5>
                                      <p className="text-[11px] text-vibrant-orange font-bold">Founder & Director • Arnav Abacus Academy</p>
                                    </div>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-vibrant-orange">
                                  <Sparkles className="w-3.5 h-3.5" />
                                  <span>Glance Summary & Key Takeaways</span>
                                </div>
                                <ul className="space-y-2">
                                  {glance.highlights.map((h, hIdx) => (
                                    <li key={hIdx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                                      <span className="text-base leading-none shrink-0 mt-0.5">{h.icon || "•"}</span>
                                      <div>
                                        {h.label && (
                                          <strong className="font-extrabold text-slate-900 mr-1.5">
                                            {h.label}:
                                          </strong>
                                        )}
                                        <span className="text-slate-700">{h.text}</span>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 px-1 font-semibold">
                                <span className="text-vibrant-orange flex items-center gap-1.5 font-bold">
                                  <Sparkles className="w-3.5 h-3.5 text-vibrant-orange shrink-0" />
                                  Tap card or click "✨ Deep Dive" to unlock full guides, formulas & action steps
                                </span>
                                <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">
                                  {sec.blocks.length} detailed blocks
                                </span>
                              </div>
                            </div>
                          )}

                          {/* When Expanded: Render Complete Formatted Details */}
                          {isExpanded && (
                            <div className="space-y-6 pt-2">
                              {sec.blocks.map((b, bIdx) => renderBlock(b, `${sec.id}-b-${bIdx}`))}

                              {/* Bottom of Section: Quick Collapse Button */}
                              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-xs text-slate-400 font-medium">
                                  End of Chapter {sec.chapterIndex}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSection(sec.id);
                                  }}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-vibrant-orange hover:bg-slate-100 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer border border-slate-200"
                                >
                                  <ChevronUp className="w-3.5 h-3.5" />
                                  <span>Back to Glance View</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </section>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>


          {/* Interactive In-Article Mini Vedic Math Game Widget if on Vedic Post */}
          {post.category === "Vedic Math" && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="text-sm font-black text-slate-900">Try It Yourself! Interactive Quick Math Challenge</h4>
                  <p className="text-xs text-slate-600">Use the <i>Vertically and Crosswise</i> trick on: <strong>97 × 93</strong></p>
                </div>
              </div>
              
              <form onSubmit={handleVerifyMath} className="flex gap-3">
                <input
                  type="number"
                  placeholder="Enter answer..."
                  value={userMathAns}
                  onChange={(e) => {
                    setUserMathAns(e.target.value);
                    setMathSolved(null);
                  }}
                  className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-sm font-bold w-40 text-slate-800"
                />
                <button
                  type="submit"
                  className="bg-vibrant-orange hover:bg-vibrant-orange/90 text-white font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Verify
                </button>
              </form>

              {mathSolved === true && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                  🎉 Correct! 97 × 93 = 9021. You calculated it mentally in seconds!
                </div>
              )}
              {mathSolved === false && (
                <div className="p-3 bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold rounded-xl flex items-center gap-2">
                  ❌ Incorrect. Hint: (97 - 7 = 90) and (3 x 7 = 21) &rarr; 9021.
                </div>
              )}

            </div>
          )}

          {/* Interactive Poll Widget */}
          {post.poll && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center gap-2">
                <span className="text-xl">📊</span>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {t("blogPollTitle")} ({formatNumber(post.poll.totalVotes)} {t("blogPollTotalVotes")})
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold">{post.poll.question}</h3>

              <div className="space-y-3">
                {post.poll.options.map((opt) => {
                  const percentage =
                    post.poll!.totalVotes > 0
                      ? Math.round((opt.votes / post.poll!.totalVotes) * 100)
                      : 0;
                  const isSelected = votedOptionId === opt.id;

                  return (
                    <button
                      key={opt.id}
                      disabled={!!votedOptionId}
                      onClick={() => handlePollVote(opt.id)}
                      className={`w-full text-left p-4 rounded-2xl relative overflow-hidden border transition-all cursor-pointer ${
                        isSelected
                          ? "border-vibrant-orange bg-vibrant-orange/20"
                          : "border-slate-800 bg-slate-800/60 hover:border-slate-700"
                      }`}
                    >
                      {/* Live progress fill background bar */}
                      {votedOptionId && (
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-amber-500/20 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      )}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-semibold text-slate-200">
                          {opt.text}
                        </span>
                        {votedOptionId && (
                          <span className="text-xs font-bold text-amber-400">{formatNumber(percentage)}%</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              {votedOptionId && (
                <p className="text-[11px] text-slate-400 text-center font-medium">
                  ✓ {t("blogPollVoted")}
                </p>
              )}
            </div>
          )}

          {/* Reader Reactions Bar */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center sm:text-left">
              Article Reactions:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => handleReaction("insightful")}
                className="p-3 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer text-slate-800"
              >
                <span>💡</span>
                <span className="text-xs font-bold">{t("blogReactionInsightful")} ({formatNumber(post.reactions.insightful)})</span>
              </button>
              <button
                onClick={() => handleReaction("mindBlowing")}
                className="p-3 bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer text-slate-800"
              >
                <span>🧠</span>
                <span className="text-xs font-bold">{t("blogReactionMindBlowing")} ({formatNumber(post.reactions.mindBlowing)})</span>
              </button>
              <button
                onClick={() => handleReaction("inspiring")}
                className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer text-slate-800"
              >
                <span>👏</span>
                <span className="text-xs font-bold">{t("blogReactionInspiring")} ({formatNumber(post.reactions.inspiring)})</span>
              </button>
              <button
                onClick={() => handleReaction("helpful")}
                className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer text-slate-800"
              >
                <span>❤️</span>
                <span className="text-xs font-bold">{t("blogReactionHelpful")} ({formatNumber(post.reactions.helpful)})</span>
              </button>
            </div>
          </div>

          {/* Social Share & Action Bar */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Share Story:</span>
              {(() => {
                const liveBaseUrl = "https://arnavabacusacademy-web.vercel.app";
                const shareUrl = `${liveBaseUrl}/blog/${post.slug}`;
                const shareText = `${post.title}\n\nRead the official story at:\n${shareUrl}`;

                const handleCopy = async () => {
                  let success = false;
                  if (navigator.clipboard && window.isSecureContext) {
                    try {
                      await navigator.clipboard.writeText(shareUrl);
                      success = true;
                    } catch {
                      success = false;
                    }
                  }

                  if (!success) {
                    // Fallback using textarea execCommand
                    try {
                      const textArea = document.createElement("textarea");
                      textArea.value = shareUrl;
                      textArea.style.position = "fixed";
                      textArea.style.left = "-999999px";
                      textArea.style.top = "-999999px";
                      document.body.appendChild(textArea);
                      textArea.focus();
                      textArea.select();
                      success = document.execCommand("copy");
                      document.body.removeChild(textArea);
                    } catch {
                      success = false;
                    }
                  }

                  if (success) {
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 3000);
                  } else {
                    prompt("Copy the article link below:", shareUrl);
                  }
                };

                return (
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-black shadow-sm transition-all cursor-pointer"
                      title="Share on WhatsApp"
                    >
                      <span className="text-sm">💬</span> WhatsApp
                    </a>
                    <button
                      onClick={handleCopy}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        copiedLink
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                      }`}
                    >
                      <span>{copiedLink ? "✓" : "🔗"}</span>
                      {copiedLink ? "Link Copied!" : "Copy Link"}
                    </button>
                  </div>
                );
              })()}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                to="/worksheets"
                className="bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all uppercase tracking-wider inline-flex items-center gap-1.5 border border-slate-700 hover:scale-105"
              >
                <span>📝</span> Explore Worksheets
              </Link>
              <Link
                to="/showcase"
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all uppercase tracking-wider inline-flex items-center gap-1.5 hover:scale-105"
              >
                <span>🏆</span> Our Success
              </Link>
              <Link
                to="/practice"
                className="bg-vibrant-orange hover:bg-orange-600 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-md transition-all uppercase tracking-wider inline-flex items-center gap-1.5 hover:scale-105"
              >
                <span>🚀</span> Try Practice Hub
              </Link>
            </div>
          </div>
        </div>

        {/* Comment & Discussion Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>💬 Reader Discussions</span>
              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                {post.comments.length}
              </span>
            </h3>
          </div>

          {/* Submit Comment Form */}
          <form onSubmit={handleAddComment} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            {/* Invisible Honeypot Trap */}
            <input
              type="text"
              name="comment_hp_field"
              value={commentHoneypot}
              onChange={(e) => setCommentHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {commentError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
                {commentError}
              </div>
            )}

            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Leave your thoughts or ask a mentor</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Your Name (e.g. Rahul Sharma)"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-vibrant-orange text-slate-800"
              />
              <select
                value={commentRole}
                onChange={(e) => setCommentRole(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-vibrant-orange"
              >
                <option value="Parent">Parent</option>
                <option value="Student">Student</option>
                <option value="Educator">Educator / Teacher</option>
                <option value="Visitor">General Visitor</option>
              </select>
            </div>
            <textarea
              required
              rows={3}
              placeholder="Share your experience or ask a question about this article..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-vibrant-orange text-slate-800"
            />
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Post Comment
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 rounded-2xl bg-white border border-slate-100 space-y-3 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${comment.avatarBg} text-white font-bold text-xs flex items-center justify-center shadow-sm`}>
                        {comment.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-bold text-slate-900">{comment.author}</h5>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[10px] font-bold">
                            {comment.role}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{comment.createdAt}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-800 rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      👍 {comment.likes}
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium pl-11">
                    {comment.content}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 text-center py-6">
                Be the first to leave a comment on this article!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
