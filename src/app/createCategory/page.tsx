"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoAddCircle, IoArrowBack, IoTrash } from "react-icons/io5";

import { Button, Input, Select } from "@components";
import { AttributeKind } from "@types";

import { formSchema } from "./consts";
import type { FormSchema } from "./consts";
import { useCreateCategory } from "./hooks";
import styles from "./styles.module.scss";

function CreateCategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    formState: { errors },
    clearErrors,
    register,
    unregister,
    handleSubmit,
  } = useForm<FormSchema>({ resolver: yupResolver(formSchema) });

  const {
    parentName,
    isLoadingCategories,
    isSubmitting,
    attributes,
    onSubmit,
    onClickAddAttribute,
    onClickRemoveAttribute,
  } = useCreateCategory({
    parentId: searchParams.get("parentId") || undefined,
    unregister,
    clearErrors,
  });

  return (
    <main className={styles["main"]}>
      <form onSubmit={handleSubmit(onSubmit, (e) => console.log({ e }))}>
        {!isLoadingCategories && (
          <span className={styles["title"]}>
            {parentName
              ? `Create subcategory of ${parentName}`
              : "Create main category"}
          </span>
        )}
        <Input
          {...register("name")}
          type="text"
          error={errors?.name?.message}
          label="Category Name"
        />
        <div className={styles["attributes-title"]}>
          Attributes <IoAddCircle onClick={onClickAddAttribute} />
        </div>
        {attributes.map((id, index) => (
          <fieldset className={styles["attribute-key"]} key={id}>
            <IoTrash
              className={styles["attribute-key__remove"]}
              onClick={onClickRemoveAttribute}
              data-id={id}
            />
            <Input
              {...register(`attributeKeys.${id}.name`)}
              type="text"
              error={
                errors?.attributeKeys
                  ? errors.attributeKeys[+id]?.name?.message
                  : undefined
              }
              label="Attribute Name"
            />
            <Select
              {...register(`attributeKeys.${id}.kind`)}
              options={[
                {
                  label: AttributeKind.String.toLowerCase(),
                  value: AttributeKind.String,
                },
                {
                  label: AttributeKind.Number.toLowerCase(),
                  value: AttributeKind.Number,
                },
              ]}
              error={
                errors?.attributeKeys
                  ? errors.attributeKeys[+id]?.kind?.message
                  : undefined
              }
              label="Attribute Type"
            />
          </fieldset>
        ))}
        <Button isLoading={isSubmitting}>Create</Button>
        <Button type="button" onClick={router.back} variant="secondary">
          <IoArrowBack />
          Back
        </Button>
      </form>
    </main>
  );
}

export default CreateCategoryPage;
