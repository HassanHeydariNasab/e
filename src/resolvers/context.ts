import { ContextFunction } from "@apollo/server";
import type { NextApiHandler } from "next";
import { decode, verify } from "jsonwebtoken";
import { ObjectId } from "mongodb";

import { Permission } from "@types";

export interface Context {
  userId: ObjectId | null;
  permissions?: Permission[];
}

export interface TokenPayload {
  id: string;
  p?: Permission[];
}

export const context: ContextFunction<
  Parameters<NextApiHandler>,
  Context
> = async (req, res) => {
  const context: Context = { userId: null };
  const token = req.headers.authorization;
  if (token) {
    try {
      verify(token, process.env.JWT_SECRET || "");
      const tokenPayload: TokenPayload = decode(token) as TokenPayload;
      const userId = new ObjectId(tokenPayload.id);
      context.userId = userId;
      context.permissions = tokenPayload.p;
    } catch (error) {}
  }
  return context;
};
