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

// app/auth/signin/page.js
"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SignIn() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

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

  return (
    <div>
      <Navbar />

      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
        style={{
          backgroundImage:
            "url('/schoolchildren-with-blackboard-background.jpg')",
        }}
      >
        <div className="max-w-md w-full">
          <Card className="bg-white bg-opacity-90 shadow-xl">
            <CardHeader>
              <h1 className="text-2xl font-bold">Admin Sign In</h1>
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
                  <Input
                    type="password"
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
  );
}
