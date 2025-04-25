"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray bg-opacity-60 shadow-md">
      <div className="max-w-6xl mx-auto px-4 ">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span
                className="text-3xl font-bold text-teal-500"
                style={{
                  fontFamily: "'Underdog', cursive",
                  textShadow:
                    "0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white",
                }}
              >
                SMSY
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              href="/"
              className={`px-3 py-2 transition-colors ${
                pathname === "/"
                  ? "text-white font-medium bg-teal-600"
                  : "text-white hover:text-teal-500 bg-gray-900/30"
              }`}
            >
              Home
            </Link>
            <Link
              href="/student/login"
              className={`px-3 py-2 transition-colors ${
                pathname === "/student/login"
                  ? "text-white font-medium bg-teal-600"
                  : "text-white hover:text-teal-500 bg-gray-900/30"
              }`}
            >
              Student Login
            </Link>
            <Link
              href="/admin/signin"
              className={`px-3 py-2 transition-colors ${
                pathname === "/admin/signin"
                  ? "text-white font-medium bg-teal-600"
                  : "text-white hover:text-teal-500 bg-gray-900/30"
              }`}
            >
              Admin Login
            </Link>
            <Link
              href="/admin/signup"
              className={`px-3 py-2 transition-colors ${
                pathname === "/admin/signup"
                  ? "text-white font-medium bg-teal-600"
                  : "text-white hover:text-teal-500 bg-gray-900/30"
              }`}
            >
              Admin Signup
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2-md text-white hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
          <Link
            href="/"
            className={`block px-3 py-2 transition-colors ${
              pathname === "/"
                ? "text-white font-medium bg-teal-600"
                : "text-white hover:text-teal-500 bg-gray-900/30"
            }`}
          >
            Home
          </Link>
          <Link
            href="/student/login"
            className={`block px-3 py-2 transition-colors ${
              pathname === "/student/login"
                ? "text-white font-medium bg-teal-600"
                : "text-white hover:text-teal-500 bg-gray-900/30"
            }`}
          >
            Student Login
          </Link>
          <Link
            href="/admin/signin"
            className={`block px-3 py-2 transition-colors ${
              pathname === "/admin/signin"
                ? "text-white font-medium bg-teal-600"
                : "text-white hover:text-teal-500 bg-gray-900/30"
            }`}
          >
            Admin Login
          </Link>
          <Link
            href="/admin/signup"
            className={`block px-3 py-2 transition-colors ${
              pathname === "/admin/signup"
                ? "text-white font-medium bg-teal-600"
                : "text-white hover:text-teal-500 bg-gray-900/30"
            }`}
          >
            Admin Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
