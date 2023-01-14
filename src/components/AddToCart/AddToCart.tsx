"use client";

import type { FC } from "react";
import { IoCart, IoTrash } from "react-icons/io5";
import clsx from "clsx";

import type { Product } from "@types";
import { Button, QuantityInput } from "@components";

import styles from "./styles.module.scss";
import { useAddToCart } from "./hooks";

interface Props {
  product: Product;
}

const AddToCart: FC<Props> = ({ product }) => {
  const {
    orderItem,
    isAddingToCart,
    isRemovingFromCart,
    onClickAddToCart,
    onClickRemoveFromCart,
    onChangeQuantity,
  } = useAddToCart({ productId: product._id });

  return (
    <div className={styles["container"]}>
      {orderItem && (
        <QuantityInput
          name="quantity"
          containerClassName={styles["container__quantity-input"]}
          onChangeQuantity={onChangeQuantity}
          defaultValue={orderItem.quantity || 1}
        />
      )}
      {orderItem ? (
        <Button
          variant="filled"
          className={clsx(styles["container__remove-from-cart"])}
          onClick={onClickRemoveFromCart}
          isLoading={isRemovingFromCart}
        >
          <IoTrash size={"1.5rem"} />
        </Button>
      ) : (
        <Button
          variant="filled"
          className={clsx(styles["container__add-to-cart"])}
          onClick={onClickAddToCart}
          isLoading={isAddingToCart}
        >
          <IoCart size={"1.5rem"} />
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default AddToCart;
