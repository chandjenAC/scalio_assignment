import Fallback from "../Fallback";
import { cleanup, fireEvent, render } from "@testing-library/react";

let getByTestId;
let rerender;
let headerEl;
let errorMsgEl;
let resetBtnEl;

beforeEach(() => {
  const component = render(<Fallback />);
  getByTestId = component.getByTestId;
  headerEl = getByTestId("header");
  errorMsgEl = getByTestId("error-msg");
  resetBtnEl = getByTestId("reset-btn");
  rerender = component.rerender;
});

afterEach(() => {
  cleanup();
});

test("renders correctly without props", () => {});

test("header renders with correct text", () => {
  expect(headerEl.textContent).toBe("Something went wrong!");
});

test("error message renders with correct text", () => {
  rerender(<Fallback error={{ message: "Some random error message" }} />);
  expect(errorMsgEl.textContent).toBe("Some random error message");
});

test("go to home page button click with mock fn", () => {
  const resetErrorBoundary = jest.fn();
  rerender(<Fallback resetErrorBoundary={resetErrorBoundary} />);
  fireEvent.click(resetBtnEl);
  expect(resetErrorBoundary).toBeCalled();
});
