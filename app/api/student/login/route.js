import { compare } from "bcryptjs";
import { connectToDB } from "@/app/lib/db";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ message: "Username and password are required" }),
        { status: 400 }
      );
    }

    const db = await connectToDB("student");
    const studentsCollection = db.collection("student-profile");
    const student = await studentsCollection.findOne({ username });

    if (!student) {
      return new Response(
        JSON.stringify({ message: "Invalid username or password" }),
        { status: 401 }
      );
    }

    const isValid = await compare(password, student.password);
    if (!isValid) {
      return new Response(
        JSON.stringify({ message: "Invalid username or password" }),
        { status: 401 }
      );
    }

    // Create session token (you might want to use JWT here)
    const token = `student-session-${username}-${Date.now()}`;

    return new Response(
      JSON.stringify({
        message: "Login successful",
        token,
        student: {
          username: student.username,
          name: student.name,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
