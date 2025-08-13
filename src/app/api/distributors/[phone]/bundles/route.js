import { NextResponse } from 'next/server';
import clientPromise from '../../../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  const { phone } = params;
  try {
    const client = await clientPromise;
    const db = client.db("festive_bundles");
    const bundles = await db.collection("bundles").find({ distributor: phone }).toArray();
    return NextResponse.json(bundles);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch bundles" }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const { phone } = params;
  try {
    const client = await clientPromise;
    const db = client.db("festive_bundles");
    const newBundle = await request.json();
    const result = await db.collection("bundles").insertOne({ ...newBundle, distributor: phone });
    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to add bundle" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { phone } = params;
  try {
    const client = await clientPromise;
    const db = client.db("festive_bundles");
    const { name } = await request.json();
    const result = await db.collection("bundles").deleteOne({ name: name, distributor: phone });
    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete bundle" }, { status: 500 });
  }
}