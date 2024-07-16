import React, { useState } from "react";
import axios from "axios";
import './TodoForm.css';
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdEdit, MdDelete } from "react-icons/md";

export default function TodoList({ todos = [], setTodos }) {
    const [show, setShow] = useState(false);
    const [record, setRecord] = useState(null);

    const handleClose = () => {
        setShow(false);
    }

    const handleDelete = (id) => {
        axios.delete(`/api/todos/${id}/`)
            .then(() => {
                const newTodos = todos.filter(t => {
                    return t.id !== id
                });
                setTodos(newTodos);
            }).catch(() => {
                alert("Something went wrong trying to delete the task");
            })
    }

    const handleUpdate = async (id, value) => {
        return axios.patch(`/api/todos/${id}/`, value)
            .then((res) => {
                const { data } = res;
                const newTodos = todos.map(t => {
                    if (t.id === id) {
                        return data;
                    }
                    return t;
                })
                setTodos(newTodos);
            }).catch(() => {
                alert("Something went wrong trying to update the task");
            })
    }
    const renderListItem = (t) => {
        return <div>
            <ul>
                <li key={t.id}>
                    <div class="icons">
                        <span style={{
                            marginRight: "12px", cursor: "pointer"
                        }} onClick={() => {
                            handleUpdate(t.id, {
                                completed: !t.completed
                            })
                        }}>
                            {t.completed === true ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                        </span>
                        <span>
                            {t.name}
                        </span>
                        <MdEdit style={{
                            cursor: "pointer",
                            marginRight: "12px"
                        }} onClick={() => {
                            setRecord(t);
                            setShow(true);
                        }} />
                        <MdDelete style={{
                            cursor: "pointer"
                        }} onClick={() => {
                            handleDelete(t.id);
                        }} />
                    </div>
                </li>
            </ul>
        </div>
    }
    const handleChange = (e) => {
        setRecord({
            ...record,
            name: e.target.value
        })
    }

    const handleSaveChanges = async () => {
        await handleUpdate(record.id, { name: record.name });
        handleClose();
    }

    const completedTodos = todos.filter(t => t.completed === true);
    const incompleteTodos = todos.filter(t => t.completed === false);

    // Tasks 
    return <div>
        <div>
            <h2>
                Incomplete Tasks ({incompleteTodos.length})
            </h2>
        </div>
        <li>
            {incompleteTodos.map(renderListItem)}
        </li>
        <div>
            <h2>
                Completed Todos ({completedTodos.length})

            </h2>
        </div>
        <li>
            {completedTodos.map(renderListItem)}
        </li>

        {/* Edit  */}
        <Modal show={show} onHide={handleClose} >
            <Modal.Header >
                <h3>Edit Task</h3>
            </Modal.Header>
            <Modal.Body class='edit'>
                <FormControl value={record ? record.name : ""}
                    onChange={handleChange}
                />
            </Modal.Body>
            <Modal.Footer class="list">
                <button onClick={handleClose}>
                    Close
                </button>
                <button onClick={handleSaveChanges}>
                    Save Changes
                </button>
            </Modal.Footer>
        </Modal>
    </div>
}