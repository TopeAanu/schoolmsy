// /api/admin/grades/route.js
import { connectToDB } from "@/lib/db";

export async function POST(req) {
  try {
    const {
      adminUsername,
      adminPassword,
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
    const assignmentsCollection = db.collection("assignments");
    
    // Find the assignment to ensure it exists
    const assignmentDoc = await assignmentsCollection.findOne({ 
      username, 
      subject,
      title: assignment 
    });
    
    if (!assignmentDoc) {
      return new Response(
        JSON.stringify({ message: "Assignment not found for this student" }),
        { status: 404 }
      );
    }

    // Update the assignment status
    await assignmentsCollection.updateOne(
      { _id: assignmentDoc._id },
      { $set: { status: "graded" } }
    );

    // Insert the grade
    await gradesCollection.insertOne({
      username,
      subject,
      assignment,
      score,
      feedback,
      assignmentId: assignmentDoc._id,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: "Grade added successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Grade creation error:", error);
    return new Response(
      JSON.stringify({
        message: error.message || "Internal server error",
      }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return new Response(
        JSON.stringify({ message: "Username is required" }),
        { status: 400 }
      );
    }

    const db = await connectToDB("student");
    const gradesCollection = db.collection("grades");
    
    const grades = await gradesCollection
      .find({ username })
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(
      JSON.stringify(grades),
      { status: 200 }
    );
  } catch (error) {
    console.error("Grades fetch error:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}