import "./search.scss";

const Search = ({
  onSubmitSearch,
  searchText,
  handleChangeSearch,
  disableSubmit,
}) => {
  return (
    <form onSubmit={onSubmitSearch}>
      <div className="searchContainer">
        <div>
          <input
            className="searchInput"
            type="text"
            title="searchInput"
            placeholder="Search github users"
            value={searchText}
            onChange={handleChangeSearch}
          />
        </div>
        <div className="submitButtonFlexItem">
          <button
            className="submitButton"
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
