import { useEffect } from "react";
import { useLazyQuery, useQuery, useReactiveVar } from "@apollo/client";
import type { UseFormGetValues } from "react-hook-form";

import { GET_CATEGORIES, GET_ME, GET_PRODUCTS } from "@operations";
import type {
  Category,
  Product,
  ProductsFilter,
  QueryProductsArgs,
  User,
} from "@types";

import type { ProductsFilterFormSchema } from "./consts";
import { tokenVar } from "./ContextProviders";

interface Props {
  categoryId: string | null;
  getProductsFilterValues: UseFormGetValues<ProductsFilterFormSchema>;
}

export const useHome = ({ categoryId, getProductsFilterValues }: Props) => {
  const token = useReactiveVar(tokenVar);

  const { data: categoriesData, loading: isLoadingCategories } = useQuery<{
    categories: Category[];
  }>(GET_CATEGORIES);

  const [getProducts, { data: productsData, loading: isLoadingProducts }] =
    useLazyQuery<
      {
        products: Product[];
      },
      QueryProductsArgs
    >(GET_PRODUCTS, { fetchPolicy: "network-only" });

  const { data: userData } = useQuery<{ me: User }>(GET_ME, {
    skip: token === null,
  });

  const currentCategory = categoriesData?.categories.find(
    (category) => category._id === categoryId
  );

  const parentCategory = categoriesData?.categories.find(
    (category) => category._id === currentCategory?.parentId
  );

  useEffect(() => {
    onChangeProductsFilter(getProductsFilterValues());
  }, []);

  const onChangeProductsFilter = (data: ProductsFilterFormSchema) => {
    const { sort, attributeValues } = data;
    let modifiedAttributeValues = attributeValues?.filter(
      (attributeValue) => (attributeValue.value?.length || 0) > 0
    );
    if ((modifiedAttributeValues?.length || 0) === 0) {
      modifiedAttributeValues = undefined;
    }
    return getProducts({
      variables: {
        filter: {
          categoryId,
          attributeValues:
            modifiedAttributeValues as ProductsFilter["attributeValues"],
        },
        options: { ...(sort && { sort: JSON.parse(sort) }) },
      },
    });
  };

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
    onChangeProductsFilter,
  };
};
