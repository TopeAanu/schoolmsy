import { connectToDB } from "@/lib/db";

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

    // If the student doesn't have subjects, return an empty array
    if (!student.subjects || !Array.isArray(student.subjects)) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    // Get assignment and grade collections
    const assignmentsCollection = db.collection("assignments");
    const gradesCollection = db.collection("grades");

    // Enhance each subject with assignment count and current grade
    const subjectsWithStats = await Promise.all(
      student.subjects.map(async (subject) => {
        // Count assignments for this subject
        const subjectAssignments = await assignmentsCollection.countDocuments({
          username,
          subject: subject.name || subject,
        });

        // Get grades for this subject
        const subjectGrades = await gradesCollection
          .find({
            username,
            subject: subject.name || subject,
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

        // Return the subject with stats
        return {
          name: subject.name || subject,
          assignments: subjectAssignments,
          currentGrade,
          // Include any other subject properties from the DB
          ...(typeof subject === "object" ? subject : { name: subject }),
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
  } finally {
    // Ensure the DB connection is closed
    if (db && db.client) {
      try {
        await db.client.close();
      } catch (err) {
        console.error("Error closing database connection:", err);
      }
    }
  }
}
