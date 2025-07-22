import Image from "next/image";
import Link from "next/link";
import { MagnifyingGlassIcon, ShareIcon } from "@heroicons/react/24/solid";
import Share from "./Share";
import Search from "./Search";

const Header = () => {
  return (
    <header className="flex justify-center bg-slate-950 lg:space-x-16 xl:w-screen xl:px-20 overflow-x-clip items-center lg:mb-5 font-bold px-5 md:px-10 py-3">
      <div className="md:flex hidden flex-5 gap-5 xl:gap-8 items-center">
        <Search />
        <Share classNames="w-5 xl:w-6 text-white" />
      </div>

      <Link
        className="flex flex-5 md:flex-1 flex-col justify-center py-2 items-center"
        href={"/"}
      >
        <h1 className="hover:cursor-pointer text-2xl leading-6 md:text-3xl text-white lg:text-4xl">
          <span className="text-xl md:text-2xl lg:text-3xl">The </span>
          Code Chronicles
        </h1>
        <h2 className="mt-2 text-xs lg:mt-2 text-white lg:text-base xl:text-sm font-medium">
          welcome to{" "}
          <span className="underline underline-offset-2 decoration-2 decoration-yellow-600">
            Every developers
          </span>{" "}
          favorite blog
        </h2>
      </Link>

      <span className="flex md:hidden flex-1 px-10"></span>

      <div className="flex-col flex-2 lg:flex-4 justify-center items-center space-y-6">
        <div className="flex">
          <button className="inline-flex p-2 xl:px-4 items-center justify-center text-sm md:text-base xl:text-lg font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all duration-200 gap-1 group">
            <svg
              className="h-4 group-hover:animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
            <span>Subscribe</span>
          </button>
        </div>
        
        <div className="flex md:hidden justify-center flex-5 gap-5 items-center">
          <div className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
            <Search />
          </div>
          <div className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
            <Share classNames="w-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;