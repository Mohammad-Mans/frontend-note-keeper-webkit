import React, { useContext } from "react";
import "./Header.css";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import ApiContext from "../context/ApiContext";

function Header() {
  const { handleSearch } = useContext(ApiContext);

  return (
    <header className="main-header">
      <DescriptionIcon />
      <h1>
        My <span className="special">Note</span> Keeper
      </h1>

      <label className="search-bar">
        <SearchIcon />
        <input
          className="search-input"
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </label>
    </header>
  );
}

export default Header;
