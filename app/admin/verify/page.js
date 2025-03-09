"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/navbar/Navbar";

export default function AdminVerification() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!token) {
      setError("Please enter the access token");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid token");
      }

      // Store the token in session storage
      sessionStorage.setItem("adminAccessToken", token);
      
      // Redirect to the admin signup page
      router.push("/auth/signup");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background image positioned absolute to be behind everything */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/schoolchildren-with-blackboard-background.jpg')",
        }}
      />
      
      {/* Fixed navbar with higher z-index to appear above the background */}
      <div className="fixed top-0 left-0 right-0 z-20">
        <Navbar />
      </div>
  
      {/* Main content area with padding-top to account for fixed navbar */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 pt-16">
        <Card className="w-full max-w-md bg-white bg-opacity-90">
          <CardHeader>
            <h1 className="text-2xl font-bold">Admin Access Verification</h1>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="token" className="block text-sm font-medium">
                  Enter Access Token
                </label>
                <Input
                  id="token"
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Enter your access token here"
                  required
                />
              </div>
  
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
            </form>
  
            {error && (
              <Alert className="mt-4 bg-red-50 text-red-800 border-red-200">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}