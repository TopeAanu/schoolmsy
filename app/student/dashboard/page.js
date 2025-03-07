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
      <div className="max-w-4xl mx-auto p-4 text-center">
        Loading student information...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <StudentLogoutButton />
      </div>
  
      {error ? (
        <Alert className="bg-red-50">
          <AlertDescription className="text-red-600">{error}</AlertDescription>
        </Alert>
      ) : studentData ? (
        <div className="flex flex-col space-y-6">
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
