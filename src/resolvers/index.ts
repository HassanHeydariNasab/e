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
  updateOrderItemQuantity,
} from "./mutations";
import {
  me,
  categories,
  productGroups,
  products,
  product,
  productsInProductGroup,
  cart,
  exchangeRate,
} from "./queries";
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
    product,
    productsInProductGroup,
    cart,
    exchangeRate,
  },
  Mutation: {
    sendVerificationCode,
    confirmVerificationCode,
    createCategory,
    createProductGroup,
    createProduct,
    addToCart,
    removeFromCart,
    updateOrderItemQuantity,
  },
  Order: orderResolvers,
  OrderItem: orderItemResolvers,
};
