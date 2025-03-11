"use client";

import Navbar from "@/components/navbar/Navbar";
import { VerificationForm } from "@/components/admin/VerificationForm";

export default function AdminVerification() {
  return (
    <div className="relative min-h-screen">
      {/* Background image positioned absolute to be behind everything */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/schoolchildren-with-blackboard-background.jpg')",
        }}
      />
      {/* Semi-transparent overlay for better readability if needed */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Fixed navbar with higher z-index to appear above the background */}
      <div className="fixed top-0 left-0 right-0 z-20">
        <Navbar />
      </div>

      {/* Main content area with padding-top to account for fixed navbar */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 pt-16">
        <VerificationForm />
      </div>
    </div>
  );
}