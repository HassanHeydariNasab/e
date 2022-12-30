"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input } from "@components";

import { formSchema } from "./consts";
import type { FormSchema } from "./consts";
import { useConfirmVerificationCode } from "./hooks";
import styles from "./styles.module.scss";

function ConfirmVerificationCodePage() {
  const searchParams = useSearchParams();

  const phoneNumber = decodeURIComponent(searchParams.get("phoneNumber") || "");

  const { onSubmit, isLoading } = useConfirmVerificationCode({ phoneNumber });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

  return (
    <main className={styles["main"]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("verificationCode")}
          type="number"
          error={errors?.verificationCode?.message}
          label="Verification Code"
        />
        <Button isLoading={isLoading}>Confirm</Button>
      </form>
    </main>
  );
}

export default ConfirmVerificationCodePage;
