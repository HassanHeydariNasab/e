import { ContextFunction } from "@apollo/server";
import type { NextApiHandler } from "next";
import { decode, verify } from "jsonwebtoken";
import { ObjectId } from "mongodb";

export interface Context {
  userId: ObjectId | null;
}

export const context: ContextFunction<
  Parameters<NextApiHandler>,
  Context
> = async (req, res) => {
  const context: Context = { userId: null };
  const token = req.headers.authorization;
  if (token) {
    if (verify(token, process.env.JWT_SECRET || "")) {
      try {
        const objectId = decode(token) as string;
        const userId = new ObjectId(objectId);
        context.userId = userId;
      } catch (error) {}
    }
  }
  return context;
};
