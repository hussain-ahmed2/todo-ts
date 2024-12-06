import { useEffect, useState } from "react";

type Todos = {
    id: string;
    task: string;
    time: string;
    checked: boolean;
}

type completedTodos = {
    id: string;
    task: string;
    time: string;
    checked: boolean;
    finishTime: string;
}

function useLoacalStoreage() {
    const [todos, setTodos] = useState<Todos[]>(JSON.parse(localStorage.getItem('todos') || '[]'));
    const [id, setId] = useState<number>(JSON.parse(localStorage.getItem('id') || '1'));
    const [completedTodos, setCompletedTodos] = useState<completedTodos[]>(
      JSON.parse(localStorage.getItem("completedTodos") || "[]")
    );

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        localStorage.setItem('id', id.toString());
    }, [id]);

    useEffect(() => {
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    }, [completedTodos]);
    
      return { todos, setTodos, id, setId, completedTodos, setCompletedTodos };
}
export default useLoacalStoreage