"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Share from "./Share";
import Search from "./Search";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [{ name: "Home", href: "/" }];

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950 border-b border-slate-800">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-5 flex items-center justify-between">
        {/* Logo (Left) */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex flex-col group">
            <h1 className="text-xl md:text-2xl font-heading font-bold text-white leading-tight group-hover:text-indigo-400 transition-colors">
              The Code Chronicles
            </h1>
            <p className="text-[10px] md:text-[11px] font-medium text-slate-300 uppercase tracking-[0.15em]">
              {"Every developer's "}
              <span className="underline underline-offset-4 decoration-[3px] decoration-yellow-600 text-white">
                favorite blog
              </span>
            </p>
          </Link>
        </div>

        {/* Desktop Nav (Center) */}
        {/* <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] font-bold text-slate-100 hover:text-white transition-colors uppercase tracking-widest px-1"
            >
              {link.name}
            </Link>
          ))}
        </nav> */}

        {/* Action Area (Right) */}
        <div className="flex items-center gap-2 md:gap-4 font-body">
          <div className="flex items-center h-5 gap-3 mr-2">
            <Search iconClassName="text-white" />
            <Share classNames="w-5 h-5 text-white hover:text-indigo-400 transition-colors cursor-pointer" />
          </div>
          {/* Mobile Menu Toggle
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-slate-800 rounded-xl transition-all"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-7 h-7" />
            ) : (
              <Bars3Icon className="w-7 h-7" />
            )}
          </button> */}
        </div>
      </div>

      {/* Mobile Menu (Overlay) */}
      {/* {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[81px] bg-slate-950 z-40 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="p-8 flex flex-col items-center gap-8 h-full bg-slate-950 font-body">
            <nav className="flex flex-col items-center gap-8 w-full mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold text-white py-2 uppercase tracking-wide border-b-2 border-transparent hover:border-yellow-600 transition-all font-heading"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="w-full h-px bg-slate-800 my-4" />

            <div className="flex flex-col items-center gap-6 w-full">
              <div className="flex items-center gap-10 py-1">
                <Search iconClassName="text-white" />
                <Share classNames="w-6 h-6 text-white hover:text-indigo-400 transition-colors" />
              </div>
           
            </div>
          </div>
        </div>
      )} */}
    </header>
  );
};

export default Header;
