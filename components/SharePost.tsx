"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  FaLinkedinIn,
  FaRegCopy,
  FaSquareFacebook,
  FaXTwitter,
} from "react-icons/fa6";

const SharePost = () => {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  const handleCopy = async () => {
    try {
      const fullURL = `${window.location.origin}${pathname}`;
      await navigator.clipboard.writeText(fullURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleFacebookShare = () => {
    const fullURL = `${window.location.origin}${pathname}`;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        fullURL
      )}`,
      "_blank"
    );
  };

  const handleTwitterShare = () => {
    const fullURL = `${window.location.origin}${pathname}`;
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullURL)}`,
      "_blank"
    );
  };

  const handleLinkedInShare = () => {
    const fullURL = `${window.location.origin}${pathname}`;
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        fullURL
      )}`,
      "_blank"
    );
  };
  return (
    <div className="text-white flex gap-4 items-center ">
      <button
        onClick={handleCopy}
        style={{ textShadow: "0px 1px 1px rgba(0,0,0,0.5)" }}
        className="flex items-center cursor-pointer font-medium gap-2 shadow-md text-center px-3  py-2 lg:py-1 text-sm border border-white rounded-[10px]"
        aria-label={copied ? "Copied!" : "Copy link to clipboard"}
        type="button"
      >
        {/* @ts-ignore */}
        <FaRegCopy />
        <span className="hidden sm:inline">
          {copied ? "Copied!" : "Copy Link"}
        </span>
      </button>

      <button
        onClick={handleLinkedInShare}
        type="button"
        className="text-center cursor-pointer px-3  py-2 text-sm border shadow-md border-white rounded-[10px]"
        aria-label="Share on LinkedIn"
      >
        {/* @ts-ignore */}
        <FaLinkedinIn />
      </button>
      <button
        onClick={handleTwitterShare}
        type="button"
        className="text-center cursor-pointer px-3  py-2 text-sm shadow-md border  border-white rounded-[10px]"
        aria-label="Share on Twitter"
      >
        {/* @ts-ignore */}
        <FaXTwitter />
      </button>
      <button
        onClick={handleFacebookShare}
        type="button"
        className="text-center cursor-pointer px-3  py-2 text-sm  shadow-md border border-white rounded-[10px]"
        aria-label="Share on Facebook"
      >
        {/* @ts-ignore */}
        <FaSquareFacebook />
      </button>
    </div>
  );
};

export default SharePost;
