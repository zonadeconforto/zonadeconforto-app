import { NextResponse } from "next/server";
import { userController } from "@/di";
import { HttpException } from "@/app/core/exceptions/http-exception";

/**
 * List all users
 */
export async function GET(request: Request) {
  try {
    const users = await userController.listAll(request);

    return NextResponse.json(users, { status: 200 });
  } catch (error: unknown) {
    console.error("[ADMIN USERS GET]", error);

    if (error instanceof HttpException) {
      return NextResponse.json({ error: error.message }, { status: error.status || 400 });
    }

    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
