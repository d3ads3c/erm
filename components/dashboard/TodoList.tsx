"use client"
import React, { useState } from "react";

export default function TodoList() {
    const [todos, setTodos] = useState<string[]>([]);
    const [input, setInput] = useState("");

    const handleAdd = () => {
        if (input.trim()) {
            setTodos([...todos, input.trim()]);
            setInput("");
        }
    };

    const handleRemove = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <div className="w-full p-3 border rounded-xl">
            <h2>کارهای من</h2>
            <div className="flex items-center gap-3">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"

                />
                <button onClick={handleAdd}>Add</button>
            </div>
            <ul className="mt-5">
                {todos.map((todo, idx) => (
                    <li key={idx} className="bg-gray-100 rounded-xl p-3">
                        {todo}
                        <button onClick={() => handleRemove(idx)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}