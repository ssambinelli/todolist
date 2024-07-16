import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import TodoList from "./components/TodoList"
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("/api/todos/")
      .then((res) => {
        setTodos(res.data)
      }).catch(() => {
        alert("Oh no! Something went wrong :(");
      })
  }, [])


  return (
    <div>
      <header>
        <h1>To Do List</h1>
      </header>
      <div>
        <TodoForm todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}


export default App;
