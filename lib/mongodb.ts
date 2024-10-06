import { MongoClient } from "mongodb";

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return { db: cachedClient.db() };
  }

  const client = new MongoClient(process.env.MONGO_URI!);
  await client.connect();
  cachedClient = client;

  return { db: client.db() };
}
