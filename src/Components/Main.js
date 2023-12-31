import { useContext, useEffect, useState } from "react";
import "./Main.css";
import AddNotesField from "./AddNotesField";
import Notes from "./Notes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CircularProgress } from "@mui/material";
import ApiContext from "../context/ApiContext";

function Main() {
  const [notes, setNotes] = useState([]);
  const { fetchedNotes, filteredNotes, catchedError, resetError, isLoading } =
    useContext(ApiContext);

  useEffect(() => {
    setNotes(fetchedNotes);
  }, [fetchedNotes]);

  useEffect(() => {
    catchedError &&
      toast.error(catchedError, {
        position: toast.POSITION.TOP_LEFT,
      });
    resetError();
  }, [catchedError, resetError]);

  return (
    <main className={`main ${isLoading ? "loading" : ""}`}>
      <AddNotesField />
      {isLoading && <CircularProgress className="loading" />}

      {!isLoading && !catchedError && (
        <Notes notes={filteredNotes ? filteredNotes : notes} />
      )}

      <ToastContainer />
    </main>
  );
}

export default Main;
