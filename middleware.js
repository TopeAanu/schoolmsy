import { NextResponse } from "next/server";

export function middleware(request) {
  // Get the pathname from the request
  const pathname = request.nextUrl.pathname;

  // Only apply middleware to the admin signup page
  if (pathname === "/admin/signup") {
    // Check for the adminVerified flag in the cookies
    const adminVerified = request.cookies.get("adminVerified")?.value;

    // If not verified, redirect to the verification page
    if (adminVerified !== "true") {
      return NextResponse.redirect(new URL("/admin/verify", request.url));
    }

    // If verified, clear the cookie after this use and continue
    const response = NextResponse.next();
    response.cookies.delete("adminVerified");
    return response;
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/signup"],
};
