import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import type { SubmitHandler } from "react-hook-form";

import { Category, MutationCreateCategoryArgs } from "@types";
import { CREATE_CATEGROY, GET_CATEGORIES } from "@operations";

import type { FormSchema } from "./consts";

interface Props {
  parentId?: string;
}

export const useCreateCategory = ({ parentId }: Props) => {
  const router = useRouter();

  const [createCategory, { loading: isSubmitting }] = useMutation<
    { createCategory: Category },
    MutationCreateCategoryArgs
  >(CREATE_CATEGROY);

  const { data: categoriesData, loading: isLoadingCategories } = useQuery<{
    categories: Category[];
  }>(GET_CATEGORIES);

  const onSubmit: SubmitHandler<FormSchema> = (data, event) => {
    const { name } = data;
    createCategory({
      variables: {
        input: { name, parentId },
      },
    }).then((result) => {
      if (result.data?.createCategory) {
        const category = result.data.createCategory;
        router.replace(`/?categoryId=${encodeURIComponent(category._id)}`);
      }
    });
  };

  return {
    parentName: categoriesData?.categories?.find(
      (category) => category._id === parentId
    )?.name,
    isLoadingCategories,
    isSubmitting,
    onSubmit,
  };
};
