import clsx from "clsx";
import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
} from "react";

import styles from "./styles.module.scss";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean;
  variant?: "filled" | "outlined" | "secondary" | "transparent";
}

const Button: FC<PropsWithChildren<Props>> = ({
  children,
  isLoading,
  variant = "filled",
  ...rest
}) => {
  return (
    <button
      className={clsx(
        styles["button"],
        styles[variant],
        isLoading && styles["button--loading"]
      )}
      disabled={isLoading}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
