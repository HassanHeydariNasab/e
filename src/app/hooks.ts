import { useQuery, useReactiveVar } from "@apollo/client";

import { GET_CATEGORIES, GET_ME, GET_PRODUCTS } from "@operations";
import type { Category, Product, QueryProductsArgs, User } from "@types";

import { tokenVar } from "./ContextProviders";

interface Props {
  categoryId: string | null;
}

export const useHome = ({ categoryId }: Props) => {
  const token = useReactiveVar(tokenVar);

  const { data: categoriesData, loading: isLoadingCategories } = useQuery<{
    categories: Category[];
  }>(GET_CATEGORIES);

  const { data: productsData, loading: isLoadingProducts } = useQuery<
    {
      products: Product[];
    },
    QueryProductsArgs
  >(GET_PRODUCTS, { variables: { filter: { categoryId } } });

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
    products: productsData?.products || [],
    permissions: userData?.me.permissions,
  };
};
