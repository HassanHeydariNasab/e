import Link from "next/link";
import type { FC } from "react";

import styles from "./styles.module.scss";

interface Props {
  categoryId: string | null;
}

const AddProductCard: FC<Props> = ({ categoryId }) => {
  return (
    <Link
      href={
        categoryId
          ? `/createProduct?categoryId=${categoryId}`
          : "/createProduct"
      }
    >
      <div className={styles["container"]}>+</div>
    </Link>
  );
};

export default AddProductCard;
