import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TodoList from "./components/TodoList";
import AddTask from "./components/AddTask";
import "./App.css";
import { FaHome, FaPlus } from "react-icons/fa";

function App() {
  useEffect(() => {
    document.title = "Todo App"; // Change tab title
  }, []);

  return (
    <Router>
      <div className="app-container">
        {/* 🔹 Navigation Bar */}
        <nav className="navbar">
          <Link to="/">
            <FaHome className="nav-icon" /> Home
          </Link>
          <Link to="/add-task">
            <FaPlus className="nav-icon" /> Add Task
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route
            path="/add-task"
            element={<AddTask onTaskAdded={() => {}} />}
          />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
