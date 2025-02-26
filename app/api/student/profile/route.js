import { connectToDB } from '@/lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    if (!username) {
      return new Response(
        JSON.stringify({ message: "Username is required" }),
        { status: 400 }
      );
    }

    const db = await connectToDB('student');
    const studentsCollection = db.collection('student-profile');
    const student = await studentsCollection.findOne({ username });

    if (!student) {
      return new Response(
        JSON.stringify({ message: "Student not found" }),
        { status: 404 }
      );
    }

    // Remove sensitive data
    const { password, ...studentData } = student;

    return new Response(
      JSON.stringify(studentData),
      { status: 200 }
    );

  } catch (error) {
    console.error("Profile fetch error:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}