import { NextResponse } from 'next/server';
import { festivalPages } from '@/data/collections';

// GET all festival pages
export async function GET() {
  return NextResponse.json(festivalPages);
}

// POST a new festival page
export async function POST(request) {
  const newPage = await request.json();
  festivalPages.push(newPage);
  return NextResponse.json(newPage, { status: 201 });
}

// DELETE a festival page by id
export async function DELETE(request) {
  const { id } = await request.json();
  const initialLength = festivalPages.length;
  const newPages = festivalPages.filter(page => page.id !== id);

  if (newPages.length === initialLength) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }

  festivalPages.length = 0;
  festivalPages.push(...newPages);

  return NextResponse.json({ success: true });
}

// PUT (update) a festival page by id
export async function PUT(request) {
  const updatedPage = await request.json();
  const index = festivalPages.findIndex(page => page.id === updatedPage.id);

  if (index === -1) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }

  festivalPages[index] = updatedPage;
  return NextResponse.json(updatedPage);
}