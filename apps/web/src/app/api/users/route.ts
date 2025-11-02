import { NextResponse } from "next/server";
import { userController } from "@/di";
import { Role } from "@/generated/prisma/enums";
import { HttpException } from "../../core/exceptions/http-exception";

/**
 * Handles HTTP POST requests to create a new user.
 * 
 * This endpoint expects a JSON body with the user data.
 * Example payload:
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "password": "secret123",
 * }
 *
 * Flow:
 * 1. Parse the incoming request body as JSON.
 * 2. Call the `userController.create()` method with validated data.
 * 3. Return the created user ID and payload as a JSON response.
 * 4. Catch and handle any unexpected errors gracefully.
 *
 * To test:
 *  curl -X POST http://localhost:3000/api/users \
 *    -H "Content-Type: application/json" \
 *    -d '{"name":"John Doe","email":"john@example.com","password":"secret123"}'
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const uuid = await userController.create({ role: Role.CLIENT, ...body} );
    return NextResponse.json({id: uuid, email: body.email, name: body.name }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating user:", error);

    if (error instanceof HttpException) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status || 400 }
      );
    }

    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
