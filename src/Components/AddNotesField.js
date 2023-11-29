import React, { useState } from "react";
import "./AddNotesField.css";

function AddNotesField({ onAddNote }) {
  const [expanded, setExpanded] = useState(false);
  const [note, setNote] = useState({ title: "", content: "" });

  const handleInputClick = () => {
    setExpanded(true);
  };

  function handleAdd (){
    onAddNote(note)
    setExpanded(false);
    setNote({ title: "", content: "" });
  };

  const handleCancel = () => {
    setExpanded(false);
    setNote({ title: "", content: "" });
  };

  return (
    <section className="add-notes-field">
      {expanded ? (
        <>
          <input
            type="text"
            className="note-title input"
            placeholder="Title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
          <input
            className="note-content input"
            placeholder="Take a note..."
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
            autoFocus
          />

          <div className="buttons">
            <button className="add" onClick={handleAdd}>
              Add
            </button>
            <button className="close" onClick={handleCancel}>
              close
            </button>
          </div>
        </>
      ) : (
        <input
          key={note.title}
          type="text"
          className="note-content input"
          placeholder="Take a note..."
          onClick={handleInputClick}
        />
      )}
    </section>
  );
}

export default AddNotesField;
