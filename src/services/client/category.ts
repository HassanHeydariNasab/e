import type { Category } from "@types";

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
