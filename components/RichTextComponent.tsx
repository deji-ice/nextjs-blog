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
      <ul className="ml-6 list-disc space-y-2 text-base md:text-lg py-4">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="ml-6 list-decimal space-y-2 text-base md:text-lg py-4">
        {children}
      </ol>
    ),
  },

  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl  md:text-5xl lg:text-6xl font-heading font-bold py-4">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2
        id={slugify(children[0])}
        className="text-2xl md:text-4xl font-heading lg:text-5xl font-bold py-3"
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3
        id={slugify(children[0])}
        className="text-xl md:text-3xl font-heading lg:text-4xl font-semibold py-3"
      >
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4
        id={slugify(children[0])}
        className="text-lg md:text-2xl font-heading lg:text-3xl font-semibold py-2"
      >
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-base md:text-lg leading-relaxed py-3">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 bg-gray-50 italic pl-4 md:pl-6 py-4 my-6">
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
