import type { Resolvers } from "@types";

import { GraphQLObjectId } from "./scalars/ObjectId";
import { GraphQLDate } from "./scalars/Date";
import {
  sendVerificationCode,
  confirmVerificationCode,
  createCategory,
  createProductGroup,
  createProduct,
} from "./mutations";
import { me, categories, productGroups, products } from "./queries";

export const resolvers: Resolvers = {
  ObjectId: GraphQLObjectId,
  Date: GraphQLDate,
  Query: {
    hello: () => "world",
    me,
    categories,
    productGroups,
    products,
  },
  Mutation: {
    sendVerificationCode,
    confirmVerificationCode,
    createCategory,
    createProductGroup,
    createProduct,
  },
};
