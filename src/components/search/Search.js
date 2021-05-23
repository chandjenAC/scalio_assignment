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
            data-testid="searchInput"
            placeholder="Search github users"
            ref={inputRef}
            value={searchText}
            onChange={handleChangeSearch}
          />
        </div>
        <div className="submitButtonFlexItem">
          <button
            className="primaryButton"
            data-testid="submit-btn"
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
