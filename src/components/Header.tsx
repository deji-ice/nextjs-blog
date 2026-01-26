"use client";

import React from "react";
import Link from "next/link";
import Search from "./Search";
import Share from "./Share";
// import { Search as SearchIcon, Share, Share2 as ShareIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950 border-b border-slate-800">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-5 flex items-center justify-between">
        {/* Logo (Left) */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex flex-col group">
            <h1 className="text-xl md:text-2xl font-cabinet-grotesk font-bold text-white title-tight group-hover:text-indigo-400 transition-colors">
              The Code Chronicles
            </h1>
            <p className="text-[10px] md:text-[11px] font-lato font-medium text-slate-300 uppercase tracking-[0.15em]">
              {"Every developer's "}
              <span className="underline underline-offset-4 decoration-[3px] decoration-yellow-600 text-white">
                favorite blog
              </span>
            </p>
          </Link>
        </div>

        {/* Action Area (Right) */}
        <div className="flex items-center gap-2 md:gap-4">
          <Search iconClassName="text-white" />
          <Share classNames="w-5 h-5 text-white hover:text-indigo-400 transition-colors cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
