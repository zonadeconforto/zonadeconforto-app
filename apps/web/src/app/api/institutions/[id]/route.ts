import { NextResponse } from "next/server";
import { institutionController } from "@/di";
import { HttpException } from "@/app/core/exceptions/http-exception";
import { UpdateInstitutionSchema } from "@/modules/institution/dtos/update-institution.dto";

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

/**
 * PATCH /api/institutions/:id
 * Updates an institution with the provided fields
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = UpdateInstitutionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const updatedInstitution = await institutionController.update(id, parsed.data);

    return NextResponse.json(
      { message: "Institution updated successfully", data: updatedInstitution },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating institution:", error);
    return NextResponse.json(
      { error: error instanceof HttpException ? error.message : "Unexpected server error" },
      { status: error instanceof HttpException ? error.status : 500 }
    );
  }
}
