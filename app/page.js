import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/school3.jpg')",
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
          <div className="text-left bg-gray-900 bg-opacity-60 p-4 md:p-8 shadow-xl max-w-2xl mx-4 md:mx-8 my-4 border-2 border-white">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Hi👋
            </h1>
            <p className="text-lg md:text-xl text-white mb-6">
              Welcome to the School's Management System. Please login to your
              profile.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/student/login"
                className="bg-teal-600 hover:bg-teal-700 text-white px-5 md:px-7 py-2 font-medium text-lg transition-colors duration-300"
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
