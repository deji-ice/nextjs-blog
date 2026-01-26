"use client";
import {
  Share2 as ShareIcon,
  Copy as CopyIcon,
  Facebook as FacebookIcon,
  Linkedin as LinkedinIcon,
  Twitter as TwitterIcon,
  Mail as MailIcon,
  MessageCircle as WhatsappIcon,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

type Props = {
  classNames: string;
};

const Share = ({ classNames }: Props) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const getFullURL = () => `${window.location.origin}${pathname ?? ""}`;

  const toggle = () => setOpen((p) => !p);
  const close = () => setOpen(false);

  // Calculate alignment outside of render
  const [alignment, setAlignment] = useState<"left" | "right">("right");

  const getAlignment = (): "left" | "right" => {
    if (typeof window === "undefined" || !buttonRef.current) return "right";
    
    const rect = buttonRef.current.getBoundingClientRect();
    const menuW = 256; // w-64
    const gutter = 16; // 1rem
    const spaceRight = window.innerWidth - rect.right;

    return spaceRight >= menuW + gutter ? "left" : "right";
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getFullURL());
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
      close();
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleFacebookShare = () => {
    const fullURL = getFullURL();
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullURL)}`,
      "_blank",
      "noopener,noreferrer"
    );
    close();
  };

  const handleTwitterShare = () => {
    const fullURL = getFullURL();
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullURL)}`,
      "_blank",
      "noopener,noreferrer"
    );
    close();
  };

  const handleLinkedInShare = () => {
    const fullURL = getFullURL();
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullURL)}`,
      "_blank",
      "noopener,noreferrer"
    );
    close();
  };

  const handleWhatsAppShare = () => {
    const fullURL = getFullURL();
    const text = encodeURIComponent(fullURL);
    window.open(
      `https://api.whatsapp.com/send?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
    close();
  };

  const handleEmailShare = () => {
    const fullURL = getFullURL();
    const subject = encodeURIComponent("Check this out");
    const body = encodeURIComponent(fullURL);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    close();
  };

  const handleNativeShare = async () => {
    const fullURL = getFullURL();
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url: fullURL });
        close();
      } else {
        await navigator.clipboard.writeText(fullURL);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }
    } catch (e) {
      // user canceled or share failed; no-op
    }
  };

  // Close on outside click / Esc
  React.useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [open]);

  // Update alignment when menu opens or window resizes
  React.useEffect(() => {
    if (!open) return;
    const updateAlignment = () => setAlignment(getAlignment());
    updateAlignment();
    window.addEventListener("resize", updateAlignment);
    return () => window.removeEventListener("resize", updateAlignment);
  }, [open]);
  
  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="share-menu"
        onClick={toggle}
        className="hover:cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
      >
        <span className="sr-only">Open share menu</span>
        <ShareIcon className={classNames} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="share-menu"
            role="menu"
            aria-label="Share options"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className={`absolute top-full ${
              alignment === "right" ? "right-0" : "left-0"
            } mt-2 w-64 max-w-[92vw] rounded-xl bg-white text-slate-900 shadow-xl border border-slate-200 p-3 z-50`}
          >
            {copied && (
              <div className="absolute -top-6 right-0 text-xs bg-slate-900 text-white px-2 py-0.5 rounded shadow">
                Copied!
              </div>
            )}

            <button
              onClick={handleNativeShare}
              role="menuitem"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"
              aria-label="Open device share dialog"
            >
              <ShareIcon className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-medium">Share…</span>
            </button>

            <div className="my-2 h-px bg-slate-200" />

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopy}
                role="menuitem"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"
                aria-label="Copy link"
              >
                <CopyIcon className="w-5 h-5 text-slate-700" />
                <span className="text-sm">Copy link</span>
              </button>

              <button
                onClick={handleTwitterShare}
                role="menuitem"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"
                aria-label="Share on X (Twitter)"
              >
                <TwitterIcon className="w-5 h-5 text-sky-500" />
                <span className="text-sm">X</span>
              </button>

              <button
                onClick={handleFacebookShare}
                role="menuitem"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"
                aria-label="Share on Facebook"
              >
                <FacebookIcon className="w-5 h-5 text-blue-600" />
                <span className="text-sm">Facebook</span>
              </button>

              <button
                onClick={handleLinkedInShare}
                role="menuitem"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"
                aria-label="Share on LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5 text-sky-700" />
                <span className="text-sm">LinkedIn</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                role="menuitem"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"
                aria-label="Share on WhatsApp"
              >
                <WhatsappIcon className="w-5 h-5 text-emerald-600" />
                <span className="text-sm">WhatsApp</span>
              </button>

              <button
                onClick={handleEmailShare}
                role="menuitem"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"
                aria-label="Share by email"
              >
                <MailIcon className="w-5 h-5 text-rose-600" />
                <span className="text-sm">Email</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Share;