import { gql } from "@apollo/client";

const cart = gql`
  fragment Cart on Order {
    _id
    orderShipping {
      _id
      deliveredAt
      dimension
      price
      shippedAt
      shippingMethod {
        _id
        name
      }
      weight
    }
    placedAt
    price
    status
    orderItems {
      _id
      orderId
      product {
        _id
        name
        defaultImageId
        price
      }
      quantity
    }
  }
`;

export const GET_CART = gql`
  ${cart}
  query getCart {
    cart {
      ...Cart
    }
  }
`;

export const ADD_TO_CART = gql`
  ${cart}
  mutation addToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      ...Cart
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  ${cart}
  mutation removeFromCart($input: RemoveFromCartInput!) {
    removeFromCart(input: $input) {
      ...Cart
    }
  }
`;

export const UPDATE_ORDER_ITEM_QUANTITY = gql`
  ${cart}
  mutation updateOrderItemQuantity($input: UpdateOrderItemQuantityInput!) {
    updateOrderItemQuantity(input: $input) {
      ...Cart
    }
  }
`;
