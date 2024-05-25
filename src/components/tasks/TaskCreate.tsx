import TaskFields from "@/components/tasks/TaskFields";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button, Divider } from "@nextui-org/react";
import React, { FormEventHandler, useCallback, useRef, useState } from "react";
import { TaskDto, useTasksContext } from "@/components/tasks/TasksContext";
import { localIsoStringToUtcIsoString } from "@/helpers/dates";

interface TaskCreateProps {}

const TaskCreate = (props: TaskCreateProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const tasksContext = useTasksContext();

  const [creating, setCreating] = useState(false);

  const onSubmit = useCallback<FormEventHandler>(
    async (e) => {
      e.preventDefault();
      if (!formRef.current) return;

      try {
        // setCreating(true);
        const formData = new FormData(formRef.current);
        const formValues = Object.fromEntries(formData.entries());
        const dto: TaskDto = {
          title: formValues.title as string,
          description: formValues.description as string,
          status: formValues.status as string,
          due_date: localIsoStringToUtcIsoString(formValues.due_date as string),
        };
        await tasksContext.create(dto);
        formRef.current.reset();
        setCreating(false);
      } catch (err) {
        console.error(err);
      } finally {
        setCreating(false);
      }
    },
    [tasksContext],
  );
  return (
    <Card>
      <CardHeader>
        <h2>Create task</h2>
      </CardHeader>
      <Divider />
      <form ref={formRef} onSubmit={onSubmit}>
        <CardBody>
          <TaskFields />
        </CardBody>
        <Divider />
        <CardFooter>
          <Button isDisabled={creating} color="primary" type="submit">
            Create task
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TaskCreate;
