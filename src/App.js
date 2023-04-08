
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setFilteredTodos(filterTodos());
  }, [todos, filter]);

  function filterTodos() {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }

  function handleNewTodoChange(event) {
    setNewTodo(event.target.value);
  }

  function handleNewTodoSubmit(event) {
    event.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  }

  function handleTodoClick(todoId) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  function handleClearCompleted() {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
  }
  function handleFilterChange(filterName) {
    setFilter(filterName);
  }

  return (
    <div className="todo-app">
      <h1 className='todospink'>TODOS</h1>
      <form className="todo-form" onSubmit={handleNewTodoSubmit}>

        <input
          type="text"
          className="todo-input"
          value={newTodo}
          onChange={handleNewTodoChange}
          placeholder="What needs to be done?"
        />
        <button type="submit" className="todo-btn">
          Add
        </button>
      </form>
      <div className="filter-buttons">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => handleFilterChange('all')}
        >
          All
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => handleFilterChange('active')}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </button>
      </div>
     {filteredTodos.map((todo) => (
        <div
          key={todo.id}
          className={`todo-item ${todo.completed ? 'completed' : ''}`}
          onClick={() => handleTodoClick(todo.id)}
        >
          <h2>{todo.text}</h2>
        </div>
      ))}
      {todos.some((todo) => todo.completed) && (
        <button onClick={handleClearCompleted} className="clear-completed-btn">
          Clear Completed
        </button>
      )}
    </div>
  );
}
 
export default App;