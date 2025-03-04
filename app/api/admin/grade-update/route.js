// /api/admin/grade-update/route.js
import { connectToDB } from "@/app/lib/db";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const {
      adminUsername,
      adminPassword,
      gradeId,
      username,
      subject,
      assignment,
      score,
      feedback
    } = await req.json();

    // Verify admin credentials
    if (
      adminUsername !== process.env.ADMIN_USERNAME ||
      adminPassword !== process.env.ADMIN_PASSWORD
    ) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    // Connect to the database
    const db = await connectToDB("student");
    const gradesCollection = db.collection("grades");

    // Ensure the grade exists
    const grade = await gradesCollection.findOne({ 
      _id: new ObjectId(gradeId) 
    });

    if (!grade) {
      return new Response(
        JSON.stringify({ message: "Grade not found" }),
        { status: 404 }
      );
    }

    // Update the grade
    await gradesCollection.updateOne(
      { _id: new ObjectId(gradeId) },
      {
        $set: {
          username,
          subject,
          assignment,
          score,
          feedback,
          updatedAt: new Date(),
        }
      }
    );

    return new Response(
      JSON.stringify({ message: "Grade updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Grade update error:", error);
    return new Response(
      JSON.stringify({
        message: error.message || "Internal server error",
      }),
      { status: 500 }
    );
  }
}