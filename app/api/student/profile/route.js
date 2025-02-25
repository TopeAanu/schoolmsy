// File path: /app/api/student/profile/route.js (for App Router)
// OR: /pages/api/student/profile.js (for Pages Router)

import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';

// Path to our "database" file
const DB_PATH = path.join(process.cwd(), 'data', 'students.json');

// Read all students
const getStudents = () => {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return [];
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading student data:", error);
    return [];
  }
};

export async function GET(request) {
  try {
    // Get authorization header
    const authHeader = request.headers.get("Authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Extract token
    const token = authHeader.split(" ")[1];
    
    // Extract student username from token (in a real app, verify JWT)
    // Format of our mock token is: "student-session-{username}-{timestamp}"
    const tokenParts = token.split("-");
    
    if (tokenParts.length < 3 || tokenParts[0] !== "student" || tokenParts[1] !== "session") {
      return new Response(
        JSON.stringify({ message: "Invalid token format" }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const username = tokenParts[2];
    
    // Get students from "database"
    const students = getStudents();
    
    // Find student data by username
    const student = students.find(s => s.username === username);
    
    if (!student) {
      return new Response(
        JSON.stringify({ message: "Student not found" }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Remove password before sending
    const { password, ...studentData } = student;

    return new Response(
      JSON.stringify(studentData),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error("Error fetching student profile:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch student profile" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}