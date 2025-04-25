import React, { useState } from "react";

export default function TicketForm({ dispatch }) {
  const [title, setTitle] = useState(""); // default value is an empty string
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("1");

  const priorityLabels = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority("1");
  };

  // Get called when submit typed button is clicked
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the page from reloading

    const ticketData = {
      id: new Date().toISOString(), // Use current date as a unique ID
      title,
      description,
      priority,
    };

    dispatch({
      type: "ADD_TICKET",
      payload: ticketData, // payload is the data we want to add to the state
    });

    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          className="form-input"
          onChange={(event) => setTitle(event.target.value)}
        ></input>
      </div>
      <div>
        <label>Description</label>
        <textarea
          type="text"
          value={description}
          className="form-input"
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
      </div>
      <fieldset className="priority-fieldset">
        <legend>Priority</legend>
        {Object.entries(priorityLabels).map(([value, label]) => (
          <label key={value} className="priority-label">
            <input
              type="radio"
              value={value}
              checked={priority === value}
              className="priority-input"
              onChange={(event) => setPriority(event.target.value)}
            ></input>
            {label}
          </label>
        ))}
      </fieldset>
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
}
