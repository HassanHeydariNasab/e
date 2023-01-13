"use client";

import type { FC } from "react";
import { IoAddCircle, IoCart, IoRemoveCircle, IoTrash } from "react-icons/io5";
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
    onClickAddToCart,
    onClickRemoveFromCart,
    onClickIncreaseQuantity,
    onClickDecreaseQuantity,
  } = useAddToCart({ productId: product._id });

  return (
    <div className={styles["container"]}>
      {orderItem && (
        <form>
          <QuantityInput
            type="number"
            containerClassName={styles["container__quantity-input"]}
            Left={<IoRemoveCircle onClick={onClickDecreaseQuantity} />}
            Right={<IoAddCircle onClick={onClickIncreaseQuantity} />}
          />
        </form>
      )}
      {orderItem ? (
        <Button
          variant="filled"
          className={clsx(styles["container__remove-from-cart"])}
          onClick={onClickRemoveFromCart}
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
