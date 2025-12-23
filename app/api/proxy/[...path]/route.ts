import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    return handleRequest(request, await params, "GET");
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    return handleRequest(request, await params, "POST");
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    return handleRequest(request, await params, "PUT");
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    return handleRequest(request, await params, "DELETE");
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    return handleRequest(request, await params, "PATCH");
}

async function handleRequest(
    request: NextRequest,
    params: { path: string[] },
    method: string
) {
    try {
        const { path } = params;
        const backendUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BACKEND_URL;

        if (!backendUrl) {
            return NextResponse.json(
                { error: "Backend URL not configured" },
                { status: 500 }
            );
        }

        // Build the target URL
        const targetPath = path.join("/");
        const searchParams = request.nextUrl.searchParams.toString();
        const targetUrl = `${backendUrl}/${targetPath}${
            searchParams ? `?${searchParams}` : ""
        }`;

        // Get cookies from the request
        const cookieStore = await cookies();
        const allCookies = cookieStore.toString();

        // Prepare headers
        const headers: HeadersInit = {
            "Content-Type": "application/json",
            ...(allCookies && { Cookie: allCookies }),
        };

        // Prepare request options
        const options: RequestInit = {
            method,
            headers,
        };

        // Add body for POST, PUT, PATCH requests
        if (["POST", "PUT", "PATCH"].includes(method)) {
            try {
                const body = await request.json();
                options.body = JSON.stringify(body);
            } catch {
                // No body or invalid JSON
            }
        }

        // Make the request to the backend
        const response = await fetch(targetUrl, options);
        
        // Clone the response to read it
        const responseClone = response.clone();
        
        // Get the response body as text first (to avoid compression issues)
        const responseText = await response.text();

        // Forward any Set-Cookie headers from the backend
        const setCookieHeaders = responseClone.headers.getSetCookie?.() || [];
        const responseHeaders = new Headers();
        
        setCookieHeaders.forEach((cookie) => {
            responseHeaders.append("Set-Cookie", cookie);
        });

        // Copy important headers (but skip compression-related ones)
        const headersToSkip = ['content-encoding', 'content-length', 'transfer-encoding', 'set-cookie'];
        responseClone.headers.forEach((value, key) => {
            if (!headersToSkip.includes(key.toLowerCase())) {
                responseHeaders.set(key, value);
            }
        });

        // Return the response as-is (uncompressed)
        return new NextResponse(responseText, {
            status: responseClone.status,
            statusText: responseClone.statusText,
            headers: responseHeaders,
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Proxy request failed",
                message: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

