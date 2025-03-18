import React, { useContext, useState } from "react";
import axios from "axios";
import './Create.css'

const Create = ({onAddFlag}) => {
  const [task, setTask] = useState("");

  const changeHandler = (e) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    if (task.trim() === "") return;
    axios.post("http://localhost:3000/add", {"task" : task })
    .then(
      (result)=>{
        console.log(result.data);
        setTask("");
        onAddFlag();
      }
    )
    .catch((err)=>{
      console.log(err);
    })
    
    
  };

  return (
    <div className="create-div">
      <input value={task} onChange={changeHandler} type="text" placeholder="Add a task" />
      <button onClick={addTask}>Add</button>
    </div>
  );
};

export default Create;