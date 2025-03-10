"use client";

// components/LogoutButton.js
import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export const AdminLogoutButton = () => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const initiateLogout = () => {
    setShowAlert(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("studentAuth");
    router.push("/admin/signin");
  };

  const cancelLogout = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <div className="fixed top-0 left-0 right-0 flex justify-center z-50">
          <div className="mt-4 p-3 bg-white bg-opacity-80 border flex items-center space-x-4">
            <p className="text-sm">
              Logout as admin?
            </p>
            <div className="flex space-x-2">
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