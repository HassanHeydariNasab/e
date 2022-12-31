import { GraphQLError } from "graphql";

import { db } from "@db";
import type { QueryResolvers, User } from "@types";

export const me: QueryResolvers["me"] = async (_, __, { userId }) => {
  if (!userId) {
    throw new GraphQLError("");
  }
  const user: User | null = await db
    .collection<User>("users")
    .findOne({ _id: userId });
  if (user === null) {
    throw new GraphQLError("User not found!");
  }
  return user;
};
