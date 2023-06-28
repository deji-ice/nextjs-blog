import Image from "next/image";
import Link from "next/link";
import logo from "../assets/LOGO.png";

const Header = () => {
  return (
    <header className="flex justify-between space-x-16 xl:w-screen xl:px-20  items-center mt-8 xl:mt-3 font-bold px-5 md:px-10  py-5">
      <div className="flex flex-col items-start ">

        <Link href={"/"}>
          <h1 className="hover:cursor-pointer text-2xl leading-6 md:text-4xl text-slate-800 lg:text-6xl">
            <span className="text-lg md:text-2xl lg:text-4xl">The</span>
            <br /> Code <br /> Chronicles
          </h1>
          </Link>
          <h2 className="mt-2 text-xs lg:mt-2 lg:text-lg">
            welcome to{" "}
            <span className="underline underline-offset-2 decoration-4 decoration-blue-500">
              Every developers
            </span>{" "}
            favorite blog
          </h2>
      </div>
      <div className="flex flex-col items-end justify-between  ">
        <Link
          href={"/"}
          className="relative px-3 py-2 lg:px-7 lg:py-5 font-bold text-sm lg:text-lg text-white group"
        >
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform
           -translate-x-2 -translate-y-2 bg-slate-900 group-hover:translate-x-0 group-hover:translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
          <span className="relative">Newsletter 🚀 </span>
        </Link>
        <p className="mt-5 lg:mt-8 text-gray-400 text-xs hyphens-auto lg:text-lg max-w-[15rem] lg:text-right lg:max-w-[21rem]">
          New products | Tech solutions | more and more!
        </p>
      </div>
    </header>
  );
};

export default Header;
