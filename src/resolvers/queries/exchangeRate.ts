import { GraphQLError } from "graphql";

import type { QueryResolvers } from "@types";
import { ExchangeRatesCollection, UsersCollection } from "@models";
import { getExchangeRates } from "@services/server/price";

export const exchangeRate: QueryResolvers["exchangeRate"] = async (
  _,
  { name },
  { userId }
) => {
  if (userId) {
    await UsersCollection.updateOne(
      { _id: userId },
      { $set: { currency: name } }
    );
  }

  const now = new Date();
  const old = new Date().setUTCMinutes(0, 0, 0);
  const exchangeRate = await ExchangeRatesCollection.findOne({
    name,
  });
  const exchangeRatesCount = await ExchangeRatesCollection.countDocuments();
  if (
    exchangeRatesCount === 0 ||
    exchangeRate?.updatedAt?.valueOf() < old.valueOf()
  ) {
    try {
      const rates = await getExchangeRates();
      console.log({ rates });
      const names = Object.keys(rates);
      for (let name of names) {
        await ExchangeRatesCollection.updateOne(
          { name },
          {
            $set: {
              name,
              rate: rates[name],
              updatedAt: now,
            },
          },
          { upsert: true }
        );
      }
      const updatedExchangeRate = await ExchangeRatesCollection.findOne({
        name,
      });
      if (updatedExchangeRate) return updatedExchangeRate;
      if (exchangeRate) return exchangeRate;
      throw new GraphQLError(
        "A rare error occured while updating exchange rates."
      );
    } catch (error) {
      console.warn({ error });
      if (exchangeRate) return exchangeRate;
      throw new GraphQLError("An error occured while updating exchange rates.");
    }
  } else {
    if (exchangeRate) return exchangeRate;
    throw new GraphQLError(
      "An unexpected error occured while updating exchange rates."
    );
  }
};
