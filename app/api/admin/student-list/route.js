// app/api/admin/student-list/route.js
import { connectToDB } from "@/app/lib/db";
import { compare } from "bcryptjs";

export async function POST(req) {
  try {
    const { adminUsername, adminPassword } = await req.json();
    console.log("Attempting to authenticate:", adminUsername);
    
    // Connect to admin database
    const adminDb = await connectToDB("admin");
    const usersCollection = adminDb.collection("users");
    
    // Find the admin user by username
    const adminUser = await usersCollection.findOne({ username: adminUsername });
    
    // If no user found, unauthorized
    if (!adminUser) {
      console.log("No user found with username:", adminUsername);
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    
    // Verify the password with bcrypt compare
    const passwordValid = await compare(adminPassword, adminUser.password);
    console.log("Password validation result:", passwordValid);
    
    if (!passwordValid) {
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