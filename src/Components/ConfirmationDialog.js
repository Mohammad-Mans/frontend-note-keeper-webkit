import React from "react";
import "./ConfirmationDialog.css";

function ConfirmationDialog({ onClose, onConfirm }) {
  return (
    <div className="confirmation-overlay">
      <div className="confirmation-dialog">
        <h2>Note Deletion</h2>
        <p>Are you certain you wish to delete this note?</p>
        <div className="buttons">
          <button onClick={onClose}>Close</button>
          <button className="delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
