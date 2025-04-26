// components/student-dashboard/StudentAssignmentCard.jsx
"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Badge } from "../ui/badge"; // You'll need to create this component

export const StudentAssignmentsCard = ({ username }) => {
  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("assignments");

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch assignments
        const assignmentsRes = await fetch(
          `/api/admin/assignments?username=${username}`
        );
        if (!assignmentsRes.ok) {
          throw new Error("Failed to fetch assignments");
        }
        const assignmentsData = await assignmentsRes.json();
        setAssignments(assignmentsData);

        // Fetch grades
        const gradesRes = await fetch(`/api/admin/grades?username=${username}`);
        if (!gradesRes.ok) {
          throw new Error("Failed to fetch grades");
        }
        const gradesData = await gradesRes.json();
        setGrades(gradesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "graded":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>Assignments & Grades</CardHeader>
        <CardContent>
          <p>Loading academic information...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>Assignments & Grades</CardHeader>
        <CardContent>
          <p className="text-red-600">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 md:col-span-3">
      <CardHeader>
        <div className="flex justify-between items-center">
          <span className="md:block hidden">Assignments & Grades</span>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("assignments")}
              className={`px-3 py-1 rounded-sm ${
                activeTab === "assignments"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Assignments
            </button>
            <button
              onClick={() => setActiveTab("grades")}
              className={`px-3 py-1 rounded-sm ${
                activeTab === "grades"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Grades
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {activeTab === "assignments" ? (
          <>
            {assignments.length === 0 ? (
              <p>No assignments available.</p>
            ) : (
              <div className="max-h-80 overflow-y-auto pr-2">
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div
                      key={assignment._id}
                      className="border rounded p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between">
                        <h4 className="font-semibold">{assignment.title}</h4>
                        <Badge className={getStatusColor(assignment.status)}>
                          {assignment.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        {assignment.subject}
                      </p>
                      <p className="mt-2">{assignment.description}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        Due: {formatDate(assignment.dueDate)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {grades.length === 0 ? (
              <p>No grades available.</p>
            ) : (
              <div className="max-h-80 overflow-y-auto pr-2">
                <div className="space-y-4">
                  {grades.map((grade) => (
                    <div
                      key={grade._id}
                      className="border rounded p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between">
                        <h4 className="font-semibold">{grade.assignment}</h4>
                        <span className="font-bold text-green-600">
                          {grade.score}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        {grade.subject}
                      </p>
                      {grade.feedback && (
                        <div className="flex items-center">
                          <p className="text-sm font-medium mr-1">Feedback:</p>
                          <p className="text-sm">{grade.feedback}</p>
                        </div>
                      )}
                      <div className="mt-2 text-sm text-gray-500">
                        Graded on: {formatDate(grade.createdAt)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
