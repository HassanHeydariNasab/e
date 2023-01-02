"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoArrowBack } from "react-icons/io5";

import { Button, Input } from "@components";

import { formSchema } from "./consts";
import type { FormSchema } from "./consts";
import { useCreateCategory } from "./hooks";
import styles from "./styles.module.scss";

function CreateCategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { parentName, isLoadingCategories, isSubmitting, onSubmit } =
    useCreateCategory({
      parentId: searchParams.get("parentId") || undefined,
    });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

  return (
    <main className={styles["main"]}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
