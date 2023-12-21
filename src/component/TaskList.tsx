import React, { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
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
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;