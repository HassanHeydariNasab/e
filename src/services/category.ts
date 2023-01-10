import type { Category } from "@types";
import { ObjectId } from "mongodb";

// TODO remove visited nodes to prevent loop
export function allAttributeKeys(category: Category, categories: Category[]) {
  const selectedCategories = [category];

  let parent = categories.find(
    (_category) => _category._id === category.parentId
  );

  if (parent) {
    selectedCategories.push(parent);
    for (let i = 0; i < categories.length; i++) {
      parent = categories.find(
        (_category) => _category._id === parent!.parentId
      );
      if (parent) {
        selectedCategories.push(parent);
        i = 0;
        // TODO optimize it: remove selected category
      } else {
        break;
      }
    }
  }

  return selectedCategories.flatMap((category) => category.attributeKeys);
}

// TODO remove visited nodes to prevent loop
export function childrenCategories(
  categoryId: ObjectId,
  categories: Category[]
) {
  console.log({ categoryId });
  const selectedCategories: Category["_id"][] = [categoryId];
  const children = categories.filter((category) =>
    (category.parentId as ObjectId)?.equals(categoryId)
  );
  console.log({ children });
  if (children.length === 0) {
    return selectedCategories;
  }
  for (let child of children) {
    selectedCategories.push(...childrenCategories(child._id, categories));
  }
  console.log({ selectedCategories });
  return selectedCategories;
}
