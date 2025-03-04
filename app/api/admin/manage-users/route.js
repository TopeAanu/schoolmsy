// app/api/admin/manage-users/route.js
import { connectToDB } from '@/app/lib/db';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get('username');
    
    const db = await connectToDB();
    const usersCollection = db.collection('users');
    
    if (username) {
      // Get a specific user
      const user = await usersCollection.findOne({ username });
      if (!user) {
        return new Response(
          JSON.stringify({ message: 'User not found' }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
      return new Response(
        JSON.stringify(user),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else {
      // Get all users
      const users = await usersCollection.find({}).toArray();
      return new Response(
        JSON.stringify(users),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching users' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

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
      JSON.stringify({ 
        message: 'User details updated successfully',
        acknowledged: result.acknowledged,
        modifiedCount: result.modifiedCount,
        upsertedId: result.upsertedId
      }),
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

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get('username');
    
    if (!username) {
      return new Response(
        JSON.stringify({ message: 'Username parameter is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    const db = await connectToDB();
    const usersCollection = db.collection('users');
    
    const result = await usersCollection.deleteOne({ username });
    
    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ message: 'User not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        message: 'User deleted successfully',
        deletedCount: result.deletedCount
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response(
      JSON.stringify({ message: 'Error deleting user' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function PUT(req) {
  // This is the same as POST but separated for semantic clarity
  return POST(req);
}