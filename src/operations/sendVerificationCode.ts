import { gql } from "@apollo/client";

export const SEND_VERIFICATION_CODE = gql`
  mutation sendVerificationCode(
    $SendVerificationCodeInput: SendVerificationCodeInput!
  ) {
    sendVerificationCode(SendVerificationCodeInput: $SendVerificationCodeInput)
  }
`;
