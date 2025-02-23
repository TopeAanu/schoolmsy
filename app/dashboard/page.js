// app/dashboard/page.js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDB } from '@/lib/db';

export default async function Dashboard() {
  // Get the session
  const session = await getServerSession(authOptions);

  // Redirect if there's no session
  if (!session) {
    return redirect('/auth/signin');
  }

  // Fetch user data from the database
  const db = await connectToDB();
  const usersCollection = db.collection('users');
  const user = await usersCollection.findOne({ username: session.user.name });

  // Redirect if the user doesn't exist
  if (!user) {
    return redirect('/auth/signin');
  }

  // Render the dashboard
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <img src={user.image} alt="Student" />
      <p>Name: {user.name}</p>
      <p>Class: {user.class}</p>
      <p>Subjects: {user.subjects}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}