import moment from "moment";
import type { NextPage } from "next";
import Layout from "../components/Layout";

const Month: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold">{moment().format("MMMM")}</h1>
      </div>
    </Layout>
  );
};

export default Month;
