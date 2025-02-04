import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        // Read the stream body and convert it to a JSON object
        const body = await req.json();
        const formData = new FormData();
        formData.append("number", body.username);
        formData.append("otp", body.otp);


        const response = await fetch("http://192.168.1.123:8001/login", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (data.token) {
            // Function to set cookie
            function setCookie(
                name: string,
                value: string,
                options: Record<string, any>
            ) {
                let cookie = `${name}=${value}; Path=${options.path || "/"}; Max-Age=${options.maxAge
                    }`;
                if (options.secure) cookie += "; Secure";
                if (options.httpOnly) cookie += "; HttpOnly";
                if (options.sameSite) cookie += `; SameSite=${options.sameSite}`;
                return cookie;
            }

            // Set the cookie in the response header
            const cookieHeader = setCookie("LoggedUser", data.token, {
                maxAge: 2 * 60 * 60, // 2 hours in seconds
                path: "/",
                httpOnly: true,
                secure: false,
                sameSite: "Strict",
            });

            const response = NextResponse.json({ msg: "LoggedIn", UserName: data.FullName, Title: data.Title, Manager: data.Manager, Departman: data.Departman, Status: data.Status });
            response.headers.set("Set-Cookie", cookieHeader);
            return response;
        } else {
            return NextResponse.json({ msg: "Not Found" });
        }
    } catch {
        return NextResponse.json({ msg: "An error occurred" });
    }
}