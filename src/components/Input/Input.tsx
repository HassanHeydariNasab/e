import { forwardRef } from "react";
import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

import styles from "./styles.module.scss";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...rest }, ref) => {
    return (
      <div className={styles["container"]} hidden={rest.hidden}>
        <label htmlFor={rest.name}>
          {label}
          {rest.required && (
            <span className={styles["label__required"]}> *</span>
          )}
        </label>
        <div className={styles["input-container"]}>
          <input {...rest} ref={ref} />
        </div>
        {error && <div className={styles["error"]}>{error}</div>}
      </div>
    );
  }
);

export default Input;
