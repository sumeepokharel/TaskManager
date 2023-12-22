import { useState } from "react";
import Form from "./component/form";
import TaskList from "./component/GetAllList";
import LookId from "./component/LookUpById";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Form />
    </>
  );
}

export default App;
