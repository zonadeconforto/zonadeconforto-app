import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SecurityService } from "@/shared/security/utils";

const DEBUG = process.env.DEBUG === "true";
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? "https://zonadeconforto.com,zonadeconforto.com,http://zonadeconforto.com")
  .split(",")
  .map((o) => o.trim());

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const origin = req.headers.get("origin");
  const res = NextResponse.next();

  // ===== CORS =====
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Access-Control-Allow-Credentials", "true");
  }
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: res.headers });
  }

  if (!pathname.startsWith("/admin")) {
    return res;
  }

  const token = req.cookies.get("token")?.value;
  if (DEBUG) {
    console.log("⚠️ middleware", "MIDDLEWARE:", pathname, "token:", !!token, "url:", req.url);
  }

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const cookieToken = req.cookies.get("token")?.value;
    const authHeader = req.headers.get("authorization");
    const headerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    const token = cookieToken || headerToken;
    const secret = SecurityService.getJwtSecret();

    if (DEBUG) {
      console.log(
        "⚠️ middleware",
        "token:",
        token,
        "cookieToken:",
        cookieToken,
        "headerToken:",
        headerToken
      );
    }

    const { payload } = await jwtVerify(token, secret);
    if (DEBUG) {
      console.log("⚠️ middleware", "payload:", payload);
    }

    if (payload.role !== "ADMIN") {
      if (DEBUG) {
        console.log("⚠️ middleware if (payload.role !== 'ADMIN') ", payload.role);
      }
      const forbiddenUrl = new URL("/", req.url);
      return NextResponse.redirect(forbiddenUrl);
    }

    if (DEBUG) {
      console.log("⚠️ middleware else - if (payload.role !== 'ADMIN') ", payload.role);
    }
    return res;
  } catch (err) {
    console.error("⚠️ middleware catch", err);
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
