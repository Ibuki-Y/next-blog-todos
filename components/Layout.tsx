import { ReactNode, VFC } from "react";
import Head from "next/head";

type Props = {
  title: string;
  children: ReactNode;
};

export const Layout: VFC<Props> = (props) => {
  const { title = "Default title", children } = props;

  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-white font-mono bg-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      
      <main className="flex flex-1 justify-center items-center w-screen flex-col">
        {children}
      </main>

      <footer className="w-full h-6 flex justify-center items-center text-gray-500 text-sm">
        @MyFooter 2022
      </footer>
    </div>
  );
};
