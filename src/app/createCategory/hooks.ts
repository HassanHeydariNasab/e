import { useState } from "react";
import type { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { gql, useMutation, useQuery } from "@apollo/client";
import type {
  SubmitHandler,
  UseFormClearErrors,
  UseFormUnregister,
} from "react-hook-form";

import type { Category, MutationCreateCategoryArgs } from "@types";
import { CREATE_CATEGROY, GET_CATEGORIES } from "@operations";

import type { FormSchema } from "./consts";

interface Props {
  parentId?: string;
  unregister: UseFormUnregister<FormSchema>;
  clearErrors: UseFormClearErrors<FormSchema>;
}

export const useCreateCategory = ({
  parentId,
  unregister,
  clearErrors,
}: Props) => {
  const [attributes, setAttributes] = useState<number[]>([]);
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

  const onClickAddAttribute: MouseEventHandler = () => {
    setAttributes((attributes) =>
      attributes.length === 0
        ? [0]
        : [...attributes, (attributes?.at(-1) || 0) + 1]
    );
  };

  const onClickRemoveAttribute: MouseEventHandler<SVGSVGElement> = (event) => {
    const id = event.currentTarget.dataset.id;
    console.log({ id });
    if (id !== undefined) {
      unregister(`attributeKeys.${+id}.name`);
      unregister(`attributeKeys.${+id}.kind`);
      setAttributes((attributes) =>
        attributes.filter((attribute) => attribute !== +id)
      );
    }
  };

  const { data: categoriesData, loading: isLoadingCategories } = useQuery<{
    categories: Category[];
  }>(GET_CATEGORIES);

  const onSubmit: SubmitHandler<FormSchema> = (data, event) => {
    event?.preventDefault();
    const { name, attributeKeys } = data;
    createCategory({
      variables: {
        input: {
          name,
          attributeKeys: attributeKeys?.filter(
            (attributeKey) => !!attributeKey
          ),
          parentId,
        },
      } as MutationCreateCategoryArgs,
    });
  };

  return {
    parentName: categoriesData?.categories?.find(
      (category) => category._id === parentId
    )?.name,
    isLoadingCategories,
    isSubmitting,
    attributes,
    onSubmit,
    onClickAddAttribute,
    onClickRemoveAttribute,
  };
};
