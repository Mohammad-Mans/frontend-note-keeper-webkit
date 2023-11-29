import React, { useState } from "react";
import "./UpdateDialog.css";

function UpdateDialog({ onClose, onUpdate, note }) {
  const [updatedNote, setUpdatedNote] = useState({
    title: note.title,
    content: note.content,
  });

  function handleUpdate() {
    onUpdate(updatedNote);
    onClose();
  }

  return (
    <section className="update-overlay">
      <section className="update-dialog">
        <input
          type="text"
          className="title"
          value={updatedNote.title}
          onChange={(e) =>
            setUpdatedNote({ ...updatedNote, title: e.target.value })
          }
        />

        <textarea
          className="content"
          rows={3}
          value={updatedNote.content}
          onChange={(e) =>
            setUpdatedNote({ ...updatedNote, content: e.target.value })
          }
        />

        <span className="date">{new Date(note.date).toLocaleDateString()}</span>

        <section className="buttons">
          <button className="close" onClick={onClose}>
            Close
          </button>
          <button onClick={handleUpdate}>Done</button>
        </section>
      </section>
    </section>
  );
}

export default UpdateDialog;
