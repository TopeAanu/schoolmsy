// /dashboard/page.js
import { getSession } from 'next-auth/react';
import { connectToDB } from '@/lib/db';

export default function Dashboard({ user }) {
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

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  const db = await connectToDB();
  const usersCollection = db.collection('users');

  const user = await usersCollection.findOne({ username: session.user.name });

  if (!user) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        name: user.name,
        image: user.image,
        class: user.class,
        subjects: user.subjects,
        age: user.age,
      },
    },
  };
}