"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import { Eye, EyeOff } from "lucide-react"; // Import icons for the toggle

const StudentLogin = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

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

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-black dark:text-dark"
      style={{
        backgroundImage: "url('/school4.jpg')",
      }}
    >
      {/* Semi-transparent overlay for better readability if needed */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Content container */}
      <div className="relative z-10 min-h-screen flex flex-col ">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="max-w-md w-full">
            <Card className="bg-gray-600 bg-opacity-60 shadow-xl border-2 border-white">
              <CardHeader className="pb-4 md:pb-4">
                <h2 className="text-2xl text-white font-bold">Student Login</h2>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm sm:text-base font-medium text-white">
                      Username
                    </label>
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
                      className="w-full bg-gray-500 text-white placeholder:text-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm sm:text-base font-medium text-white">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        required
                        value={credentials.password}
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            password: e.target.value,
                          })
                        }
                        placeholder="Enter your password"
                        className="w-full bg-gray-500 text-white placeholder:text-gray-300"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white focus:outline-none"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 mt-2 md:mt-4"
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
