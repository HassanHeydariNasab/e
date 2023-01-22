import type { ReactNode } from "react";
import clsx from "clsx";

import { Navbar } from "@components";
import { inter } from "@styles/fonts";

import ContextProviders from "./ContextProviders";
import styles from "./styles.module.scss";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={clsx(styles["html"], inter.className)}>
      <body>
        <ContextProviders>
          <Navbar />
          <div className={styles["content"]}>{children}</div>
        </ContextProviders>
      </body>
    </html>
  );
}
