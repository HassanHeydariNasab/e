"use client";

import type { FC } from "react";
import Image from "next/image";
import { useReactiveVar } from "@apollo/client";

import type { Product } from "@types";
import { imagePath } from "@services/client/file";
import { formattedPrice } from "@services/client/price";
import { currencyVar, exchangeRateVar } from "app/ContextProviders";
import { AddToCart } from "@components";

import styles from "./styles.module.scss";

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  const currency = useReactiveVar(currencyVar);
  const exchangeRate = useReactiveVar(exchangeRateVar);

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
        <div>{formattedPrice(product.price, currency, exchangeRate)}</div>
        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
