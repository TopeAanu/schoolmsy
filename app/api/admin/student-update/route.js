import { connectToDB } from "@/app/lib/db";
import { compare } from "bcryptjs";

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

    // Connect to admin database to verify credentials
    const adminDb = await connectToDB("admin");
    const adminCollection = adminDb.collection("users");

    // Find the admin user by username
    const adminUser = await adminCollection.findOne({
      username: adminUsername,
    });

    if (!adminUser) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    // Verify the password using bcrypt compare
    const isPasswordValid = await compare(adminPassword, adminUser.password);

    if (!isPasswordValid) {
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
      return new Response(JSON.stringify({ message: "Student not found" }), {
        status: 404,
      });
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
