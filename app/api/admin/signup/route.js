// /api/admin/signup/route.js
import { hash } from 'bcryptjs';
import { connectToDB } from '../../../lib/db';

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Authorization check
    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const db = await connectToDB();
    const usersCollection = db.collection('users');

    const hashedPassword = await hash(password, 12);

    await usersCollection.insertOne({
      username,
      password: hashedPassword,
      role: 'admin',
    });

    return new Response(JSON.stringify({ message: 'Admin created successfully' }), { status: 201 });
  } catch (error) {
    console.error('Error in /api/admin/signup:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), { status: 500 });
  }
}