import Pagination from "../Pagination";
import { fireEvent, render } from "@testing-library/react";

describe("Pagination Component", () => {
  test("renders correctly without props", () => {
    render(<Pagination />);
  });

  test("renders prev page button", () => {
    const { getByTestId } = render(<Pagination />);
    const prevBtnEl = getByTestId("prev-btn");
    expect(prevBtnEl).toBeTruthy();
  });

  test("renders next page button", () => {
    const { getByTestId } = render(<Pagination />);
    const nextBtnEl = getByTestId("next-btn");
    expect(nextBtnEl).toBeTruthy();
  });

  test("prev page button click with mock fn", () => {
    const handlePageChange = jest.fn();
    const { getByTestId } = render(
      <Pagination
        page={2}
        count={100}
        rowsPerPage={9}
        handlePageChange={handlePageChange}
      />
    );
    const prevBtnEl = getByTestId("prev-btn");
    fireEvent.click(prevBtnEl);
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });

  test("next page button click with mock fn", () => {
    const handlePageChange = jest.fn();
    const { getByTestId } = render(
      <Pagination
        page={2}
        count={100}
        rowsPerPage={9}
        handlePageChange={handlePageChange}
      />
    );
    const nextBtnEl = getByTestId("next-btn");
    fireEvent.click(nextBtnEl);
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });

  test("renders from,to and count correctly", () => {
    const { getByTestId } = render(
      <Pagination page={2} count={100} rowsPerPage={9} />
    );
    const textEl = getByTestId("paginationText");
    expect(textEl.textContent).toBe("10-18 of 100");
  });
});
