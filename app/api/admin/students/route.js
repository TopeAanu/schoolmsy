import { hash } from "bcryptjs";
import { connectToDB } from "@/lib/db";

export async function POST(req) {
  try {
    const {
      adminUsername,
      adminPassword,
      studentName,
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

    // Generate credentials
    const username = studentName.toLowerCase().replace(/\s+/g, "");
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await hash(tempPassword, 12);

    // Create student document
    await studentsCollection.insertOne({
      username,
      password: hashedPassword,
      name: studentName,
      age: parseInt(age),
      grade,
      subjects: subjects.split(",").map((s) => s.trim()),
      image,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return new Response(
      JSON.stringify({
        credentials: {
          username,
          password: tempPassword,
        },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin student creation error:", error);
    return new Response(
      JSON.stringify({
        message: error.message || "Internal server error",
      }),
      { status: 500 }
    );
  }
}
