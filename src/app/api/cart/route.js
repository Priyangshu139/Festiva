import { NextResponse } from 'next/server';
import { cartContext } from '@/data/collections';

// GET cart context
export async function GET() {
  return NextResponse.json(cartContext);
}

// POST (update) cart context
export async function POST(request) {
  const updatedCart = await request.json();
  Object.assign(cartContext, updatedCart);
  return NextResponse.json(cartContext);
}

// DELETE cart context (clear cart)
export async function DELETE() {
  const initialCart = {
    phone: '',
    bundle: [],
    item: [],
    total: 0,
    quantity: [],
    distributorIndex: []
  };
  Object.assign(cartContext, initialCart);
  return NextResponse.json({ success: true });
}

// PUT (update specific field) cart context
export async function PUT(request) {
  const { field, value } = await request.json();

  if (field in cartContext) {
    cartContext[field] = value;
    return NextResponse.json(cartContext);
  }

  return NextResponse.json({ error: 'Field not found' }, { status: 404 });
}