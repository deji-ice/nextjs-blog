"use client";
import { ShareIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

type Props = {
  classNames: string;
};

const Share = ({ classNames }: Props) => {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  const handleClick = () => setShow((prev) => !prev);

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
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullURL)}`, "_blank");
  };

  const handleTwitterShare = () => {
    const fullURL = `${window.location.origin}${pathname}`;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullURL)}`, "_blank");
  };

  return (
    <div className="relative">
      <ShareIcon
        className={`${classNames} hover:cursor-pointer`}
        onClick={handleClick}
      />
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="absolute right-2 mt-2 flex flex-col items-center gap-3 px-3 py-2 bg-[#FAF9F6] z-50 drop-shadow-md"
          >
            {copied && (
              <span className="text-xs text-black lg:text-white absolute z-[51] right-[-3rem]">Copied!</span>
            )}
            <ContentCopyIcon
              onClick={handleCopy}
              className="w-5 hover:cursor-pointer"
            />
            <FacebookIcon
              onClick={handleFacebookShare}
              className="w-5 hover:cursor-pointer"
            />
            <TwitterIcon
              onClick={handleTwitterShare}
              className="w-5 hover:cursor-pointer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Share;
