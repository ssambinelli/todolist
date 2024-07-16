import React, { useState } from "react";
import axios from "axios";
import './TodoForm.css';

export default function TodoForm({ todos, setTodos }) {
    const [name, setName] = useState("");

    const handleChange = e => {
        setName(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!name) {
            alert("Please provide a valid Task");
            return;
        }

        axios.post("/api/todos/", {
            name: name
        }).then((res) => {
            setName("");
            const { data } = res;
            setTodos([
                ...todos,
                data
            ])
        })
    }

    return <form onSubmit={handleSubmit}>
        <input placeholder="Add New Task"
            onChange={handleChange}
            value={name}
        />
        <button type="submit">
            Add
        </button>
    </form>
}