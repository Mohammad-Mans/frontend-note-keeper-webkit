import { useEffect, useState } from "react";
import "./Main.css";
import AddNotesField from "./AddNotesField";
import Notes from "./Notes";
import api from "../api/notes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.error("An error happened !", {
        position: toast.POSITION.TOP_LEFT,
      });
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
      await api.post("/note", newNote);
      toast.success("Note added !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchData();
    } catch (error) {
      toast.error("An error happened !", {
        position: toast.POSITION.TOP_LEFT,
      });
      console.error("Error:", error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await api.delete(`/notes/${noteId}`);
      toast.success("Note removed !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchData();
    } catch (error) {
      toast.error("An error happened !", {
        position: toast.POSITION.TOP_LEFT,
      });
      console.error("Error:", error);
    }
  };

  const handleUpdateNote = async (noteId, updatedNote) => {
    try {
      await api.put(`/notes/${noteId}`, updatedNote);
      toast.success("Note updated !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchData();
    } catch (error) {
      toast.error("An error happened !", {
        position: toast.POSITION.TOP_LEFT,
      });
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
      <ToastContainer />
    </main>
  );
}

export default Main;
