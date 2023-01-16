import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation createProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
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
