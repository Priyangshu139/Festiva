import { NextResponse } from 'next/server';
import { festivalBundles } from '@/data/collections';

// GET all festival bundles
export async function GET() {
  return NextResponse.json(festivalBundles);
}

// POST a new festival bundle
export async function POST(request) {
  const newBundle = await request.json();
  festivalBundles.push(newBundle);
  return NextResponse.json(newBundle, { status: 201 });
}

// DELETE a festival bundle by name
export async function DELETE(request) {
  const { name } = await request.json();
  const initialLength = festivalBundles.length;
  const newBundles = festivalBundles.filter(bundle => bundle.name !== name);

  if (newBundles.length === initialLength) {
    return NextResponse.json({ error: 'Bundle not found' }, { status: 404 });
  }

  festivalBundles.length = 0;
  festivalBundles.push(...newBundles);

  return NextResponse.json({ success: true });
}

// PUT (update) a festival bundle by name
export async function PUT(request) {
  const updatedBundle = await request.json();
  const index = festivalBundles.findIndex(bundle => bundle.name === updatedBundle.name);

  if (index === -1) {
    return NextResponse.json({ error: 'Bundle not found' }, { status: 404 });
  }

  festivalBundles[index] = updatedBundle;
  return NextResponse.json(updatedBundle);
}