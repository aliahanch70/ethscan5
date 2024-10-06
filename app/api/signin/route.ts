import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mdb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const SECRET_KEY = process.env.SECRET_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("ali");

    // Find the user by username
    const user = await db.collection("users").findOne({ username });
    if (!user) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    // Create a JWT token
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    // Set the token in cookies
    const cookie = serialize('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });

    const response = NextResponse.json({ message: 'Signin successful' });
    response.headers.set('Set-Cookie', cookie);
    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Error during signin' }, { status: 500 });
  }
}
