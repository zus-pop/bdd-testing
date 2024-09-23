import { useState } from "react";
import "./App.css";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    const addTodo = () => {
        if (newTodo.trim() !== "") {
            setTodos([
                ...todos,
                { id: Date.now(), text: newTodo.trim(), completed: false },
            ]);
            setNewTodo("");
        }
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const toggleComplete = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const startEditing = (id: number) => {
        setEditingId(id);
        const todoToEdit = todos.find((todo) => todo.id === id);
        if (todoToEdit) {
            setNewTodo(todoToEdit.text);
        }
    };

    const updateTodo = () => {
        if (editingId !== null) {
            setTodos(
                todos.map((todo) =>
                    todo.id === editingId ? { ...todo, text: newTodo } : todo
                )
            );
            setEditingId(null);
            setNewTodo("");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-2xl font-semibold text-center mb-6">
                            Todo List
                        </h1>
                        <div className="flex items-center border-b border-teal-500 py-2">
                            <input
                                id="new-todo"
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="Enter a new todo item"
                                aria-label="Enter a new todo item"
                            />
                            <button
                                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded transition duration-150 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50"
                                onClick={
                                    editingId !== null ? updateTodo : addTodo
                                }
                            >
                                {editingId !== null ? "Update" : "Add"} Todo
                            </button>
                        </div>
                        <ul className="mt-6">
                            {todos.map((todo) => (
                                <li
                                    key={todo.id}
                                    className={`flex items-center bg-gray-100 rounded-lg p-2 mb-2 shadow ${
                                        todo.completed ? "line-through" : ""
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleComplete(todo.id)}
                                        className="mr-2"
                                    />
                                    <span className="flex-grow">
                                        {todo.text}
                                    </span>
                                    <button
                                        onClick={() => startEditing(todo.id)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2 transition duration-150 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition duration-150 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
