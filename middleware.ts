import {
  convexAuthNextjsMiddleware,
  convexAuthNextjsToken,
} from "@convex-dev/auth/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export default convexAuthNextjsMiddleware(
  async (request: NextRequest, { convexAuth }) => {
    if (request.nextUrl.pathname === "/api/auth") {
      console.log("[AUTH DEBUG] /api/auth hit", {
        method: request.method,
        url: request.url,
        origin: request.headers.get("origin"),
        host: request.headers.get("host"),
        CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT ? "SET" : "MISSING",
        NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL ?? "MISSING",
        AUTH_SECRET: process.env.AUTH_SECRET ? "SET" : "MISSING",
      });
    }
    return NextResponse.next();
  },
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
