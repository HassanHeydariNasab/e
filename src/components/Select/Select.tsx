"use client";

import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  LegacyRef,
  MutableRefObject,
  RefAttributes,
  RefObject,
  useImperativeHandle,
  useRef,
} from "react";
import type {
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEventHandler,
} from "react";
import type { ChangeHandler } from "react-hook-form";

import styles from "./styles.module.scss";

interface Option {
  label: string;
  value: any;
}

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  options: Option[];
  error?: string;
  onChange: ChangeHandler;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, options, onChange, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(
      ref,
      () =>
        ({
          focus: () => {
            inputRef.current?.focus();
          },
          select: () => {
            inputRef.current?.select();
          },
          set value(value: string) {
            console.log("SET", value);
            if (inputRef.current) inputRef.current.value = value;
          },
          get value() {
            const value = inputRef.current?.value;
            console.log("GET", value);
            if (value) {
              return value;
            }
            return "";
          },
          type: "text",
          name: rest?.name || "",
        } as HTMLInputElement),
      [rest.name, ref, inputRef]
    );

    const onClickOption: MouseEventHandler<HTMLLIElement> = (event) => {
      const value = event.currentTarget.dataset.value;
      if (value && inputRef?.current) {
        inputRef.current.value = value;
        if (!onChange) return;
        onChange({
          target: {
            name: rest.name || "",
            value: value,
          },
          type: "change",
        });
      }
    };

    return (
      <div className={styles["container"]}>
        <label htmlFor={rest.name}>{label}</label>
        <div className={styles["input-container"]}>
          <input ref={inputRef} {...rest} disabled />
          <ul>
            {options.map((option) => (
              <li
                onClick={onClickOption}
                data-value={option.value}
                key={option.value}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
        {error && <div className={styles["error"]}>{error}</div>}
      </div>
    );
  }
);

export default Input;
