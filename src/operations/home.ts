import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($input: UserInput!) {
    hello
    user(UserInput: $input) {
      _id
      name
      friends {
        _id
      }
    }
  }
`;
