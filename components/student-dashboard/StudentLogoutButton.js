"use client";

// components/LogoutButton.js
import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export const StudentLogoutButton = () => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const initiateLogout = () => {
    setShowAlert(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("studentAuth");
    router.push("/student/login");
  };

  const cancelLogout = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <div className="fixed top-0 left-0 right-0 flex justify-center z-50 p-2">
          <div className="mt-2 sm:mt-4 p-2 sm:p-3 bg-white bg-opacity-90 shadow-md rounded-md border border-gray-200 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full max-w-xs sm:max-w-md">
            <p className="text-xs sm:text-sm text-center sm:text-left">
              You are leaving your portal!
            </p>
            <div className="flex space-x-2 w-full sm:w-auto justify-center">
              <Button onClick={confirmLogout} size="sm">
                Yes
              </Button>
              <Button onClick={cancelLogout} variant="outline" size="sm">
                No
              </Button>
            </div>
          </div>
        </div>
      )}
  
      <Button onClick={initiateLogout} variant="outline">
        Logout
      </Button>
    </>
  );
};
