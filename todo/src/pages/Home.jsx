import React, { useEffect, useState } from 'react'
import Create from '../components/Create'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import './Home.css'

function Home() {
  let [todos, setTodos] = useState([]);
  let [changeFlag, setChangFlag] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:3000/todos")
      .then((result) => {
        setTodos(result.data);
      })
  }, [changeFlag])

  const toggleChange = () => {
    setChangFlag((prev) => !prev);
  }

  function deleteHandler(task_name){
    axios.post("http://localhost:3000/delete",{"task_name": task_name})
    .then((Response)=>{
      console.log(Response);
      toggleChange();
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div className='home-div'>
      <h1>Todo App (MERN Stack)</h1>
      <Create onAddFlag={toggleChange} />
      <h2>Tasks :</h2>
      {
        todos.length === 0 ? (<h3>No Task</h3>)
          :
          (
            todos?.map((todo, index) => {
              return (
                <div className='pt-todo' key={index}>
                  <div className='todo-div' >
                    <h3 >{todo.task}</h3>
                    <button onClick={()=>{deleteHandler(todo.task)}} ><MdDelete style={{width:'100%', height:'100%' }} /></button>
                  </div>
                </div>
              )
            })
          )
      }
    </div>
  )
}

export default Home