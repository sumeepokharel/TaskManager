import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../App.module.css";

interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const TaskList: React.FC = ({}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<string>("");
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
      {/* <fieldset className={styles.container}>
        <form onSubmit={handleAddTask} className="add - task">
          <input
            className={styles.inputBox}
            type="text"
            placeholder="Enter task here"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit" className={styles.editButton}>
            Add New Task
          </button>
        </form> */}

      <div>
        <h2>Todo List</h2>
        <ul className="task-list">
          {tasks
            .map((task) => (
              <li key={task.id} className="task-item">
                {editingTask === task.id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editedTask}
                      onChange={(e) => setEditedTask(e.target.value)}
                    />
                    <button onClick={() => handleSaveEdit(task.id)}>
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <li>{task.id}</li>
                    <li>{task.title}</li>
                    <li>{task.completed.toString()}</li>
                    <div className="task-actions">
                      <button
                        className={styles.editButton}
                        onClick={() => handleEditTask(task.id)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.editButton}
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
            .reverse()}
        </ul>
      </div>
    </>
  );
};

export default TaskList;
