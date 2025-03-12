import { connectToDB } from "@/app/lib/db";
import { ObjectId } from "mongodb";
import { compare } from "bcryptjs";

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
      feedback,
    } = await req.json();

    // Connect to admin database to verify credentials
    const adminDb = await connectToDB("admin");
    const adminCollection = adminDb.collection("users");

    // Find the admin by username
    const admin = await adminCollection.findOne({ username: adminUsername });

    // Verify admin exists and password matches
    if (!admin || !(await compare(adminPassword, admin.password))) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    // Connect to the database
    const db = await connectToDB("student");
    const gradesCollection = db.collection("grades");

    // Ensure the grade exists
    const grade = await gradesCollection.findOne({
      _id: new ObjectId(gradeId),
    });

    if (!grade) {
      return new Response(JSON.stringify({ message: "Grade not found" }), {
        status: 404,
      });
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
        },
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
