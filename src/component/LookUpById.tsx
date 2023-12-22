import { useState } from "react";
import { useEffect } from "react";
import styles from "../App.module.css";
import AllData, { TaskListProps } from "./GetAllList";
import axios from "axios";

interface Task {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
}

const LookId: React.FC = () => {
  const [userInput, setUserInput] = useState<number | undefined>(undefined);
  const [taskData, setTaskData] = useState<Task[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idNumber = parseFloat(e.target.value);
    setUserInput(isNaN(idNumber) ? undefined : idNumber);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput !== undefined) {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos/"
        );
        setTaskData([response.data]);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    } else {
      console.error("Invalid number");
    }
  };

  useEffect(() => {
    if (userInput === undefined) {
      setTaskData([]);
    }
  }, [userInput]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className={styles.fieldbox}>
          <legend>TasK list Api </legend>
          <label htmlFor="description">Task look up by Id</label>
          <input
            value={userInput === undefined ? "" : userInput}
            onChange={handleInput}
            type="number"
            className={styles.addIdbox}
          ></input>
          <button type="submit" className={styles.showButton}>
            Sumbit
          </button>
        </fieldset>
      </form>
      <AllData tasks={taskData} setTaskData={setTaskData} />
    </>
  );
};
export default LookId;
