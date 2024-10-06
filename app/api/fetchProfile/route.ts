import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoFetchProfile"; // Make sure to adjust the import based on your actual path

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username"); // Get username from query parameters

    if (!username) {
      return NextResponse.json({ message: "Username is required" }, { status: 400 });
    }

    const { db } = await connectToDatabase(); // Ensure this function is correctly defined to connect to MongoDB
    const user = await db.collection("users").findOne({ username: username }); // Fetch user by username

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
