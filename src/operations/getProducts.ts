import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query getProducts($filter: ProductsFilter, $options: ProductsOptions) {
    products(filter: $filter, options: $options) {
      results {
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
      pagination {
        skip
        limit
        total
      }
    }
  }
`;
