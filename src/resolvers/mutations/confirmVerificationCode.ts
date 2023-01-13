import { GraphQLError } from "graphql";
import { ObjectId } from "mongodb";
import { sign } from "jsonwebtoken";

import { db } from "@db";
import { Permission } from "@types";
import type { MutationResolvers, UserModel } from "@types";
import { UsersCollection } from "@models";
import type { TokenPayload } from "@resolvers/context";

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

    const user = await UsersCollection.findOne({ phoneNumber });
    let userId: ObjectId;
    let permissions: Permission[] | undefined;
    if (user === null) {
      const usersCount = await UsersCollection.countDocuments();
      const newUser: Omit<UserModel, "_id"> = {
        phoneNumber,
        balance: 0,
        currency: "USD",
      };
      if (usersCount === 0) {
        newUser.permissions = [Permission.Admin];
        permissions = [Permission.Admin];
      }
      const { insertedId } = await UsersCollection.insertOne(newUser);
      userId = insertedId;
    } else {
      userId = user._id;
      permissions = user.permissions || undefined;
    }

    const tokenPayload: TokenPayload = {
      id: userId.toHexString(),
    };
    if (permissions) {
      tokenPayload.p = permissions;
    }
    const token = sign(tokenPayload, process.env.JWT_SECRET || "");
    return token;
  };
