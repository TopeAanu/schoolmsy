"use client";

// /auth/signup/page.js
export default function SignUp() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });

    const data = await res.json();
    if (res.status === 201) {
      alert(data.message);
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" type="text" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}
