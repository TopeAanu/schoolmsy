// app/api/admin/student-update/route.js
import { connectToDB } from "@/app/lib/db";

export async function POST(req) {
  try {
    const {
      adminUsername,
      adminPassword,
      username,
      name,
      age,
      grade,
      subjects,
      image,
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

    // Connect to student database
    const db = await connectToDB("student");
    const studentsCollection = db.collection("student-profile");

    // Update the student document
    const result = await studentsCollection.updateOne(
      { username },
      {
        $set: {
          name,
          age,
          grade,
          subjects,
          image,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ message: "Student not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Student updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin student update error:", error);
    return new Response(
      JSON.stringify({
        message: error.message || "Internal server error",
      }),
      { status: 500 }
    );
  }
}