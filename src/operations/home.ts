import { gql } from "@apollo/client";

export const GET_ME = gql`
  query getMe {
    me {
      _id
      name
      balance
      phoneNumber
      permissions
      currency
    }
  }
`;

export const GET_EXCHANGE_RATE = gql`
  query getExchangeRate($name: String!) {
    exchangeRate(name: $name) {
      _id
      name
      rate
    }
  }
`;
