import React, { useState } from "react";
import TaskList from "./component/TaskList";
import TaskForm from "./component/TaskForm";
import CRUDOperations from "./component/CRUDOperations";
import styles from "./App.module.css";

interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const addTask = (title: string) => {
    const newTask = {
      userId: 1,
      id: tasks.length + 1,
      title: title,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskTitle("");
  };

  const editTask = (taskId: number) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setNewTaskTitle(taskToEdit.title);
    }
  };

  const updateTask = () => {
    if (editingTaskId !== null) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTaskId ? { ...task, title: newTaskTitle } : task
        )
      );
      setNewTaskTitle("");
      setEditingTaskId(null);
    }
  };

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <div className={styles.appContainer}>
        <h1>Task Manager</h1>
        <TaskList task={tasks} />
        <TaskForm addTask={addTask} />
        <CRUDOperations
          editTask={editTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      </div>
    </div>
  );
};

export default App;
