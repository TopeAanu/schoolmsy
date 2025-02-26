// components/StudentProfileCard.js
import { Card, CardHeader, CardContent } from "../ui/card";

export const StudentProfileCard = ({ studentData }) => {
  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <h2 className="text-xl font-semibold">My Profile</h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {studentData.image ? (
            <img
              src={studentData.image}
              alt={studentData.name}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-gray-500">
                {studentData.name?.charAt(0) || "S"}
              </span>
            </div>
          )}
          <h3 className="text-lg font-bold">{studentData.name}</h3>
          <p className="text-gray-600">Grade: {studentData.grade}</p>
          <p className="text-gray-600">Age: {studentData.age}</p>
        </div>
      </CardContent>
    </Card>
  );
};
