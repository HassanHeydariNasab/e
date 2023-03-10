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

const FileInput = forwardRef<HTMLInputElement, Props>(
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
          <div className={styles["input-container__file-placeholder"]}>
            Click to pick a file
          </div>
          <div className={styles["input-container__file-preview"]}></div>
          <input {...rest} type="file" ref={ref} />
        </div>
        {error && <div className={styles["error"]}>{error}</div>}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export default FileInput;
