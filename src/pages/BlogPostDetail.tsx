import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BlogPost, BlogComment } from "../types";
import { INITIAL_BLOG_POSTS } from "../data/blogData";

export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Interactive Poll state
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);

  // Comment Form state
  const [commentName, setCommentName] = useState("");
  const [commentRole, setCommentRole] = useState<"Parent" | "Student" | "Educator" | "Visitor">("Parent");
  const [commentText, setCommentText] = useState("");

  // Quick Mental Math Mini Game state inside the post
  const [userMathAns, setUserMathAns] = useState("");
  const [mathSolved, setMathSolved] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("aaa_blog_posts");
    let allPosts: BlogPost[] = INITIAL_BLOG_POSTS;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed[0]?.author?.name !== "Neha Patil" || parsed[0]?.coverImage !== INITIAL_BLOG_POSTS[0].coverImage) {
          allPosts = INITIAL_BLOG_POSTS;
          localStorage.setItem("aaa_blog_posts", JSON.stringify(INITIAL_BLOG_POSTS));
        } else {
          allPosts = parsed;
        }
      } catch (e) {
        allPosts = INITIAL_BLOG_POSTS;
      }
    } else {
      localStorage.setItem("aaa_blog_posts", JSON.stringify(INITIAL_BLOG_POSTS));
    }


    setPosts(allPosts);
    const found = allPosts.find((p) => p.slug === slug) || allPosts[0];
    setPost(found);

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

  // Handle In-Blog Poll Vote
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

    const updatedPostsList = posts.map((p) => (p.id === post.id ? updatedPost : p));
    setPosts(updatedPostsList);
    localStorage.setItem("aaa_blog_posts", JSON.stringify(updatedPostsList));
  };

  // Basic Profanity & Slang moderation list
  const BAD_WORDS = [
    "badword", "idiot", "stupid", "fool", "crap", "rubbish", "hate", "scam", 
    "abuse", "dumb", "ugly", "fake", "spam"
  ];

  const filterProfanity = (text: string) => {
    let clean = text;
    BAD_WORDS.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      clean = clean.replace(regex, "*****");
    });
    return clean;
  };

  const sanitizeInput = (text: string) => {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  // Handle Adding New Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim() || !post) return;

    // Security & Moderation checks
    const sanitizedName = sanitizeInput(commentName.trim()).slice(0, 50); // Limit name length
    const moderatedText = filterProfanity(sanitizeInput(commentText.trim())).slice(0, 500); // Limit comment length

    const bgColors = ["bg-purple-500", "bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500"];
    const newComment: BlogComment = {
      id: `c-${Date.now()}`,
      author: sanitizedName,
      role: commentRole,
      avatarBg: bgColors[Math.floor(Math.random() * bgColors.length)],
      content: moderatedText,
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
            ← Back to All Articles
          </button>
          
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full font-bold border border-amber-500/30">
              {post.category}
            </span>
            <span>•</span>
            <span>⏱️ {post.readTime}</span>
            <span>•</span>
            <span>📅 {post.publishedAt}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shadow-inner">
              {post.author.avatar}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{post.author.name}</h3>
              <p className="text-xs text-slate-400">{post.author.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-10">
        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
          <img src={post.coverImage} alt={post.title} className="w-full h-80 sm:h-96 object-cover" />
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-8">
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line font-normal">
            {post.content}
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
                  Interactive Reader Poll ({post.poll.totalVotes} Votes)
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
                          <span className="text-xs font-bold text-amber-400">{percentage}%</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              {votedOptionId && (
                <p className="text-[11px] text-slate-400 text-center font-medium">
                  ✓ Thank you for sharing your thoughts with the AAA community!
                </p>
              )}
            </div>
          )}

          {/* Reader Reactions Bar */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center sm:text-left">
              How did you find this article?
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => handleReaction("insightful")}
                className="p-3 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer text-slate-800"
              >
                <span>💡</span>
                <span className="text-xs font-bold">Insightful ({post.reactions.insightful})</span>
              </button>
              <button
                onClick={() => handleReaction("mindBlowing")}
                className="p-3 bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer text-slate-800"
              >
                <span>🧠</span>
                <span className="text-xs font-bold">Mind Blowing ({post.reactions.mindBlowing})</span>
              </button>
              <button
                onClick={() => handleReaction("inspiring")}
                className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer text-slate-800"
              >
                <span>👏</span>
                <span className="text-xs font-bold">Inspiring ({post.reactions.inspiring})</span>
              </button>
              <button
                onClick={() => handleReaction("helpful")}
                className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer text-slate-800"
              >
                <span>❤️</span>
                <span className="text-xs font-bold">Helpful ({post.reactions.helpful})</span>
              </button>
            </div>
          </div>

          {/* Social Share & Action Bar */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Share Story:</span>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " - " + window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm shadow-sm transition-all"
                title="Share on WhatsApp"
              >
                💬
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Article link copied to clipboard!");
                }}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                🔗 Copy Link
              </button>
            </div>

            <Link
              to="/practice"
              className="bg-vibrant-orange hover:bg-vibrant-orange/95 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all uppercase tracking-wider"
            >
              🚀 Try Practice Hub
            </Link>
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
