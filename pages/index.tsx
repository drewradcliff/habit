import React, { useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../db";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ListItem from "../components/ListItem";

interface Habit {
  id: number;
  text: string;
  checked: boolean;
}

interface Props {
  habits: Habit[];
}

const Home: NextPage<Props> = ({ habits }) => {
  const [list, setList] = useState(habits);

  const handleCheck = (id: number, checked: boolean) => {
    let newList = list.map((item) => {
      return item.id === id ? { ...item, checked } : item;
    });
    setList(newList);
  };

  const handleDelete = (id: number) => {
    setList(list.filter((item) => item.id !== id));
  };

  const handleNew = (index: number, emoji: string) => {
    // const newList = [...list];
    // newList.splice(index + 1, 0, {
    //   id: uuidv4(),
    //   text: emoji,
    //   checked: false,
    // });
    // setList(newList);
  };

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
            {list.map((item, index) => (
              <ListItem
                key={item.id}
                text={item.text}
                checked={item.checked}
                id={item.id}
                index={index}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
                handleNew={handleNew}
              />
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const habits = await prisma.habit.findMany();
  return { props: { habits } };
};

export default Home;
