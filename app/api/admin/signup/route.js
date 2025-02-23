// app/api/admin/signup/route.js
import { hash } from 'bcryptjs';
import { connectToDB } from '@/app/lib/db';

export async function POST(req) {
  try {
    const { 
      studentName,
      age,
      grade,
      subjects,
      image,
      adminUsername,
      adminPassword 
    } = await req.json();

    // Admin authorization check
    if (adminUsername !== process.env.ADMIN_USERNAME || adminPassword !== process.env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    // Generate student credentials
    const studentUsername = `${studentName.toLowerCase().replace(/\s+/g, '.')}_${Math.floor(Math.random() * 1000)}`;
    const temporaryPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await hash(temporaryPassword, 12);

    const db = await connectToDB();
    const usersCollection = db.collection('users');

    // Create student record
    await usersCollection.insertOne({
      username: studentUsername,
      password: hashedPassword,
      name: studentName,
      age: age,
      grade: grade,
      subjects: subjects,
      image: image,
      role: 'student',
      createdAt: new Date()
    });

    return new Response(JSON.stringify({ 
      message: 'Student account created successfully',
      credentials: {
        username: studentUsername,
        password: temporaryPassword
      }
    }), { status: 201 });
  } catch (error) {
    console.error('Error in /api/admin/signup:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), { status: 500 });
  }
}