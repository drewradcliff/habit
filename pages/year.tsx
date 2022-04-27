import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Navbar";

const Year: NextPage = () => {
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
          <h1 className="text-4xl font-bold">2022</h1>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Year;
