import React, { useState, useContext, useEffect } from "react";
import "./UpdateDialog.css";
import DialogContext from "../context/DialogContext";
import ApiContext from "../context/ApiContext";

function UpdateDialog() {
  const { note, openDialog, closeDialog } = useContext(DialogContext);
  const { handleUpdate } = useContext(ApiContext);

  const [updatedNote, setUpdatedNote] = useState({
    title: note.title,
    content: note.content,
  });

  useEffect(() => {
    setUpdatedNote({
      title: note.title,
      content: note.content,
    });
  }, [note]);

  function handleUpdateNote() {
    handleUpdate(note._id, updatedNote);
    closeDialog();
  }

  function handleClose() {
    setUpdatedNote({
      title: note.title,
      content: note.content,
    });
    closeDialog();
  }

  return (
    <>
      {openDialog === "update" && (
        <section className="update-overlay" key={note.content}>
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

            <span className="date">
              {new Date(note.date).toLocaleDateString()}
            </span>

            <section className="buttons">
              <button className="close" onClick={handleClose}>
                Close
              </button>
              <button onClick={handleUpdateNote}>Done</button>
            </section>
          </section>
        </section>
      )}
    </>
  );
}

export default UpdateDialog;
