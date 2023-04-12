import React from "react";
import styles from "./Header.module.css";
import { SearchProps } from "./Header.types";

const Search = ({
  searchFocused,
  setSearchFocused,
  searchQuery,
  setSearchQuery,
}: SearchProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      setSearchFocused(true);
    }
    setSearchQuery(value);
  };

  return (
    <div
      className={` relative ${styles.searchContainer} ${
        searchFocused ? styles.searchSlideIn : ""
      }`}
    >
      <input
        className={`w-72 pl-10 pr-4 py-3 rounded-full border border-gray-300 ${
          searchFocused
            ? "shadow-lg ring-2 ring-blue-500"
            : "focus:outline-none focus:ring-2 focus:ring-blue-500"
        }`}
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search Kegthat.com"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-500 absolute left-3 top-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
  );
};

export default Search;
