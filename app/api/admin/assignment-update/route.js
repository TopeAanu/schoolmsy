import { connectToDB } from "@/app/lib/db";
import { ObjectId } from "mongodb";
import { compare } from "bcryptjs";

export async function POST(req) {
  try {
    const {
      adminUsername,
      adminPassword,
      assignmentId,
      username,
      subject,
      title,
      description,
      dueDate,
      status,
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
    const assignmentsCollection = db.collection("assignments");

    // Ensure the assignment exists
    const assignment = await assignmentsCollection.findOne({
      _id: new ObjectId(assignmentId),
    });

    if (!assignment) {
      return new Response(JSON.stringify({ message: "Assignment not found" }), {
        status: 404,
      });
    }

    // Update the assignment
    await assignmentsCollection.updateOne(
      { _id: new ObjectId(assignmentId) },
      {
        $set: {
          username,
          subject,
          title,
          description,
          dueDate: new Date(dueDate),
          status: status || assignment.status,
          updatedAt: new Date(),
        },
      }
    );

    return new Response(
      JSON.stringify({ message: "Assignment updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Assignment update error:", error);
    return new Response(
      JSON.stringify({
        message: error.message || "Internal server error",
      }),
      { status: 500 }
    );
  }
}
