// "use client";

// // /auth/signin/page.js
// import { signIn } from "next-auth/react";

// export default function SignIn() {
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await signIn("credentials", {
//       redirect: false,
//       username: e.target.username.value,
//       password: e.target.password.value,
//     });

//     if (result.error) {
//       alert(result.error);
//     } else {
//       window.location.href = "/admin/dashboard";
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="username" type="text" placeholder="Username" required />
//       <input name="password" type="password" placeholder="Password" required />
//       <button type="submit">Sign In</button>
//     </form>
//   );
// }

"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff } from "lucide-react"; // Import icons for the toggle

export default function SignIn() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn("credentials", {
        username: credentials.username,
        password: credentials.password,
        redirect: false,
      });

      if (result.error) {
        setError("Invalid username or password");
        return;
      }

      // Redirect based on user role
      router.push("/admin/dashboard");
      router.refresh();
    } catch (error) {
      setError("An error occurred during sign in");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('/schoolchildren-with-blackboard-background.jpg')",
      }}
    >
      {/* Semi-transparent overlay for better readability if needed */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Content container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <Card className="bg-white bg-opacity-90 shadow-xl">
              <CardHeader>
                <h1 className="text-2xl font-bold">Admin Login</h1>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-2">Username</label>
                    <Input
                      required
                      placeholder="Enter your username"
                      value={credentials.username}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          username: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Enter your password"
                        value={credentials.password}
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            password: e.target.value,
                          })
                        }
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
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

                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>

                {error && (
                  <Alert className="mt-4 bg-red-50">
                    <AlertDescription className="text-red-600">
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
}
