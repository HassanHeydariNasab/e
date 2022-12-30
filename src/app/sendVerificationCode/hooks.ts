import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import type { SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

import { SEND_VERIFICATION_CODE } from "@operations";
import { MutationSendVerificationCodeArgs } from "@types";

import type { FormSchema } from "./consts";

export const useSendVerificationCode = () => {
  const router = useRouter();

  const [sendVerificationCode, { loading: isLoading }] = useMutation<
    { sendVerificationCode: boolean },
    MutationSendVerificationCodeArgs
  >(SEND_VERIFICATION_CODE, {
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data, event) => {
    const { phoneNumber } = data;
    sendVerificationCode({
      variables: {
        SendVerificationCodeInput: { phoneNumber },
      },
    }).then((result) => {
      if (result.data?.sendVerificationCode) {
        router.replace(
          `/confirmVerificationCode?phoneNumber=${encodeURIComponent(
            phoneNumber
          )}`
        );
      }
    });
  };

  return { isLoading, onSubmit };
};
