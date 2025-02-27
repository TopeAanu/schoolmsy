// /api/admin/signup/route.js
import { hash } from 'bcryptjs';
import { connectToDB } from '@/lib/db';

export async function POST(req) {
  try {
    const { adminUsername, adminPassword, studentName, age, grade, subjects, image } = await req.json();

    // Verify admin credentials
    if (adminUsername !== process.env.ADMIN_USERNAME || adminPassword !== process.env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    // Connect to the database
    const db = await connectToDB();
    const usersCollection = db.collection('users');

    // Generate a temporary password for the student
    const temporaryPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await hash(temporaryPassword, 12);

    // Insert the student into the database
    await usersCollection.insertOne({
      username: studentName.toLowerCase().replace(/\s+/g, ''),
      password: hashedPassword,
      role: 'student',
      name: studentName,
      age,
      grade,
      subjects: subjects.split(',').map((subject) => subject.trim()),
      image,
    });

    // Return the credentials
    return new Response(
      JSON.stringify({
        credentials: {
          username: studentName.toLowerCase().replace(/\s+/g, ''),
          password: temporaryPassword,
        },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in /api/admin/signup:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), { status: 500 });
  }
}