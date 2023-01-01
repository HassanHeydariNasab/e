import type { Resolvers } from "@types";

import { GraphQLObjectId } from "./scalars/ObjectId";
import { GraphQLDate } from "./scalars/Date";
import {
  sendVerificationCode,
  confirmVerificationCode,
  createCategory,
} from "./mutations";
import { me } from "./queries";

export const resolvers: Resolvers = {
  ObjectId: GraphQLObjectId,
  Date: GraphQLDate,
  Query: {
    hello: () => "world",
    me,
  },
  Mutation: {
    sendVerificationCode,
    confirmVerificationCode,
    createCategory,
  },
};
