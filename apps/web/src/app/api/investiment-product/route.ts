import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { investmentProductController } from '@/di';
import { HttpException } from '@/app/core/exceptions/http-exception';

const controller = investmentProductController;

/**
 * Next.js App Router handler for /api/investment-product
 * Methods supported:
 *  - GET (list or getById)
 *  - POST (create)
 *  - PATCH (partial update)
 *  - DELETE (physical delete)
 */

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (id) {
      const result = await controller.getById(id);
      return NextResponse.json(result, { status: 200 });
    }

    const list = await controller.list();
    return NextResponse.json(list, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Required fields not found',
          errors: error.issues.map(e => ({ path: e.path.join('.'), message: e.message })),
        },
        { status: 400 }
      );
    }

    if (error instanceof HttpException) {
      return NextResponse.json({ error: error.message }, { status: error.status || 400 });
    }

    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as unknown;
    const created = await controller.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Required fields not found',
          errors: error.issues.map(e => ({ path: e.path.join('.'), message: e.message })),
        },
        { status: 400 }
      );
    }

    if (error instanceof HttpException) {
      return NextResponse.json({ error: error.message }, { status: error.status || 400 });
    }

    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'id query param is required' }, { status: 400 });
    }

    const body = (await req.json()) as unknown;
    const updated = await controller.update(id, body);
    return NextResponse.json(updated, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          errors: error.issues.map(e => ({ path: e.path.join('.'), message: e.message })),
        },
        { status: 400 }
      );
    }

    if (error instanceof HttpException) {
      return NextResponse.json({ error: error.message }, { status: error.status || 400 });
    }

    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'id query param is required' }, { status: 400 });
    }

    await controller.delete(id);
    return NextResponse.json({ message: 'Deleted' }, { status: 204 });
  } catch (error: unknown) {
    if (error instanceof HttpException) {
      return NextResponse.json({ error: error.message }, { status: error.status || 400 });
    }
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
