"use client";

import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";
import type {
  InputHTMLAttributes,
  DetailedHTMLProps,
  FocusEventHandler,
  MouseEventHandler,
  KeyboardEventHandler,
} from "react";
import type { ChangeHandler } from "react-hook-form";
import clsx from "clsx";

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
    const optionsRef = useRef<HTMLDivElement>(null);

    const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false); // TODO: remove me and use ul ref!
    const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(-1);

    useEffect(() => {
      if (!isOptionsVisible) {
        setFocusedOptionIndex(-1);
      }
    }, [isOptionsVisible]);

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

    const selectOption = (label: string) => {
      if (inputRef?.current) {
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

    const onClickOption: MouseEventHandler<HTMLLIElement> = (event) => {
      console.log("click");
      const label = event.currentTarget.dataset.label;
      if (label) selectOption(label);
    };

    const onClickInput: MouseEventHandler = () => {
      setIsOptionsVisible((isOptionsVisible) => !isOptionsVisible);
      optionsRef.current?.focus();
    };

    const onBlurInput: FocusEventHandler<HTMLInputElement> = (event) => {
      //onBlur?.({ target: { name: rest.name || "" }, type: "blur" });
      setIsOptionsVisible(false);
    };

    const onKeyDownInput: KeyboardEventHandler<HTMLInputElement> = (event) => {
      const key = event.key;
      console.log("down", { key });
      if (
        [
          " ",
          "ArrowUp",
          "Up",
          "ArrowDown",
          "Down",
          "Enter",
          "Escape",
          "Esc",
        ].includes(key)
      ) {
        event.preventDefault();
      }
    };

    const onKeyUpInput: KeyboardEventHandler<HTMLInputElement> = (event) => {
      const key = event.key;
      if (key === " ") {
        setIsOptionsVisible((isOptionsVisible) => !isOptionsVisible);
      } else if (["Escape", "Esc"].includes(key)) {
        setIsOptionsVisible(false);
      } else if (["ArrowDown", "Down"].includes(key)) {
        setFocusedOptionIndex((value) => {
          const nextValue = value + 1;
          if (nextValue < options.length) {
            return nextValue;
          }
          return value;
        });
      } else if (["ArrowUp", "Up"].includes(key)) {
        setFocusedOptionIndex((value) => {
          const nextValue = value - 1;
          if (nextValue >= 0) {
            return nextValue;
          }
          return value;
        });
      } else if (key === "Enter") {
        if (focusedOptionIndex >= 0) {
          const label = options[focusedOptionIndex].label;
          if (label) selectOption(label);
        }
      }
      /*
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
      */
    };

    return (
      <div className={styles["container"]}>
        <label htmlFor={rest.name}>
          {label}
          {rest.required && (
            <span className={styles["label__required"]}> *</span>
          )}
        </label>
        <div className={styles["input-container"]} onClick={onClickInput}>
          <input
            ref={inputRef}
            {...rest}
            onBlur={onBlurInput}
            onKeyUp={onKeyUpInput}
            onKeyDown={onKeyDownInput}
            readOnly
            role="combobox"
          />
        </div>
        {isOptionsVisible && (
          <ul
            className={styles["options"]}
            onMouseDown={(event) => {
              event.preventDefault();
            }}
            role="listbox"
          >
            {options.map((option, index) => (
              <li
                onClick={onClickOption}
                key={option.label + option.value}
                data-label={option.label}
                role="option"
                aria-selected={inputRef.current?.value === option.label}
                className={clsx([
                  styles["options__option"],
                  focusedOptionIndex === index &&
                    styles["options__option--hover"],
                ])}
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
