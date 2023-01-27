"use client";

import { Fragment, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import { useForm } from "react-hook-form";

import { AddToCart, CategoriesBreadcrumbs, Price } from "@components";
import { imagePath } from "@services/client/file";

import { useProduct } from "./hooks";
import styles from "./styles.module.scss";
import type { AttributeOptionsFormSchema } from "./consts";

function ProductPage() {
  const searchParams = useSearchParams();

  const productId = searchParams.get("id");

  const {
    product,
    isLoadingProduct,
    imageId,
    attributeOptions,
    attributeOption,
    setImageId,
    onChangeAttributeOption,
  } = useProduct({
    productId,
  });

  const { register, handleSubmit, watch, setValue } =
    useForm<AttributeOptionsFormSchema>();

  useEffect(() => {
    for (let attributeName of Object.keys(attributeOption)) {
      setValue(attributeName, attributeOption[attributeName]);
    }
  }, [attributeOption, setValue]);

  return (
    <main className={styles["main"]}>
      {product && (
        <div className={styles["product"]}>
          <Image
            src={imagePath(imageId)}
            alt={product.name}
            height={320}
            width={320}
            priority
            className={styles["product__image"]}
          />
          <div className={styles["product__image-thumbnails"]}>
            {product.imageIds.map((thumbnailImageId) => (
              <Image
                src={imagePath(thumbnailImageId)}
                alt={product.name}
                height={54}
                width={54}
                className={clsx(
                  styles["product__image-thumbnails__image-thumbnail"],
                  thumbnailImageId === imageId &&
                    styles[
                      "product__image-thumbnails__image-thumbnail--selected"
                    ]
                )}
                key={thumbnailImageId}
                onClick={() => setImageId(thumbnailImageId)}
              />
            ))}
          </div>
          <CategoriesBreadcrumbs categoryId={product?.categoryId} />
          <h2 className={styles["product__name"]}>{product.name}</h2>
          <form className={styles["attribute-options"]}>
            {Object.keys(attributeOptions).map((attributeKey) => (
              <div
                key={attributeKey}
                className={styles["attribute-options__item"]}
              >
                <span className={styles["attribute-options__item__key"]}>
                  {attributeKey}
                </span>
                {attributeOptions[attributeKey].map((value) => (
                  <Fragment key={value}>
                    <input
                      id={value}
                      type="radio"
                      value={value}
                      {...register(attributeKey, {
                        onChange(event) {
                          handleSubmit(onChangeAttributeOption)(event);
                        },
                      })}
                    />
                    <label
                      htmlFor={value}
                      className={clsx(
                        styles["attribute-options__item__value"],
                        watch(attributeKey) === value &&
                          styles["attribute-options__item__value--selected"]
                      )}
                    >
                      {value}
                    </label>
                  </Fragment>
                ))}
              </div>
            ))}
          </form>
          <Price product={product} className={styles["product__price"]} />
          <AddToCart product={product} />
          <div>Description</div>
        </div>
      )}
      {isLoadingProduct && <div>loading...</div>}
    </main>
  );
}

export default ProductPage;
