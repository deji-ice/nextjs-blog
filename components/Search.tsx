"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { groq } from "next-sanity";
import { client } from "@/util/sanity.client";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    const delayedSearch = setTimeout(async () => {
      if (searchTerm.trim().length > 2) {
        setIsLoading(true);
        try {
          const query = groq`*[_type == "post" && (title match $searchTerm || body[].children[].text match $searchTerm)] | order(_createdAt desc) [0...5] {
            _id,
            title,
            slug,
            description,
            _createdAt
          }`;

          const results = await client.fetch(query, {
            searchTerm: `*${searchTerm}*`,
          });
          setSearchResults(results);
        } catch (err) {
          console.error(err);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      closeSearch();
    }
  };

  const closeSearch = () => {
    setShowSearchBar(false);
    setSearchTerm("");
    setSearchResults([]);
    setIsLoading(false);
  };

  return (
    <div className="relative max-w-[400px]" ref={searchRef}>
      <div
        onClick={() => setShowSearchBar(true)}
        className="p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group"
      >
        <MagnifyingGlassIcon className="w-5 xl:w-6 text-white group-hover:text-blue-400 transition-colors" />
      </div>

      {showSearchBar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center p-4 border-b border-gray-200">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search posts, articles, and tutorials..."
                className="flex-1 text-lg placeholder-gray-500 border-none outline-none bg-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors mr-2"
                >
                  <XMarkIcon className="w-4 h-4 text-gray-400" />
                </button>
              )}
              <button
                onClick={closeSearch}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {isLoading && (
                <div className="p-6 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <p className="text-gray-600 mt-2">Searching...</p>
                </div>
              )}

              {!isLoading &&
                searchTerm.length > 0 &&
                searchTerm.length <= 2 && (
                  <div className="p-6 text-center text-gray-500">
                    <MagnifyingGlassIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Type at least 3 characters to search</p>
                  </div>
                )}

              {!isLoading &&
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

              {searchResults.length > 0 && (
                <div className="divide-y divide-gray-100">
                  {searchResults.map((post: Post) => (
                    <Link
                      key={post._id}
                      href={`/post/${post.slug.current}`}
                      onClick={closeSearch}
                      className="block p-4 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 opacity-60 group-hover:opacity-100"></div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-1">
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

              {searchTerm.length > 2 && !isLoading && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Press Esc to close</span>
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
