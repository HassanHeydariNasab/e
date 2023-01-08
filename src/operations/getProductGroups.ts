import { gql } from "@apollo/client";

export const GET_PRODUCT_GROUPS = gql`
  query getProductGroups {
    productGroups {
      _id
      name
      categoryId
      isHidden
    }
  }
`;
