import { useQuery, useReactiveVar } from "@apollo/client";

import { GET_CATEGORIES, GET_ME } from "@operations";
import type { Category, User } from "@types";

import { tokenVar } from "./ContextProviders";

interface Props {
  categoryId: string | null;
}

export const useHome = ({ categoryId }: Props) => {
  const token = useReactiveVar(tokenVar);

  const { data: categoriesData, loading: isLoadingCategories } = useQuery<{
    categories: Category[];
  }>(GET_CATEGORIES);

  const { data: userData } = useQuery<{ me: User }>(GET_ME, {
    skip: token === null,
  });

  const currentCategory = categoriesData?.categories.find(
    (category) => category._id === categoryId
  );

  const parentCategory = categoriesData?.categories.find(
    (category) => category._id === currentCategory?.parentId
  );

  return {
    parentCategory,
    currentCategory,
    subcategories:
      categoriesData?.categories.filter(
        (category) => category.parentId === categoryId
      ) || [],
    isLoadingCategories,
    permissions: userData?.me.permissions,
  };
};
