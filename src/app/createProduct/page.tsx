"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoArrowBack } from "react-icons/io5";

import { Button, FileInput, Input, Select } from "@components";

import {
  imagesFormSchema,
  productFormSchema,
  productGroupFormSchema,
} from "./consts";
import type {
  ProductGroupFormSchema,
  ImagesFormSchema,
  ProductFormSchema,
} from "./consts";
import { useCreateProduct } from "./hooks";
import styles from "./styles.module.scss";

function CreateProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const {
    formState: { errors: errorsProductGroup },
    register: registerProductGroup,
    handleSubmit: handleSubmitProductGroup,
    reset: resetProductGroup,
  } = useForm<ProductGroupFormSchema>({
    resolver: yupResolver(productGroupFormSchema),
  });

  const {
    formState: { errors: errorsProduct },
    register: registerProduct,
    handleSubmit: handleSubmitProduct,
  } = useForm<ProductFormSchema>({
    resolver: yupResolver(productFormSchema),
    defaultValues: { price: 0, quantity: 1 },
  });

  const {
    formState: { errors: errorsImages },
    register: registerImages,
    handleSubmit: handleSubmitImages,
  } = useForm<ImagesFormSchema>({
    resolver: yupResolver(imagesFormSchema),
  });

  const {
    category,
    attributeKeys,
    isLoadingCategories,
    isSubmittingProductGroup,
    isSubmittingProduct,
    productGroups,
    images,
    isLoadingProductGroups,
    onSubmitImages,
    onSubmitProductGroup,
    onSubmitProduct,
  } = useCreateProduct({
    categoryId,
    resetProductGroup,
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
        <form onChange={handleSubmitImages(onSubmitImages)}>
          {images.map((image, index) => (
            <img src={image.preview} key={image.preview} />
          ))}
          <FileInput
            {...registerImages("file")}
            error={errorsImages?.file?.message?.toString()}
            label="Product Image"
            accept="image/*"
          />
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
          <Input
            {...registerProduct("quantity")}
            type="number"
            error={errorsProduct?.quantity?.message}
            label="Quantity"
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
