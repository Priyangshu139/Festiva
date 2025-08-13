import { NextResponse } from 'next/server';
import { individualItems } from '@/data/collections';

// GET all individual items
export async function GET() {
  return NextResponse.json(individualItems);
}

// POST a new individual item
export async function POST(request) {
  const newItem = await request.json();
  individualItems.push(newItem);
  return NextResponse.json(newItem, { status: 201 });
}

// DELETE an individual item by id
export async function DELETE(request) {
  const { id } = await request.json();
  const initialLength = individualItems.length;
  const newItems = individualItems.filter(item => item.id !== id);

  if (newItems.length === initialLength) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  individualItems.length = 0;
  individualItems.push(...newItems);

  return NextResponse.json({ success: true });
}

// PUT (update) an individual item by id
export async function PUT(request) {
  const updatedItem = await request.json();
  const index = individualItems.findIndex(item => item.id === updatedItem.id);

  if (index === -1) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  individualItems[index] = updatedItem;
  return NextResponse.json(updatedItem);
}