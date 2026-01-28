"use client";

import { useState, useEffect } from "react";
import { List } from "lucide-react";

type Heading = {
  _key: string;
  style: string;
  children: Array<{ text: string }>;
};

type TableOfContentsProps = {
  headings: Heading[];
  className?: string;
};

const TableOfContents = ({ headings, className }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px",
        threshold: 0,
      },
    );

    // Observe all headings
    const headingElements = headings.map((h) => {
      const text = h.children[0]?.text || "";
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return document.getElementById(id);
    });

    headingElements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <nav
      className={`${className} bg-white rounded-xl border border-gray-200 p-6 sticky top-[15vh]`}
      aria-label="Table of contents"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
        <List className="w-5 h-5 text-gray-700" />
        <h2 className="font-bold text-base text-gray-900">Table of Contents</h2>
      </div>

      {/* Navigation List */}
      <ul className="space-y-3">
        {headings.map((h) => {
          const text = h.children[0]?.text || "";
          const id = slugify(text);
          const isActive = activeId === id;

          return (
            <li key={h._key} className="relative">
              <a
                href={`#${id}`}
                className={`
                  block text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "text-indigo-900 font-semibold pl-4"
                      : "text-gray-600 hover:text-gray-900 pl-4"
                  }
                `}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                {/* Active Indicator */}
                <span
                  className={`
                    absolute left-0 top-1/2 -translate-y-1/2 h-full w-1 rounded-l-full transition-all duration-200
                    ${isActive ? "bg-indigo-900" : "bg-transparent"}
                  `}
                />
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;
