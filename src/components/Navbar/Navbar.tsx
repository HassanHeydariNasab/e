import { MyLink } from "@components";
import { merienda } from "@styles/fonts";

import styles from "./styles.module.scss";

function Navbar() {
  return (
    <nav className={styles["nav"]}>
      <div className={styles["left"]}>
        <MyLink href="/">
          <h1 className={merienda.className}>eStore</h1>
        </MyLink>
      </div>
      <div className={styles["right"]}>
        <MyLink href="/sendVerificationCode?reason=login" variant="outlined">
          Login
        </MyLink>
      </div>
    </nav>
  );
}

export default Navbar;
