import type { Resolvers } from "@types";

import { GraphQLObjectId } from "./scalars/ObjectId";
import { GraphQLDate } from "./scalars/Date";
import {
  sendVerificationCode,
  confirmVerificationCode,
  createCategory,
} from "./mutations";
import { me, categories } from "./queries";

export const resolvers: Resolvers = {
  ObjectId: GraphQLObjectId,
  Date: GraphQLDate,
  Query: {
    hello: () => "world",
    me,
    categories,
  },
  Mutation: {
    sendVerificationCode,
    confirmVerificationCode,
    createCategory,
  },
};
