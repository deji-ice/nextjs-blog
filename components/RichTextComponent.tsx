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
        <figure className="relative w-full h-64 sm:h-80 md:h-96 my-6 rounded-lg overflow-hidden">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Post image"}
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            className="object-contain md:object-cover"
          />
          {value.alt && (
            <figcaption className="mt-2 text-center text-xs text-gray-500">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }: any) => {
      return (
        <div className="my-4 overflow-x-auto rounded-lg">
          <CodeBlock language={value.language} code={value.code} />
        </div>
      );
    },
    hr: () => <hr className="my-8 border-t border-gray-300" />,
    rule: () => <hr className="my-8 border-t border-gray-300" />,
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="ml-5 md:ml-6 list-disc space-y-2 text-base md:text-lg py-4 leading-7 md:leading-8">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="ml-5 md:ml-6 list-decimal space-y-2 text-base md:text-lg py-4 leading-7 md:leading-8">
        {children}
      </ol>
    ),
  },

  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold py-4 leading-tight md:leading-[1.15]">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2
        id={slugify(children[0])}
        className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold lg:pt-10 pt-5 pb-2 leading-tight md:leading-[1.2]"
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3
        id={slugify(children[0])}
        className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold lg:pt-10 pt-5 pb-2 leading-snug"
      >
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4
        id={slugify(children[0])}
        className="text-lg md:text-2xl  font-heading font-semibold py-1.5 lg:py-2 leading-snug"
      >
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5
        id={slugify(children[0])}
        className="text-base md:text-xl lg:text-2xl font-heading font-semibold py-1.5 lg:py-2 leading-snug"
      >
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6
        id={slugify(children[0])}
        className="text-base md:text-lg font-heading font-semibold py-1.5 lg:py-2 leading-snug"
      >
        {children}
      </h6>
    ),
    normal: ({ children }: any) => (
      <p className="text-base md:text-lg leading-7 md:leading-8 py-1">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-slate-300 bg-slate-100 text-slate-700 italic pl-4 md:pl-6 py-4 my-6 rounded-r">
        {children}
      </blockquote>
    ),
  },

  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    underline: ({ children }: any) => (
      <span className="underline underline-offset-2">{children}</span>
    ),
    code: ({ children }: any) => (
      <code className="px-1.5 py-0.5 rounded bg-slate-800/60 text-slate-50 text-[0.85em]">
        {children}
      </code>
    ),
    strike: ({ children }: any) => (
      <span className="line-through">{children}</span>
    ),
    link: ({ children, value }: any) => {
      const isExternal =
        typeof value?.href === "string" && !value.href.startsWith("/");
      const rel = isExternal ? "noreferrer noopener" : undefined;
      const target = isExternal ? "_blank" : undefined;
      return (
        <Link
          className="text-blue-900 hover:underline underline-offset-2"
          rel={rel}
          target={target}
          href={value.href}
        >
          {children}
        </Link>
      );
    },
  },
};
