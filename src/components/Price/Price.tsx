"use client";

import type { DetailedHTMLProps, HTMLAttributes, FC } from "react";
import { useReactiveVar } from "@apollo/client";
import clsx from "clsx";

import type { Product } from "@types";
import { formattedPrice } from "@services/client/price";
import { currencyVar, exchangeRateVar } from "app/ContextProviders";

import styles from "./styles.module.scss";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: Product;
}

const Price: FC<Props> = ({ product, className, ...rest }) => {
  const currency = useReactiveVar(currencyVar);
  const exchangeRate = useReactiveVar(exchangeRateVar);

  return (
    <div className={clsx(styles["container"], className)} {...rest}>
      {formattedPrice(product.price, currency, exchangeRate)}
    </div>
  );
};

export default Price;
