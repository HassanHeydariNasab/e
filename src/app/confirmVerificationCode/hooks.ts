import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import type { SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

import { CONFIRM_VERIFICATION_CODE } from "@operations";
import type { MutationConfirmVerificationCodeArgs } from "@types";

import type { FormSchema } from "./consts";
import { tokenVar } from "app/ContextProviders";

interface Props {
  phoneNumber: string;
}

export const useConfirmVerificationCode = ({ phoneNumber }: Props) => {
  const router = useRouter();

  const [confirmVerificationCode, { loading: isLoading }] = useMutation<
    { confirmVerificationCode: string },
    MutationConfirmVerificationCodeArgs
  >(CONFIRM_VERIFICATION_CODE, {
    onCompleted(data) {
      const token = data.confirmVerificationCode;
      localStorage.setItem("token", token);
      tokenVar(token);
      toast.success("Welcome!");
      router.replace("/");
    },
    onError(error, clientOptions) {
      toast.error(error.message || "We couldn't confirm your phone number.");
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data, event) => {
    confirmVerificationCode({
      variables: {
        ConfirmVerificationCodeInput: {
          phoneNumber,
          verificationCode: data.verificationCode,
        },
      },
    });
  };

  return { isLoading, onSubmit };
};
