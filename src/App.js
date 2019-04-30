import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function Todo({ todo, index, completeTodo, removeTodo, setTodo }) {
  const [modal, setModal] = useState(false);
  const [todoValue, setValue] = useState(todo.title);

  const handleSubmit = e => {
    e.preventDefault();
    if (!todoValue) {
      return;
    } else {
      setTodo(index, todoValue);
      setValue("");
      setModal(false);
    }
  };
  return modal ? (
    <form onSubmit={handleSubmit}>
      <input
        className="todo"
        type="text"
        onChange={e => setValue(e.target.value)}
        placeholder={todo.title}
        value={todoValue}
      />
    </form>
  ) : (
    <div
      style={{ textDecoration: todo.completed ? "line-through" : "" }}
      className="todo"
      onContextMenu={e => {
        e.preventDefault();
        return setModal(true);
      }}
    >
      {todo.title}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) {
      return;
    } else {
      addTodo(value);
      setValue("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add Todo.."
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log("In useEffect");
    (async function fetchData() {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/?_limit=10"
      );
      setTodos(res.data);
    })();
  }, []);
  const addTodo = title => {
    const newTodos = [...todos, { title }];
    setTodos(newTodos);
  };
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  const setTodo = (index, title) => {
    const newTodos = [...todos];
    newTodos[index].title = title;
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => {
          return (
            <Todo
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
              setTodo={setTodo}
            />
          );
        })}
        <TodoForm addTodo={addTodo} />
      </div>
      <div className="editTodo">Right click to edit</div>
    </div>
  );
};
export default App;
