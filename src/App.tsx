import { useEffect, useState } from "react";
import styles from "./App.module.css";
import axios from "axios";

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

  useEffect(() => {
    // Fetch tasks
    async function getTasks() {
      const response = await axios(
        "https://jsonplaceholder.typicode.com/todos/"
      );
      setTasks(response.data);
    }

    getTasks();
  }, []);

  const addTask = () => {
    const newTask: Task = {
      userId: 1,
      id: tasks.length + 1,
      title: newTaskTitle,
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
    <div className={styles.appContainer}>
      <h1>Task Manager</h1>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            {task.title} {task.completed} {task.id}
            <div className={styles.taskButtons}>
              <button onClick={() => editTask(task.id)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className={styles.taskInput}
        />
        {editingTaskId !== null ? (
          <button onClick={updateTask}>Update Task</button>
        ) : (
          <button onClick={addTask}>Add Task</button>
        )}
      </div>
    </div>
  );
};

export default App;
