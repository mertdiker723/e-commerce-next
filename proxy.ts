// middleware.ts
import { NextResponse, NextRequest } from "next/server";

const restrictedPathsForUsers = ["/", "/product"];

const publicPaths = ["/login", "/register", "/forgotPassword"];

export async function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const pathname = request.nextUrl.pathname;

    if (token && publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!token && restrictedPathsForUsers.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|static|favicon.ico|robots.txt|images).*)"],
};
