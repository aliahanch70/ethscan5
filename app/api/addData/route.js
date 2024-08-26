// app/api/addData/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(request) {
  try {
    const { name, value } = await request.json();
    const client = await clientPromise;
    const db = client.db('ali');

    const result = await db.collection('coll').insertOne({ name, value });

    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
