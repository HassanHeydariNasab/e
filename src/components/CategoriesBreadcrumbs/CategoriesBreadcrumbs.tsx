"use client";

import { Fragment } from "react";
import type { DetailedHTMLProps, HTMLAttributes, FC } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import clsx from "clsx";
import { IoChevronForward } from "react-icons/io5";

import type { Category } from "@types";
import { categoriesBreadcrumbs } from "@services/client/category";
import { GET_CATEGORIES } from "@operations";

import styles from "./styles.module.scss";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  categoryId: string;
}

const CategoriesBreadcrumbs: FC<Props> = ({
  categoryId,
  className,
  ...rest
}) => {
  const { data: categoriesData } = useQuery<{
    categories: Category[];
  }>(GET_CATEGORIES);

  const category = categoriesData?.categories.find(
    (category) => category._id === categoryId
  );
  const categories = categoriesData?.categories;

  if (!category || !categories) {
    return null;
  }

  return (
    <div className={clsx(styles["container"], className)} {...rest}>
      {categoriesBreadcrumbs(category, categories).map((category) => (
        <Fragment key={category._id}>
          <Link href={`/?categoryId=${category._id}`}>{category.name}</Link>
          <IoChevronForward />
        </Fragment>
      ))}
    </div>
  );
};

export default CategoriesBreadcrumbs;
