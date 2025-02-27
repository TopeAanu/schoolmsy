// /api/admin/assignments/route.js
import { connectToDB } from "@/lib/db";

export async function POST(req) {
  try {
    const {
      adminUsername,
      adminPassword,
      username,
      subject,
      title,
      description,
      dueDate,
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
    const assignmentsCollection = db.collection("assignments");

    // Verify student exists
    const studentsCollection = db.collection("student-profile");
    const student = await studentsCollection.findOne({ username });

    if (!student) {
      return new Response(JSON.stringify({ message: "Student not found" }), {
        status: 404,
      });
    }

    // Insert the assignment
    await assignmentsCollection.insertOne({
      username,
      subject,
      title,
      description,
      dueDate: new Date(dueDate),
      status: "pending", // pending, submitted, graded
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: "Assignment created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Assignment creation error:", error);
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
      return new Response(JSON.stringify({ message: "Username is required" }), {
        status: 400,
      });
    }

    const db = await connectToDB("student");
    const assignmentsCollection = db.collection("assignments");

    const assignments = await assignmentsCollection
      .find({ username })
      .sort({ dueDate: 1 })
      .toArray();

    return new Response(JSON.stringify(assignments), { status: 200 });
  } catch (error) {
    console.error("Assignments fetch error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
