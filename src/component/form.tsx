import styles from '../App.module.css'
import { useState } from 'react';
import TaskList from './TaskList';



const Form: React.FC = () => {
  //get user input and show data of that user id

  //connect this with api component made by Sumitra


  const [isTaskList, setTaskList] = useState(false);
  const[userInput, setUserInput] = useState<number | undefined>(undefined);

  const handleInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const idNumber = parseFloat(e.target.value);
    setUserInput (isNaN(idNumber) ? undefined:idNumber);
  };
   const handleSubmit = (e: React.FormEvent) =>{
    e.preventDefault();
    if(userInput !== undefined){
      console.log("Valid number" , userInput);
    }
    else{
      console.error('invalid number');
    }
   }; 

   
   const showData = () => {
    if(isTaskList) { setTaskList(false)}
    else {
      (setTaskList(true));
    }
     };




  return (
    <>
    <form onSubmit={handleSubmit}>
    <fieldset className={styles.fieldbox}>
      <legend>TasK list Api </legend>
      <label htmlFor = "description"  >Task look up by id</label>
      <input value ={userInput === undefined ? '' : userInput} onChange={handleInput} type="number" className={styles.addIdbox}>
    </input>
    <button type="submit" className={styles.showButton}>Sumbit</button>
    </fieldset>
    </form>


    <fieldset className={styles.fieldbox}>
      <legend>Show All Data  </legend>
      <label htmlFor = "allData">Look all data</label>
      <button id ="addData" className={styles.showButton} onClick={showData}> {isTaskList ? 'Hide Data' : 'Show all data'}
      </button>
    </fieldset>
    {isTaskList && <TaskList />}
    </>
  )
}
export default Form;