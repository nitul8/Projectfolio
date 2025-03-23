"use client";
import React, {useState} from "react";
import {IoCheckmarkDoneCircleOutline} from "react-icons/io5";

interface TodoProps {
    id: number;
    text: string;
}

const TodoPage = () => {
    const [TodoList, setTodoList] = useState<TodoProps[]>([]);
    const [input, setInput] = useState<string>("");

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input) return;
        setTodoList([
            ...TodoList,
            {
                id: TodoList.length + 1,
                text: input,
            },
        ]);
        setInput("");
    };

    const deleteTodo = (id: number) => {
        setTodoList([...TodoList.filter((todo) => todo.id !== id)]);
    };

    const Todo: React.FC<TodoProps> = (props) => {
        return (
            <li className="flex gap-2 items-center justify-center">
                <button
                    className="bg-red-500 text-white font-bold rounded-full"
                    onClick={() => deleteTodo(props.id)}
                >
                    <IoCheckmarkDoneCircleOutline className="text-2xl" />
                </button>
                <span className="m-3">{props.text}</span>
            </li>
        );
    };

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
            <form action="" className="flex gap-2 justify-center">
                <input
                    type="text"
                    className="border p-2"
                    name="text"
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    value={input}
                    placeholder="Enter Your Task . . ."
                />
                <button
                    type="submit"
                    className="bg-green-500 p-2"
                    onClick={addTodo}
                >
                    Add
                </button>
            </form>

            <div className="flex flex-col gap-2">
                {TodoList.map((todo) => (
                    <Todo key={todo.id} id={todo.id} text={todo.text} />
                ))}
            </div>
        </div>
    );
};

export default TodoPage;
