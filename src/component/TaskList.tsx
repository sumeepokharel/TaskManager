import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../App.module.css";

interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<string>("");

  useEffect(() => {
    async function getTasks() {
      try {
        const response = await axios(
          "https://jsonplaceholder.typicode.com/todos/"
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    getTasks();
  }, []);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      const newTaskObject: Task = {
        userId: 1,
        id: tasks.length + 1,
        title: newTask,
        completed: true,
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask("");
    }
  };

  const handleEditTask = (taskId: number) => {
    setEditingTask(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditedTask(taskToEdit ? taskToEdit.title : "");
  };

  const handleSaveEdit = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: editedTask } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditedTask("");
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      setEditingTask(null);
      return updatedTasks;
    });
  };

  return (
    <>
      <fieldset className={styles.container}>
        <form onSubmit={handleAddTask} className={styles.addTask}>
          <input
            className={styles.inputBox}
            type="text"
            placeholder="Enter task here"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit" className={styles.addButton}>
            Add New Task
          </button>
        </form>

        <div>
          <h2>Todo List</h2>
          <ul className={styles.tasklist}>
            {tasks
              .slice()
              .reverse()
              .map((task) => (
                <li key={task.id} className={styles.taskItem}>
                  {editingTask === task.id ? (
                    <div className={styles.editForm}>
                      <input
                        type="text"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                      />
                      <button
                        onClick={() => handleSaveEdit(task.id)}
                        className={styles.saveButton}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className={styles.taskInfo}>
                        <div>ID: {task.id}</div>
                        <div>Title: {task.title}</div>
                        <div>
                          Status:{" "}
                          <span
                            className={
                              task.completed
                                ? styles.completedStatus
                                : styles.incompleteStatus
                            }
                          >
                            {task.completed ? "Completed" : "Incomplete"}
                          </span>
                        </div>
                      </div>
                      <div className={styles.taskActions}>
                        <button
                          className={styles.editButton}
                          onClick={() => handleEditTask(task.id)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </fieldset>
    </>
  );
};

export default TaskList;
