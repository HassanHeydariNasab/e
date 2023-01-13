import { db } from "@db";
import type { OrderItemModel } from "@types";

export const OrderItemsCollection =
  db.collection<Omit<OrderItemModel, "_id">>("orderItems");
