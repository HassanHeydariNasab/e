import type { MouseEventHandler } from "react";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { toast } from "react-hot-toast";

import {
  ADD_TO_CART,
  GET_CART,
  REMOVE_FROM_CART,
  UPDATE_ORDER_ITEM_QUANTITY,
} from "@operations";
import type {
  MutationAddToCartArgs,
  MutationRemoveFromCartArgs,
  MutationUpdateOrderItemQuantityArgs,
  Order,
} from "@types";

interface Props {
  productId: string;
}

export const useAddToCart = ({ productId }: Props) => {
  const { cache } = useApolloClient();

  const [addToCart, { loading: isAddingToCart }] = useMutation<
    { addToCart: Order },
    MutationAddToCartArgs
  >(ADD_TO_CART, { refetchQueries: [{ query: GET_CART }] });

  const [removeFromCart, { loading: isRemovingFromCart }] = useMutation<
    { removeFromCart: Order },
    MutationRemoveFromCartArgs
  >(REMOVE_FROM_CART, { refetchQueries: [{ query: GET_CART }] });

  const [updateOrderItemQuantity, { loading: isUpdatinOrderItemQuantity }] =
    useMutation<
      { updateOrderItemQuantity: Order },
      MutationUpdateOrderItemQuantityArgs
    >(UPDATE_ORDER_ITEM_QUANTITY, {
      refetchQueries: [{ query: GET_CART }],
      optimisticResponse({ input: { orderItemId, quantity } }) {
        const cart = cache.readQuery<{ cart: Order }>({
          query: GET_CART,
        })?.cart;
        if (!cart) return { updateOrderItemQuantity: {} as Order };
        const optimisticCart = { ...cart };
        const optimisticOrderItems = [...optimisticCart.orderItems];
        const toBeChangedOrderItemIndex = optimisticOrderItems.findIndex(
          (orderItem) => orderItem._id === orderItemId
        );
        if (toBeChangedOrderItemIndex === -1)
          return { updateOrderItemQuantity: cart };
        optimisticOrderItems[toBeChangedOrderItemIndex] = {
          ...optimisticOrderItems[toBeChangedOrderItemIndex],
          quantity,
        };
        optimisticCart.orderItems = optimisticOrderItems;
        return { updateOrderItemQuantity: optimisticCart };
      },
    });

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
      cache.gc();
    });
  };

  const onChangeQuantity = (quantity: number) => {
    if (!orderItem) return;
    updateOrderItemQuantity({
      variables: { input: { orderItemId: orderItem._id, quantity } },
    });
  };

  return {
    orderItem,
    isAddingToCart,
    isRemovingFromCart,
    isUpdatinOrderItemQuantity,
    onClickAddToCart,
    onClickRemoveFromCart,
    onChangeQuantity,
  };
};
