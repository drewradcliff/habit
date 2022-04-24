import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ListItem from "../components/ListItem";
import AddHabit from "../components/AddHabbit";
import { useQuery } from "react-query";
import { getHabits } from "../apis";
import { Habit } from "@prisma/client";

const Home: NextPage = () => {
  const { data } = useQuery<Habit[]>("habits", getHabits);

  return (
    <>
      <Head>
        <title>habit</title>
        <meta name="description" content="habit tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container max-w-2xl min-h-screen flex flex-col justify-between mx-auto">
        <Header />
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold pb-8">March 13, 2022</h1>
          <div>
            {data ? (
              data.map((habit) => <ListItem key={habit.id} habit={habit} />)
            ) : (
              <>Loading...</>
            )}
          </div>
          <AddHabit />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Home;
