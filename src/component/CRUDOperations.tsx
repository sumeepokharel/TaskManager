import React from "react";

interface CRUDOperationsProps {
  editTask: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  updateTask: (taskId: number) => void;
}

const CRUDOperations: React.FC<CRUDOperationsProps> = ({
  editTask,
  deleteTask,
  updateTask,
}) => {
  return (
    <div>
      <button onClick={() => editTask(1)}>Edit Task</button>
      <button onClick={() => deleteTask(1)}>Delete Task</button>
      <button onClick={() => updateTask(1)}>Update Task</button>
    </div>
  );
};

export default CRUDOperations;
