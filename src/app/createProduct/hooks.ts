import { useRouter } from "next/navigation";
import { gql, useMutation, useQuery } from "@apollo/client";
import type { SubmitHandler } from "react-hook-form";

import type {
  Category,
  MutationCreateProductArgs,
  MutationCreateProductGroupArgs,
  Product,
  ProductGroup,
} from "@types";
import {
  GET_CATEGORIES,
  CREATE_PRODUCT_GROUP,
  GET_PRODUCT_GROUPS,
  CREATE_PRODUCT,
} from "@operations";
import { allAttributeKeys } from "@services";

import type { ProductFormSchema, ProductGroupFormSchema } from "./consts";

interface Props {
  categoryId: string | null;
}

export const useCreateProduct = ({ categoryId }: Props) => {
  const router = useRouter();

  if (categoryId === null) router.replace("/");

  const [createProductGroup, { loading: isSubmittingProductGroup }] =
    useMutation<
      { createProductGroup: ProductGroup },
      MutationCreateProductGroupArgs
    >(CREATE_PRODUCT_GROUP, {
      update(cache, result) {
        cache.modify({
          fields: {
            productGroups(existingProductGroups = []) {
              const newProductGroupRef = cache.writeFragment({
                data: result.data?.createProductGroup,
                fragment: gql`
                  fragment newProductGroup on ProductGroup {
                    _id
                    categoryId
                    isHidden
                    name
                  }
                `,
              });
              return [...existingProductGroups, newProductGroupRef];
            },
          },
        });
      },
      onQueryUpdated(observableQuery) {
        observableQuery.refetch();
        return false;
      },
    });

  const [createProduct, { loading: isSubmittingProduct }] = useMutation<
    { createProduct: Product },
    MutationCreateProductArgs
  >(CREATE_PRODUCT, {
    update(cache, result) {
      cache.modify({
        fields: {
          products(existingProducts = []) {
            const newProductRef = cache.writeFragment({
              data: result.data?.createProduct,
              fragment: gql`
                fragment newProduct on Product {
                  _id
                  attributeValues {
                    name
                    value
                  }
                  categoryId
                  createdAt
                  defaultImagePath
                  imageIds
                  isHidden
                  name
                  price
                  productGroupId
                }
              `,
            });
            return [...existingProducts, newProductRef];
          },
        },
      });
    },
    onQueryUpdated(observableQuery) {
      observableQuery.refetch();
      return false;
    },
  });

  const { data: categoriesData, loading: isLoadingCategories } = useQuery<{
    categories: Category[];
  }>(GET_CATEGORIES);

  const { data: productGroupsData, loading: isLoadingProductGroups } =
    useQuery<{
      productGroups: ProductGroup[];
    }>(GET_PRODUCT_GROUPS);

  const category = categoriesData?.categories?.find(
    (category) => category._id === categoryId
  );

  const attributeKeys =
    category && categoriesData?.categories
      ? allAttributeKeys(category, categoriesData.categories)
      : [];

  const onSubmitProductGroup: SubmitHandler<ProductGroupFormSchema> = (
    data,
    event
  ) => {
    const { name } = data;
    createProductGroup({
      variables: {
        input: { name, categoryId },
      } as MutationCreateProductGroupArgs,
    });
  };

  const onSubmitProduct: SubmitHandler<ProductFormSchema> = (data, event) => {
    const { attributeValues, name, productGroupId } = data;
    createProduct({
      variables: {
        input: { attributeValues, name, categoryId, productGroupId },
      } as MutationCreateProductArgs,
    });
  };

  return {
    category,
    attributeKeys,
    isLoadingCategories,
    isSubmittingProductGroup,
    productGroups: productGroupsData?.productGroups || [],
    isLoadingProductGroups,
    isSubmittingProduct,
    onSubmitProductGroup,
    onSubmitProduct,
  };
};
