import React, { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
interface TaskListProps {
  taskss: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ taskss }) => {
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
          <li key={task.id}>
            {task.title} {task.id} {task.completed ? "Completed" : "Incomplete"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
