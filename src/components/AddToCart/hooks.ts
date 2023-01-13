import { cache, MouseEventHandler } from "react";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { toast } from "react-hot-toast";

import { ADD_TO_CART, GET_CART } from "@operations";
import type { MutationAddToCartArgs, Order, OrderItem } from "@types";

interface Props {
  productId: string;
}

export const useAddToCart = ({ productId }: Props) => {
  const [addToCart, { loading: isAddingToCart }] = useMutation<
    { addToCart: Order },
    MutationAddToCartArgs
  >(ADD_TO_CART, { refetchQueries: [{ query: GET_CART }] });

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

  const onClickRemoveFromCart: MouseEventHandler = (event) => {};

  const onClickIncreaseQuantity: MouseEventHandler = (event) => {};

  const onClickDecreaseQuantity: MouseEventHandler = (event) => {};

  return {
    orderItem,
    isAddingToCart,
    onClickAddToCart,
    onClickRemoveFromCart,
    onClickIncreaseQuantity,
    onClickDecreaseQuantity,
  };
};
