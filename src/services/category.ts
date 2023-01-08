import type { Category } from "@types";

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
      } else {
        break;
      }
    }
  }

  return selectedCategories.flatMap((category) => category.attributeKeys);
}
