import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/app/lib/db";

export async function POST(request) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 400 }
      );
    }
    
    // Connect to the authentication database
    const db = await connectToDB("authentication");
    
    // Get the admin access token from the database
    const tokenDoc = await db.collection("admin-tokens").findOne({ active: true });
    
    if (!tokenDoc) {
      return NextResponse.json(
        { message: "No active token found" },
        { status: 401 }
      );
    }
    
    // Compare the provided token with the hashed token using bcrypt
    const isValid = await bcrypt.compare(token, tokenDoc.hashedToken);
    
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid access token" },
        { status: 401 }
      );
    }
    
    // Create a successful response
    const response = NextResponse.json(
      { message: "Token verified successfully" },
      { status: 200 }
    );
    
    // Set the cookie as a session cookie (expires when browser closes)
    response.cookies.set("adminVerified", "true", {
      path: "/",
      httpOnly: true,      // Makes it only accessible by the server
      secure: process.env.NODE_ENV === "production",  // HTTPS only in production
      sameSite: "strict",  // Prevents the cookie from being sent in cross-site requests
      // No maxAge or expires property means it's a session cookie
    });
    
    return response;
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { message: "An error occurred during verification" },
      { status: 500 }
    );
  }
}