import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import moment from "moment";
import AddHabit from "../components/AddHabbit";
import Layout from "../components/Layout";
import HabitList from "../components/HabitList";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { date } = router.query;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (session) {
    return (
      <Layout>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold pb-8">
            {moment(date).format("MMMM Do YYYY")}
          </h1>
          <div>
            <HabitList date={date as string} />
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
