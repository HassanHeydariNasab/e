import { GraphQLError } from "graphql";

import { Order, OrderStatus } from "@types";
import type { MutationResolvers } from "@types";
import {
  OrdersCollection,
  OrderItemsCollection,
  ProductsCollection,
} from "@models";
import { updateDraftOrder } from "@services/server/order";

export const updateOrderItemQuantity: MutationResolvers["updateOrderItemQuantity"] =
  async (_, { input: { orderItemId, quantity } }, { userId }) => {
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
      throw new GraphQLError(
        "You do not have a cart! it's an unexpected case."
      );
    }

    const orderItem = await OrderItemsCollection.findOne({ _id: orderItemId });
    if (!orderItem) {
      throw new GraphQLError("Order item not found");
    }

    const product = await ProductsCollection.findOne({
      _id: orderItem?.productId,
    });
    if (!product) {
      throw new GraphQLError("Product not found");
    }

    if (product.quantity < quantity) {
      throw new GraphQLError("Requested quantity is not available.");
    }

    await OrderItemsCollection.updateOne(
      { _id: orderItemId },
      { $set: { quantity } }
    );

    await updateDraftOrder(order._id);

    const updatedOrder = await OrdersCollection.findOne({ _id: order._id });

    return updatedOrder as Order;
  };
