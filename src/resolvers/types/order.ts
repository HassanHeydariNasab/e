import { OrderResolvers, OrderShipping, Permission, User } from "@types";
import {
  OrderItemsCollection,
  OrderShippingsCollection,
  UsersCollection,
} from "@models";

const orderItems: OrderResolvers["orderItems"] = async (
  { _id: orderId },
  _,
  { userId }
) => {
  const orderItems = await OrderItemsCollection.find({
    orderId,
  }).toArray();
  return orderItems;
};

const orderShipping: OrderResolvers["orderShipping"] = async (
  { orderShippingId },
  _,
  { userId }
) => {
  const orderShipping = await OrderShippingsCollection.findOne({
    _id: orderShippingId,
  });
  return orderShipping as OrderShipping | null;
};

const user: OrderResolvers["user"] = async (
  { userId: orderUserId },
  _,
  { userId, permissions }
) => {
  if (
    orderUserId === userId ||
    permissions?.includes(Permission.Admin) ||
    permissions?.includes(Permission.Accounting)
  ) {
    const user = await UsersCollection.findOne({
      _id: orderUserId,
    });
    return user as User | null;
  }
  return null;
};

export const orderResolvers: OrderResolvers = {
  orderItems,
  orderShipping,
  user,
};
