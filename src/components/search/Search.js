import "./search.scss";
import { useRef, useEffect } from "react";

const Search = ({
  onSubmitSearch,
  searchText,
  handleChangeSearch,
  disableSubmit,
}) => {
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={onSubmitSearch}>
      <div className="searchContainer">
        <div>
          <input
            className="searchInput"
            type="text"
            title="searchInput"
            placeholder="Search github users"
            ref={inputRef}
            value={searchText}
            onChange={handleChangeSearch}
          />
        </div>
        <div className="submitButtonFlexItem">
          <button
            className="primaryButton"
            title="submitButton"
            type="submit"
            disabled={disableSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
