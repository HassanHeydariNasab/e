import { gql } from "@apollo/client";

export const CREATE_CATEGROY = gql`
  mutation createCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      _id
      name
      parentId
    }
  }
`;
