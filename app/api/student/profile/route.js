// /api/student/profile/route.js
import { connectToDB } from "@/app/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return new Response(JSON.stringify({ message: "Username is required" }), {
        status: 400,
      });
    }

    const db = await connectToDB("student");
    const studentsCollection = db.collection("student-profile");
    const student = await studentsCollection.findOne({ username });

    if (!student) {
      return new Response(JSON.stringify({ message: "Student not found" }), {
        status: 404,
      });
    }

    // Get summary data from other collections
    const assignmentsCollection = db.collection("assignments");
    const gradesCollection = db.collection("grades");

    // Count assignments
    const assignmentsCount = await assignmentsCollection.countDocuments({
      username: student.username,
    });

    // Count completed assignments (with grades)
    const completedAssignments = await assignmentsCollection.countDocuments({
      username: student.username,
      status: "graded",
    });

    // Get all grades for calculations
    const grades = await gradesCollection
      .find({
        username: student.username,
      })
      .toArray();

    // Calculate average grade if grades exist
    let averageGrade = "N/A";
    if (grades && grades.length > 0) {
      // Parse scores and calculate average
      const scores = grades
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
        averageGrade = average.toFixed(1) + "%";
      }
    }

    // Update student document with latest metrics
    await studentsCollection.updateOne(
      { _id: student._id },
      {
        $set: {
          assignmentsCount,
          completedAssignments,
          averageGrade,
          updatedAt: new Date(),
        },
      }
    );

    // Remove sensitive data
    const { password, ...studentData } = student;

    // Add the metrics to the response
    const enhancedStudentData = {
      ...studentData,
      assignmentsCount,
      completedAssignments,
      averageGrade,
    };

    return new Response(JSON.stringify(enhancedStudentData), { status: 200 });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
