// app/api/admin/student-delete/route.js
import { connectToDB } from "@/app/lib/db";

export async function POST(req) {
  try {
    const { adminUsername, adminPassword, username } = await req.json();

    // Verify admin credentials
    if (
      adminUsername !== process.env.ADMIN_USERNAME ||
      adminPassword !== process.env.ADMIN_PASSWORD
    ) {
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
      return new Response(
        JSON.stringify({ message: "Student not found" }),
        { status: 404 }
      );
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