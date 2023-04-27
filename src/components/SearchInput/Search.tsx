import React, { useRef } from "react";
import styles from "./Search.module.css";
import { SearchProps } from "../Header/Header.types";
import {SearchIcon, ClearIcon} from "../../Icons";

const Search = ({
  searchFocused,
  setSearchFocused,
  searchQuery,
  setSearchQuery,
}: SearchProps) => {
  const searchIconRef = useRef<HTMLButtonElement | null>(null);
  const clearIconRef = useRef<HTMLButtonElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      setSearchFocused(true);
    }
    setSearchQuery(value);
  };

  const handleSearchIconClick = () => {
    setSearchFocused(!searchFocused);
  };

  const handleClearIconClick = () => {
    setSearchQuery("");
  };

  const handleInputMouseEnter = () => {
    if (searchIconRef.current) {
      searchIconRef.current.classList.add(styles.iconHover);
    }
    if (clearIconRef.current) {
      clearIconRef.current.classList.add(styles.iconHover);
    }
  };

  const handleInputMouseLeave = () => {
    if (searchIconRef.current) {
      searchIconRef.current.classList.remove(styles.iconHover);
    }
    if (clearIconRef.current) {
      clearIconRef.current.classList.remove(styles.iconHover);
    }
  };

  const hoverClasses = `bg-kgrey-1 hover:bg-kgrey-hover hover:placeholder-kgrey-hover-1 rounded-full`;

  return (
    <div className={` relative ${searchFocused ? styles.searchSlideIn : "hidden lg:block"} `}>
      <input
        className={`w-72 pl-14 pr-4 py-3 focus:outline-none ${hoverClasses}`}
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search"
        onMouseEnter={handleInputMouseEnter}
        onMouseLeave={handleInputMouseLeave}
      />
      <button
        ref={searchIconRef}
        onClick={handleSearchIconClick}
        className={`text-gray-600 absolute left-0 top-0 rounded-full px-3 py-3 ${hoverClasses} w-12 h-12`}
      >
        <SearchIcon />
      </button>
      {searchQuery && (
        <button
          ref={clearIconRef}
          onClick={handleClearIconClick}
          className={`text-gray-500 absolute right-0 top-0 rounded-full px-3 py-3 ${hoverClasses} w-12 h-12`}
        >
          <ClearIcon />
        </button>
      )}
    </div>
  );
};

export default Search;
