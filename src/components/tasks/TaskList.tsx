"use client";

import React from "react";
import { useTasksContext } from "@/components/tasks/TasksContext";
import { Accordion, AccordionItem, Divider, Spinner } from "@nextui-org/react";
import TaskCreate from "@/components/tasks/TaskCreate";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import TaskListItem from "@/components/tasks/TaskListItem";

interface TasksListProps {}

const TaskList = (props: TasksListProps) => {
  const tasksContext = useTasksContext();
  return (
    <div className="flex flex-col gap-2">
      <TaskCreate />
      <Card>
        <CardHeader>
          <h2>Tasks</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          {tasksContext.refreshing ? (
            <Spinner />
          ) : tasksContext.tasks.length ? (
            <Accordion>
              {tasksContext.tasks.map((task) => (
                <AccordionItem
                  key={task.id}
                  aria-label={task.title}
                  title={task.title}
                  isCompact
                >
                  <TaskListItem task={task} />
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p>No tasks yet</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default TaskList;
