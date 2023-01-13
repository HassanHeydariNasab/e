import { db } from "@db";
import type { OrderModel } from "@types";

export const OrdersCollection =
  db.collection<Omit<OrderModel, "_id">>("orders");
