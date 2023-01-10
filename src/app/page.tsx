"use client";

import { useSearchParams } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import clsx from "clsx";

import {
  AddCategoryCard,
  AddProductCard,
  CategoryCard,
  MyLink,
  ProductCard,
} from "@components";
import { Permission } from "@types";
import { merienda } from "@styles/fonts";

import styles from "./styles.module.scss";
import { useHome } from "./hooks";

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
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
        {categoryId &&
          (permissions?.includes(Permission.Admin) ||
            permissions?.includes(Permission.Product)) && (
            <AddProductCard categoryId={categoryId} />
          )}
      </div>
    </main>
  );
}

export default Home;
