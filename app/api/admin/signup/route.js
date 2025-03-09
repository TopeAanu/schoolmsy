// /api/admin/signup/route.js
import { hash } from 'bcryptjs';
import { connectToDB } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Check for the admin access token in the request headers
    const adminToken = req.headers.get("Admin-Access-Token");
    const secretToken = process.env.ADMIN_ACCESS_TOKEN;
    
    // Verify the token
    if (!adminToken || adminToken !== secretToken) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { username, password, email, fullName } = await req.json();
    
    // Input validation
    if (!username || !password || !email) {
      return NextResponse.json({ message: 'Username, password and email are required' }, { status: 400 });
    }
    
    // Connect to the admin database where users are stored
    const db = await connectToDB("admin");
    const usersCollection = db.collection('users');
    
    // Check if username already exists
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ message: 'Username already exists' }, { status: 409 });
    }
    
    // Hash the password
    const hashedPassword = await hash(password, 12);
    
    // Insert the admin into the database
    const result = await usersCollection.insertOne({
      username,
      password: hashedPassword,
      email,
      fullName,
      role: 'admin',
      createdAt: new Date()
    });
    
    console.log('Admin created successfully:', { username, id: result.insertedId });
    
    // Return success response but don't include password
    return NextResponse.json({
      message: 'Admin account created successfully',
      user: {
        username,
        email,
        fullName,
        role: 'admin'
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error in /api/admin/signup:', error);
    return NextResponse.json({ 
      message: 'Internal Server Error', 
      error: error.message 
    }, { status: 500 });
  }
}






// // /api/admin/signup/route.js
// import { hash } from 'bcryptjs';
// import { connectToDB } from '@/app/lib/db';

// export async function POST(req) {
//   try {
//     const { adminUsername, adminPassword, studentName, age, grade, subjects, image } = await req.json();

//     // Verify admin credentials
//     if (adminUsername !== process.env.ADMIN_USERNAME || adminPassword !== process.env.ADMIN_PASSWORD) {
//       return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
//     }

//     // Connect to the database
//     const db = await connectToDB();
//     const usersCollection = db.collection('users');

//     // Generate a temporary password for the student
//     const temporaryPassword = Math.random().toString(36).slice(-8);
//     const hashedPassword = await hash(temporaryPassword, 12);

//     // Insert the student into the database
//     await usersCollection.insertOne({
//       username: studentName.toLowerCase().replace(/\s+/g, ''),
//       password: hashedPassword,
//       role: 'student',
//       name: studentName,
//       age,
//       grade,
//       subjects: subjects.split(',').map((subject) => subject.trim()),
//       image,
//     });

//     // Return the credentials
//     return new Response(
//       JSON.stringify({
//         credentials: {
//           username: studentName.toLowerCase().replace(/\s+/g, ''),
//           password: temporaryPassword,
//         },
//       }),
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Error in /api/admin/signup:', error);
//     return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), { status: 500 });
//   }
// }