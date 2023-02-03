import { Fragment } from "react";
import type { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import type { UseFormRegister } from "react-hook-form";
import clsx from "clsx";

import type { Pagination as PaginationType } from "@types";

import styles from "./styles.module.scss";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  pagination: PaginationType;
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
  const pages = new Array(numberOfPages).fill(null).map((_, index) => index);

  return (
    <div className={clsx(styles["container"], containerClassName)}>
      {pages.map((index) => {
        const first = 0;
        const middle = Math.floor(numberOfPages / 2);
        const last = numberOfPages - 1;

        if (
          [
            first,
            middle,
            last,
            currentPage + 1,
            currentPage - 1,
            currentPage,
          ].includes(index)
        ) {
          return (
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
          );
        }

        if (
          [
            currentPage + 2,
            currentPage - 2,
            first + 1,
            last - 1,
            middle - 1,
            middle + 1,
          ].includes(index)
        ) {
          return <span key={index} className={styles["container__spacer"]} />;
        }
      })}
    </div>
  );
};

Pagination.displayName = "Pagination";

export default Pagination;
