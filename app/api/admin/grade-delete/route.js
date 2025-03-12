import { connectToDB } from "@/app/lib/db";
import { ObjectId } from "mongodb";
import { compare } from "bcryptjs";

export async function POST(req) {
  try {
    const { gradeId, adminUsername, adminPassword } = await req.json();

    // Connect to admin database to verify credentials
    const adminDb = await connectToDB("admin");
    const adminCollection = adminDb.collection("admins");

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

    // Validate gradeId
    if (!gradeId) {
      return new Response(JSON.stringify({ message: "Grade ID is required" }), {
        status: 400,
      });
    }

    // Delete the grade
    const result = await gradesCollection.deleteOne({
      _id: new ObjectId(gradeId),
    });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: "Grade not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Grade deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Delete grade error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
