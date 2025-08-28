// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import { isTokenValidForDateAndId } from "@/utils/tokenUtils";

const restrictedPathsForUsers = ["/", "/product"];

const publicPaths = ["/login", "/register", "/forgotPassword"];

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const pathname = request.nextUrl.pathname;

    if (token && publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (restrictedPathsForUsers.includes(pathname)) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        if (!(await isTokenValidForDateAndId(token))) {
            try {
                await fetch(`${process.env.BACKEND_URL}/user/logout`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: `token=${token}`,
                    },
                });
                console.log("Token is not valid");
            } catch (error) {
                console.log("Logout failed:", error);
            }

            const response = NextResponse.redirect(new URL("/login", request.url));
            response.cookies.delete("token");
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|static|favicon.ico|robots.txt|images).*)"],
};
