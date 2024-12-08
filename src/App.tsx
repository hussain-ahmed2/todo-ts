import { useState } from "react";
import Todo from "./components/Todo";
import AddOrEditTodo from "./components/AddOrEditTodo";
import useLoacalStoreage from "./components/useLoacalStoreage";
import { FaTasks } from "react-icons/fa";
import CompletedTasks from "./components/CompletedTasks";

type Todos = {
  id: string;
  task: string;
  time: string;
  checked: boolean;
};

function App() {
  const { todos, setTodos, id, setId, completedTodos, setCompletedTodos } =
    useLoacalStoreage();
  const [currTodo, setCurrTodo] = useState<Todos>({
    id: "",
    task: "",
    time: "",
    checked: false,
  });

  const [edit, setEdit] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  function handleAddTodo() {
    setAdd(true);
  }

  function handleCompleteTask() {
    console.log(completedTodos);
    setShowCompleted((prev) => !prev);
  }

  return (
    <div className="main-container">
      <h1 className="title">Todo App</h1>
      <div className="top-btn-container">
        <button
          className={`btn add-btn ${add && "active"}`}
          onClick={handleAddTodo}
        >
          Add New <FaTasks />
        </button>
        <button
          onClick={handleCompleteTask}
          className={`btn complete-btn ${showCompleted && "active"}`}
        >
          Completed Tasks
          <span className="completed-todo-count">{completedTodos.length}</span>
        </button>
      </div>

      <CompletedTasks
        completedTodos={completedTodos}
        setCompletedTodos={setCompletedTodos}
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
      />

      <ul className="todo-list">
        <li>
          <h2 className="title">Current Tasks</h2>
        </li>
        {todos.length ? (
          todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              setTodos={setTodos}
              setCurrTodo={setCurrTodo}
              setEdit={setEdit}
              setCompletedTodos={setCompletedTodos}
              edit={edit}
            />
          ))
        ) : (
          <li className="not-found">No todo found</li>
        )}
        {todos.length ? (
          <li className="delete-all-btn-container" onClick={() => setTodos([])}>
            <button className="btn delete-btn">Clear All</button>
          </li>
        ) : (
          ""
        )}
      </ul>

      <div className={`add-edit-container ${add || edit ? "z-10" : "-z-10"}`}>
        <AddOrEditTodo
          edit={edit}
          add={add}
          setAdd={setAdd}
          setEdit={setEdit}
          currTodo={currTodo}
          setCurrTodo={setCurrTodo}
          setTodos={setTodos}
          id={id}
          setId={setId}
        />
      </div>
    </div>
  );
}
export default App;
