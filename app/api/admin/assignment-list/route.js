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
    const assignmentsCollection = db.collection("assignments");

    // Query parameters
    let query = {};
    if (username) {
      query.username = username;
    }

    // Get assignments with date formatting directly in the aggregation pipeline
    const assignments = await assignmentsCollection
      .aggregate([
        { $match: query },
        { $sort: { createdAt: -1 } },
        {
          $addFields: {
            createdAt: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
          },
        },
      ])
      .toArray();

    return new Response(JSON.stringify(assignments), { status: 200 });
  } catch (error) {
    console.error("Assignment list error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
