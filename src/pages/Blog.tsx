import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "../types";
import { INITIAL_BLOG_POSTS } from "../data/blogData";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState<boolean>(false);
  const [userChallengeAns, setUserChallengeAns] = useState<string>("");
  const [challengeStatus, setChallengeStatus] = useState<boolean | null>(null);




  useEffect(() => {
    const stored = localStorage.getItem("aaa_blog_posts");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Sync author or image update if cached old data exists
        if (
          parsed[0]?.author?.name !== INITIAL_BLOG_POSTS[0].author.name ||
          parsed[2]?.author?.name !== INITIAL_BLOG_POSTS[2].author.name ||
          parsed[0]?.coverImage !== INITIAL_BLOG_POSTS[0].coverImage
        ) {
          localStorage.setItem("aaa_blog_posts", JSON.stringify(INITIAL_BLOG_POSTS));
          setPosts(INITIAL_BLOG_POSTS);
        } else {
          setPosts(parsed);
        }

      } catch (e) {
        setPosts(INITIAL_BLOG_POSTS);
      }
    } else {
      localStorage.setItem("aaa_blog_posts", JSON.stringify(INITIAL_BLOG_POSTS));
      setPosts(INITIAL_BLOG_POSTS);
    }
  }, []);


  const categories = ["All", "Brain Development", "Abacus Tips", "Vedic Math", "Parenting"];

  const filteredPosts = posts.filter((post) => {
    const matchesCat = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const regularPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id || selectedCategory !== "All" || searchQuery !== "");

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            💡 AAA Knowledge & Brain Hub
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Explore Insights on <span className="text-vibrant-orange">Abacus, Vedic Math</span> & Child Brain Growth
          </h1>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            Interactive articles, mental arithmetic secrets, parenting strategies, and live reader discussions.
          </p>

          {/* Search bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles, techniques (e.g., Anzan, Vedic multiplication)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-slate-800 pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-vibrant-orange focus:outline-none shadow-sm text-sm font-medium transition-all"
              />
              <span className="absolute left-4 top-3.5 text-xl">🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Featured Post Hero */}
        {featuredPost && selectedCategory === "All" && searchQuery === "" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all hover:shadow-2xl">
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[400px]">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-vibrant-orange text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                Featured Article
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-2xl border border-white/20 shadow-lg text-xs font-semibold flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold text-amber-300">
                  🎨 Color-Coded Rods: Center (Ones - Yellow) | Left (Tens - Green) | Right (Tenths - Orange)
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-200 px-2 py-0.5 rounded-full font-bold border border-amber-500/30">
                  Place Value Science
                </span>
              </div>

            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-md font-bold border border-amber-200">
                    {featuredPost.category}
                  </span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                  <span>•</span>
                  <span>{featuredPost.publishedAt}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug hover:text-vibrant-orange transition-colors">
                  <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>

              {/* Author & CTA */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl shadow-inner border border-slate-200">
                    {featuredPost.author.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{featuredPost.author.name}</h4>
                    <p className="text-[11px] text-slate-500">{featuredPost.author.role}</p>
                  </div>
                </div>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1 bg-vibrant-orange hover:bg-vibrant-orange/90 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all uppercase tracking-wider"
                >
                  Read Story ➔
                </Link>
              </div>
            </div>
          </div>
        )}



        {/* Category Filters */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-lg scale-105"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.length > 0 ? (
            regularPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                    {post.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
                      <span>⏱️ {post.readTime}</span>
                      <span>•</span>
                      <span>📅 {post.publishedAt}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-vibrant-orange transition-colors line-clamp-2">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{post.author.avatar}</span>
                      <span className="text-xs font-semibold text-slate-700">{post.author.name}</span>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-xs font-bold text-vibrant-orange hover:underline flex items-center gap-1"
                    >
                      Read post ➔
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
              <span className="text-4xl">🔍</span>
              <h3 className="text-lg font-bold text-slate-800">No articles match your search</h3>
              <p className="text-xs text-slate-500">Try selecting a different category or clearing search keywords.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs transition-all"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Interactive Parent & Student Newsletter CTA */}
        <div className="bg-gradient-to-r from-amber-500 to-vibrant-orange text-white rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            🧠 Join 5,000+ Smart Parents
          </div>
          <h2 className="text-2xl sm:text-4xl font-black leading-tight">
            Get Weekly Brain Workout Challenges & Math Shortcuts Delivered
          </h2>
          <p className="text-white/90 text-sm max-w-2xl mx-auto">
            Receive exclusive Anzan mental math puzzles, Vedic multiplication tips, and child focus guides every Sunday morning.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const input = form.querySelector("input") as HTMLInputElement;
              if (input && input.value) {
                const subs = JSON.parse(localStorage.getItem("aaa_newsletter_subscribers") || "[]");
                subs.push({ email: input.value, subscribedAt: new Date().toISOString() });
                localStorage.setItem("aaa_newsletter_subscribers", JSON.stringify(subs));
                setIsChallengeModalOpen(true);
                input.value = "";
              }
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter parent email..."
              className="w-full px-4 py-3 rounded-2xl text-slate-900 text-sm font-medium focus:outline-none shadow-inner"
            />
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase px-6 py-3 rounded-2xl shadow-lg transition-all whitespace-nowrap cursor-pointer"
            >
              Subscribe & Try Sample
            </button>
          </form>

          <div className="pt-2">
            <button
              onClick={() => setIsChallengeModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-white/90 hover:bg-white px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              ⚡ Click Here to Preview This Week's Sample Brain Challenge
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Sample Brain Workout Challenge Modal */}
      {isChallengeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧠</span>
                <div>
                  <h3 className="text-base font-black text-slate-900">Sample Sunday Brain Challenge</h3>
                  <p className="text-xs text-vibrant-orange font-bold">Vedic Math & Anzan Speed Test</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsChallengeModalOpen(false);
                  setUserChallengeAns("");
                  setChallengeStatus(null);
                }}
                className="w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full font-black text-xs flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 p-5 rounded-2xl space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2.5 py-1 rounded-md">
                Speed Problem #104
              </span>
              <h4 className="text-lg font-black text-slate-900">
                Multiply using Nikhilam Sutra: <span className="text-vibrant-orange">98 × 96</span> = ?
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                Hint: 98 is (-2) from 100, 96 is (-4) from 100. (98 - 4 = 94) and (-2 × -4 = 08).
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (userChallengeAns.trim() === "9408") {
                    setChallengeStatus(true);
                  } else {
                    setChallengeStatus(false);
                  }
                }}
                className="flex gap-2 pt-2"
              >
                <input
                  type="number"
                  required
                  placeholder="Enter answer..."
                  value={userChallengeAns}
                  onChange={(e) => {
                    setUserChallengeAns(e.target.value);
                    setChallengeStatus(null);
                  }}
                  className="w-full px-4 py-2.5 bg-white border border-amber-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-vibrant-orange hover:bg-vibrant-orange/90 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
                >
                  Submit
                </button>
              </form>

              {challengeStatus === true && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                  🎉 Bingo! 98 × 96 = 9408. Your child will receive challenges like this every Sunday!
                </div>
              )}
              {challengeStatus === false && (
                <div className="p-3 bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold rounded-xl flex items-center gap-2">
                  ❌ Not quite. 98 × 96 = 9408. Give it another try!
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-slate-500 font-medium">
              <div>
                <span className="font-bold text-slate-800 block">
                  Curated by Neha Patil (Founder & Director) / Nitin Patil (Chief Mentor)
                </span>
                <span className="text-[10px] text-vibrant-orange font-semibold block">
                  📍 Arnav Abacus Academy • Wakad, Pune, Maharashtra, India
                </span>
              </div>
              <button
                onClick={() => {
                  setIsChallengeModalOpen(false);
                  setUserChallengeAns("");
                  setChallengeStatus(null);
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl uppercase tracking-wider cursor-pointer whitespace-nowrap self-end sm:self-auto"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}



