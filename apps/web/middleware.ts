import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;
  if (!token) {
    // redireciona pra login
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // verifica token
    const payload = jwt.verify(token, JWT_SECRET) as { role?: string; [k: string]: any };

    if (payload.role !== "ADMIN") {
      // não autorizado
      const forbiddenUrl = new URL("/", req.url);
      return NextResponse.redirect(forbiddenUrl);
    }

    // autorizado
    return NextResponse.next();
  } catch (err) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
}

// configurar as rotas do admin
export const config = {
  matcher: ["/admin/:path*"],
};
