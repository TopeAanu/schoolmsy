// app/page.js
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Main Content with background - you can add your image here */}
      <div
        className="flex-grow flex items-center justify-center bg-cover bg-center h-[calc(100vh-4rem)]"
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