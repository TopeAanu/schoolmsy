import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/card";

export const StudentAssignmentsCard = ({ assignments = [] }) => {
  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <h2 className="text-xl font-semibold">Recent Assignments</h2>
      </CardHeader>
      <CardContent>
        {assignments && assignments.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {assignments.map((assignment, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{assignment.title}</h3>
                    <p className="text-sm text-gray-600">
                      {assignment.subject} • Due{" "}
                      {new Date(assignment.dueDate).toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-sm">{assignment.description}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        assignment.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : assignment.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {assignment.status === "completed"
                        ? "Completed"
                        : assignment.status === "in-progress"
                        ? "In Progress"
                        : "Pending"}
                    </span>
                    {assignment.grade && (
                      <span className="mt-2 text-sm font-medium">
                        Grade: {assignment.grade}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No assignments yet.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentAssignmentsCard;
