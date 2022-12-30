import { randomInt } from "crypto";

import { db } from "@db";
import { sendVerificationCodeViaSMS } from "@services";
import type { MutationResolvers } from "@types";
import { GraphQLError } from "graphql";

export const sendVerificationCode: MutationResolvers["sendVerificationCode"] =
  async (_, { SendVerificationCodeInput: { phoneNumber } }) => {
    const verificationCode = randomInt(10000, 100000).toString();
    const { acknowledged } = await db
      .collection("verificationCodes")
      .updateOne(
        { phoneNumber },
        { $set: { phoneNumber, verificationCode } },
        { upsert: true }
      );
    if (!acknowledged) {
      throw new GraphQLError("We couldn't send confirmation code.");
    }
    const isSmsSent = await sendVerificationCodeViaSMS(
      phoneNumber,
      verificationCode
    );
    if (!isSmsSent) {
      throw new GraphQLError("We couldn't send confirmation code.");
    }
    return true;
  };
