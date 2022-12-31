import type { FC } from "react";

import styles from "./styles.module.scss";

interface Props {}

const AddProductCard: FC<Props> = () => {
  return <div className={styles["container"]}>+</div>;
};

export default AddProductCard;
