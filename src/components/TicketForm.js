import { clear } from "@testing-library/user-event/dist/clear";
import React, { useState, useEffect } from "react";

export default function TicketForm({ dispatch, editingTicket }) {
  const [title, setTitle] = useState(""); // default value is an empty string
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("1");

  useEffect(() => {
    if (editingTicket) {
      setTitle(editingTicket.title); // Set the title to the one in the editing ticket
      setDescription(editingTicket.description); // Set the description to the one in the editing ticket
      setPriority(editingTicket.priority); // Set the priority to the one in the editing ticket
    } else {
      clearForm(); // Clear the form when editingTicket is null
    }
  }, [editingTicket]); // useEffect is called when the component is mounted and when editingTicket changes

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
      id: editingTicket ? editingTicket.id : new Date().toISOString(), // Use current date as a unique ID if we are not editing a ticket
      title,
      description,
      priority,
    };

    dispatch({
      type: editingTicket ? "UPDATE_TICKET" : "ADD_TICKET",
      payload: ticketData, // payload is the data we want to add to the state
    });

    clearForm();
  };

  const handleCancelEdit = () => {
    dispatch({ type: "CLEAR_EDITING_TICKET" }); // Clear the editing ticket
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
      {editingTicket && (
        <button type="button" className="button" onClick={handleCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}
