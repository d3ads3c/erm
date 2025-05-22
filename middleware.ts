import { NextResponse, NextRequest } from "next/server";

// Define the expected result type
interface LoginCheckResult {
  Status: string;
}

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const loggedUserCookie = req.cookies.get("LoggedUser");

  if (!loggedUserCookie && pathname !== "/login") {
    // Redirect to login page if not logged in and not already on login page
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (loggedUserCookie && (pathname === "/login" || pathname === '/')) {
    // Redirect to dashboard if logged in and trying to access login page
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Continue with the request if none of the conditions matched

  const formData = new FormData();
  if (loggedUserCookie?.value) {
    formData.append("Token", loggedUserCookie.value);

    async function CheckLogin(): Promise<LoginCheckResult> {
      const response = await fetch("http://localhost:8000/login/check", {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return data as LoginCheckResult;
      } else {
        throw new Error("Response is not JSON");
      }
    }

    try {
      const result = await new Promise<LoginCheckResult>((resolve, reject) => {
        setTimeout(async () => {
          try {
            const data = await CheckLogin();
            resolve(data);
          } catch (error) {
            reject(error);
          }
        }, 3000); // 3 seconds delay
      });
      console.log(result)
      if (result.Status !== "active") {
        const res = NextResponse.redirect(`${origin}/login`);
        res.cookies.delete("LoggedUser");
        return res;
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      const res = NextResponse.redirect(`${origin}/login`);
      res.cookies.delete("LoggedUser");
      return res;
    }
  }

  return NextResponse.next();
}

// Apply middleware to all routes except for the excluded paths
export const config = {
  matcher: ["/((?!api|img|_next/static|_next/image|favicon.ico|sw.js|workbox-4754cb34.js|manifest.json).*)"],
};
