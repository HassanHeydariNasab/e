import { db } from "@db";
import type { UserModel } from "@types";

export const UsersCollection = db.collection<Omit<UserModel, "_id">>("users");
