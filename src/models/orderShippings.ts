import { db } from "@db";
import type { OrderShippingModel } from "@types";

export const OrderShippingsCollection =
  db.collection<Omit<OrderShippingModel, "_id">>("orderShippings");
