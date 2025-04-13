import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('/schoolchildren-with-blackboard-background.jpg')",
      }}
    >
      {/* Background overlay - lowest z-index */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>

      {/* Page content container - this wraps both navbar and main content */}
      <div className="relative flex flex-col min-h-screen z-10">
        {/* Navbar container */}
        <div className="w-full">
          <Navbar />
        </div>

        {/* Main Content */}
        <div className="flex-grow flex items-center justify-center p-1">
          <div className="text-center bg-white bg-opacity-80 p-8 rounded-lg shadow-xl max-w-2xl mx-8 my-4">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">Hi👋,</h1>
            <p className="text-xl text-gray-700 mb-6">
              Welcome to the school's Management System. Please login to your
              profile.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/student/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-2 rounded-lg font-medium text-lg transition-colors duration-300"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
