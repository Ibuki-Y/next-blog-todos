/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";

import { Layout } from "../components/Layout";
import { Task } from "../components/Task";
import { getAllTasksData } from "../lib/tasks";
import { TASK } from "../types/types";
import { StateContextProvider } from "../context/StateContext";
import { TaskForm } from "../components/TaskForm";

interface STATICPROPS {
  staticTasks: TASK[];
}

const apiURL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TaskPage: NextPage<STATICPROPS> = (props) => {
  const { staticTasks } = props;

  const { data, mutate } = useSWR(apiURL, fetcher, {
    fallbackData: staticTasks,
  });

  useEffect(() => {
    mutate(apiURL);
  }, []);

  return (
    <StateContextProvider>
      <Layout title="Task page">
        <TaskForm taskCreated={mutate} />
        <ul>
          {/* data */}
          {staticTasks &&
            staticTasks.map((task: TASK) => (
              <Task key={task.id} task={task} taskDeleted={mutate} />
            ))}
        </ul>

        <Link href="/MainPage" passHref>
          <div className="flex cursor-pointer mt-12 hover:opacity-50">
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
            <span>Back to main page</span>
          </div>
        </Link>
      </Layout>
    </StateContextProvider>
  );
};

export default TaskPage;

export const getStaticProps: GetStaticProps = async () => {
  const staticTasks = await getAllTasksData();
  return {
    props: { staticTasks },
    revalidate: 3,
  };
};
