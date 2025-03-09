"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";

const StudentLogin = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/student/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store auth token in localStorage
      localStorage.setItem(
        "studentAuth",
        JSON.stringify({
          token: data.token,
          username: credentials.username,
        })
      );

      // Redirect to student dashboard
      router.push("/student/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/schoolchildren-with-blackboard-background.jpg')",
      }}
    >
      {/* Semi-transparent overlay for better readability if needed */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Content container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="max-w-md w-full">
            <Card className="bg-white bg-opacity-90 shadow-xl">
              <CardHeader className="pb-4 md:pb-4">
                <h2 className="text-2xl font-bold">Student Login</h2>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm sm:text-base font-medium">Username</label>
                    <Input
                      required
                      value={credentials.username}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          username: e.target.value,
                        })
                      }
                      placeholder="Enter your username"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm sm:text-base font-medium">Password</label>
                    <Input
                      type="password"
                      required
                      value={credentials.password}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          password: e.target.value,
                        })
                      }
                      placeholder="Enter your password"
                      className="w-full"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full mt-2 md:mt-4" 
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </form>

                {error && (
                  <Alert className="mt-4 bg-red-50">
                    <AlertDescription className="text-red-600 text-sm sm:text-base">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
