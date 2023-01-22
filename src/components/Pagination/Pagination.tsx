import { Fragment } from "react";
import type { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import type { UseFormRegister } from "react-hook-form";
import clsx from "clsx";

import type { Pagination } from "@types";

import styles from "./styles.module.scss";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  pagination: Pagination;
  containerClassName?: string;
  register: UseFormRegister<any>;
}

const Pagination: FC<Props> = ({
  children,
  name,
  pagination: { total, skip, limit },
  containerClassName,
  register,
  ...rest
}) => {
  const numberOfPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit); // starting from zero
  return (
    <div className={clsx(styles["container"], containerClassName)}>
      {new Array(numberOfPages).fill(null).map((_, index) => (
        <Fragment key={index}>
          <input
            id={`${name}-${index}`}
            type="radio"
            value={index * limit}
            checked={index === currentPage}
            {...register(name)}
            {...rest}
          />
          <label
            htmlFor={`${name}-${index}`}
            className={styles["container__label"]}
          >
            {index + 1}
          </label>
        </Fragment>
      ))}
    </div>
  );
};

Pagination.displayName = "Pagination";

export default Pagination;
