import Pagination from "../Pagination";
import { render } from "@testing-library/react";

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
