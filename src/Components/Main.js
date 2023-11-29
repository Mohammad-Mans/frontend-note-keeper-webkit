import { useEffect, useState } from "react";
import "./Main.css";
import AddNotesField from "./AddNotesField";
import Notes from "./Notes";
import api from "../api/notes";

function Main({ filter }) {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

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

  const fetchData = async () => {
    try {
      const response = await api.get("/notes");
      setNotes(response.data);
    } catch (error) {
      if (error.response) {
        //we got a response from the backend but it is not in the 200 range
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        //all the other errors (no response / 404 ...)
        console.error(`Error: ${error.message}`);
      }
    }
  };

  const handleAddNote = async (newNote) => {
    try {
      await api.post("/notes", newNote);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await api.delete(`/notes/${noteId}`);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateNote = async (noteId, updatedNote) => {
    try {
      await api.put(`/notes/${noteId}`, updatedNote);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="main">
      <AddNotesField onAddNote={handleAddNote} />
      <Notes
        notes={filteredNotes ? filteredNotes : notes}
        onDeleteNote={handleDeleteNote}
        onUpdateNote={handleUpdateNote}
      />
    </main>
  );
}

export default Main;
