import { ReactComponent as PrevIcon } from "../../assets/icons/chevron-left-solid.svg";
import { ReactComponent as NextIcon } from "../../assets/icons/chevron-right-solid.svg";
import "./pagination.css";

const Pagination = ({ page, rowsPerPage, count, handlePageChange }) => {
  let from = rowsPerPage * page - rowsPerPage + 1;
  let to = rowsPerPage * page;
  if (to > count) {
    to = count;
  }

  return (
    <div className="paginationContainer">
      <div>
        <button
          className="paginationButton"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          <PrevIcon className="paginationIcon" />
        </button>
      </div>
      <div>
        <p>
          {from}-{to} of {count}
        </p>
      </div>
      <div>
        <button
          className="paginationButton"
          disabled={to >= count}
          onClick={() => handlePageChange(page + 1)}
        >
          <NextIcon className="paginationIcon" />
        </button>
      </div>
    </div>
  );
};
export default Pagination;
