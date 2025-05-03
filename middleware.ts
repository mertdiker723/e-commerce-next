// middleware.ts
import { NextResponse, NextRequest } from "next/server";

const restrictedPathsForUsers = ["/"];
const restrictedPathsForAdmins = ["/admin", "/admin/home"];
const restrictedPaths = [
    ...restrictedPathsForUsers,
    ...restrictedPathsForAdmins,
];

const publicPaths = ["/login", "/register", "/forgotPassword"];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const pathname = request.nextUrl.pathname;
    if (!token && restrictedPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|static|favicon.ico|robots.txt|images).*)"],
};
