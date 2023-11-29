import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Main from "./Components/Main";

function App() {
  const [filter, setFilter] = useState([]);

  const handleSearch = (searchTerm) => {
    setFilter(searchTerm);
  };

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      <Main filter={filter} />
    </div>
  );
}

export default App;
