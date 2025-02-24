"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription } from "../../components/ui/alert";

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    age: "",
    grade: "",
    subjects: "",
    image: "",
    adminUsername: "",
    adminPassword: ""
  });

  const [credentials, setCredentials] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCredentials(null);

    try {
      const response = await fetch("/api/admin/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to create student account");
      }

      setCredentials(data.credentials);
      
      // Clear form but keep admin credentials for convenience
      setFormData(prev => ({
        studentName: "",
        age: "",
        grade: "",
        subjects: "",
        image: "",
        adminUsername: prev.adminUsername,
        adminPassword: prev.adminPassword
      }));

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Add New Student</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Admin credentials section */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-4">Admin Authentication</h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Admin Username</label>
                  <Input
                    required
                    type="text"
                    value={formData.adminUsername}
                    onChange={(e) =>
                      setFormData({ ...formData, adminUsername: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2">Admin Password</label>
                  <Input
                    required
                    type="password"
                    value={formData.adminPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, adminPassword: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Student information section */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Student Name</label>
                <Input
                  required
                  value={formData.studentName}
                  onChange={(e) =>
                    setFormData({ ...formData, studentName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-2">Age</label>
                <Input
                  type="number"
                  min="5"
                  max="18"
                  required
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-2">Grade</label>
                <Input
                  required
                  value={formData.grade}
                  onChange={(e) =>
                    setFormData({ ...formData, grade: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-2">Subjects (comma-separated)</label>
                <Input
                  required
                  value={formData.subjects}
                  onChange={(e) =>
                    setFormData({ ...formData, subjects: e.target.value })
                  }
                  placeholder="Math, Science, English"
                />
              </div>

              <div>
                <label className="block mb-2">Image URL</label>
                <Input
                  type="url"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://example.com/student-image.jpg"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Create Student Account
            </Button>
          </form>

          {credentials && (
            <Alert className="mt-4 bg-green-50">
              <AlertDescription>
                <div className="font-bold">Student Account Created!</div>
                <div>Username: {credentials.username}</div>
                <div>Temporary Password: {credentials.password}</div>
                <div className="text-sm text-gray-600 mt-2">
                  Please provide these credentials to the student securely.
                </div>
              </AlertDescription>
            </Alert>
          )}

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
  );
};

export default AdminDashboard;