import { NextResponse } from "next/server";
import { authController } from "@/di";
import { HttpException } from "@/app/core/exceptions/http-exception";

/**
 * Handles user login requests.
 *
 * Expected payload:
 * {
 *   "email": "john@example.com",
 *   "password": "secret123"
 * }
 *
 * Flow:
 * 1. Parse the request body as JSON.
 * 2. Call `authController.login()` with validated data.
 * 3. Return user data and token if successful.
 * 4. Catch domain or unexpected errors gracefully.
 *
 * To test:
 * curl -X POST http://localhost:3000/auth/login \
 *   -H "Content-Type: application/json" \
 *   -d '{"email":"john@example.com","password":"secret123"}'
 */
const DEBUG = process.env.DEBUG === "true";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await authController.login(body);
    if (DEBUG) {
      console.log("⚠️ login", "result:", result);
    }

    const response = NextResponse.json(result, { status: 200 });
    if (DEBUG) {
      console.log("⚠️ login", "response:", response);
    }

    response.cookies.set({
      name: "token",
      value: result.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: unknown) {
    console.error("Error during login:", error);

    if (error instanceof HttpException) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
