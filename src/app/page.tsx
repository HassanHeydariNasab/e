"use client";

import { AddProductCard, ProductCard } from "@components";
import type { NextPage } from "next";

import styles from "./styles.module.scss";

const Home: NextPage = () => {
  return (
    <main>
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
