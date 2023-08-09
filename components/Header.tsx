import Image from "next/image";
import Link from "next/link";
import logo from "../assets/LOGO.png";
import { MagnifyingGlassIcon, ShareIcon } from "@heroicons/react/24/solid";
const Header = () => {
  return (
    <header
      className="flex justify-center bg-slate-950 space-x-16 xl:w-screen xl:px-20 overflow-x-clip items-center
     mt-8 xl:mt-0 mb-5 font-bold px-5 md:px-10 py-3"
    >
      <div className="flex flex-5 gap-5">
        <MagnifyingGlassIcon className="w-5 text-white hover:cursor-pointer" />
        <ShareIcon className="w-5 text-white hover:cursor-pointer" />
      </div>

      <Link className="flex flex-1 flex-col justify-center items-center" href={"/"}>
        <h1 className="hover:cursor-pointer flex-3 text-2xl leading-6 md:text-4xl text-white lg:text-4xl">
          <span className="text-xl md:text-2xl lg:text-2xl">The </span>
          Code Chronicles
        </h1>
        <h2 className="mt-2 text-xs lg:mt-2 text-white lg:text-base font-medium">
          welcome to{" "}
          <span className="underline underline-offset-2 decoration-2 decoration-white">
            Every developers
          </span>{" "}
          favorite blog
        </h2>
      </Link>

      {/* <h2 className="mt-2 text-xs lg:mt-2 lg:text-lg">
          welcome to{" "}
          <span className="underline underline-offset-2 decoration-4 decoration-blue-500">
            Every developers
          </span>{" "}
          favorite blog
        </h2> */}

      <div className="flex-col flex-4 justify-center items-center ">
        
      <button  className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-slate-700 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
<span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-slate-800 group-hover:h-full"></span>
<span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
<svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Newsletter</span>
</button>
      </div>
    </header>
  );
};

export default Header;
