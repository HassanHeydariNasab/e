import { useQuery, useReactiveVar } from "@apollo/client";

import { GET_ME } from "@operations";
import type { User } from "@types";
import { tokenVar } from "app/ContextProviders";

export const useNavbar = () => {
  const token = useReactiveVar(tokenVar);

  const { data } = useQuery<{ me: User }>(GET_ME, { skip: token === null });

  return { isLoggedIn: token !== null, user: data?.me };
};
