import axios from "axios";
import React, { useEffect, useState } from "react";

function Todo() {
  const [todo, setTodo] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("https://stark-earth-77303.herokuapp.com/todo/get") //http://127.0.0.1:5000
      .then((response) => response.json())
      .then((response) => setTodo(response));
  }, []);

  const handleFormSubmit = () => {
    fetch("https://stark-earth-77303.herokuapp.com/todo/add", {
      //http://127.0.0.1:5000
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
        <div key={todos.id} className="rendered-todo">
          <div className="todo-content">{todos.content}</div>
          <button
            className="delete-todo-button"
            onClick={(e) => handleDelete(todos.id, e)}
          >
            Delete
          </button>
        </div>
      );
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://stark-earth-77303.herokuapp.com/todo/delete/${id}`) //http://127.0.0.1:5000
      .then((response) => {
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
          <h2 className="todo-title">What To Do?</h2>
          <div className="render-wrapper">
            <div className="todos">{renderTodo()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
