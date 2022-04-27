import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Habit } from "@prisma/client";
import { useSession } from "next-auth/react";
import ListItem from "../components/ListItem";
import AddHabit from "../components/AddHabbit";
import Layout from "../components/Layout";
import { getHabits } from "../apis";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const { data } = useQuery<Habit[]>("habits", getHabits);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (session) {
    return (
      <Layout>
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
      </Layout>
    );
  } else {
    return null;
  }
};

export default Home;
