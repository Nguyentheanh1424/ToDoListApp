import { createContext, useContext } from "react";
import { Task } from "../types/Task";


type TaskContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  addTask: (task: Partial<Task>) => Promise<Task>;
};

export const TaskContext = createContext<TaskContextType | null>(null);

export const useTaskContext = () => {
  return useContext(TaskContext);
};