import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateStudentForm = ({
  isEditing,
  selectedStudent,
  formData,
  setFormData,
  handleSubmit,
  handleCreateNewStudent
}) => {
  return (
    <>
      {isEditing && (
        <div className="mb-4 flex justify-between items-center">
          <div>
            <span className="font-medium">Editing:</span>{" "}
            <span className="text-blue-600">{selectedStudent?.username}</span>
          </div>
          <Button variant="outline" onClick={handleCreateNewStudent}>
            Create New Instead
          </Button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Student Name</label>
            <Input
              required
              value={formData.studentName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  studentName: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2">Age</label>
            <Input
              type="number"
              min="5"
              max="18"
              required
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-2">Grade</label>
            <Input
              required
              value={formData.grade}
              onChange={(e) =>
                setFormData({ ...formData, grade: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-2">
              Subjects (comma-separated)
            </label>
            <Input
              required
              value={formData.subjects}
              onChange={(e) =>
                setFormData({ ...formData, subjects: e.target.value })
              }
              placeholder="Math, Science, English"
            />
          </div>

          <div>
            <label className="block mb-2">Image URL</label>
            <Input
              type="url"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              placeholder="https://example.com/student-image.jpg"
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          {isEditing ? "Update Student" : "Create Student Account"}
        </Button>
      </form>
    </>
  );
};

export default CreateStudentForm;