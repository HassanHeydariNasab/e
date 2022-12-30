"use client";

import type { NextPage } from "next";
import { useQuery } from "@apollo/client";

import { GET_ME } from "@operations";

const Home: NextPage = () => {
  const { data } = useQuery(GET_ME);

  return (
    <main>
      <h1>Home</h1>
      <div>Hi {data?.user?.name}!</div>
    </main>
  );
};

export default Home;
