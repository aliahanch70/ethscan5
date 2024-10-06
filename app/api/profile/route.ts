import { NextResponse } from 'next/server';
import multer from 'multer';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// MongoDB setup
const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);
const SECRET_KEY = process.env.JWT_SECRET || '';

// Initialize Multer for handling file uploads
const upload = multer({ dest: '/tmp/uploads/' });

// Wrap multer in a promise to handle file parsing with Next.js API routes
export const config = {
  api: {
    bodyParser: false, // Disable default bodyParser to allow multer
  },
};

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, SECRET_KEY);
    const username = decoded?.username; // Assuming `username` is the username in the token

    if (!username) {
      return NextResponse.json({ message: 'Username not found' }, { status: 400 });
    }

    // Parse the form data using multer
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const bio = formData.get('bio') as string;
    const profilePicture = formData.get('profilePicture');

    // Save profile picture (this can be improved based on your storage mechanism)
    let filePath = '';
    if (profilePicture) {
      const file = profilePicture as File;
      filePath = `/uploads/${file.name}`;
      // Save the file to the desired storage
    }

    const db = client.db('ali');
    const users = db.collection('users');

    const updatedUser = {
      name,
      bio,
      profilePicture: filePath,
    };

    // Use username extracted from JWT token to update the user's profile
    await users.updateOne(
      { username: username }, // Now matching the user by `username` instead of `_id`
      { $set: updatedUser },
      { upsert: true }  // Update or insert if the user doesn't exist
    );

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ message: 'Error updating profile' }, { status: 500 });
  }
}
