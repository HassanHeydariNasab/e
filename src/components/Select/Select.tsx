"use client";

import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import type {
  InputHTMLAttributes,
  DetailedHTMLProps,
  FocusEventHandler,
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
  onChange?: ChangeHandler;
  onBlur?: ChangeHandler;
}

const Select = forwardRef<HTMLInputElement, Props>(
  ({ label, error, options, onChange, onBlur, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false); // TODO: remove me and use ul ref!

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
            if (inputRef.current) {
              inputRef.current.value =
                options.find((option) => option.value === value)?.label || "";
            }
          },
          get value() {
            const label = inputRef.current?.value;
            const value = options.find(
              (option) => option.label === label
            )?.value;
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
      const label = event.currentTarget.dataset.label;
      if (label && inputRef?.current) {
        inputRef.current.value = label;
        const value = options.find((option) => option.label === label)?.value;
        if (!onChange) return;
        const changeEvent = {
          target: {
            name: rest.name || "",
            value,
          },
          type: "change",
        };
        onChange(changeEvent);
      }
      setIsOptionsVisible(false);
    };

    const onClickInput: MouseEventHandler = () => {
      setIsOptionsVisible((isOptionsVisible) => !isOptionsVisible);
    };

    const onBlurInput: FocusEventHandler<HTMLInputElement> = (event) => {
      onBlur?.({ target: { name: rest.name || "" }, type: "blur" });
      //setIsOptionsVisible(false);
    };

    /*
    const onKeyUpInput: KeyboardEventHandler<HTMLInputElement> = (event) => {
      const key = event.key;
      console.log({ key });
      setIsOptionsVisible((isOptionsVisible) => !isOptionsVisible);
      if (inputRef.current) {
        let value = inputRef.current.value.trim();
        const labels = options.map((option) => option.label);
        for (let label of labels) {
          console.log({ label });
          if (label.startsWith(value)) {
            value = label;
          }
        }
        inputRef.current.value = value;
        if (!onChange) return;
        onChange({
          target: {
            name: rest.name || "",
            value,
          },
          type: "change",
        });
      }
    };
    */

    return (
      <div className={styles["container"]}>
        <label htmlFor={rest.name}>
          {label}
          {rest.required && (
            <span className={styles["label__required"]}> *</span>
          )}
        </label>
        <div className={styles["input-container"]} onClick={onClickInput}>
          <input ref={inputRef} {...rest} onBlur={onBlurInput} readOnly />
        </div>
        {isOptionsVisible && (
          <ul className={styles["options"]}>
            {options.map((option, index) => (
              <li
                onClick={onClickOption}
                data-label={option.label}
                key={option.label + option.value}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
        {error && <div className={styles["error"]}>{error}</div>}
      </div>
    );
  }
);

export default Select;
