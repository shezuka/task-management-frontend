import TasksProvider from "@/components/tasks/TasksContext";
import { Metadata } from "next";
import TaskList from "@/components/tasks/TaskList";

export const metadata: Metadata = {
  title: "Tasks | Task Management",
};

interface TasksPageProps {}

const TasksPage = (props: TasksPageProps) => {
  return (
    <TasksProvider>
      <div className="container m-auto p-2 md:p-4 lg:p-6 xl:p-12">
        <TaskList />
      </div>
    </TasksProvider>
  );
};

export default TasksPage;
