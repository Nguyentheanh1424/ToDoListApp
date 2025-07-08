export type Task = {
  id: string;
  title: string;
  status?: string;
  dueDate: number;
  estimate: number;
  description: string;
}