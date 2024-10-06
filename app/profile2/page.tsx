// app/profile2/page.tsx
import Profile from "@/components/Profile";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"; // <-- Ensure this is imported

async function getUserData(username: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined. Check NEXT_PUBLIC_BASE_URL environment variable.");
  }

  const res = await fetch(`${baseUrl}/api/fetchProfile?username=${username}`, {
    cache: "no-store", // Disable caching for dynamic data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return res.json();
}

export default async function ProfilePage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    // Handle case where user is not authenticated
    return <div>Please login to view this page.</div>;
  }

  // Decode JWT token
  let decodedToken;
  try {
    decodedToken = jwt.decode(token); // Use jwt.decode to decode the token
  } catch (error) {
    console.error("Error decoding token", error);
    return <div>Invalid token. Please login again.</div>;
  }

  const username = decodedToken?.username; // Extract username from token

  if (!username) {
    return <div>Unable to retrieve user information. Please try again.</div>;
  }

  // Fetch user data using the API
  let data;
  try {
    data = await getUserData(username);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return <div>Error fetching user data. Please try again later.</div>;
  }

  return (
    <div>
      <Profile user={data.user} />
    </div>
  );
}
