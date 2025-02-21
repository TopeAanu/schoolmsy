// app/api/admin/manage-users/route.js
import { connectToDB } from '../../../../lib/db';  // Update this path

export async function POST(req) {
  try {
    const { username, name, image, class: studentClass, subjects, age } = await req.json();
    
    const db = await connectToDB();
    const usersCollection = db.collection('users');
    
    const result = await usersCollection.updateOne(
      { username },
      { $set: { name, image, class: studentClass, subjects, age } },
      { upsert: true }
    );
    
    return new Response(
      JSON.stringify({ message: 'User details updated successfully' }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response(
      JSON.stringify({ message: 'Error updating user' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}