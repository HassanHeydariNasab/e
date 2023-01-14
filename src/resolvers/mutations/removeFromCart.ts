import { GraphQLError } from "graphql";

import { OrderStatus } from "@types";
import type { Order, MutationResolvers } from "@types";
import { OrdersCollection, OrderItemsCollection } from "@models";
import { updateDraftOrder } from "@services/server/order";

export const removeFromCart: MutationResolvers["removeFromCart"] = async (
  _,
  { input: { orderItemId } },
  { userId }
) => {
  if (!userId) {
    throw new GraphQLError("Please login.", {
      extensions: { http: { status: 401 } },
    });
  }

  const order = await OrdersCollection.findOne({
    userId,
    status: OrderStatus.Draft,
  });

  if (!order) {
    throw new GraphQLError("You do not have a cart! it's an unexpected case.");
  }

  const { deletedCount } = await OrderItemsCollection.deleteOne({
    _id: orderItemId,
  });

  if (deletedCount !== 1) {
    throw new GraphQLError("Nothing removed!");
  }

  await updateDraftOrder(order._id);

  const updatedOrder = await OrdersCollection.findOne({ _id: order._id });

  return updatedOrder as Order;
};
