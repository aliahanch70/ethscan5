import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { connectToDatabase } from "@/lib/mongoFetchProfile"; // Adjust the import path as needed

// Enable body parsing
export const config = {
  api: {
    bodyParser: false, // Disallow default body parsing to handle it manually
  },
};

export async function POST(req: Request) {
  const form = new formidable.IncomingForm();
  
  // Set upload directory
  form.uploadDir = path.join(process.cwd(), "/public/uploads"); // Change the path as necessary
  form.keepExtensions = true; // Keep file extensions

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return NextResponse.json({ message: "Error parsing the file." }, { status: 400 });
    }

    const { username } = fields;
    const file = files.image[0];

    if (!file || !username) {
      return NextResponse.json({ message: "Missing image or username." }, { status: 400 });
    }

    const oldPath = file.filepath; // Temporary path
    const newPath = path.join(form.uploadDir, file.originalFilename); // New path where the file will be saved

    // Move the file to the public/uploads directory
    fs.rename(oldPath, newPath, async (err) => {
      if (err) {
        return NextResponse.json({ message: "Failed to save file." }, { status: 500 });
      }

      // Optionally: Save the username and image path to your MongoDB database
      const { db } = await connectToDatabase();
      await db.collection("users").updateOne(
      
        { username },
        { $set: { profilePicture: `/uploads/${file.originalFilename}` } }, // Store path in MongoDB
        { upsert: true }
      );

      return NextResponse.json({ message: "File uploaded successfully." });
    });
  });
}
