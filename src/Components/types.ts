export interface Task{
    id: number;
    text: string;
    completed: boolean;
}

export interface TaskListProps {
    tasks?: Task[];
  }