"use client";

import { IoCart, IoLogIn, IoPerson } from "react-icons/io5";

import { merienda } from "@styles/fonts";
import { MyLink, Select } from "@components";
import { formattedPrice } from "@services/client/price";

import { useNavbar } from "./hooks";
import { currencies } from "./consts";
import styles from "./styles.module.scss";

function Navbar() {
  const { isLoggedIn, user, cart, currency, exchangeRate, onChangeCurrency } =
    useNavbar();

  return (
    <nav className={styles["nav"]}>
      <div className={styles["nav__left"]}>
        <MyLink href="/">
          <h1 className={merienda.className}>oOhoOm</h1>
        </MyLink>
      </div>
      <div className={styles["nav__right"]}>
        <Select
          label="Currency"
          name="currency"
          options={currencies}
          onChange={onChangeCurrency}
          value={currency}
        />
        {isLoggedIn ? (
          <>
            <MyLink href="/cart" variant="outlined">
              <IoCart size={"2rem"} />
              Cart: {formattedPrice(cart?.price, currency, exchangeRate)} (
              {cart?.orderItems.length})
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
