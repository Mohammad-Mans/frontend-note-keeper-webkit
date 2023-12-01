import { useState, useEffect } from "react";
import axios from "axios";

const useNotesApi = (serverUrl) => {
  const [fetchedNotes, setFetchedNotes] = useState([]);
  const [catchedError, setCatchedError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNotes(serverUrl);
  }, [serverUrl]);

  const fetchNotes = async (url) => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setFetchedNotes(response.data);
      setCatchedError(null);
    } catch (err) {
      setCatchedError(err.message);
      setFetchedNotes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const createNote = async (newNote) => {
    try {
      await axios.post(serverUrl, newNote);
      setCatchedError(null);
      fetchNotes(serverUrl);
    } catch (err) {
      setCatchedError(err.message);
    }
  };

  const updateNote = async (id, updatedNote) => {
    try {
      await axios.put(`${serverUrl}/${id}`, updatedNote);
      setCatchedError(null);
      fetchNotes(serverUrl);
    } catch (err) {
      setCatchedError(err.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${serverUrl}/${id}`);
      setCatchedError(null);
      fetchNotes(serverUrl);
    } catch (err) {
      setCatchedError(err.message);
    }
  };

  const resetError = () => {
    setCatchedError(null);
  };

  return {
    fetchedNotes,
    catchedError,
    isLoading,
    resetError,
    createNote,
    updateNote,
    deleteNote,
  };
};

export default useNotesApi;
