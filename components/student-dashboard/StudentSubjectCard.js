"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function StudentSubjectsCard({ subjects }) {
  return (
    <Card className="w-full">
      <CardHeader>My Subjects</CardHeader>
      <CardContent>
        {subjects && subjects.length > 0 ? (
          <div className="max-h-80 overflow-y-auto pr-2">
            <div className="space-y-3">
              {subjects.map((subject, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <h3 className="font-medium">{subject.name}</h3>
                  <div className="flex flex-col mt-2">
                    <div className="flex justify-between py-1">
                      <p className="text-sm text-gray-500">Assignments:</p>
                      <p className="text-sm">{subject.assignments || 0}</p>
                    </div>
                    <div className="flex justify-between py-1">
                      <p className="text-sm text-gray-500">Current Grade:</p>
                      <p className="text-sm">{subject.currentGrade || "N/A"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No subjects found</p>
        )}
      </CardContent>
    </Card>
  );
}
