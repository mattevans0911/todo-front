import axios from "axios";
import React, { useEffect, useState } from "react";

function Todo() {
  const [todo, setTodo] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/todo/get")
      .then((response) => response.json())
      .then((response) => setTodo(response));
  }, []);

  const handleFormSubmit = () => {
    fetch("http://127.0.0.1:5000/todo/add", {
      method: "POST",
      body: JSON.stringify({
        content: content,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) => console.log(response));
  };

  const renderTodo = () => {
    return todo.map((todos) => {
      return (
        <div key={todos.id} id={todos.id}>
          <div>{todos.content}</div>
          <button onClick={(e) => handleDelete(todos.id, e)}>Delete</button>
        </div>
      );
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/todo/delete/${id}`).then((response) => {
      console.log(response);
      const deletedTodo = todo.filter((item) => item.id !== id);
      setTodo(deletedTodo);
    });
  };

  return (
    <div>
      <div className="form-wrapper" onSubmit={handleFormSubmit}>
        <form className="form">
          <h3 className="form-title">Have Something to Add?</h3>
          <input
            className="todo-input"
            type="content"
            placeholder="What ToDo?"
            onChange={(event) => setContent(event.target.value)}
          />
          <button className="add-todo-button" type="submit">
            Add
          </button>
        </form>
        <div className="todos-wrapper">
          <div className="wrapper-two">
            <h2 className="todo-title">What To Do?</h2>
            <div className="todos">{renderTodo()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
