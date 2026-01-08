import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SecurityService } from "@/shared/security/utils";

const DEBUG = process.env.DEBUG === "true";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;
  if (DEBUG) {
    console.log("⚠️ middleware", "MIDDLEWARE:", pathname, "token:", !!token, "url:", req.url);
  }

  if (!token) {
    // redireciona pra login
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

    // verifica token
    const { payload } = await jwtVerify(token, secret);
    if (DEBUG) {
      console.log("⚠️ middleware", "payload:", payload);
    }

    if (payload.role !== "ADMIN") {
      if (DEBUG) {
        console.log("⚠️ middleware if (payload.role !== 'ADMIN') ", payload.role);
      }
      // não autorizado
      const forbiddenUrl = new URL("/", req.url);
      return NextResponse.redirect(forbiddenUrl);
    }

    if (DEBUG) {
      console.log("⚠️ middleware else - if (payload.role !== 'ADMIN') ", payload.role);
    }
    // autorizado
    return NextResponse.next();
  } catch (err) {
    console.error("⚠️ middleware catch", err);
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
}

// configurar as rotas do admin
export const config = {
  matcher: ["/admin/:path*"],
};
