import { ObjectId } from "mongodb";

import {
  OrderItemsCollection,
  OrdersCollection,
  ProductsCollection,
} from "@models";
import { OrderStatus } from "@types";
import { OrderShippingsCollection } from "models/orderShippings";

export async function updateDraftOrder(orderId: ObjectId) {
  const order = await OrdersCollection.findOne({
    _id: orderId,
    status: OrderStatus.Draft,
  });
  if (!order) return;

  let orderItems = await OrderItemsCollection.find({
    orderId,
  }).toArray();
  if (!orderItems) return;

  // update orderItem.productSnapshot
  for (let orderItem of orderItems) {
    let product = await ProductsCollection.findOne({
      _id: orderItem.productId,
    });
    if (product) {
      OrderItemsCollection.updateOne(
        { _id: orderItem._id },
        { $set: { productSnapshot: product } }
      );
    }
  }

  orderItems = await OrderItemsCollection.find({
    orderId,
  }).toArray();

  const orderItemsPrice = orderItems.reduce(
    (sum, orderItem) =>
      sum + orderItem.quantity * orderItem.productSnapshot.price,
    0
  );

  const orderShipping = await OrderShippingsCollection.findOne({
    _id: order.orderShippingId,
  });

  // TODO re-calculate orderShipping.price

  // TODO apply coupon and discount

  const orderPrice = orderItemsPrice + (orderShipping?.price || 0);
  await OrdersCollection.updateOne(
    { _id: orderId },
    { $set: { price: orderPrice } }
  );
}
