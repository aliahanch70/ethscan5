import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('ali'); // Ensure you are using the correct database name
    const { email, password } = await request.json();

    console.log(`Email: ${email}`); // Debug log
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      console.log('User not found'); // Debug log
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(password + " 4  "+user.password)
    if (!isMatch) {
      console.log('Password does not match'); // Debug log
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return NextResponse.json({ token });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
