import "./results.scss";
import { ReactComponent as ArrowUp } from "../../assets/icons/arrow-up-solid.svg";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down-solid.svg";
import Pagination from "../pagination/Pagination";

const Results = ({
  results,
  currentPage,
  handlePageChange,
  handleClickSortLogin,
}) => {
  return results.items?.length > 0 ? (
    <div className="tableContainer">
      <p className="search-result-title">Results</p>
      <div className="responsiveTbl">
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>
                Login{" "}
                <button
                  className="sortIconButton"
                  onClick={handleClickSortLogin}
                >
                  {results.sortOrder === "desc" ? (
                    <ArrowUp className="sortIcon" />
                  ) : (
                    <ArrowDown className="sortIcon" />
                  )}
                </button>
              </th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {results.items.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <img className="avatarLogo" src={item.avatar_url} alt="avatar logo"/>
                  </td>
                  <td>{item.login}</td>
                  <td>{item.type} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        page={currentPage}
        handlePageChange={handlePageChange}
        count={results.total_count}
        rowsPerPage={9}
      />
    </div>
  ) : (
    <div style={{ marginTop: "20px" }}>No results found</div>
  );
};

export default Results;