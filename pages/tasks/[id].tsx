/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";

import { Layout } from "../../components/Layout";
import { TASK } from "../../types/types";
import { getAllTaskIds, getTaskData } from "../../lib/tasks";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TaskDetail: NextPage<TASK> = (props) => {
  const router = useRouter();

  const { mutate } = useSWRConfig();
  const apiURL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${props.id}`;
  const { data } = useSWR<TASK>(apiURL, fetcher, {
    fallbackData: props,
  });

  useEffect(() => {
    mutate(apiURL);
  }, []);

  if (!props || router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Layout title={data.title}>
      <span className="mb-4">
        {"ID : "}
        {data.id}
      </span>
      <p className="mb-4 text-xl font-bold">{data.title}</p>
      <p className="mb-12">{data.created_at}</p>

      <Link href="/TaskPage" passHref>
        <div className="flex cursor-pointer mt-8 hover:opacity-50">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            ></path>
          </svg>
          <span>Back to task page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default TaskDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllTaskIds();
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const task = await getTaskData(ctx.params.id as string);
  return {
    props: {
      ...task,
    },
    revalidate: 3,
  };
};
