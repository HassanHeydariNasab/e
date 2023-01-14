"use client";

import { useRef } from "react";
import type { FC, DetailedHTMLProps, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";

import styles from "./styles.module.scss";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  containerClassName?: string;
  onChangeQuantity: (quantity: number) => void;
}

const QuantityInput: FC<Props> = ({
  containerClassName,
  onChangeQuantity,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div
      className={clsx(styles["container"], containerClassName)}
      hidden={rest.hidden}
    >
      <div className={styles["container__input-container"]}>
        <IoRemoveCircle
          onClick={() => {
            inputRef.current?.stepDown(1);
            const value = inputRef.current?.valueAsNumber || 1;
            onChangeQuantity(value);
          }}
          size={32}
        />
        <input
          {...rest}
          ref={(ref) => {
            inputRef.current = ref;
          }}
          type="number"
          min={1}
          step={1}
          onChange={(event) => {
            onChangeQuantity(event.target.valueAsNumber);
          }}
        />
        <IoAddCircle
          onClick={() => {
            inputRef.current?.stepUp(1);
            const value = inputRef.current?.valueAsNumber || 1;
            onChangeQuantity(value);
          }}
          size={32}
        />
      </div>
    </div>
  );
};

export default QuantityInput;
