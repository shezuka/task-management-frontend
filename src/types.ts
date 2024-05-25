export interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  due_date: string;
  created_at: string;
  updated_at: string;
}

export const taskStatuses = ["New", "In Progress", "Completed"];
