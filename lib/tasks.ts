import fetch from "node-fetch";
import { TASK } from "../types/types";

type TASKS = TASK[];

export const getAllTasksData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task`);
  const tasks = (await res.json()) as TASKS;
  return tasks;
};

export const getAllTaskIds = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task`);
  const tasks = (await res.json()) as TASKS;
  return tasks.map((task: TASK) => {
    return {
      params: {
        id: String(task.id),
      },
    };
  });
};

export const getTaskData = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}/`);
  const task = (await res.json()) as TASKS;
  return task;
};
