import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({ onSearch, className }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div
      className={`flex items-center bg-[#f6f6f6] p-4 w-full gap-2 text-lg shadow-custom ${className}`}
    >
      <IoSearch className="text-gray-500" />
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        className="bg-transparent outline-none w-full"
      />
    </div>
  );
};

export default SearchBar;
