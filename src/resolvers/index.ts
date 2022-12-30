import type { Resolvers } from "@types";
import { sendVerificationCode, confirmVerificationCode } from "./mutations";
import { me } from "./queries";

export const resolvers: Resolvers = {
  Query: {
    hello: () => "world",
    me,
  },
  Mutation: {
    sendVerificationCode,
    confirmVerificationCode,
  },
};
