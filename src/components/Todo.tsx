import React from "react";
import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";

type Todos = {
  id: string;
  task: string;
  time: string;
  checked: boolean;
};

type completedTodos = {
  id: string;
  task: string;
  time: string;
  checked: boolean;
  finishTime: string;
};

function Todo({
  todo,
  setTodos,
  setCurrTodo,
  setEdit,
  setCompletedTodos,
  edit,
}: {
  todo: Todos;
  setTodos: React.Dispatch<React.SetStateAction<[] | Todos[]>>;
  setCurrTodo: React.Dispatch<React.SetStateAction<Todos>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<[] | completedTodos[]>>;
  edit: boolean;
}) {
  function handleDelete() {
    setTodos((prev) => [...prev].filter((el) => el.id !== todo.id));
  }

  function handleEdit() {
    setCurrTodo(todo);
    setEdit(true);
  }

  function handleCheck() {
    setTodos((prev) =>
      [...prev].map((el) =>
        el.id === todo.id ? { ...el, checked: !el.checked } : el
      )
    );
    setCompletedTodos((prev) => [
      { ...todo, finishTime: new Date().toLocaleString() },
      ...prev,
    ]);
    setTimeout(() => {
      setTodos((prev) => [...prev].filter((el) => el.id !== todo.id));
    }, 3000);

  }

  return (
    <li className={`todo`}>
      <div className={`todo-checked ${todo.checked && "todo-checked-show"}`}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="todo-content">
        <FaCheckCircle
          className={`check ${todo.checked && "checked"}`}
          onClick={handleCheck}
          title={todo.checked ? "Mark as undone" : "Mark as done"}
        />
        <div>
          <p>{todo.task}</p>
          <p className="time">{todo.time}</p>
        </div>
      </div>
      <span className="btn-container">
        <button
          className="btn delete-btn"
          onClick={handleDelete}
          title="Delete"
        >
          <FaTrash />
        </button>
        {!todo.checked && (
          <button
            className={`btn edit-btn ${edit && "active"}`}
            onClick={handleEdit}
            title="Edit"
          >
            <FaEdit />
          </button>
        )}
      </span>
    </li>
  );
}
export default Todo;
