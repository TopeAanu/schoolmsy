// app/api/admin/verify-token/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { token } = await request.json();
    
    // Get the secret token from environment variables
    const secretToken = process.env.ADMIN_ACCESS_TOKEN;
    
    if (!secretToken) {
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }
    
    // Compare the provided token with the secret token
    if (token !== secretToken) {
      return NextResponse.json(
        { message: "Invalid access token" },
        { status: 401 }
      );
    }
    
    // Return success response
    return NextResponse.json(
      { message: "Token verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { message: "An error occurred during verification" },
      { status: 500 }
    );
  }
}