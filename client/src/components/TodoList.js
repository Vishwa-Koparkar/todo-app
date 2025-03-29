import React, { useEffect, useState } from "react";
import axios from "axios";
//import AddTask from "./AddTask";
import "./TodoList.css"; // ✅ Import CSS file

function TodoList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        completed: !completed,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="todo-container">
      <h2>✅ My Tasks</h2>

      {/* Add Task Form (Removed from main section, should be on Add Task Page) */}
      {/* <AddTask onTaskAdded={fetchTasks} /> */}

      {/* 🔹 Pending Tasks Section */}
      {tasks.some((task) => !task.completed) && (
        <div className="task-section">
          <h3>⏳ Pending Tasks</h3>
          <ul>
            {tasks
              .filter((task) => !task.completed)
              .map((task) => (
                <li key={task._id} className="task-item">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() =>
                      handleToggleComplete(task._id, task.completed)
                    }
                  />
                  <span>{task.title}</span>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(task._id)}
                  >
                    ❌
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* 🔹 Completed Tasks Section */}
      {tasks.some((task) => task.completed) && (
        <div className="task-section completed-section">
          <h3>✅ Completed Tasks</h3>
          <ul>
            {tasks
              .filter((task) => task.completed)
              .map((task) => (
                <li key={task._id} className="task-item completed">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() =>
                      handleToggleComplete(task._id, task.completed)
                    }
                  />
                  <span className="completed-text">{task.title}</span>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(task._id)}
                  >
                    ❌
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Show message if no tasks available */}
      {tasks.length === 0 && (
        <p className="no-tasks">No tasks available. Add some!</p>
      )}
    </div>
  );
}

export default TodoList;
