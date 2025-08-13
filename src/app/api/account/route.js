import { NextResponse } from 'next/server';
import { account } from '@/data/collections';

// GET account information
export async function GET() {
  return NextResponse.json(account);
}

// POST (update) account information
export async function POST(request) {
  const updatedAccount = await request.json();
  Object.assign(account, updatedAccount);
  return NextResponse.json(account);
}

// DELETE account information (clear account)
export async function DELETE() {
  const initialAccount = {
    name: '',
    mobile: '',
    address: []
  };
  Object.assign(account, initialAccount);
  return NextResponse.json({ success: true });
}

// PUT (update specific field) account information
export async function PUT(request) {
  const { field, value } = await request.json();

  if (field in account) {
    account[field] = value;
    return NextResponse.json(account);
  }

  return NextResponse.json({ error: 'Field not found' }, { status: 404 });
}