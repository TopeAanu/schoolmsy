// components/StudentSubjectsCard.js
import { Card, CardHeader, CardContent } from "../ui/card";

export const StudentSubjectsCard = ({ subjects }) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <h2 className="text-xl font-semibold">My Subjects</h2>
      </CardHeader>
      <CardContent>
        {subjects?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map((subject, index) => (
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
  );
};
