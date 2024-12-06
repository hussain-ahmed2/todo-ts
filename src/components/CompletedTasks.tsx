import { FaTimes, FaTrash } from "react-icons/fa";

type Todos = {
  id: string;
  task: string;
  time: string;
  checked: boolean;
  finishTime: string;
};

function CompletedTasks({
  completedTodos,
  setCompletedTodos,
  showCompleted,
  setShowCompleted
}: {
  completedTodos: Todos[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
  showCompleted: boolean;
  setShowCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  function handleDelete(id: string) {
    setCompletedTodos((prev) => [...prev].filter((el) => id !== el.id));
  }

  function handleClose() {
    setShowCompleted(false);
  }

  return (
    <div
      className={`completed-task-container ${
        showCompleted ? "completed-task-show" : "completed-task-hide"
      }`}
    >
      <div className="inner-completed-task-container">
        <button className="btn btn-close" onClick={handleClose}>
          <FaTimes />
        </button>
        <h2 className="title">Completed Tasks</h2>
        {completedTodos.length ? (
          completedTodos.map((el) => (
            <div key={el.id} className="completed-todo">
              <div className="todo-container">
                <p>{el.task}</p>
                <div className="time-container">
                  <span>
                    {el.time} - {el.finishTime}
                  </span>
                </div>
              </div>
              <button
                className="btn delete-btn"
                onClick={() => handleDelete(el.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <div className="not-found">No Completed Todo found</div>
        )}
        {completedTodos.length > 0 && (
          <div className="delete-all-btn-container">
            <button
              className="btn delete-btn"
              onClick={() => setCompletedTodos([])}
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default CompletedTasks;
