// File path: /app/api/admin/students/route.js (for App Router)
// OR: /pages/api/admin/students.js (for Pages Router)

import fs from "fs";
import path from "path";

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

// Save all students
const saveStudents = (students) => {
  ensureDbExists();
  fs.writeFileSync(DB_PATH, JSON.stringify(students, null, 2));
};

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Extract data from the request
    const {
      studentName,
      age,
      grade,
      subjects,
      image,
      adminUsername,
      adminPassword,
    } = body;

    // Validate admin credentials (replace with your actual auth logic)
    if (adminUsername !== "tope" || adminPassword !== "12345") {
      return new Response(
        JSON.stringify({ message: "Invalid admin credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate required student fields
    if (!studentName || !age || !grade || !subjects) {
      return new Response(
        JSON.stringify({ message: "Missing required student information" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate a username (simple example: lowercase first name + first letter of last name)
    const nameParts = studentName.trim().split(" ");
    const firstName = nameParts[0].toLowerCase();
    const lastInitial =
      nameParts.length > 1
        ? nameParts[nameParts.length - 1][0].toLowerCase()
        : "";
    const username = `${firstName}${lastInitial}`;

    // Generate a temporary password
    const tempPassword = generateTemporaryPassword();

    // Create credentials object
    const credentials = {
      username,
      password: tempPassword,
    };

    // Get existing students
    const students = getStudents();

    // Check if username already exists
    if (students.some((s) => s.username === credentials.username)) {
      // Add a number to make the username unique
      const userCount = students.filter((s) =>
        s.username.startsWith(credentials.username)
      ).length;

      credentials.username = `${credentials.username}${userCount + 1}`;
    }

    // Create the new student object
    const newStudent = {
      username: credentials.username,
      password: credentials.password,
      name: studentName,
      age: parseInt(age),
      grade: grade,
      subjects: subjects.split(",").map((s) => s.trim()),
      image: image || null,
    };

    // Add to "database"
    students.push(newStudent);
    saveStudents(students);

    // Return the created credentials
    return new Response(
      JSON.stringify({
        message: "Student account created successfully",
        credentials,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating student account:", error);
    return new Response(
      JSON.stringify({
        message: error.message || "Failed to create student account",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Helper function to generate a random temporary password
function generateTemporaryPassword() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}
