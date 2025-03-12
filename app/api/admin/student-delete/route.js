import { connectToDB } from "@/app/lib/db";
import { compare } from "bcryptjs";

export async function POST(req) {
  try {
    const { adminUsername, adminPassword, username } = await req.json();

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

    // Connect to student database
    const db = await connectToDB("student");
    const studentsCollection = db.collection("student-profile");

    // Delete the student
    const result = await studentsCollection.deleteOne({ username });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: "Student not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        message: "Student deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin student deletion error:", error);
    return new Response(
      JSON.stringify({
        message: error.message || "Internal server error",
      }),
      { status: 500 }
    );
  }
}
