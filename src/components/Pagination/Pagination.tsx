import { DetailedHTMLProps, FC, forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./styles.module.scss";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isLoading?: boolean;
}

const Pagination = forwardRef<HTMLInputElement, Props>(
  ({ children, isLoading, className, ...rest }, ref) => {
    return (
      <input
        type="radio"
        className={clsx(
          styles["button"],
          isLoading && styles["button--loading"],
          className
        )}
        disabled={isLoading}
        {...rest}
      />
    );
  }
);

export default Pagination;
