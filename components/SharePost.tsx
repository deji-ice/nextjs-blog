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
        fullURL,
      )}`,
      "_blank",
    );
  };

  const handleTwitterShare = () => {
    const fullURL = `${window.location.origin}${pathname}`;
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullURL)}`,
      "_blank",
    );
  };

  const handleLinkedInShare = () => {
    const fullURL = `${window.location.origin}${pathname}`;
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        fullURL,
      )}`,
      "_blank",
    );
  };
  return (
    <div className="text-white flex  gap-4 items-center ">
      {/* <button
        onClick={handleCopy}
        style={{ textShadow: "0px 1px 1px rgba(0,0,0,0.5)" }}
        className="flex items-center cursor-pointer font-medium  shadow-md text-center px-3  py-2 gap-2 text-sm border border-white rounded-[10px]"
        aria-label={copied ? "Copied!" : "Copy link to clipboard"}
        type="button"
      >
      
        <FaRegCopy />
        <span className={` ${copied ? "inline" : "hidden"}`}>
          {copied ? " Copied!" : ""}
        </span>
      </button> */}

      <button
        onClick={handleLinkedInShare}
        type="button"
        className="text-center cursor-pointer "
        aria-label="Share on LinkedIn"
      >
        {/* @ts-ignore */}
        <FaLinkedinIn className="text-[rgba(164,167,174,1)] h-4 w-4 lg:h-6 lg:w-6 text-[24px]" />
      </button>
      <button
        onClick={handleTwitterShare}
        type="button"
        className="text-center cursor-pointer "
        aria-label="Share on Twitter"
      >
        {/* @ts-ignore */}
        <FaXTwitter  className="text-[rgba(164,167,174,1)] h-4 w-4 lg:h-6 lg:w-6 text-[24px]"/>
      </button>
      <button
        onClick={handleFacebookShare}
        type="button"
        className="text-center cursor-pointer"
        aria-label="Share on Facebook"
      >
        {/* @ts-ignore */}
        <FaSquareFacebook  className="text-[rgba(164,167,174,1)] h-4 w-4 lg:h-6 lg:w-6 text-[24px]"/>
      </button>
    </div>
  );
};

export default SharePost;
