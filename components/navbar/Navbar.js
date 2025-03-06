import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-bold text-xl text-blue-600">
              SM-S
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              href="#"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              School Activities
            </Link>
            <Link
              href="/student/login"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Student Login
            </Link>
            <Link
              href="/auth/signin"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Admin Login
            </Link>
            {/* Commented out signup button */}
            {/* <Link
              href="/auth/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Admin Sign Up
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;