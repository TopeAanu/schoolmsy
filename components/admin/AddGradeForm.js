import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const AddGradeForm = ({ gradeData, setGradeData, handleGradeSubmit }) => {
  return (
    <form onSubmit={handleGradeSubmit} className="space-y-4">
      <div>
        <label className="block mb-2">Student Username</label>
        <Input
          required
          value={gradeData.username}
          onChange={(e) =>
            setGradeData({ ...gradeData, username: e.target.value })
          }
          placeholder="Name"
        />
      </div>

      <div>
        <label className="block mb-2">Subject</label>
        <Input
          required
          value={gradeData.subject}
          onChange={(e) =>
            setGradeData({ ...gradeData, subject: e.target.value })
          }
          placeholder="Math"
        />
      </div>

      <div>
        <label className="block mb-2">Assignment Title</label>
        <Input
          required
          value={gradeData.assignment}
          onChange={(e) =>
            setGradeData({ ...gradeData, assignment: e.target.value })
          }
          placeholder="Chapter 5 Problems"
        />
      </div>

      <div>
        <label className="block mb-2">Score</label>
        <Input
          required
          type="text"
          value={gradeData.score}
          onChange={(e) =>
            setGradeData({ ...gradeData, score: e.target.value })
          }
          placeholder="95/100"
        />
      </div>

      <div>
        <label className="block mb-2">Feedback</label>
        <Textarea
          value={gradeData.feedback}
          onChange={(e) =>
            setGradeData({ ...gradeData, feedback: e.target.value })
          }
          placeholder="Great work! You need to work on question 7."
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full">
        Add Grade
      </Button>
    </form>
  );
};

export default AddGradeForm;
