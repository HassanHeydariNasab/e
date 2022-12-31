import { db } from "@db";
import type { User } from "@types";

export const UsersCollection = db.collection<User>("users");
