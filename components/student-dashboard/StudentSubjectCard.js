"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function StudentSubjectsCard({ subjects }) {
  return (
    <Card>
      <CardHeader>My Subjects</CardHeader>
      <CardContent>
        {subjects && subjects.length > 0 ? (
          <div className="space-y-3">
            {subjects.map((subject, index) => (
              <div key={index} className="border rounded-lg p-3">
                <h3 className="font-medium">{subject.name}</h3>
                <div className="grid grid-cols-2 gap-1 mt-2">
                  <p className="text-sm text-gray-500">Assignments:</p>
                  <p className="text-sm">{subject.assignments || 0}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-sm text-gray-500">Current Grade:</p>
                  <p className="text-sm">{subject.currentGrade || "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No subjects found</p>
        )}
      </CardContent>
    </Card>
  );
}
