
const Search = ({ onSubmitSearch, searchText, handleChangeSearch }) => {

  return (
    <form onSubmit={onSubmitSearch}>
      <input
        className="searchInput"
        type="text"
        title="searchInput"
        placeholder="Search"
        value={searchText}
        onChange={handleChangeSearch}
      />
      <button
        className="submitButton"
        title="submitButton"
        type="submit"
        disabled={!searchText}
      >
        Submit
      </button>
    </form>
  );
};

export default Search;
