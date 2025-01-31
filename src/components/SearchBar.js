// SearchBar.js
import React from "react";
import "../components/SearchBar.css"

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search blogs..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
      />
    </div>
  );
};

export default SearchBar;
