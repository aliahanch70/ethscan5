// pages/api/auth/status.js
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    const token = request.cookies.get("authToken");
    console.error('token ' , token);
    if (!token) {
        console.error('token error');
        return NextResponse.json({ isLoggedIn: false });
      
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const client = await clientPromise;
    const db = client.db("ali");

    const user = await db.collection("users").findOne({ email });
    console.error(_id, decoded.userId);

    if (!user) {
      return NextResponse.json({ isLoggedIn: false });
    }

    return NextResponse.json({
      isLoggedIn: true,
      name: user.name,
      url: user.profilePicUrl || "/images/user/userD.jpg",
      title: user.title,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ isLoggedIn: false });
  }
}
