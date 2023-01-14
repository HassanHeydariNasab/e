import type { MouseEventHandler } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-hot-toast";

import { ADD_TO_CART, GET_CART, REMOVE_FROM_CART } from "@operations";
import type {
  MutationAddToCartArgs,
  MutationRemoveFromCartArgs,
  Order,
} from "@types";

interface Props {
  productId: string;
}

export const useAddToCart = ({ productId }: Props) => {
  const [addToCart, { loading: isAddingToCart }] = useMutation<
    { addToCart: Order },
    MutationAddToCartArgs
  >(ADD_TO_CART, { refetchQueries: [{ query: GET_CART }] });

  const [removeFromCart, { loading: isRemovingFromCart }] = useMutation<
    { removeFromCart: Order },
    MutationRemoveFromCartArgs
  >(REMOVE_FROM_CART, { refetchQueries: [{ query: GET_CART }] });

  const { data: cartData } = useQuery<{ cart: Order }>(GET_CART);

  const orderItem = cartData?.cart.orderItems.find(
    (orderItem) => orderItem.product?._id === productId
  );

  const onClickAddToCart: MouseEventHandler = (event) => {
    addToCart({ variables: { input: { productId, quantity: 1 } } }).then(
      (result) => {
        const order = result.data?.addToCart;
        if (!order) return;
        toast.success("Product added to cart.");
      }
    );
  };

  const onClickRemoveFromCart: MouseEventHandler = (event) => {
    if (!orderItem) return;

    removeFromCart({
      variables: { input: { orderItemId: orderItem?._id } },
    }).then((result) => {
      const order = result.data?.removeFromCart;
      if (!order) return;
      toast.success("Product removed from cart.");
    });
  };

  const onClickIncreaseQuantity: MouseEventHandler = (event) => {};

  const onClickDecreaseQuantity: MouseEventHandler = (event) => {};

  return {
    orderItem,
    isAddingToCart,
    isRemovingFromCart,
    onClickAddToCart,
    onClickRemoveFromCart,
    onClickIncreaseQuantity,
    onClickDecreaseQuantity,
  };
};
