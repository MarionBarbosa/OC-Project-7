import React from "react";
import { FaSearch } from "react-icons/fa";
export default function SearchBar() {
  return (
    <div>
      <input type="search" placeholder="Rechercher" />
      <button>
        <FaSearch />
      </button>
    </div>
  );
}
