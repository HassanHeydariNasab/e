import { db } from "@db";
import type { Product } from "@types";

export const ProductsCollection =
  db.collection<Omit<Product, "_id">>("products");
