import { useEffect } from "react";
import { useLazyQuery, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeHandler } from "react-hook-form";

import { GET_CART, GET_EXCHANGE_RATE, GET_ME } from "@operations";
import type { ExchangeRate, Order, QueryExchangeRateArgs, User } from "@types";
import { currencyVar, exchangeRateVar, tokenVar } from "app/ContextProviders";

export const useNavbar = () => {
  const token = useReactiveVar(tokenVar);
  const currency = useReactiveVar(currencyVar);
  const exchangeRate = useReactiveVar(exchangeRateVar);

  const { data: userData } = useQuery<{ me: User }>(GET_ME, {
    skip: !token,
  });

  const { data: cartData } = useQuery<{ cart: Order }>(GET_CART, {
    skip: !token,
  });

  // side-effect: updates user.currency
  const [getExchangeRate, { data: exchangeRateData }] = useLazyQuery<
    { exchangeRate: ExchangeRate },
    QueryExchangeRateArgs
  >(GET_EXCHANGE_RATE, {
    variables: { name: currency },
  });

  const user = userData?.me;
  const isLoggedIn = typeof token === "string";
  const cart = cartData?.cart;

  useEffect(() => {
    if (token === undefined) return;
    if (user?.currency) {
      currencyVar(user.currency);
      getExchangeRate();
    } else if (token === null) {
      const storedCurrency = localStorage.getItem("currency");
      if (storedCurrency) {
        currencyVar(storedCurrency);
      }
      getExchangeRate();
    }
  }, [user, token]);

  useEffect(() => {
    if (exchangeRateData?.exchangeRate.rate) {
      exchangeRateVar(exchangeRateData?.exchangeRate.rate);
    }
  }, [exchangeRateData]);

  const onChangeCurrency: ChangeHandler = async (event) => {
    const selectedCurrency = event.target.value;
    if (!isLoggedIn) {
      localStorage.setItem("currency", selectedCurrency);
    }
    currencyVar(selectedCurrency);
    getExchangeRate();
  };

  return {
    isLoggedIn,
    user,
    cart,
    currency,
    exchangeRate,
    onChangeCurrency,
  };
};
