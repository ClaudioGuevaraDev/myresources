import { MongoClient } from "mongodb";
import { MONGODB_URI } from "./config.js";

export async function connectionDB(collectionName) {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db("myresources");
  const collection = db.collection(collectionName);
  return collection;
}
