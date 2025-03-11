"use client";

import Navbar from "@/components/navbar/Navbar";
import { VerificationForm } from "@/components/admin/VerificationForm";

export default function AdminVerification() {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/schoolchildren-with-blackboard-background.jpg')",
        }}
      />
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="fixed top-0 left-0 right-0 z-20">
        <Navbar />
      </div>

      {/* Main content area */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 pt-16">
        <VerificationForm />
      </div>
    </div>
  );
}
