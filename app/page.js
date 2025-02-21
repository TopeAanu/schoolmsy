// app/page.js
import Link from 'next/link';

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Student Portal</h1>
      <p style={styles.description}>
        This is the homepage of the student management app. Please sign in to access your profile.
      </p>
      <div style={styles.links}>
        <Link href="/auth/signin" style={styles.link}>
          Sign In
        </Link>
        <Link href="/auth/signup" style={styles.link}>
          Admin Sign Up
        </Link>
      </div>
    </div>
  );
}

// Basic inline styles (you can replace this with CSS modules or TailwindCSS)
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f7f7f7',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#333',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    color: '#555',
  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '1rem',
  },
};