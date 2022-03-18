import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { v4 as uuidv4 } from "uuid";
import { XIcon, MenuAlt4Icon } from "@heroicons/react/outline";
import Footer from "../components/Footer";
import Header from "../components/Header";

const habitList = [{ id: uuidv4(), text: "🏃‍♀️", checked: false }];

const Home: NextPage = () => {
  const [list, setList] = useState(habitList);
  const [text, setText] = useState("");
  const [error, setError] = useState({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (text.length === 0) return;

    if (text.length > 1) {
      setError({ text: "Text can only be 1 character" });
    }

    if (e.key === "Enter") {
      setList([...list, { id: uuidv4(), text: text, checked: false }]);
      setText("");
    }
  };

  const handleCheck = (id: string, checked: boolean) => {
    let newList = list.map((item) => {
      return item.id === id ? { ...item, checked } : item;
    });
    setList(newList);
  };

  const handleDelete = (id: string) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <>
      <Head>
        <title>habit</title>
        <meta name="description" content="habit tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-2xl min-h-screen flex flex-col justify-between mx-auto">
        <Header />
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold pb-8">March 13, 2022</h1>
          <div>
            {list.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between w-36 text-3xl hover:bg-gray-100 group rounded-md p-1"
              >
                <div className="w-6 h-6">
                  <MenuAlt4Icon className="group-hover:block hidden cursor-grab text-gray-500" />
                </div>
                <p className="w-[36px] text-center">{item.text}</p>
                <input
                  className="w-6 h-6"
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheck(item.id, !item.checked)}
                />
                <div className="w-6 h-6">
                  <XIcon
                    onClick={() => handleDelete(item.id)}
                    className="group-hover:block hidden hover:cursor-pointer text-gray-500"
                  />
                </div>
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="enter habit"
            value={text}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Home;
