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
  isUpdating?: boolean;
  onChangeQuantity: (quantity: number) => void;
}

const QuantityInput: FC<Props> = ({
  containerClassName,
  isUpdating,
  onChangeQuantity,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      className={clsx(
        styles["container"],
        containerClassName,
        isUpdating && styles["container--updating"]
      )}
      hidden={rest.hidden}
    >
      <div className={styles["container__input-container"]}>
        <IoRemoveCircle
          onClick={() => {
            const value = inputRef.current?.valueAsNumber || 1;
            const newValue = value - 1;
            if (newValue >= 1) {
              onChangeQuantity(newValue);
            }
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
            const newValue = event.target.valueAsNumber || 1;
            if (newValue >= 1) {
              onChangeQuantity(newValue);
            }
            onChangeQuantity(newValue);
          }}
        />
        <IoAddCircle
          onClick={() => {
            const value = inputRef.current?.valueAsNumber || 1;
            onChangeQuantity(value + 1);
          }}
          size={32}
        />
      </div>
    </div>
  );
};

export default QuantityInput;
