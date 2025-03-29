import React, { useState } from "react";
import axios from "axios";

function AddTask({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    setError(null);

    console.log("Adding Task:", title); // 🛠 Debug log

    try {
      const response = await axios.post("http://localhost:5000/api/tasks", {
        title,
      });
      console.log("Task Added Successfully:", response.data); // 🛠 Debug log

      setTitle("");
      onTaskAdded(); // Refresh Task List
    } catch (err) {
      setError("Failed to add task. Try again.");
      console.error("Error adding task:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-task-container">
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="add-task-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
          required
        />
        <button
          type="submit"
          className="add-button"
          disabled={!title.trim() || loading}
        >
          {loading ? "Adding..." : "➕ Add"}
        </button>
      </form>
    </div>
  );
}

export default AddTask;
