import { NextResponse } from "next/server";
import { institutionController } from "@/di";
import { HttpException } from "@/app/core/exceptions/http-exception";

/**
 * DELETE /api/institutions/:id deleting the institution by the id
 */
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    await institutionController.delete(id);

    return NextResponse.json({ message: "Institution deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error deleting institution:", error);

    if (error instanceof HttpException) {
      return NextResponse.json({ error: error.message }, { status: error.status || 400 });
    }

    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
