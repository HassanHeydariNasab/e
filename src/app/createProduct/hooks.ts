import { useRouter } from "next/navigation";
import { gql, useMutation, useQuery } from "@apollo/client";
import type { SubmitHandler } from "react-hook-form";

import { Category, MutationCreateCategoryArgs } from "@types";
import { CREATE_CATEGROY, GET_CATEGORIES } from "@operations";

import type { FormSchema } from "./consts";

interface Props {
  parentId?: string;
}

export const useCreateProduct = ({ parentId }: Props) => {
  const router = useRouter();

  const [createCategory, { loading: isSubmitting }] = useMutation<
    { createCategory: Category },
    MutationCreateCategoryArgs
  >(CREATE_CATEGROY, {
    update(cache, result) {
      cache.modify({
        fields: {
          categories(existingCategories = []) {
            const newCategoryRef = cache.writeFragment({
              data: result.data?.createCategory,
              fragment: gql`
                fragment newCategory on Category {
                  _id
                  name
                  parentId
                }
              `,
            });
            return [...existingCategories, newCategoryRef];
          },
        },
      });
    },
    onQueryUpdated(observableQuery) {
      observableQuery.refetch();
      /*
        FIXME our optimistic update is not useful if we send
        another request for getting page (router.replace/push).
        but going back is not a general case
      */
      router.back();
      return false;
    },
  });

  const { data: categoriesData, loading: isLoadingCategories } = useQuery<{
    categories: Category[];
  }>(GET_CATEGORIES);

  const onSubmit: SubmitHandler<FormSchema> = (data, event) => {
    const { name } = data;
    createCategory({
      variables: {
        input: { name, parentId },
      },
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
