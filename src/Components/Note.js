import React, { useContext } from "react";
import "./Note.css";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import DialogContext from "../context/DialogContext";

function Note({ note }) {
  const { openUpdateDialog, openDeleteDialog } = useContext(DialogContext);

  const handleUpdate = () => {
    openUpdateDialog(note);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    openDeleteDialog(note);
  };

  return (
    <section className="note" onClick={handleUpdate}>
      <span className="pin-icon">
        <PushPinIcon />
      </span>
      <h3 className="title">{note.title}</h3>
      <p className="content">{note.content}</p>
      <span className="date">{new Date(note.date).toLocaleDateString()}</span>
      <span className="trash-icon">
        <DeleteIcon onClick={handleDelete} />
      </span>
    </section>
  );
}

export default Note;
