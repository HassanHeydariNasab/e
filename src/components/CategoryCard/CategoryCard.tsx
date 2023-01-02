import type { FC } from "react";
import Link from "next/link";

import type { Category } from "@types";

import styles from "./styles.module.scss";

interface Props {
  category?: Category;
}

const CategoryCard: FC<Props> = ({ category }) => {
  return (
    <Link href={`/?categoryId=${category?._id}`}>
      <div className={styles["container"]}>{category?.name}</div>
    </Link>
  );
};

export default CategoryCard;
