import { useQuery, useReactiveVar } from "@apollo/client";

import { GET_CART, GET_ME } from "@operations";
import type { Order, User } from "@types";
import { tokenVar } from "app/ContextProviders";

export const useNavbar = () => {
  const token = useReactiveVar(tokenVar);

  const { data: userData } = useQuery<{ me: User }>(GET_ME, {
    skip: token === null,
  });

  const { data: cartData } = useQuery<{ cart: Order }>(GET_CART);

  return {
    isLoggedIn: token !== null,
    user: userData?.me,
    cart: cartData?.cart,
  };
};
