import { ObjectID } from "bson";
import { GraphQLError } from "graphql";
import { sign } from "jsonwebtoken";

import { db } from "@db";
import type { MutationResolvers } from "@types";

export const confirmVerificationCode: MutationResolvers["confirmVerificationCode"] =
  async (
    _,
    { ConfirmVerificationCodeInput: { phoneNumber, verificationCode } }
  ) => {
    const { deletedCount } = await db
      .collection("verificationCodes")
      .deleteOne({ phoneNumber, verificationCode });
    if (deletedCount !== 1) {
      throw new GraphQLError("The verification code is invalid");
    }

    const user = await db.collection("users").findOne({ phoneNumber });
    let userId: ObjectID;
    if (user === null) {
      const { insertedId } = await db
        .collection("users")
        .insertOne({ phoneNumber });
      userId = insertedId;
    } else {
      userId = user?._id;
    }
    const token = sign(userId.toHexString(), process.env.JWT_SECRET || "");
    return token;
  };
