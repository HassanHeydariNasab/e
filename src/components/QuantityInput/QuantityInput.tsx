import { forwardRef, ReactNode } from "react";
import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./styles.module.scss";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  containerClassName?: string;
  Left?: ReactNode;
  Right?: ReactNode;
}

const QuantityInput = forwardRef<HTMLInputElement, Props>(
  ({ containerClassName, Left, Right, ...rest }, ref) => {
    return (
      <div
        className={clsx(styles["container"], containerClassName)}
        hidden={rest.hidden}
      >
        <div className={styles["container__input-container"]}>
          {Left}
          <input {...rest} ref={ref} min={1} step={1} />
          {Right}
        </div>
      </div>
    );
  }
);

export default QuantityInput;
