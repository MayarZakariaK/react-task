import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {TodoList} from './components/TodoList';
import TodoForm from './components/TodoForm';

const API_URL = 'http://localhost:5000/todos';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching todos.');
      setLoading(false);
    }
  };

  const addTodo = async (title) => {
    try {
      const response = await axios.post(API_URL, { title, completed: false });
      setTodos([...todos, response.data]);
    } catch (error) {
      setError('Error adding todo.');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      setError('Error deleting todo.');
    }
  };

  const editTodo = async (id, editedTitle) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      const response = await axios.put(`${API_URL}/${id}`, {
        ...todoToUpdate,
        title: editedTitle,
      });
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? response.data : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      setError('Error updating todo.');
    }
  };
  const toggleTodo = async (id) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      const response = await axios.put(`${API_URL}/${id}`, {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      });
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? response.data : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      setError('Error updating todo.');
    }
  };

  return (
    <div>
      <h1>My Todo List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleTodo} onEdit={editTodo} />
          <TodoForm onAdd={addTodo} />
        </>
      )}
    </div>
  );
};

export default App;