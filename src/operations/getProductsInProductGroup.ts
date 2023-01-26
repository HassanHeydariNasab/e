import { gql } from "@apollo/client";

export const GET_PRODUCTS_IN_PRODUCT_GROUP = gql`
  query getProductsInProductGroup($productId: ObjectId!) {
    productsInProductGroup(productId: $productId) {
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
