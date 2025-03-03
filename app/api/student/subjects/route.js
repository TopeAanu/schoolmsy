import { connectToDB } from "@/app/lib/db";

export async function GET(req) {
  let db = null;
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return new Response(JSON.stringify({ message: "Username is required" }), {
        status: 400,
      });
    }

    db = await connectToDB("student");
    const studentsCollection = db.collection("student-profile");

    // Get the student to find their enrolled subjects
    const student = await studentsCollection.findOne({ username });

    if (!student) {
      return new Response(JSON.stringify({ message: "Student not found" }), {
        status: 404,
      });
    }

    // Get assignment and grade collections
    const assignmentsCollection = db.collection("assignments");
    const gradesCollection = db.collection("grades");

    // Get all unique subjects from assignments collection for this user
    const assignmentSubjects = await assignmentsCollection.distinct("subject", { username });

    // Build a complete list of subjects from both profile and assignments
    let allSubjects = new Set();
    
    // Add subjects from student profile if they exist
    if (student.subjects && Array.isArray(student.subjects)) {
      student.subjects.forEach(subject => {
        const subjectName = typeof subject === 'string' ? subject : subject.name;
        if (subjectName) {
          allSubjects.add(subjectName);
        }
      });
    }
    
    // Add subjects from assignments
    assignmentSubjects.forEach(subject => {
      if (subject) {
        allSubjects.add(subject);
      }
    });

    // Convert to array and remove any undefined/null values
    const uniqueSubjects = Array.from(allSubjects).filter(Boolean);

    // Enhance each subject with assignment count and current grade
    const subjectsWithStats = await Promise.all(
      uniqueSubjects.map(async (subjectName) => {
        // Count assignments for this subject
        const subjectAssignments = await assignmentsCollection.countDocuments({
          username,
          subject: subjectName,
        });

        // Get grades for this subject
        const subjectGrades = await gradesCollection
          .find({
            username,
            subject: subjectName,
          })
          .toArray();

        // Calculate average grade for this subject
        let currentGrade = "N/A";
        if (subjectGrades && subjectGrades.length > 0) {
          const scores = subjectGrades
            .map((grade) => {
              // Handle different score formats
              if (typeof grade.score === "number") {
                return grade.score;
              } else if (typeof grade.score === "string") {
                const parts = grade.score.split("/");
                if (parts.length === 2) {
                  const score = parseFloat(parts[0]);
                  const total = parseFloat(parts[1]);
                  if (!isNaN(score) && !isNaN(total) && total > 0) {
                    return (score / total) * 100; // Convert to percentage
                  }
                } else {
                  // Try parsing it as a direct number
                  const numScore = parseFloat(grade.score);
                  if (!isNaN(numScore)) {
                    return numScore;
                  }
                }
              }
              return null;
            })
            .filter((score) => score !== null);

          if (scores.length > 0) {
            const average =
              scores.reduce((sum, score) => sum + score, 0) / scores.length;
            currentGrade = average.toFixed(1) + "%";
          }
        }

        // Find the original subject object if it exists in student.subjects
        let subjectMetadata = { name: subjectName };
        
        if (student.subjects && Array.isArray(student.subjects)) {
          const originalSubject = student.subjects.find(s => 
            (typeof s === 'string' && s === subjectName) || 
            (typeof s === 'object' && s.name === subjectName)
          );
          
          if (originalSubject && typeof originalSubject === 'object') {
            subjectMetadata = originalSubject;
          }
        }

        // Return the subject with stats
        return {
          name: subjectName,
          assignments: subjectAssignments,
          currentGrade,
          // Include any other subject properties from the DB
          ...(typeof subjectMetadata === 'object' ? subjectMetadata : {}),
        };
      })
    );

    return new Response(JSON.stringify(subjectsWithStats), { status: 200 });
  } catch (error) {
    console.error("Subjects fetch error:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}