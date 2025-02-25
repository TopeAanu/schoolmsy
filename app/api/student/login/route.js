// File path: /app/api/student/login/route.js (for App Router)
// OR: /pages/api/student/login.js (for Pages Router)

import fs from "fs";
import path from "path";
import { cookies } from "next/headers";

// Path to our "database" file
const DB_PATH = path.join(process.cwd(), "data", "students.json");

// Ensure the directory exists
const ensureDbExists = () => {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
  }
};

// Read all students
const getStudents = () => {
  ensureDbExists();
  try {
    const data = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading student data:", error);
    return [];
  }
};

// Login endpoint
export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Validate required fields
    if (!username || !password) {
      return new Response(
        JSON.stringify({ message: "Username and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get students from "database"
    const students = getStudents();

    // Find student by username and verify password
    const student = students.find(
      (s) => s.username === username && s.password === password
    );

    if (!student) {
      return new Response(
        JSON.stringify({ message: "Invalid username or password" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create a session token (in a real app, use JWT)
    const token = `student-session-${username}-${Date.now()}`;

    // Set a secure cookie
    const cookieStore = await cookies();
    cookieStore.set("student_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return new Response(
      JSON.stringify({
        message: "Login successful",
        token,
        studentId: username,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error during student login:", error);
    return new Response(JSON.stringify({ message: "Login failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
