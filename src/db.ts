import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGODB_URI || "");
export const db = mongoClient.db("e");
