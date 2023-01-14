import type { Resolvers } from "@types";

import { GraphQLObjectId } from "./scalars/ObjectId";
import { GraphQLDate } from "./scalars/Date";
import {
  sendVerificationCode,
  confirmVerificationCode,
  createCategory,
  createProductGroup,
  createProduct,
  addToCart,
  removeFromCart,
} from "./mutations";
import { me, categories, productGroups, products, cart } from "./queries";
import { orderItemResolvers, orderResolvers } from "./types";

export const resolvers: Resolvers = {
  ObjectId: GraphQLObjectId,
  Date: GraphQLDate,
  Query: {
    hello: () => "world",
    me,
    categories,
    productGroups,
    products,
    cart,
  },
  Mutation: {
    sendVerificationCode,
    confirmVerificationCode,
    createCategory,
    createProductGroup,
    createProduct,
    addToCart,
    removeFromCart,
  },
  Order: orderResolvers,
  OrderItem: orderItemResolvers,
};
