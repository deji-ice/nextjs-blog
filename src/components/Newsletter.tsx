"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <h2 className="font-bold text-lg text-gray-900 mb-2">
        Subscribe to the Newsletter
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Stay informed with expert analysis, industry trends, and actionable
        tips.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full px-6 py-2.5 bg-indigo-900 text-white text-[13px] font-bold rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>

        {status === "success" && (
          <p className="text-xs text-green-600 text-center">
            Successfully subscribed!
          </p>
        )}
      </form>

      <p className="text-xs text-gray-500 text-center mt-3">
        We care about your{" "}
        <span className="underline cursor-pointer hover:text-gray-700">
          privacy
        </span>
        , we won't spam
      </p>
    </div>
  );
};

export default Newsletter;
