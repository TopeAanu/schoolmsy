import { hash } from "bcryptjs";
import { connectToDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {

    const { username, password, email, fullName } = await req.json();

    // Input validation
    if (!username || !password || !email) {
      return NextResponse.json(
        { message: "Username, password and email are required" },
        { status: 400 }
      );
    }

    // Connect to the admin database where users are stored
    const db = await connectToDB("admin");
    const usersCollection = db.collection("users");

    // Check if username already exists
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 12);

    // Insert the admin into the database
    const result = await usersCollection.insertOne({
      username,
      password: hashedPassword,
      email,
      fullName,
      role: "admin",
      createdAt: new Date(),
    });

    console.log("Admin created successfully:", {
      username,
      id: result.insertedId,
    });

    // Return success response but don't include password
    return NextResponse.json(
      {
        message: "Admin account created successfully",
        user: {
          username,
          email,
          fullName,
          role: "admin",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in /api/admin/signup:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
