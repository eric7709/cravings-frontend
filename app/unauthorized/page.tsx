"use client";

import Link from "next/link";
import { useUserStore } from "@/models/auth/store";

export default function Page() {
  const { user } = useUserStore();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        {/* Lock Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-bold text-white mb-4">401</h1>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-white mb-3">
          Unauthorized Access
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          You don't have permission to access this page.
        </p>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          {/* ✅ Show only if NOT logged in */}
          {!user && (
            <Link
              href="/auth/login"
              className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Sign In
            </Link>
          )}

          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
            className="px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
