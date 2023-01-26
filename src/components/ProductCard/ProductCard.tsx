"use client";

import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import type { Product } from "@types";
import { imagePath } from "@services/client/file";
import { AddToCart, Price } from "@components";

import styles from "./styles.module.scss";

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <Link href={`/product?id=${product._id}`}>
      <div className={styles["container"]}>
        <Image
          src={imagePath(product.defaultImageId)}
          alt={product.name}
          height={360}
          width={360}
          className={styles["container__image"]}
        />
        <div className={styles["container__info"]}>
          <div>{product.name}</div>
          <Price product={product} />
          <AddToCart product={product} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
