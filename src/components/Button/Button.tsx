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
  variant?:
    | "filled"
    | "outlined"
    | "secondary"
    | "transparent"
    | "secondary-transparent"
    | "secondary-outlined";
}

const Button: FC<PropsWithChildren<Props>> = ({
  children,
  isLoading,
  variant = "filled",
  className,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        styles["button"],
        styles[variant],
        isLoading && styles["button--loading"],
        className
      )}
      disabled={isLoading}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
