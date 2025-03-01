import { connectToDB } from "@/app/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return new Response(JSON.stringify({ message: "Username is required" }), {
        status: 400,
      });
    }

    // Connect to the assignments database directly
    const db = await connectToDB("assignments");
    const assignmentsCollection = db.collection("assignments");

    const assignments = await assignmentsCollection
      .find({ username })
      .sort({ dueDate: 1 })
      .toArray();

    return new Response(JSON.stringify(assignments), { status: 200 });
  } catch (error) {
    console.error("Assignments fetch error:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
