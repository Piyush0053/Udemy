import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  let [todos, setTodos] = useState([{ tasks: "sample tasks", id: uuidv4() }]);
  let [newTodo, setNewTodo] = useState("");
  let addNewTask = () => {
    setTodos((prevTodos)=>{
      return [...prevTodos,{tasks:newTodo, id:uuidv4()}];
      
    });
    setNewTodo("");
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo= (id)=>{
    setTodos((prevTodos)=> todos.filter((prevTodos)=> prevTodos.id!=id));
  }
  return (
    <div>
      <input
        placeholder="add a task"
        value={newTodo}
        onChange={updateTodoValue}
      />
      <button onClick={addNewTask}>Add task</button>
      <br />
      <br />
      <br />

      <h4>Tasks ToDo</h4>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.tasks}</span>
            <button onClick={()=> deleteTodo(todo.id)}>delete</button>
            </li>
        ))}
      </ul>
    </div>
  );
}
