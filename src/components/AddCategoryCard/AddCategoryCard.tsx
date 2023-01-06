import Link from "next/link";
import type { FC } from "react";

import styles from "./styles.module.scss";

interface Props {
  parentId: string | null;
}

const AddCategoryCard: FC<Props> = ({ parentId }) => {
  return (
    <Link
      href={
        parentId ? `/createCategory?parentId=${parentId}` : "/createCategory"
      }
    >
      <div className={styles["container"]}>+</div>
    </Link>
  );
};

export default AddCategoryCard;
