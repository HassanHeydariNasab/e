import { db } from "@db";
import type { Product } from "@types";

export const ProductsCollection = db.collection<Product>("products");
