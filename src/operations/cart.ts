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

export const ADD_TO_CART = gql`
  ${cart}
  mutation addToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      ...Cart
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
