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

    // Connect to the database
    const db = await connectToDB("student");
    const gradesCollection = db.collection("grades");

    // Query parameters
    let query = {};
    if (username) {
      query.username = username;
    }

    // Get grades
    const grades = await gradesCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify(grades), { status: 200 });
  } catch (error) {
    console.error("Grade list error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
