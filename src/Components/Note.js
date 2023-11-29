import React, { useState } from "react";
import "./Note.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "./ConfirmationDialog";
import UpdateDialog from "./UpdateDialog";
import PushPinIcon from "@mui/icons-material/PushPin";

function Note({ title, content, date, onDelete, onUpdate }) {
  const [openDialog, setOpenDialog] = useState(null);

  function handleDelete(e) {
    e.stopPropagation();
    setOpenDialog("delete");
  }

  function handleUpdateClick() {
    setOpenDialog("update");
  }

  function handleCloseDialog() {
    setOpenDialog(null);
  }

  function handleConfirmDelete() {
    setOpenDialog(null);
    onDelete();
  }

  function handleUpdateNote(updatedNote) {
    onUpdate(updatedNote);
    setOpenDialog(null);
  }

  if (openDialog === "update") {
    return (
      <section>
        <UpdateDialog
          isOpen={true}
          onClose={handleCloseDialog}
          onUpdate={handleUpdateNote}
          note={{ title, content, date }}
        />
      </section>
    );
  }

  return (
    <>
      {openDialog === "delete" && (
        <ConfirmationDialog
          onClose={handleCloseDialog}
          onConfirm={handleConfirmDelete}
        />
      )}

      <section className="note" onClick={handleUpdateClick}>
        <span className="pin-icon">
          <PushPinIcon />
        </span>
        <h3 className="title">{title}</h3>
        <p className="content">{content}</p>
        <span className="date">{new Date(date).toLocaleDateString()}</span>
        <span className="trash-icon">
          <DeleteIcon onClick={handleDelete} />
        </span>
      </section>
    </>
  );
}

export default Note;
