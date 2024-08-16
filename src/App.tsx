import React from "react";
import TaskList from "./Components/TaskList";
import { Task } from "./Components/types"
import "./App.css";

type AppProps = {};


const App: React.FC<AppProps> = () => {
  const tasks: Task[] = [];
  return (
    <div>
      <TaskList tasks={tasks}/>
    </div>
  );
};

export default App;