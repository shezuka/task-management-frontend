"use client";

import { Task, taskStatuses } from "@/types";
import {
  Button,
  CalendarDate,
  DatePicker,
  Divider,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  CalendarDateTime,
  parseDate,
  parseDateTime,
} from "@internationalized/date";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { TaskDto, useTasksContext } from "@/components/tasks/TasksContext";
import { getLocalIsoDate, localIsoStringToUtcIsoString } from "@/helpers/dates";
import { Textarea } from "@nextui-org/input";

interface TaskListItemProps {
  task: Task;
}

const TaskListItem = (props: TaskListItemProps) => {
  const tasksContext = useTasksContext();

  const [minDueDate, setMinDueDate] = useState<CalendarDate>();
  const [dueDate, setDueDate] = useState<CalendarDateTime>();
  const [description, setDescription] = useState<string>(
    props.task.description || "",
  );

  const createDto = useCallback((): TaskDto => {
    return {
      title: props.task.title,
      description: props.task.description,
      due_date: props.task.due_date,
      status: props.task.status,
    };
  }, [props.task]);

  const update = useCallback(
    async (dto: TaskDto) => {
      await tasksContext.update(props.task.id, dto);
    },
    [tasksContext, props.task],
  );

  const onDueDateChange = useCallback(
    (date: CalendarDateTime) => {
      const dto = createDto();
      dto.due_date = localIsoStringToUtcIsoString(date.toString());
      update(dto);
      setDueDate(date);
    },
    [createDto, update],
  );

  const onStatusChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      const dto = createDto();
      dto.status = value;
      update(dto);
    },
    [],
  );

  useEffect(() => {
    try {
      setMinDueDate(parseDate(getLocalIsoDate().split("T")[0]));
      setDueDate(
        parseDateTime(
          getLocalIsoDate(new Date(props.task.due_date.split(".")[0])),
        ),
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (description === props.task.description) return;

    const instance = setTimeout(() => {
      const dto = createDto();
      dto.description = description;
      update(dto);
    }, 1000);
    return () => {
      clearTimeout(instance);
    };
  }, [description]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col md:flex-row gap-1">
        <div className="flex flex-col gap-1">
          <DatePicker
            label="Due date"
            size="sm"
            granularity="minute"
            minValue={minDueDate}
            value={dueDate}
            onChange={onDueDateChange}
          />
          <Select
            isRequired
            name="status"
            defaultSelectedKeys={[props.task.status]}
            label="Status"
            size="sm"
            onChange={onStatusChange}
          >
            {taskStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Divider
          orientation="vertical"
          className="hidden md:block h-full w-1"
        />
        <Textarea
          defaultValue={props.task.description}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        >
          {props.task.description}
        </Textarea>
      </div>
      <div className="flex flex-col md:flex-row gap-1">
        <Button
          color="danger"
          onClick={() => tasksContext.delete(props.task.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskListItem;
