import { Button } from "@/components/ui/button";

const ManageStudents = ({ 
  isLoading, 
  students, 
  fetchStudents, 
  handleEditStudent, 
  handleDeleteStudent 
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Student List</h3>
        <Button onClick={fetchStudents} size="sm" variant="outline">
          Refresh List
        </Button>
      </div>
      
      {isLoading ? (
        <p>Loading students...</p>
      ) : students.length > 0 ? (
        <div className="border rounded-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.username}>
                  <td className="px-4 py-2 whitespace-nowrap">{student.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{student.username}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{student.grade}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEditStudent(student)}
                        size="sm"
                        variant="outline"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteStudent(student.username)}
                        size="sm"
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default ManageStudents;