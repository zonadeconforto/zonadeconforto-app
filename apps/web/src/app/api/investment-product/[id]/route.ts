import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { HttpException } from "@/app/core/exceptions/http-exception";
import { investmentProductController } from "@/di";

const controller = investmentProductController;

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // ✅ resolve a Promise

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const result = await controller.getById(id);

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    console.error("[InvestmentProduct GET BY ID Error]", error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Validation error" }, { status: 400 });
    }

    if (error instanceof HttpException) {
      return NextResponse.json({ error: error.message }, { status: error.status || 400 });
    }

    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
