"use client";

// components/ui/button.js
import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-2 py-1 text-sm sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
