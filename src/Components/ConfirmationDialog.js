import React, { useContext } from "react";
import "./ConfirmationDialog.css";
import DialogContext from "../context/DialogContext";
import ApiContext from "../context/ApiContext";

function ConfirmationDialog() {
  const { note, openDialog, closeDialog } = useContext(DialogContext);
  const { handleDelete } = useContext(ApiContext);

  function handleDeleteNote() {
    handleDelete(note._id);
    closeDialog();
  }

  return (
    <>
      {openDialog === "delete" && (
        <div className="confirmation-overlay">
          <div className="confirmation-dialog">
            <h2>Note Deletion</h2>
            <p>Are you certain you wish to delete this note?</p>
            <div className="buttons">
              <button onClick={() => closeDialog()}>Close</button>
              <button className="delete" onClick={handleDeleteNote}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmationDialog;
