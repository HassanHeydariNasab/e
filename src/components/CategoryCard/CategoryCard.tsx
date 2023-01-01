import type { FC } from "react";

import type { Category } from "@types";

import styles from "./styles.module.scss";

interface Props {
  category?: Category;
}

const CategoryCard: FC<Props> = ({ category }) => {
  return <div className={styles["container"]}>Category</div>;
};

export default CategoryCard;
