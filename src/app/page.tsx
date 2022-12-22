"use client";

import React from "react";
import type { NextPage } from "next";
import { useQuery } from "@apollo/client";

import { GET_USER } from "../operations/home";

const Home: NextPage = () => {
  const { data } = useQuery(GET_USER, {
    variables: { input: { name: "hsn6" } },
  });

  return (
    <main>
      <h1>Home</h1>
      <div>Hi {data?.user?.name}!</div>
    </main>
  );
};

export default Home;
