import { connectToDB } from "@/lib/db";

export async function GET(req) {
  let db = null;
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    const token = req.headers.get("Authorization")?.split(" ")[1];

    // Validate token
    const authData = localStorage.getItem("studentAuth");
    if (!authData || !token || JSON.parse(authData).token !== token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    if (!username) {
      return new Response(JSON.stringify({ message: "Username is required" }), {
        status: 400,
      });
    }

    db = await connectToDB("student");
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
  } finally {
    if (db?.client) {
      try {
        await db.client.close();
      } catch (err) {
        console.error("Error closing database connection:", err);
      }
    }
  }
}
