import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../App.module.css";

interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  task: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ task }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

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

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            {task.title} {task.id} {task.completed ? "Completed" : "Incomplete"}
            <div className={styles.taskButtons}></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
