"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Task } from "@/types";
import axios from "@/helpers/axios";

export interface TaskDto {
  title: string;
  description?: string;
  status: string;
  due_date: string;
}

interface TasksContextProps {
  tasks: Task[];
  refreshing: boolean;
  refresh: () => Promise<void>;
  create: (dto: TaskDto) => Promise<void>;
  update: (id: number, dto: TaskDto) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export const TasksContext = createContext<TasksContextProps>({
  tasks: [],
  refreshing: false,
  refresh: async () => {},
  create: async (dto: TaskDto) => {},
  update: async (id: number, dto: TaskDto) => {},
  delete: async (id: number) => {},
});

export const useTasksContext = () => useContext(TasksContext);

interface TasksProviderProps {
  children?: ReactNode;
}

const TasksProvider = ({ children }: TasksProviderProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const refreshTasks = useCallback(async () => {
    setRefreshing(true);
    const resp = await axios.get<Task[]>("tasks");
    setTasks(resp.data);
    setRefreshing(false);
  }, []);

  const createTask = useCallback(
    async (dto: TaskDto) => {
      const resp = await axios.post<Task>("tasks", dto);
      setTasks([...tasks, resp.data]);
    },
    [tasks],
  );

  const updateTask = useCallback(
    async (id: number, dto: TaskDto) => {
      const index = tasks.findIndex((it) => it.id === id);
      if (index === -1) return;
      axios.put<Task>(`tasks/${id}`, dto).catch(refreshTasks);

      const newTasks = [...tasks];
      newTasks[index] = { ...newTasks[index], ...dto };
      setTasks(newTasks);
    },
    [tasks, refreshTasks],
  );

  const deleteTask = useCallback(
    async (id: number) => {
      axios.delete(`tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    },
    [tasks],
  );

  useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        refreshing,
        refresh: refreshTasks,
        create: createTask,
        update: updateTask,
        delete: deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
