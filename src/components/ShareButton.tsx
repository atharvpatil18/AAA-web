import React, { useState } from "react";
import { Share2, Check, Copy, MessageSquare, Facebook, Twitter, Mail } from "lucide-react";

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  variant?: "icon" | "button" | "full";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function ShareButton({
  title = "Arnav Abacus Academy",
  text = "Check this out at Arnav Abacus Academy!",
  url,
  variant = "button",
  className = "",
  size = "md",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const getTargetUrl = () => {
    if (url) {
      if (url.startsWith("http")) return url;
      return `${window.location.origin}${window.location.pathname}#${url.startsWith('/') ? '' : '/'}${url}`;
    }
    return window.location.href;
  };

  const shareUrl = getTargetUrl();

  const handleNativeShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      setShowOptions(!showOptions);
    }
  };

  const copyToClipboard = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title}: ${text}\n${shareUrl}`)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
  const mailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\nLink: ${shareUrl}`)}`;

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3.5 py-2 text-xs md:text-sm gap-2",
    lg: "px-5 py-2.5 text-sm md:text-base gap-2.5",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  if (variant === "icon") {
    return (
      <div className="relative inline-block">
        <button
          onClick={handleNativeShare}
          title="Share link"
          className={`p-2 rounded-xl bg-white border-2 border-vibrant-dark shadow-[2px_2px_0_0_#1A2E35] hover:bg-vibrant-cream active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center text-vibrant-dark ${className}`}
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
        </button>

        {showOptions && !navigator.share && (
          <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-vibrant-dark rounded-2xl shadow-[4px_4px_0_0_#1A2E35] p-2 z-50 flex flex-col gap-1 text-xs font-bold">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 p-2 hover:bg-vibrant-cream rounded-xl text-left text-vibrant-dark"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied Link!" : "Copy Link"}
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 hover:bg-emerald-50 rounded-xl text-emerald-700"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 hover:bg-blue-50 rounded-xl text-blue-700"
            >
              <Facebook className="w-4 h-4" /> Facebook
            </a>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 hover:bg-sky-50 rounded-xl text-sky-600"
            >
              <Twitter className="w-4 h-4" /> Twitter / X
            </a>
            <a
              href={mailUrl}
              className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-xl text-slate-700"
            >
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-1.5">
        <button
          onClick={handleNativeShare}
          className={`inline-flex items-center justify-center font-black rounded-xl border-2 border-vibrant-dark bg-white text-vibrant-dark shadow-[2px_2px_0_0_#1A2E35] hover:bg-vibrant-cream active:translate-y-0.5 active:shadow-none transition-all ${sizeClasses[size]} ${className}`}
        >
          <Share2 className={iconSizes[size]} />
          <span>Share</span>
        </button>

        <button
          onClick={copyToClipboard}
          title="Copy direct link"
          className={`inline-flex items-center justify-center font-black rounded-xl border-2 border-vibrant-dark bg-[#FFF5CC] text-vibrant-dark shadow-[2px_2px_0_0_#1A2E35] hover:bg-amber-100 active:translate-y-0.5 active:shadow-none transition-all ${sizeClasses[size]}`}
        >
          {copied ? (
            <>
              <Check className={`${iconSizes[size]} text-emerald-700`} />
              <span className="text-emerald-800">Copied!</span>
            </>
          ) : (
            <>
              <Copy className={iconSizes[size]} />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>

      {showOptions && !navigator.share && (
        <div className="absolute left-0 mt-2 w-52 bg-white border-2 border-vibrant-dark rounded-2xl shadow-[4px_4px_0_0_#1A2E35] p-2 z-50 flex flex-col gap-1 text-xs font-bold">
          <div className="px-2 py-1 text-[10px] uppercase text-gray-400 font-extrabold tracking-wider">Share via</div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 hover:bg-emerald-50 rounded-xl text-emerald-700"
          >
            <MessageSquare className="w-4 h-4" /> WhatsApp
          </a>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 hover:bg-blue-50 rounded-xl text-blue-700"
          >
            <Facebook className="w-4 h-4" /> Facebook
          </a>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 hover:bg-sky-50 rounded-xl text-sky-600"
          >
            <Twitter className="w-4 h-4" /> Twitter / X
          </a>
          <a
            href={mailUrl}
            className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-xl text-slate-700"
          >
            <Mail className="w-4 h-4" /> Email
          </a>
        </div>
      )}
    </div>
  );
}
