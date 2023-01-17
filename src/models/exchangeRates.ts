import { db } from "@db";
import type { ExchangeRateModel } from "@types";

export const ExchangeRatesCollection =
  db.collection<Omit<ExchangeRateModel, "_id">>("exchangeRates");
