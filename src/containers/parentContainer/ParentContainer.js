import axios from "axios";
import { useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import Results from "../../components/results/Results";
import Search from "../../components/search/Search";
import "./parentContainer.scss";

const ParentContainer = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const handleError = useErrorHandler();

  const isResultEmpty =
    Object.keys(results).length === 0 && results.constructor === Object;

  const fetchUsersData = async ({ page }) => {
    let url = `https://api.github.com/search/users?q=${searchText} in:login&sort=stars&order=desc&page=${page}&per_page=9`;
    await axios
      .get(url)
      .then((res) => {
        res?.data?.items.sort((a, b) =>
          a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1
        );
        res.data.sortOrder = "desc";
        console.log(
          "this is the response>>>>",
          JSON.stringify(res?.data, null, 2)
        );
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
    setDisableSubmit(true);
    fetchUsersData({ page: 1 });
  };

  const handleChangeSearch = (e) => {
    if (disableSubmit) {
      setDisableSubmit(false);
    }
    if (e.target.value === "") {
      setDisableSubmit(true);
      if (!isResultEmpty) {
        setResults({});
      }
    }
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
      <div>
        <Search
          searchText={searchText}
          handleChangeSearch={handleChangeSearch}
          onSubmitSearch={onSubmitSearch}
          disableSubmit={disableSubmit}
        />
      </div>

      {!isResultEmpty && (
        <div>
          <Results
            results={results}
            currentPage={currentPage}
            handleClickSortLogin={handleClickSortLogin}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ParentContainer;
