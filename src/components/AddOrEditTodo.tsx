import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

type Todos = {
  id: string;
  task: string;
  time: string;
  checked: boolean;
};

function AddOrEditTodo({
  edit,
  add,
  setAdd,
  setEdit,
  currTodo,
  setCurrTodo,
  setTodos,
  id,
  setId,
}: {
  edit: boolean;
  add: boolean;
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  currTodo: Todos;
  setCurrTodo: React.Dispatch<React.SetStateAction<Todos>>;
  setTodos: React.Dispatch<React.SetStateAction<[] | Todos[]>>;
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (add || edit) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    }
  }, [add, edit]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (edit) {
      setTodos((prev) =>
        [...prev].map((todo) =>
          todo.id === currTodo.id
            ? { ...currTodo, time: new Date().toLocaleString() }
            : todo
        )
      );
      setCurrTodo({ id: "", task: "", time: "", checked: false });
      setEdit(false);
    } else if (add) {
      setTodos((prev) => [
        ...prev,
        {
          ...currTodo,
          id: `task-${id + 1}`,
          time: new Date().toLocaleString(),
        },
      ]);
      setId((prev) => prev + 1);
      setCurrTodo({ id: "", task: "", time: "", checked: false });
      setAdd(false);
    }
    setTodos((prev) =>
      [...prev].sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      )
    );
  }

  function handleColse() {
    setCurrTodo({ id: "", task: "", time: "", checked: false });
    setAdd(false);
    setEdit(false);
  }

  return (
    <div className={`inner-container ${(add || edit) ? "show" : "hide"}`}>
      <FaTimes className="btn-close" onClick={handleColse} />
      <h3 className="header">{(edit && "edit todo") || (add && "add todo")}</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          rows={3}
          placeholder="type here..."
          id="todo"
          className="input"
          name="todo"
          value={currTodo.task}
          onChange={(event) =>
            setCurrTodo((prev) => ({ ...prev, task: event.target.value }))
          }
        ></textarea>
        <button className="btn btn-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
export default AddOrEditTodo;
