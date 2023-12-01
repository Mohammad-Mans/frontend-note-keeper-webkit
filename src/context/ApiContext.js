import React, { createContext, useState } from "react";
import useNotesApi from "../hooks/useNotesApi";

const ApiContext = createContext({});

export const ApiProvider = ({ api, children }) => {
  const [filteredNotes, setFilteredNotes] = useState(null);

  const {
    fetchedNotes,
    catchedError,
    isLoading,
    resetError,
    updateNote,
    createNote,
    deleteNote,
  } = useNotesApi(api);

  const handleUpdate = (noteId, updatedNote) => {
    updateNote(noteId, updatedNote);
  };

  const handleDelete = (noteId) => {
    deleteNote(noteId);
  };

  const handleCreate = (note) => {
    createNote(note);
  };

  const handleSearch = (search) => {
    const filtered = fetchedNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredNotes(filtered);
  };

  return (
    <ApiContext.Provider
      value={{
        fetchedNotes,
        filteredNotes,
        catchedError,
        isLoading,
        resetError,
        handleCreate,
        handleUpdate,
        handleDelete,
        handleSearch,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
