"use client";

import { merienda } from "@styles/fonts";
import { MyLink } from "@components";

import { useNavbar } from "./hooks";
import styles from "./styles.module.scss";

function Navbar() {
  const { isLoggedIn, user } = useNavbar();

  return (
    <nav className={styles["nav"]}>
      <div className={styles["left"]}>
        <MyLink href="/">
          <h1 className={merienda.className}>eStore</h1>
        </MyLink>
      </div>
      <div className={styles["right"]}>
        {isLoggedIn ? (
          <MyLink href="/profile" variant="outlined">
            {user?.name || user?.phoneNumber || "Hello"}
          </MyLink>
        ) : (
          <MyLink href="/sendVerificationCode?reason=login" variant="outlined">
            Login
          </MyLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
