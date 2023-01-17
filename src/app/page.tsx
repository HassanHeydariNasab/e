"use client";

import { useSearchParams } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";

import {
  AddCategoryCard,
  AddProductCard,
  CategoryCard,
  Input,
  MyLink,
  ProductCard,
  Select,
} from "@components";
import { Permission } from "@types";
import { merienda } from "@styles/fonts";

import styles from "./styles.module.scss";
import { useHome } from "./hooks";
import { useForm } from "react-hook-form";
import { ProductsFilterFormSchema, productsFilterFormSchema } from "./consts";
import { useEffect } from "react";

function Home() {
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const {
    parentCategory,
    currentCategory,
    subcategories,
    isLoadingCategories,
    products,
    permissions,
    onChangeProductsFilter,
  } = useHome({
    categoryId,
  });

  const {
    formState: { errors: productsFilterErrors },
    register,
    handleSubmit,
  } = useForm<ProductsFilterFormSchema>({
    resolver: yupResolver(productsFilterFormSchema),
    mode: "all",
    defaultValues: { sort: JSON.stringify({ createdAt: -1 }) },
  });

  useEffect(() => {
    if (currentCategory?.attributeKeys) {
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

  return (
    <main>
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
      <form
        onChange={handleSubmit(onChangeProductsFilter, (e) =>
          console.log({ e })
        )}
        className={styles["products-filters"]}
      >
        <Select
          {...register("sort")}
          options={[
            { label: "Most Recent", value: JSON.stringify({ createdAt: -1 }) },
            { label: "Oldest", value: JSON.stringify({ createdAt: 1 }) },
          ]}
          label="Sort By"
        />
        {currentCategory?.attributeKeys.map((attributeKey, index) => (
          <Input
            {...register(`attributeValues.${index}.value`)}
            key={attributeKey.name}
            label={attributeKey.name}
          />
        ))}
      </form>
      <div className={styles["products"]}>
        {categoryId &&
          (permissions?.includes(Permission.Admin) ||
            permissions?.includes(Permission.Product)) && (
            <AddProductCard categoryId={categoryId} />
          )}
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </main>
  );
}

export default Home;
