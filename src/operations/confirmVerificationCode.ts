import { gql } from "@apollo/client";

export const CONFIRM_VERIFICATION_CODE = gql`
  mutation confirmVerificationCode(
    $ConfirmVerificationCodeInput: ConfirmVerificationCodeInput!
  ) {
    confirmVerificationCode(
      ConfirmVerificationCodeInput: $ConfirmVerificationCodeInput
    )
  }
`;
