"use client";

import { IoCart, IoLogIn, IoPerson } from "react-icons/io5";

import { merienda } from "@styles/fonts";
import { MyLink } from "@components";

import { useNavbar } from "./hooks";
import styles from "./styles.module.scss";

function Navbar() {
  const { isLoggedIn, user, cart } = useNavbar();

  return (
    <nav className={styles["nav"]}>
      <div className={styles["nav__left"]}>
        <MyLink href="/">
          <h1 className={merienda.className}>oOhoOm</h1>
        </MyLink>
      </div>
      <div className={styles["nav__right"]}>
        {isLoggedIn ? (
          <>
            <MyLink href="/cart" variant="outlined">
              <IoCart size={"2rem"} />
              Shopping Cart ({cart?.orderItems.length})
            </MyLink>
            <MyLink href="/profile" variant="outlined">
              <IoPerson size={"1rem"} />
              {user?.name || user?.phoneNumber || "Hello"}
            </MyLink>
          </>
        ) : (
          <MyLink href="/sendVerificationCode?reason=login" variant="outlined">
            <IoLogIn />
            Login
          </MyLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
