"use client";

import React from "react";
import { Input, Textarea } from "@nextui-org/input";
import { DatePicker, Select, SelectItem } from "@nextui-org/react";
import { parseDate, parseDateTime } from "@internationalized/date";
import { getLocalIsoDate } from "@/helpers/dates";
import { taskStatuses } from "@/types";

interface TaskFieldsProps {
  defaultTitle?: string;
  defaultDescription?: string;
  defaultStatus?: string;
  defaultDueDate?: string;
}

const TaskFields = (props: TaskFieldsProps) => {
  const localIsoString = getLocalIsoDate();
  return (
    <div className="flex flex-col gap-1">
      <Input
        isRequired
        name="title"
        defaultValue={props.defaultTitle}
        label="Title"
      />
      <div className="flex flex-col md:flex-row gap-1">
        <Select
          isRequired
          name="status"
          defaultSelectedKeys={["New"]}
          label="Status"
        >
          {taskStatuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </Select>
        <DatePicker
          name="due_date"
          label="Due date"
          showMonthAndYearPickers
          granularity="minute"
          defaultValue={parseDateTime(localIsoString)}
          minValue={parseDate(localIsoString.split("T")[0])}
        />
      </div>
      <Textarea
        name="description"
        defaultValue={props.defaultDescription}
        label="Description"
      />
    </div>
  );
};

export default TaskFields;
