import { GraphQLError } from "graphql";

import { Order, OrderStatus } from "@types";
import type { QueryResolvers } from "@types";
import { OrdersCollection } from "@models";

export const cart: QueryResolvers["cart"] = async (_, __, { userId }) => {
  let order = await OrdersCollection.findOne({
    userId,
    status: OrderStatus.Draft,
  });
  if (!order) {
    const { insertedId } = await OrdersCollection.insertOne({
      userId,
      status: OrderStatus.Draft,
      price: 0,
    });
    order = await OrdersCollection.findOne({ _id: insertedId });
  }
  if (!order) {
    throw new GraphQLError("Unexpected error");
  }
  return order as Order;
};
