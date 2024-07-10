// src/App.jsx
import React, { useState } from 'react';

function Task({ task, onDelete, onToggleCompletion }) {
  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <button onClick={() => onDelete(task.id)}>Delete</button>
      <button onClick={() => onToggleCompletion(task.id)}>
        {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
    </div>
  );
}

function ToDoList() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const taskList = document.getElementById('taskList');

  const addTask = (event) => {
    event.preventDefault();

    const title = document.getElementById('titleInput').value;
    const description = document.getElementById('descriptionInput').value;
    const dueDate = document.getElementById('dueDateInput').value;

    if (!title) {
      alert('Please enter a task title');
      return;
    }

    const id = Date.now().toString();
    const newTask = { id, title, description, dueDate, completed: false };

    setTasks(prevTasks => [...prevTasks, newTask]);
    saveTasks([...tasks, newTask]);

    event.target.reset();
  };

  const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>

      <form onSubmit={addTask}>
        <input type="text" id="titleInput" placeholder="Enter task title" required />
        <textarea id="descriptionInput" placeholder="Enter task description"></textarea>
        <input type="date" id="dueDateInput" />
        <button type="submit">Add Task</button>
      </form>

      <div id="taskList">
        {tasks.map(task => (
          <Task key={task.id} task={task} onDelete={deleteTask} onToggleCompletion={toggleCompletion} />
        ))}
      </div>
    </div>
  );
}

export default ToDoList;
