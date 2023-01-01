"use client";

import type { NextPage } from "next";

import {
  AddCategoryCard,
  AddProductCard,
  CategoryCard,
  ProductCard,
} from "@components";

import styles from "./styles.module.scss";

const Home: NextPage = () => {
  return (
    <main>
      <div className={styles["categories"]}>
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <AddCategoryCard />
      </div>
      <div className={styles["products"]}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <AddProductCard />
      </div>
    </main>
  );
};

export default Home;
