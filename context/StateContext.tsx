import { VFC, createContext, useState, ReactNode } from "react";

type Context = {
  id: number;
  title: string;
};
export const StateContext = createContext(
  {} as {
    selectedTask: Context;
    setSelectedTask: React.Dispatch<React.SetStateAction<Context>>;
  }
);

type Props = {
  children: ReactNode;
};

export const StateContextProvider: VFC<Props> = ({ children }) => {
  const [selectedTask, setSelectedTask] = useState({ id: 0, title: "" });
  return (
    <StateContext.Provider value={{ selectedTask, setSelectedTask }}>
      {children}
    </StateContext.Provider>
  );
};
