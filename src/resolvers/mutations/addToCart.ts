import { GraphQLError } from "graphql";

import { Order, OrderStatus } from "@types";
import type { MutationResolvers } from "@types";
import {
  OrdersCollection,
  OrderItemsCollection,
  ProductsCollection,
} from "@models";
import { updateDraftOrder } from "@services/server/order";

export const addToCart: MutationResolvers["addToCart"] = async (
  _,
  { input: { productId, quantity } },
  { userId }
) => {
  if (!userId) {
    throw new GraphQLError("Please login.", {
      extensions: { http: { status: 401 } },
    });
  }

  const product = await ProductsCollection.findOne({
    _id: productId,
  });
  if (!product) {
    throw new GraphQLError("Product not found");
  }

  // Find or insert cart
  let orderId;
  let order = await OrdersCollection.findOne({
    userId,
    status: OrderStatus.Draft,
  });
  orderId = order?._id;
  if (!order) {
    const { insertedId } = await OrdersCollection.insertOne({
      userId,
      status: OrderStatus.Draft,
      price: 0,
    });
    orderId = insertedId;
  }
  if (!orderId) {
    throw new GraphQLError("Unexpected error");
  }

  const orderItem = await OrderItemsCollection.findOne({ orderId, productId });
  let orderItemId = orderItem?._id;

  if (product.quantity < quantity + (orderItem?.quantity || 0)) {
    throw new GraphQLError("Requested quantity is not available.");
  }

  if (orderItemId) {
    await OrderItemsCollection.updateOne(
      { _id: orderItemId },
      { $inc: { quantity } }
    );
  } else {
    const { insertedId } = await OrderItemsCollection.insertOne({
      orderId,
      productId,
      productSnapshot: product,
      quantity,
    });
    orderItemId = insertedId;
  }

  await updateDraftOrder(orderId);

  const updatedOrder = await OrdersCollection.findOne({ _id: orderId });

  return updatedOrder as Order;
};
