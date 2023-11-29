import React from "react";
import "./Header.css";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";

function Header({ onSearch }) {
  return (
    <header className="main-header">
      <DescriptionIcon />
      <h1>My <span className="special">Note</span> Keeper</h1>

      <label className="search-bar">
        <SearchIcon />
        <input
          className="search-input"
          type="text"
          onChange={(e) => onSearch(e.target.value)}
        />
      </label>
    </header>
  );
}

export default Header;
