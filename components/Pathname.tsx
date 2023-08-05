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
    <p className="flex font-medium space-x-2 md:space-x-1">
      <Link href={"/"}>
        <HomeIcon className="w-5 text-gray-500" />
      </Link>
      <span>/</span>
      <Link className="" href={`${pathname}`}>
        {newPathname}
      </Link>
    </p>
  );
};

export default Pathname;
