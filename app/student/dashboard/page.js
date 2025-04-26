// app/student/dashboard/page.js
"use client";
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useStudentAuth } from "@/components/hooks/useStudentAuth";
import { StudentLogoutButton } from "@/components/student-dashboard/StudentLogoutButton";
import { StudentProfileCard } from "@/components/student-dashboard/StudentProfileCard";
import { StudentSubjectsCard } from "@/components/student-dashboard/StudentSubjectCard";
import { StudentAssignmentsCard } from "@/components/student-dashboard/StudentAssignmentCard";

const StudentDashboard = () => {
  const { studentData, loading, error } = useStudentAuth();

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4 text-black dark:text-dark">
      <div className="flex flex-row justify-between items-center mb-4 sm:mb-6 gap-3 pt-2 px-2 sm:pt-3 sm:px-3">
        <h1 className="text-2xl sm:text-3xl font-bold py-1 px-1">
          Student Dashboard
        </h1>
        <div className="py-1 px-1">
          <StudentLogoutButton />
        </div>
      </div>

      {error ? (
        <Alert className="bg-red-50">
          <AlertDescription className="text-red-600">{error}</AlertDescription>
        </Alert>
      ) : studentData ? (
        <div className="flex flex-col space-y-4 sm:space-y-6">
          <div className="w-full">
            <StudentProfileCard studentData={studentData} />
          </div>
          <div className="w-full">
            <StudentSubjectsCard subjects={studentData.subjects} />
          </div>
          <div className="w-full">
            <StudentAssignmentsCard username={studentData.username} />
          </div>
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
