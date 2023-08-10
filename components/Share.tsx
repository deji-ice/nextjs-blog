"use client";
import { ShareIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence

type Props = {
  classNames: string;
};

const Share = ({ classNames }: Props) => {
  const [show, setShow] = useState<boolean>(false);

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className="relative">
      <ShareIcon
        className={`${classNames} hover:cursor-pointer`}
        onClick={handleClick}
      />
      <AnimatePresence>
        {" "}
        {/* Use AnimatePresence */}
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} // Add exit animation
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`mt-2 rounded-b-full rounded-t-3xl absolute flex flex-col items-center justify-center gap-3 
            right-[-20rem] mr-5 w-fit left-0 p-1 pb-2 bg-[#FAF9F6] top-6 z-50 drop-shadow-md `}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ContentCopyIcon
                onClick={handleClick}
                className="w-5 hover:cursor-pointer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <FacebookIcon
                onClick={handleClick}
                className="w-5 hover:cursor-pointer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <TwitterIcon
                onClick={handleClick}
                className="w-5 hover:cursor-pointer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Share;
