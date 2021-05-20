import axios from "axios";
import { useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import Results from "../../components/results/Results";
import Search from "../../components/search/Search";
import "./parentContainer.scss"

const ParentContainer = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const handleError = useErrorHandler();

  const fetchUsersData = async ({ page }) => {
    let url = `https://api.github.com/search/users?q=${searchText} in:login&sort=stars&order=desc&page=${page}&per_page=9`;
    await axios
      .get(url)
      .then((res) => {
        res?.data?.items.sort((a, b) =>
          a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1
        );
        res.data.sortOrder = "desc";
        setResults(res?.data);
      })
      .catch((e) => {
        handleError(e);
      });
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
    fetchUsersData({ page: 1 });
  };

  const handleChangeSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchUsersData({ page: page });
  };

  const handleClickSortLogin = () => {
    setResults((prevState) => ({
      ...prevState,
      items:
        prevState.sortOrder === "desc"
          ? prevState.items.sort((a, b) =>
              a.login.toLowerCase() > b.login.toLowerCase() ? -1 : 1
            )
          : prevState.items.sort((a, b) =>
              a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1
            ),
      sortOrder: prevState.sortOrder === "desc" ? "asc" : "desc",
    }));
  };

  return (
    <div className="app">
      <Search
        searchText={searchText}
        handleChangeSearch={handleChangeSearch}
        onSubmitSearch={onSubmitSearch}
      />
      <Results
        results={results}
        currentPage={currentPage}
        handleClickSortLogin={handleClickSortLogin}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ParentContainer;
