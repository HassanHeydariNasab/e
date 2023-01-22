"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";

import {
  AddCategoryCard,
  AddProductCard,
  CategoryCard,
  Input,
  MyLink,
  Pagination,
  ProductCard,
  Select,
} from "@components";
import { Permission } from "@types";
import { merienda } from "@styles/fonts";

import styles from "./styles.module.scss";
import { useHome } from "./hooks";
import { productsFilterFormSchema, sortOptions } from "./consts";
import type { ProductsFilterFormSchema } from "./consts";

function Home() {
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const {
    formState: { errors: productsFilterErrors },
    register,
    watch,
    handleSubmit,
    getValues: getProductsFilterValues,
    reset: resetProductsFilterForm,
  } = useForm<ProductsFilterFormSchema>({
    resolver: yupResolver(productsFilterFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      sort: JSON.stringify({ createdAt: -1 }),
      attributeValues: [],
      skip: 0,
      limit: 12,
    },
  });

  const {
    parentCategory,
    currentCategory,
    subcategories,
    isLoadingCategories,
    products,
    productsPagination,
    isLoadingProducts,
    permissions,
    onChangeProductsFilter,
  } = useHome({
    categoryId,
  });

  useEffect(() => {
    const subscription = watch(() => {
      handleSubmit(onChangeProductsFilter, (e) => console.log({ e }))();
    });
    () => {
      subscription.unsubscribe();
    };
  }, [watch, handleSubmit, onChangeProductsFilter]);

  useEffect(() => {
    if (!currentCategory) return;
    resetProductsFilterForm();
    onChangeProductsFilter(getProductsFilterValues());
    if (currentCategory.attributeKeys) {
      for (
        let index = 0;
        index < currentCategory.attributeKeys.length;
        index++
      ) {
        register(`attributeValues.${index}.name`, {
          value: currentCategory.attributeKeys[index].name,
        });
      }
    }
  }, [currentCategory]);

  useEffect(() => {
    register("limit");
  }, [register]);

  return (
    <main className={styles["main"]}>
      <div className={styles["categories"]}>
        {categoryId !== null && (
          <div className={styles["categories__current-category"]}>
            <MyLink
              href={
                parentCategory ? `/?categoryId=${parentCategory?._id}` : "/"
              }
            >
              <IoArrowBack size={"1.4rem"} />
            </MyLink>
            <span
              className={clsx(
                styles["categories__current-category__name"],
                merienda.className
              )}
            >
              {currentCategory?.name}
            </span>
          </div>
        )}
        {permissions?.includes(Permission.Admin) && (
          <AddCategoryCard parentId={categoryId} />
        )}
        {subcategories
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((subcategory) => (
            <CategoryCard category={subcategory} key={subcategory._id} />
          ))}
      </div>
      {categoryId !== null && (
        <>
          <form className={styles["products-filters"]}>
            <Select
              {...register("sort")}
              options={sortOptions}
              label="Sort By"
              error={productsFilterErrors.sort?.message}
            />
            {currentCategory?.attributeKeys.map((attributeKey, index) => (
              <Input
                {...register(`attributeValues.${index}.value`)}
                key={attributeKey.name}
                label={attributeKey.name}
                error={
                  productsFilterErrors.attributeValues?.at?.(index)?.value
                    ?.message
                }
              />
            ))}
          </form>
          <div
            className={clsx(
              styles["products"],
              isLoadingProducts && styles["products--stale"]
            )}
          >
            {productsPagination?.skip === 0 &&
              categoryId &&
              (permissions?.includes(Permission.Admin) ||
                permissions?.includes(Permission.Product)) && (
                <AddProductCard categoryId={categoryId} />
              )}
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
          {productsPagination && (
            <Pagination
              name="skip"
              pagination={productsPagination}
              containerClassName={clsx(
                styles["pagination"],
                isLoadingProducts && styles["pagination--stale"]
              )}
              register={register}
            />
          )}
        </>
      )}
    </main>
  );
}

export default Home;
