import { gql } from "@apollo/client";

export const GET_PRODUCT_GROUPS = gql`
  query getProductGroups(
    $filter: ProductGroupsFilter
    $options: ProductGroupsOptions
  ) {
    productGroups(filter: $filter, options: $options) {
      _id
      categoryId
      createdAt
      isHidden
      name
      __typename
    }
  }
`;
