import React, { createContext } from "react";
import useNotesApi from "../hooks/useNotesApi";

const ApiContext = createContext({});

export const ApiProvider = ({ api, children }) => {
  const {
    data,
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

  const handleCreate = (note) =>{
    createNote(note);
  }

  return (
    <ApiContext.Provider
      value={{
        data,
        catchedError,
        isLoading,
        resetError,
        handleCreate,
        handleUpdate,
        handleDelete,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
