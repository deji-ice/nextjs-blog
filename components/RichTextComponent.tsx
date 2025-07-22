import urlFor from "@/util/urlFor";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CodeBlock from "./CodeBlock";
import { slugify } from "@/util/formatPathname";

export const RichTextComponent = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full h-96 my-5 justify-center">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Post image"}
            fill
            className="object-contain"
          />
        </div>
      );
    },
    code: ({ value }: any) => {
      return <CodeBlock language={value.language} code={value.code} />;
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="pl-10 text-lg md:pl-6 md:pr-2 md:ml-2 py-5 list-disc space-y-5">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="mt-lg text-lg list-decimal">{children}</ol>
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-8xl py-3 ">{children}</h1>,
    h2: ({ children }: any) => (
      <h2 id={slugify(children[0])} className="text-5xl py-2 font-bold leading-normal">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 id={slugify(children[0])} className="text-4xl py-2 text-start font-bold">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 id={slugify(children[0])} className="text-4xl py-2 font-bold">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-lg py-3 md:text-xl ">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-[blue]  italic font-medium md:text-lg border-l-4 pl-5 my-5 bg-zinc-100 py-5">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link
          className="text-blue-500 font-semibold"
          rel={rel}
          href={value.href}
        >
          {children}
        </Link>
      );
    },
  },
};
