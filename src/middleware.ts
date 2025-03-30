import { NextResponse } from 'next/server';
import { verifyToken } from '../lib/jwt';  // Assuming this function exists in your `lib/jwt` file

export function middleware(req: Request) {
  const url = req.url;

  // Define exempt paths that do not require authentication
  const exemptPaths = [
    '/api/auth/login',    // Login route
    '/api/auth/signup',   // Signup route
    '/',                  // Root URL
    '/_next/',            // Static files in _next folder
    '/design/',           // Design-related pages (example)
    '/favicon.ico',       // Exempt favicon.ico
    // Add any other public paths you want to exclude from authentication
  ];

  // Exempt specific paths from authentication
  if (exemptPaths.some(path => url.includes(path)) || url.match(/\.(js|css|jpg|jpeg|png|ico|woff2)$/)) {
    return NextResponse.next();  // Allow request to proceed without authentication
  }

  // Check for Authorization token in headers
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    // If no token is provided, return an authentication error
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  // Verify the token
  const decoded = verifyToken(token);

  if (!decoded) {
    // If token is invalid or expired, return an error
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }

  // Extract user data from the decoded token
  const { userId, username, systemUserId, userType } = decoded as { 
    userId: string; 
    username: string; 
    systemUserId: string; 
    userType: number; 
  };

  // Log user info for debugging purposes
  console.log(`Authenticated user: ${systemUserId}, userType: ${userType}`);

  // Attach user info to the request (optional for downstream processing)
  req.user = { userId, username, systemUserId, userType };

  return NextResponse.next();  // Proceed with the request
}

// Define which pages to protect with the middleware
export const config = {
  matcher: [
    '/home',               // Protect the home page
    '/dashboard',          // Protect the dashboard page
    '/profile',            // Protect the profile page
    '/approvals',          // Protect the approvals page
    '/new-profile',        // Protect any page like new-profile
    '/send-invite',        // Protect send-invite page
    '/request-profile',    // Protect request-profile page
    // Add more routes as needed
  ],
};
