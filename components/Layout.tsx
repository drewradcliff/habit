import Head from "next/head";
import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {
  title?: string;
  hideNav?: boolean;
  children: ReactNode;
}

export default function Layout({
  title = "habit",
  hideNav = false,
  children,
}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="habit tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container max-w-2xl min-h-screen flex flex-col justify-between mx-auto">
        <div>{!hideNav && <Navbar />}</div>
        {children}
        <Footer />
      </div>
    </>
  );
}
