"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { IoArrowBack } from "react-icons/io5";

import { Button, Input, Select } from "@components";

import {
  productFormSchema,
  ProductFormSchema,
  productGroupFormSchema,
} from "./consts";
import type { ProductGroupFormSchema } from "./consts";
import { useCreateProduct } from "./hooks";
import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";

function CreateProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const {
    category,
    attributeKeys,
    isLoadingCategories,
    isSubmittingProductGroup,
    isSubmittingProduct,
    productGroups,
    isLoadingProductGroups,
    onSubmitProductGroup,
    onSubmitProduct,
  } = useCreateProduct({
    categoryId: categoryId,
  });

  const {
    formState: { errors: errorsProductGroup },
    register: registerProductGroup,
    handleSubmit: handleSubmitProductGroup,
  } = useForm<ProductGroupFormSchema>({
    resolver: yupResolver(productGroupFormSchema),
  });

  const {
    formState: { errors: errorsProduct },
    register: registerProduct,
    handleSubmit: handleSubmitProduct,
  } = useForm<ProductFormSchema>({
    resolver: yupResolver(productFormSchema),
    defaultValues: { price: 0 },
  });

  useEffect(() => {
    const numberOfAttributes = attributeKeys?.length;
    if (!numberOfAttributes) return;
    for (let i = 0; i < numberOfAttributes; i++) {
      registerProduct(`attributeValues.${i}.name`, {
        value: attributeKeys[i].name,
      });
    }
  }, [attributeKeys, registerProduct]);

  return (
    <main className={styles["main"]}>
      <div className={styles["forms"]}>
        {!isLoadingCategories && (
          <span className={styles["title"]}>
            {category?.name ? `Create a product in ${category.name}` : ""}
          </span>
        )}
        <form onSubmit={handleSubmitProductGroup(onSubmitProductGroup)}>
          <Input
            {...registerProductGroup("name")}
            type="text"
            error={errorsProductGroup?.name?.message}
            label="Product Group Name"
          />
          <Button isLoading={isSubmittingProductGroup}>Create</Button>
        </form>
        <form onSubmit={handleSubmitProduct(onSubmitProduct)}>
          <Select
            {...registerProduct("productGroupId")}
            options={productGroups.map((productGroup) => ({
              label: productGroup.name,
              value: productGroup._id,
            }))}
            label="Product Group"
            error={errorsProduct?.productGroupId?.message}
            required
          />
          <Input
            {...registerProduct("name")}
            type="text"
            error={errorsProduct?.name?.message}
            label="Name"
            required
          />
          <Input
            {...registerProduct("price")}
            type="number"
            error={errorsProduct?.price?.message}
            label="Price"
            required
          />
          {attributeKeys.map((attributeKey, index) => (
            <Input
              {...registerProduct(`attributeValues.${index}.value`)}
              type="text"
              error={
                errorsProduct?.attributeValues
                  ? errorsProduct.attributeValues[index]?.value?.message
                  : undefined
              }
              label={attributeKey.name}
              required
              key={attributeKey.name}
            />
          ))}
          <Button isLoading={isSubmittingProduct}>Create</Button>
          <Button type="button" onClick={router.back} variant="secondary">
            <IoArrowBack />
            Back
          </Button>
        </form>
      </div>
    </main>
  );
}

export default CreateProductPage;
