import { db } from "@db";
import type { Category } from "@types";

export const CategoriesCollection =
  db.collection<Omit<Category, "_id">>("categories");
