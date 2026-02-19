import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    //gget the host (subdommain or domain)
    const host = request.headers.get("host");

    if (host?.startsWith("preview")) {
        // Route through [domain] routing using the reserved "preview" domain slug.
        // ?template=<slug> on the request URL is forwarded automatically.
        return NextResponse.rewrite(
            new URL(
                `/preview${request.nextUrl.pathname}${request.nextUrl.search}`,
                request.url,
            ),
        );
    }

    if (host?.endsWith("localhost:3001")) {
        return NextResponse.rewrite(
            new URL(
                `/${host.replace("localhost:3001", "limefolio.com")}${request.nextUrl.pathname}`,
                request.url,
            ),
        );
    }

    return NextResponse.rewrite(
        new URL(`/${host}${request.nextUrl.pathname}`, request.url),
    );
}

export const config = {
    matcher: [
        // Exclude API routes, static files, image optimizations, and .png files
        "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    ],
};
