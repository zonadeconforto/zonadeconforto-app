import { NextResponse } from "next/server";

/**
 * Handles institution requests.
 */
export async function POST(request: Request) {
  console.log(request);
  return NextResponse.json({}, { status: 200 });
}
