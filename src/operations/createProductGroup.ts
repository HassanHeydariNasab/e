import { gql } from "@apollo/client";

export const CREATE_PRODUCT_GROUP = gql`
  mutation createProductGroup($input: CreateProductGroupInput!) {
    createProductGroup(input: $input) {
      _id
      categoryId
      createdAt
      isHidden
      name
      __typename
    }
  }
`;
