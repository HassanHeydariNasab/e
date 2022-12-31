import { GraphQLError } from "graphql";

import type { QueryResolvers } from "@types";
import { UsersCollection } from "@models";

export const me: QueryResolvers["me"] = async (_, __, { userId }) => {
  if (!userId) {
    throw new GraphQLError("Please login.", {
      extensions: { http: { status: 401 } },
    });
  }
  const user = await UsersCollection.findOne({ _id: userId });
  if (user === null) {
    throw new GraphQLError("User not found!");
  }
  return user;
};
