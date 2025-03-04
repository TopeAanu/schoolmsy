import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const AddAssignmentForm = ({ 
  assignmentData, 
  setAssignmentData, 
  handleAssignmentSubmit 
}) => {
  return (
    <form onSubmit={handleAssignmentSubmit} className="space-y-4">
      <div>
        <label className="block mb-2">Student Username</label>
        <Input
          required
          value={assignmentData.username}
          onChange={(e) =>
            setAssignmentData({
              ...assignmentData,
              username: e.target.value,
            })
          }
          placeholder="johndoe"
        />
      </div>

      <div>
        <label className="block mb-2">Subject</label>
        <Input
          required
          value={assignmentData.subject}
          onChange={(e) =>
            setAssignmentData({
              ...assignmentData,
              subject: e.target.value,
            })
          }
          placeholder="Math"
        />
      </div>

      <div>
        <label className="block mb-2">Assignment Title</label>
        <Input
          required
          value={assignmentData.title}
          onChange={(e) =>
            setAssignmentData({
              ...assignmentData,
              title: e.target.value,
            })
          }
          placeholder="Chapter 5 Problems"
        />
      </div>

      <div>
        <label className="block mb-2">Description</label>
        <Textarea
          required
          value={assignmentData.description}
          onChange={(e) =>
            setAssignmentData({
              ...assignmentData,
              description: e.target.value,
            })
          }
          placeholder="Complete problems 1-10 from Chapter 5"
          rows={4}
        />
      </div>

      <div>
        <label className="block mb-2">Due Date</label>
        <Input
          type="date"
          required
          value={assignmentData.dueDate}
          onChange={(e) =>
            setAssignmentData({
              ...assignmentData,
              dueDate: e.target.value,
            })
          }
        />
      </div>

      <Button type="submit" className="w-full">
        Create Assignment
      </Button>
    </form>
  );
};

export default AddAssignmentForm;