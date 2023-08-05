"use client"

import React from "react";
import { usePathname } from 'next/navigation'
import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type Props = {};

const Pathname = (props: Props) => {
    const pathname = usePathname()
    return <p className="flex font-medium space-x-1"><Link href={"/"}><HomeIcon className="w-5"/></Link><Link href={`${pathname}`}>{pathname}</Link></p>
};

export default Pathname;
