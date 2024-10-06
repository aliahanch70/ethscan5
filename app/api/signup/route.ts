import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mdb';
import bcrypt from 'bcrypt';

// Handles POST requests for signing up
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("ali");

    // Check if the user already exists
    const existingUser = await db.collection("users").findOne({ username });
    if (existingUser) {
      return NextResponse.json({ message: 'Username already exists' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await db.collection("users").insertOne({ username, password: hashedPassword });

    return NextResponse.json({ message: 'Signup successful' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error during signup' }, { status: 500 });
  }
}
