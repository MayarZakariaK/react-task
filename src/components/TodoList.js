import React, { useState } from 'react';

export const TodoList = ({ todos, onDelete, onToggle, onEdit }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

const TodoItem = ({ todo, onDelete, onToggle, onEdit }) => {
  const { id, title, completed } = todo;
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleDelete = () => {
    onDelete(id);
  };

  const handleToggle = () => {
    onToggle(id);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedTitle(title);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (editedTitle.trim() === '') return;
    onEdit(id, editedTitle);
    setEditMode(false);
  };

  return (
    <li>
      {!editMode ? (
        <>
          <input
            type="checkbox"
            checked={completed}
            onChange={handleToggle}
          />
          <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
            {title}
          </span>
          <span><button onClick={handleEdit}>Edit</button></span>
          <span><button onClick={handleDelete}>Delete</button></span>
        </>
      ) : (
        <form onSubmit={handleSubmitEdit}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button type="submit">Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </form>
      )}
    </li>
  );
};

export default TodoItem;