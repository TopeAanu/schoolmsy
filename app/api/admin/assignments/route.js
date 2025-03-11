// /api/admin/assignments/route.js
import { connectToDB } from "@/app/lib/db";
import { compare } from "bcryptjs";

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

    // Connect to admin database
    const adminDb = await connectToDB("admin");
    const usersCollection = adminDb.collection("users");

    // Find the admin user by username
    const adminUser = await usersCollection.findOne({
      username: adminUsername,
    });

    // If no user found, unauthorized
    if (!adminUser) {
      console.log("No admin user found with username:", adminUsername);
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    // Verify the password with bcrypt compare
    const passwordValid = await compare(adminPassword, adminUser.password);

    if (!passwordValid) {
      console.log("Invalid password for admin:", adminUsername);
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
