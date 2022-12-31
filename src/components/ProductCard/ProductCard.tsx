import type { FC } from "react";

import { Product } from "@types";

import styles from "./styles.module.scss";

interface Props {
  product?: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  return <div className={styles["container"]}>ProductCard</div>;
};

export default ProductCard;
