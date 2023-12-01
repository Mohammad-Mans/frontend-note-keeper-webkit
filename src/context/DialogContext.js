import React, { createContext, useState } from "react";
const DialogContext = createContext({});

export const DialogProvider = ({ children }) => {
  const [openDialog, setOpenDialog] = useState(null);
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: new Date(),
  });

  const openUpdateDialog = (note) => {
    setOpenDialog("update");
    setNote(note);
  };

  const openDeleteDialog = (note) => {
    console.log("delete is here");
    setOpenDialog("delete");
    setNote(note);
  };

  const closeDialog = () => {
    setOpenDialog(null);
  };

  return (
    <DialogContext.Provider
      value={{
        openDialog,
        note,
        openUpdateDialog,
        openDeleteDialog,
        closeDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export default DialogContext;
