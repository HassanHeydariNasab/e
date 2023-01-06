"use client";

import type { NextPage } from "next";
import { useSearchParams } from "next/navigation";

import {
  AddCategoryCard,
  AddProductCard,
  CategoryCard,
  MyLink,
  ProductCard,
} from "@components";

import styles from "./styles.module.scss";
import { useHome } from "./hooks";
import { Permission } from "@types";
import { IoArrowBack } from "react-icons/io5";
import clsx from "clsx";
import { merienda } from "@styles/fonts";

const Home: NextPage = () => {
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const {
    parentCategory,
    currentCategory,
    subcategories,
    isLoadingCategories,
    permissions,
  } = useHome({
    categoryId,
  });

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
        {subcategories
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((subcategory) => (
            <CategoryCard category={subcategory} key={subcategory._id} />
          ))}
        {permissions?.includes(Permission.Admin) && (
          <AddCategoryCard parentId={categoryId} />
        )}
      </div>
      <div className={styles["products"]}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        {(permissions?.includes(Permission.Admin) ||
          permissions?.includes(Permission.Product)) && (
          <AddProductCard categoryId={categoryId} />
        )}
      </div>
    </main>
  );
};

export default Home;
