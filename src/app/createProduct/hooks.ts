import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import type { SubmitHandler, UseFormReset } from "react-hook-form";
import { toast } from "react-hot-toast";

import type {
  Category,
  MutationCreateProductArgs,
  MutationCreateProductGroupArgs,
  Product,
  ProductGroup,
  QueryProductGroupsArgs,
} from "@types";
import {
  GET_CATEGORIES,
  CREATE_PRODUCT_GROUP,
  GET_PRODUCT_GROUPS,
  CREATE_PRODUCT,
} from "@operations";
import { allAttributeKeys } from "@services";

import type {
  ImagesFormSchema,
  ProductFormSchema,
  ProductGroupFormSchema,
} from "./consts";

interface Props {
  categoryId: string | null;
  resetProductGroup: UseFormReset<ProductGroupFormSchema>;
}

export const useCreateProduct = ({ categoryId, resetProductGroup }: Props) => {
  const router = useRouter();

  if (categoryId === null) router.replace("/");

  const apolloClient = useApolloClient();

  const [images, setImages] = useState<{ preview: string; _id?: string }[]>([]);

  const [createProductGroup, { loading: isSubmittingProductGroup }] =
    useMutation<
      { createProductGroup: ProductGroup },
      MutationCreateProductGroupArgs
    >(CREATE_PRODUCT_GROUP);

  const [createProduct, { loading: isSubmittingProduct }] = useMutation<
    { createProduct: Product },
    MutationCreateProductArgs
  >(CREATE_PRODUCT, {
    update(cache) {
      cache.evict({ fieldName: "products" });
    },
    onCompleted() {
      router.back();
    },
  });

  const { data: categoriesData, loading: isLoadingCategories } = useQuery<{
    categories: Category[];
  }>(GET_CATEGORIES);

  const { data: productGroupsData, loading: isLoadingProductGroups } = useQuery<
    {
      productGroups: ProductGroup[];
    },
    QueryProductGroupsArgs
  >(GET_PRODUCT_GROUPS, {
    variables: { filter: { categoryId } },
  });

  const category = categoriesData?.categories?.find(
    (category) => category._id === categoryId
  );

  const attributeKeys =
    category && categoriesData?.categories
      ? allAttributeKeys(category, categoriesData.categories)
      : [];

  const onSubmitImages: SubmitHandler<ImagesFormSchema> = (data, event) => {
    const { file } = data;
    if (!file) return;
    const imageIndex = images.length;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file[0]);
    fileReader.onloadend = (event) => {
      const dataUrl = event.target?.result;
      if (dataUrl) {
        setImages((images) => [...images, { preview: dataUrl as string }]);
      }
    };
    const formData = new FormData();
    formData.append("file", file[0]);

    fetch("/api/files", { method: "POST", body: formData })
      .then((response) => response.json())
      .then((j) => {
        setImages((_images) => {
          const images = [..._images];
          images[imageIndex] = { ...images[imageIndex], _id: j._id };
          return images;
        });
      });
  };

  const onSubmitProductGroup: SubmitHandler<ProductGroupFormSchema> = (
    data,
    event
  ) => {
    const { name } = data;
    createProductGroup({
      variables: {
        input: { name, categoryId },
      } as MutationCreateProductGroupArgs,
    }).then((result) => {
      resetProductGroup();
      const newProductGroup = result.data?.createProductGroup;
      if (!newProductGroup) {
        return;
      }
      apolloClient.cache.updateQuery<
        { productGroups: ProductGroup[] },
        QueryProductGroupsArgs
      >(
        {
          query: GET_PRODUCT_GROUPS,
          variables: { filter: { categoryId } },
        },
        (data) => {
          const updatedProductGroups = [
            newProductGroup,
            ...(data?.productGroups || []),
          ];
          return {
            productGroups: updatedProductGroups,
          };
        }
      );
      toast.success("Product group created.");
    });
  };

  const onSubmitProduct: SubmitHandler<ProductFormSchema> = (data, event) => {
    const { attributeValues, name, productGroupId, price } = data;
    if (images.length === 0 || !images[0]._id) {
      toast.error("Select at least one image.");
      return;
    }
    createProduct({
      variables: {
        input: {
          attributeValues,
          categoryId,
          defaultImageId: images[0]._id,
          imageIds: images.map((image) => image._id),
          name,
          price,
          productGroupId,
        },
      } as MutationCreateProductArgs,
    });
  };

  return {
    category,
    attributeKeys,
    isLoadingCategories,
    isSubmittingProductGroup,
    productGroups: productGroupsData?.productGroups || [],
    images,
    isLoadingProductGroups,
    isSubmittingProduct,
    onSubmitImages,
    onSubmitProductGroup,
    onSubmitProduct,
  };
};
