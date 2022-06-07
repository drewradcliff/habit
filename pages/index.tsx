import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import moment from "moment";
import ListItem from "../components/ListItem";
import AddHabit from "../components/AddHabbit";
import Layout from "../components/Layout";
import { getHabits } from "../apis";
import { HabitResponse } from "../types/indext";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const { data } = useQuery<HabitResponse[]>("habits", getHabits);
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
          <h1 className="text-4xl font-bold pb-8">
            {moment().format("MMMM Do YYYY")}
          </h1>
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
