import { NextResponse } from 'next/server';
import { orders } from '@/data/collections';

// GET all orders
export async function GET() {
  return NextResponse.json(orders);
}

// POST a new order
export async function POST(request) {
  const newOrder = await request.json();
  orders.push(newOrder);
  return NextResponse.json(newOrder, { status: 201 });
}

// DELETE an order by transactionId
export async function DELETE(request) {
  const { transactionId } = await request.json();
  const initialLength = orders.length;
  const newOrders = orders.filter(order => order.transactionId !== transactionId);

  if (newOrders.length === initialLength) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  orders.length = 0;
  orders.push(...newOrders);

  return NextResponse.json({ success: true });
}

// PUT (update) an order by transactionId
export async function PUT(request) {
  const updatedOrder = await request.json();
  const index = orders.findIndex(order => order.transactionId === updatedOrder.transactionId);

  if (index === -1) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  orders[index] = updatedOrder;
  return NextResponse.json(updatedOrder);
}