import React, { useState } from "react";

interface TaskFormProps {
  addTask: (title: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const handleAddTask = () => {
    addTask(newTaskTitle);
    setNewTaskTitle("");
  };

  return (
    <div>
      <input
        type="text"
        value={newTaskTitle}
        onChange={handleInputChange}
        placeholder="Enter task title"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskForm;
