import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const loggedUserCookie = req.cookies.get("LoggedUser");

  if (!loggedUserCookie && pathname !== "/login") {
    // Redirect to login page if not logged in and not already on login page
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (loggedUserCookie && pathname === "/login") {
    // Redirect to dashboard if logged in and trying to access login page
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Continue with the request if none of the conditions matched
  return NextResponse.next();
}

// Apply middleware to all routes except for the excluded paths
export const config = {
  matcher: ["/((?!api|img|_next/static|_next/image|favicon.ico).*)"],
};
