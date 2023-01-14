import type { ObjectId } from "mongodb";

import type { Category } from "@types";

// TODO remove visited nodes to prevent loop
export function childrenCategories(
  categoryId: ObjectId,
  categories: Category[]
) {
  const selectedCategories: Category["_id"][] = [categoryId];
  const children = categories.filter((category) =>
    (category.parentId as ObjectId)?.equals(categoryId)
  );
  if (children.length === 0) {
    return selectedCategories;
  }
  for (let child of children) {
    selectedCategories.push(...childrenCategories(child._id, categories));
  }
  return selectedCategories;
}
