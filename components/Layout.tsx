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
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☕️</text></svg>"
        />
      </Head>
      <div className="container max-w-5xl min-h-screen flex flex-col justify-between mx-auto px-4">
        <div>{!hideNav && <Navbar />}</div>
        {children}
        <Footer />
      </div>
    </>
  );
}
