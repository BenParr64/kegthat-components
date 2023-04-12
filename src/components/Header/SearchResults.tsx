import styles from "./Header.module.css";
import { SearchResultsProps } from "./Header.types";

const SearchResults = ({ searchResults }: SearchResultsProps) => {
  return (
    <div
      className={`fixed h-1/2 inset-x-0 bg-white shadow-md z-20 ${styles.searchContentContainer}`}
    >
      {searchResults}
    </div>
  );
};

export default SearchResults;
