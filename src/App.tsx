import { useEffect, useState } from "react";
import axios from 'axios'

interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;

}
const App: React.FC = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    //to fetch the task
    async function getTasks() {
      const response = await axios('https://jsonplaceholder.typicode.com/todos/')
      setTasks(response.data)
    }
    getTasks()
  }, [])
  return (
    <div className="App">
      <h1> Task Manager</h1>
      <ul>
        {tasks.map((task: Task) => (
          <li key={task.userId}>{task.id}{task.title}{task.completed}</li>
        ))}
      </ul>
    </div>
  )
}
export default App