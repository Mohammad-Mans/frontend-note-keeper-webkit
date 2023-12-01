import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Main from "./Components/Main";
import UpdateDialog from "./Components/UpdateDialog";
import ConfirmationDialog from "./Components/ConfirmationDialog";

import { DialogProvider } from "./context/DialogContext";
import { ApiProvider } from "./context/ApiContext";

function App() {
  const [filter, setFilter] = useState([]);

  const handleSearch = (searchTerm) => {
    setFilter(searchTerm);
  };

  return (
    <div className="App">
      <DialogProvider>
        <ApiProvider api={process.env.REACT_APP_SERVER_URL + "/notes"}>
          <Header onSearch={handleSearch} />
          <Main filter={filter} />

          <UpdateDialog />
          <ConfirmationDialog />
        </ApiProvider>
      </DialogProvider>
    </div>
  );
}

export default App;
