"use client";

import type { FC } from "react";
import Image from "next/image";

import type { Product } from "@types";
import { imagePath } from "@services";
import { AddToCart } from "@components";

import styles from "./styles.module.scss";

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <div className={styles["container"]}>
      <Image
        src={imagePath(product.defaultImageId)}
        alt={product.name}
        fill
        className={styles["container__image"]}
      />
      <div className={styles["container__info"]}>
        <div>{product.name}</div>
        <div>{product.price}</div>
        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
