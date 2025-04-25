import React from "react";
import "./App.css";
import Header from "./Components/Header";
import Main from "./Components/Main";
import UpdateDialog from "./Components/UpdateDialog";
import ConfirmationDialog from "./Components/ConfirmationDialog";

import { DialogProvider } from "./context/DialogContext";
import { ApiProvider } from "./context/ApiContext";

function App() {
  return (
    <div className="App">
      <DialogProvider>
        <ApiProvider api={process.env.SERVER_URL + "/notes"}>
          <Header />
          <Main />

          <UpdateDialog />
          <ConfirmationDialog />
        </ApiProvider>
      </DialogProvider>
    </div>
  );
}

export default App;
