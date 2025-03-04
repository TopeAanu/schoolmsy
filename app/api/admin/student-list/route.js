// app/api/admin/student-list/route.js
import { connectToDB } from "@/app/lib/db";

export async function POST(req) {
  try {
    const { adminUsername, adminPassword } = await req.json();

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

    // Get all students
    const students = await studentsCollection.find({}).toArray();

    return new Response(JSON.stringify(students), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return new Response(
      JSON.stringify({
        message: error.message || "Error fetching students",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}