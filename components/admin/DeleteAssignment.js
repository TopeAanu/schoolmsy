import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

const DeleteAssignment = () => {
  const [adminCredentials, setAdminCredentials] = useState({
    adminUsername: "",
    adminPassword: ""
  });
  const [assignmentId, setAssignmentId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAssignment = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Confirmation dialog
    if (!window.confirm("Are you sure you want to delete this assignment?")) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/assignment-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assignmentId,
          adminUsername: adminCredentials.adminUsername,
          adminPassword: adminCredentials.adminPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete assignment");
      }

      setSuccess("Assignment deleted successfully!");
      // Clear form after successful deletion
      setAssignmentId("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-xl font-bold">Delete Assignment</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleDeleteAssignment} className="space-y-4">
          <div>
            <label className="block mb-2">Admin Username</label>
            <Input
              required
              type="text"
              value={adminCredentials.adminUsername}
              onChange={(e) =>
                setAdminCredentials(prev => ({
                  ...prev,
                  adminUsername: e.target.value
                }))
              }
              placeholder="Enter admin username"
            />
          </div>
          <div>
            <label className="block mb-2">Admin Password</label>
            <Input
              required
              type="password"
              value={adminCredentials.adminPassword}
              onChange={(e) =>
                setAdminCredentials(prev => ({
                  ...prev,
                  adminPassword: e.target.value
                }))
              }
              placeholder="Enter admin password"
            />
          </div>
          <div>
            <label className="block mb-2">Assignment ID</label>
            <Input
              required
              type="text"
              value={assignmentId}
              onChange={(e) => setAssignmentId(e.target.value)}
              placeholder="Enter assignment ID to delete"
            />
          </div>
          <Button
            type="submit"
            variant="destructive"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Assignment"}
          </Button>

          {error && (
            <Alert className="mt-4 bg-red-50">
              <AlertDescription className="text-red-600">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mt-4 bg-green-50">
              <AlertDescription className="text-green-600">
                {success}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default DeleteAssignment;
