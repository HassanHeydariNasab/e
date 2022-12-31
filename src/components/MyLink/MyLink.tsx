import type {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
} from "react";
import Link from "next/link";

import styles from "./styles.module.scss";
import clsx from "clsx";

interface Props
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  variant?: "filled" | "outlined" | "transparent";
}

const MyLink: FC<PropsWithChildren<Props>> = ({
  children,
  href,
  variant = "transparent",
  ...rest
}) => {
  return (
    <Link href={href as string} passHref legacyBehavior>
      <a className={clsx(styles["link"], styles[variant])} {...rest}>
        {children}
      </a>
    </Link>
  );
};

export default MyLink;
