import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query getProduct($productId: ObjectId!) {
    product(productId: $productId) {
      _id
      attributeValues {
        name
        value
      }
      categoryId
      createdAt
      defaultImageId
      imageIds
      isHidden
      name
      price
      productGroupId
      quantity
    }
  }
`;
