"use client";

// components/ui/card.js
export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-sm overflow-hidden bg-gray-600 bg-opacity-60 shadow-xl border-2 border-white ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}
