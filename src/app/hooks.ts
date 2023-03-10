import { useLazyQuery, useQuery, useReactiveVar } from "@apollo/client";
import type { SubmitHandler } from "react-hook-form";

import { GET_CATEGORIES, GET_ME, GET_PRODUCTS } from "@operations";
import type {
  Category,
  Pagination,
  Product,
  ProductsFilter,
  QueryProductsArgs,
  User,
} from "@types";

import type { ProductsFilterFormSchema } from "./consts";
import { tokenVar } from "./ContextProviders";

interface Props {
  categoryId: string | null;
}

export const useHome = ({ categoryId }: Props) => {
  const token = useReactiveVar(tokenVar);

  const { data: categoriesData, loading: isLoadingCategories } = useQuery<{
    categories: Category[];
  }>(GET_CATEGORIES);

  const [
    getProducts,
    {
      data: productsData,
      previousData: productsPreviousData,
      loading: isLoadingProducts,
    },
  ] = useLazyQuery<
    {
      products: { results: Product[]; pagination: Pagination };
    },
    QueryProductsArgs
  >(GET_PRODUCTS);

  const { data: userData } = useQuery<{ me: User }>(GET_ME, {
    skip: token === null,
  });

  const currentCategory = categoriesData?.categories.find(
    (category) => category._id === categoryId
  );

  const parentCategory = categoriesData?.categories.find(
    (category) => category._id === currentCategory?.parentId
  );

  const onChangeProductsFilter: SubmitHandler<ProductsFilterFormSchema> = (
    data
  ) => {
    const { attributeValues, sort, skip, limit } = data;
    let modifiedAttributeValues = attributeValues?.filter(
      (attributeValue) => (attributeValue.value?.length || 0) > 0
    );
    modifiedAttributeValues = modifiedAttributeValues?.map((a) => ({ ...a }));
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
        options: {
          ...(sort && { sort: JSON.parse(sort) }),
          skip,
          limit,
        },
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
    products:
      productsData?.products.results ||
      productsPreviousData?.products.results ||
      [],
    productsPagination:
      productsData?.products.pagination ||
      productsPreviousData?.products.pagination,
    isLoadingProducts,
    permissions: userData?.me.permissions,
    onChangeProductsFilter,
  };
};
