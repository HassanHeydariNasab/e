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
}

const Button: FC<PropsWithChildren<Props>> = ({
  children,
  isLoading,
  ...rest
}) => {
  return (
    <button
      className={clsx(styles["button"], isLoading && styles["button--loading"])}
      disabled={isLoading}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
