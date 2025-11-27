import { HttpException } from "@/app/core/exceptions/http-exception";
import { institutionController } from "@/di";
import Error from "next/error";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Handles institution requests.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const uuid = await institutionController.create({ ...body });
    return NextResponse.json({ id: uuid }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error creating institution:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Required fields not found",
          errors: error.issues.map(e => ({
            path: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    if (error instanceof HttpException) {
      return NextResponse.json({ error: error.message }, { status: error.status || 400 });
    }

    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
