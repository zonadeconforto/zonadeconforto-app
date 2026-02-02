import { NextResponse } from "next/server";
import { userController } from "@/di";
import { HttpException } from "@/app/core/exceptions/http-exception";

/**
 * Handles authenticated user profile operations.
 *
 * GET   → Fetch current user profile
 * PATCH → Update profile data
 */
export async function GET(request: Request) {
  try {
    const user = await userController.get(request);

    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof HttpException) {
      return NextResponse.json({ error: error.message }, { status: error.status || 400 });
    }

    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const updated = await userController.update(request, body);

    return NextResponse.json(updated, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof HttpException) {
      return NextResponse.json({ error: error.message }, { status: error.status || 400 });
    }

    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
