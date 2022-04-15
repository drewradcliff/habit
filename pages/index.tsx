import React, { useState } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { IEmojiData } from "emoji-picker-react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ListItem from "../components/ListItem";
import AddHabit from "../components/AddHabbit";
import { useQuery } from "react-query";
import { getHabits } from "../apis";
import { Habit } from "@prisma/client";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const Home: NextPage = () => {
  const [picker, setPicker] = useState(false);
  const { data } = useQuery<Habit[]>("habits", getHabits);
  // const onEmojiClick = (e: React.MouseEvent, emojiObject: IEmojiData) => {
  //   handleNew(emojiObject.emoji);
  //   setPicker(false);
  // };

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
        {/* {picker && (
          <div className="absolute">
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )} */}
        <Footer />
      </main>
    </>
  );
};

export default Home;
