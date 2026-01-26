"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { groq } from "next-sanity";
import { SearchIcon, XIcon } from "lucide-react";
import { client } from "@/sanity/lib/client";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  _createdAt: string;
}

const Search = ({
  iconClassName = "text-slate-600",
}: {
  iconClassName?: string;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        closeSearch();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showSearchBar && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearchBar]);

  useEffect(() => {
    // Reset if search term is too short
    if (searchTerm.trim().length < 3) {
      setSearchResults([]);
      setIsLoading(false);
      setError(null);
      setSelectedIndex(-1);
      return;
    }

    setIsLoading(true);
    setError(null);

    const delayedSearch = setTimeout(async () => {
      try {
        // Improved GROQ query with better text matching and ranking
        const query = groq`*[_type == "post" && (
  title match $searchTerm ||
  pt::text(body) match $searchTerm ||
  description match $searchTerm
)] | order(
  select(
    title match $searchTerm => 0,
    description match $searchTerm => 1,
    2
  ),
  _createdAt desc
) [0...10] {
  _id, title, slug, description, _createdAt
}`;

        const results = await client.fetch(query, {
          searchTerm: `*${sanitizeSearchTerm(searchTerm)}*`,
        });

        setSearchResults(results);
        setSelectedIndex(-1);
      } catch (err) {
        console.error("Search error:", err);
        setError("Something went wrong. Please try again.");
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const sanitizeSearchTerm = (term: string): string => {
    // Remove special characters that might break GROQ queries
    return term.replace(/[^\w\s]/gi, "").trim();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      closeSearch();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const selectedPost = searchResults[selectedIndex];
      if (selectedPost) {
        window.location.href = `/post/${selectedPost.slug.current}`;
        closeSearch();
      }
    }
  };

  const closeSearch = () => {
    setShowSearchBar(false);
    setSearchTerm("");
    setSearchResults([]);
    setIsLoading(false);
    setError(null);
    setSelectedIndex(-1);
  };

  return (
    <div className="relative max-w-[400px]" ref={searchRef}>
      <button
        onClick={() => setShowSearchBar(true)}
        className="rounded-lg transition-colors cursor-pointer group"
        aria-label="Open search"
      >
        <SearchIcon
          className={`w-5 h-5 ${iconClassName} group-hover:text-indigo-400 transition-colors`}
        />
      </button>

      {showSearchBar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center p-4 border-b font-medium border-gray-200">
              <SearchIcon className="w-5 h-5 text-gray-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search posts, articles, and tutorials..."
                className="flex-1 text-lg placeholder-gray-500 border-none outline-none bg-transparent"
                aria-label="Search input"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors mr-2"
                  aria-label="Clear search"
                >
                  <XIcon className="w-4 h-4 text-gray-400" />
                </button>
              )}
              <button
                onClick={closeSearch}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close search"
              >
                <XIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {isLoading && (
                <div className="p-6 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <p className="text-gray-600 mt-2">Searching...</p>
                </div>
              )}

              {error && (
                <div className="p-6 text-center text-red-500">
                  <p className="text-lg font-medium mb-1">⚠️ {error}</p>
                  <p className="text-sm">Please try a different search term</p>
                </div>
              )}

              {!isLoading &&
                !error &&
                searchTerm.length > 0 &&
                searchTerm.length <= 2 && (
                  <div className="p-6 text-center text-gray-500">
                    <SearchIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Type at least 3 characters to search</p>
                  </div>
                )}

              {!isLoading &&
                !error &&
                searchResults.length === 0 &&
                searchTerm.length > 2 && (
                  <div className="p-6 text-center text-gray-500">
                    <div className="text-6xl mb-3">🔍</div>
                    <p className="text-lg font-medium mb-1">No results found</p>
                    <p className="text-sm">
                      Try different keywords or check your spelling
                    </p>
                  </div>
                )}

              {!error && searchResults.length > 0 && (
                <div className="divide-y divide-gray-100">
                  {searchResults.map((post: Post, index: number) => (
                    <Link
                      key={post._id}
                      href={`/post/${post.slug.current}`}
                      onClick={closeSearch}
                      className={`block p-4 transition-colors group ${
                        index === selectedIndex
                          ? "bg-blue-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            index === selectedIndex
                              ? "bg-blue-600"
                              : "bg-blue-500 opacity-60 group-hover:opacity-100"
                          }`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`text-sm font-medium line-clamp-1 ${
                              index === selectedIndex
                                ? "text-blue-700"
                                : "text-gray-900 group-hover:text-blue-600"
                            }`}
                          >
                            {post.title}
                          </h3>
                          {post.description && (
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {post.description}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(post._createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {searchTerm.length > 2 && !isLoading && !error && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      Press ↑↓ to navigate • Enter to select • Esc to close
                    </span>
                    {searchResults.length > 0 && (
                      <span>
                        {searchResults.length} result
                        {searchResults.length !== 1 ? "s" : ""} found
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
