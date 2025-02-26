// app/student/dashboard/page.js
"use client";
import React from "react";
// import { Card } from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { useStudentAuth } from "../../components/hooks/useStudentAuth";
import { LogoutButton } from "../../components/student-dashboard/LogoutButton";
import { StudentProfileCard } from "../../components/student-dashboard/StudentProfileCard";
import { StudentSubjectsCard } from "../../components/student-dashboard/StudentSubjectCard";
import { StudentAssignmentsCard } from "../../components/student-dashboard/StudentAssignmentCard";

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
        <LogoutButton />
      </div>

      {error ? (
        <Alert className="bg-red-50">
          <AlertDescription className="text-red-600">{error}</AlertDescription>
        </Alert>
      ) : studentData ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StudentProfileCard studentData={studentData} />
          <StudentSubjectsCard subjects={studentData.subjects} />
          <StudentAssignmentsCard />
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
