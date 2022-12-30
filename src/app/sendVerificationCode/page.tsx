"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input } from "@components";

import { formSchema } from "./consts";
import type { FormSchema } from "./consts";
import { useSendVerificationCode } from "./hooks";
import styles from "./styles.module.scss";

function SendVerificationCodePage() {
  const { onSubmit, isLoading } = useSendVerificationCode();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

  return (
    <main className={styles["main"]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("phoneNumber")}
          type="tel"
          error={errors?.phoneNumber?.message}
          label="Phone Number"
        />
        <Button isLoading={isLoading}>Login / Register</Button>
      </form>
    </main>
  );
}

export default SendVerificationCodePage;
