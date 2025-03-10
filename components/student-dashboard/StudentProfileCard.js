// components/student-dashboard/StudentProfileCard.jsx
"use client";
import React from "react";
import { Card, CardHeader, CardContent } from "../ui/card";

export const StudentProfileCard = ({ studentData }) => {
  return (
    <Card>
      <CardHeader>Student Profile</CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left section - Profile and basic info (1fr) */}
          <div className="flex flex-col items-center md:col-span-1">
            {/* Profile image/avatar */}
            {studentData.image ? (
              <img
                src={studentData.image}
                alt={studentData.name}
                className="w-32 h-32 border-gray-200 border object-cover mb-2"
                style={{ borderRadius: "5px" }}
              />
            ) : (
              <div
                className="w-32 h-32 bg-blue-100 text-blue-500 flex items-center justify-center text-2xl font-bold mb-2"
                style={{ borderRadius: "5px" }}
              >
                {studentData.name?.charAt(0).toUpperCase() || "S"}
              </div>
            )}

            {/* Name and basic info with reduced line height */}
            <div className="text-center">
              <h4 className="text-xl font-bold mb-1 leading-tight">
                {studentData.name}
              </h4>
              <div className="leading-tight">
                <div className="flex space-x-2 justify-center mb-1">
                  <span className="text-gray-600">Grade:</span>
                  <span className="font-medium">{studentData.grade}</span>
                </div>
                <div className="flex space-x-2 justify-center">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-medium">{studentData.age}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right section - Academic progress (2fr) with increased line height */}
          <div className="md:col-span-2 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0 border-t md:border-t-0">
            <h5 className="font-semibold mb-3 text-left">Academic Progress</h5>

            <div className="space-y-3 leading-relaxed">
              <div className="flex justify-between">
                <span className="text-gray-600">Assignments:</span>
                <span className="font-medium">
                  {studentData.assignmentsCount || 0}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Completed:</span>
                <span className="font-medium">
                  {studentData.completedAssignments || 0}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Average Grade:</span>
                <span className="font-medium text-blue-600">
                  {studentData.averageGrade || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
