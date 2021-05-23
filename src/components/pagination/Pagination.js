import { ReactComponent as PrevIcon } from "../../assets/icons/chevron-left-solid.svg";
import { ReactComponent as NextIcon } from "../../assets/icons/chevron-right-solid.svg";
import "./pagination.scss";

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
          data-testid="prev-btn"
          className="paginationButton"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          <PrevIcon className="paginationIcon" />
        </button>
      </div>
      <div>
        <p data-testid="paginationText" className="paginationText">
          {from}-{to} <span className="paginationTextMiddle">of</span>{" "}
          <span className="paginationTotalCount">{count}</span>
        </p>
      </div>
      <div>
        <button
          data-testid="next-btn"
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
