// components/student-dashboard/StudentProfileCard.jsx
import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/card";

export const StudentProfileCard = ({ studentData }) => {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-bold">Student Profile</h3>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-4">
          {studentData.image ? (
            <img
              src={studentData.image}
              alt={studentData.name}
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
          ) : (
            <div className="w-24 h-24 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-2xl font-bold mb-2">
              {studentData.name?.charAt(0).toUpperCase() || "S"}
            </div>
          )}
          <h4 className="text-xl font-semibold">{studentData.name}</h4>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Grade:</span>
            <span className="font-medium">{studentData.grade}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Age:</span>
            <span className="font-medium">{studentData.age}</span>
          </div>

          {/* Academic progress section */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h5 className="font-semibold mb-2">Academic Progress</h5>

            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Assignments:</span>
              <span className="font-medium">
                {studentData.assignmentsCount || 0}
              </span>
            </div>

            <div className="flex justify-between mb-1">
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

            {/* Progress bar */}
            {studentData.assignmentsCount > 0 && (
              <div className="mt-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{
                      width: `${
                        (studentData.completedAssignments /
                          studentData.assignmentsCount) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1 text-center">
                  {Math.round(
                    (studentData.completedAssignments /
                      studentData.assignmentsCount) *
                      100
                  )}
                  % complete
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
