"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { useRouter } from "next/navigation";

const StudentDashboard = () => {
  const router = useRouter();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if student is authenticated
    const authData = localStorage.getItem("studentAuth");
    if (!authData) {
      router.push("/student/login");
      return;
    }

    const { token, username } = JSON.parse(authData);

    // Fetch student data
    const fetchStudentData = async () => {
      try {
        const response = await fetch("/api/student/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Handle unauthorized (invalid/expired token)
            localStorage.removeItem("studentAuth");
            router.push("/student/login");
            return;
          }
          throw new Error("Failed to fetch student data");
        }

        const data = await response.json();
        setStudentData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("studentAuth");
    router.push("/student/login");
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        Loading student information...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>

      {error ? (
        <Alert className="bg-red-50">
          <AlertDescription className="text-red-600">{error}</AlertDescription>
        </Alert>
      ) : studentData ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Student Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <h2 className="text-xl font-semibold">My Profile</h2>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                {studentData.image ? (
                  <img
                    src={studentData.image}
                    alt={studentData.name}
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-gray-500">
                      {studentData.name?.charAt(0) || "S"}
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-bold">{studentData.name}</h3>
                <p className="text-gray-600">Grade: {studentData.grade}</p>
                <p className="text-gray-600">Age: {studentData.age}</p>
              </div>
            </CardContent>
          </Card>

          {/* Subjects Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <h2 className="text-xl font-semibold">My Subjects</h2>
            </CardHeader>
            <CardContent>
              {studentData.subjects?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {studentData.subjects.map((subject, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium">{subject}</h3>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Assignments: 0</p>
                        <p>Current Grade: N/A</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No subjects assigned yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Assignments Card */}
          <Card className="md:col-span-3">
            <CardHeader>
              <h2 className="text-xl font-semibold">Recent Assignments</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">No assignments yet.</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center">
          <p>No student data available.</p>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
