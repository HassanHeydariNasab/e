import { db } from "@db";
import type { VerificationCode } from "@types";

export const VerificationCodeCollection =
  db.collection<VerificationCode>("verificationCodes");
