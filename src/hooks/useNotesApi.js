import { useState, useEffect } from "react";
import axios from "axios";

const useNotesApi = (serverUrl) => {
  const [data, setData] = useState([]);
  const [catchedError, setCatchedError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData(serverUrl);
  }, [serverUrl]);

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data);
      setCatchedError(null);
    } catch (err) {
      setCatchedError(err.message);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const createNote = async (newNote) => {
    try {
      await axios.post(serverUrl, newNote);
      setCatchedError(null);
      fetchData(serverUrl);
    } catch (err) {
      setCatchedError(err.message);
    }
  };

  const updateNote = async (id, updatedNote) => {
    try {
      await axios.put(`${serverUrl}/${id}`, updatedNote);
      setCatchedError(null);
      fetchData(serverUrl);
    } catch (err) {
      setCatchedError(err.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${serverUrl}/${id}`);
      setCatchedError(null);
      fetchData(serverUrl);
    } catch (err) {
      setCatchedError(err.message);
    }
  };

  const resetError = () => {
    setCatchedError(null);
  };

  return {
    data,
    catchedError,
    isLoading,
    resetError,
    createNote,
    updateNote,
    deleteNote,
  };
};

export default useNotesApi;
