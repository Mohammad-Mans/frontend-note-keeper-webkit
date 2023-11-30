import { useEffect, useState } from "react";
import "./Main.css";
import AddNotesField from "./AddNotesField";
import Notes from "./Notes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useNotesApi from "../hooks/useNotesApi";
import { CircularProgress } from "@mui/material";

function Main({ filter }) {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState(null);

  const {
    data,
    catchedError,
    isLoading,
    resetError,
    createNote,
    updateNote,
    deleteNote,
  } = useNotesApi(process.env.REACT_APP_SERVER_URL + "/notes");

  useEffect(() => {
    setNotes(data);
  }, [data]);

  useEffect(() => {
    catchedError &&
      toast.error(catchedError, {
        position: toast.POSITION.TOP_LEFT,
      });
    resetError();
  }, [catchedError, resetError]);

  useEffect(() => {
    if (filter.length > 0) {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(filter.toLowerCase()) ||
          note.content.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(null);
    }
  }, [filter, notes]);

  function handleAddNote(newNote) {
    createNote(newNote);
  }

  function handleDeleteNote(noteId) {
    deleteNote(noteId);
  }

  function handleUpdateNote(noteId, updatedNote) {
    updateNote(noteId, updatedNote);
  }

  return (
    <main className={`main ${isLoading ? "loading" : ""}`}>
      <AddNotesField onAddNote={handleAddNote} />
      {isLoading && <CircularProgress className="loading" />}

      {!isLoading && !catchedError && (
        <Notes
          notes={filteredNotes ? filteredNotes : notes}
          onDeleteNote={handleDeleteNote}
          onUpdateNote={handleUpdateNote}
        />
      )}

      <ToastContainer />
    </main>
  );
}

export default Main;
