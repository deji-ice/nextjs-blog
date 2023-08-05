"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { formatPathname } from "@/util/formatPathname";

type Props = {};

const Pathname = (props: Props) => {
  const pathname = usePathname();
  const newPathname = pathname ? formatPathname(pathname) : ""
  return (
    <p className="flex md:items-center text-xs md:text-base px-5 font-medium space-x-1 md:space-x-1 ">
      <Link href={"/"}>
        <HomeIcon className="w-4 md:w-5 text-gray-500 hover:text-inherit" />
      </Link>
      <span>/</span>
      <Link className="font-bold" href={`${pathname}`}>
        {newPathname}
      </Link>
    </p>
  );
};

export default Pathname;
