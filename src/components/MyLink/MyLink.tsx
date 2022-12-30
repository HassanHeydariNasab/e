import type {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
} from "react";
import Link from "next/link";

import styles from "./styles.module.scss";

interface Props
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const MyLink: FC<PropsWithChildren<Props>> = ({ children, href, ...rest }) => {
  return (
    <Link href={href as string} passHref legacyBehavior>
      <a className={styles["link"]} {...rest}>
        {children}
      </a>
    </Link>
  );
};

export default MyLink;
