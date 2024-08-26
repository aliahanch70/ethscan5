import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const { name, email, username, telegramUID, password } = await request.json();
    const client = await clientPromise;
    const db = client.db('ali');

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection('users').insertOne({
      name,
      email,
      username,
      telegramUID,
      password: hashedPassword, // Store the hashed password
    });

    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
