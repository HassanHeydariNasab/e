import type { Resolvers } from "@types";

import { GraphQLObjectId } from "./scalars/ObjectId";
import { sendVerificationCode, confirmVerificationCode } from "./mutations";
import { me } from "./queries";

export const resolvers: Resolvers = {
  ObjectId: GraphQLObjectId,
  Query: {
    hello: () => "world",
    me,
  },
  Mutation: {
    sendVerificationCode,
    confirmVerificationCode,
  },
};
