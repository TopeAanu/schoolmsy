// app/page.js
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
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
                href="/auth/login"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Admin Login
              </Link>
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

      {/* Main Content with background - you can add your image here */}
      <div
        className="flex-grow flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/schoolchildren-with-blackboard-background.jpg')",
        }}
      >
        <div className="text-center bg-white bg-opacity-80 p-8 rounded-lg shadow-xl max-w-2xl">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Welcome to the Student Portal
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            This is the homepage of the student management app. Please sign in
            to access your profile.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/student/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-lg transition-colors duration-300"
            >
              Login
            </Link>
            {/* <Link href="/auth/signup" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium text-lg transition-colors duration-300">
              Admin Sign Up
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
