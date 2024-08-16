import React, { useEffect, useState } from 'react';
import { Task, TaskListProps } from './types';
import TaskItem from './TaskItem';

const LOCAL_STORAGE_KEY = 'tasks';

const TaskList: React.FC<TaskListProps> = ({ tasks = []}) => {
  const [localTasks, setLocalTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return tasks;
  });
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localTasks));
  }, [localTasks]);

  const addTask = () => {
    if (newTaskText.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };
    setLocalTasks([...localTasks, newTask]);
    setNewTaskText('');
  };

  const removeTask = (id: number) => {
    setLocalTasks(localTasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: number) => {
    setLocalTasks(localTasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="task-list">
      <h1 className="task-list-title">Task List</h1>
      <div className="add-task-form">
        <input
          type="text"
          className="add-task-input"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add text of task"
        />
        <button
          className="add-task-button"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      {localTasks.length === 0 ? (
        <p className="task-list-empty">No tasks to display</p>
      ) : (
        localTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onRemove={removeTask}
            onToggle={toggleTaskCompletion}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
