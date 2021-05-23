import { render, fireEvent, cleanup } from "@testing-library/react";
import Search from "../Search";

let getByTestId;
let rerender;
let inputEl;
let submitBtnEl;

beforeEach(() => {
  const component = render(<Search />);
  getByTestId = component.getByTestId;
  inputEl = getByTestId("searchInput");
  submitBtnEl = getByTestId("submit-btn");
  rerender = component.rerender;
});

afterEach(cleanup);

describe("Search Component", () => {
  test("renders without crashing", () => {});
  
  test("renders input", () => {
    expect(inputEl).toBeTruthy();
  });

  test("renders submit btn", () => {
    expect(submitBtnEl).toBeTruthy();
  });

  test("renders submit btn with correct text", () => {
    expect(submitBtnEl.textContent).toBe("Submit");
  });

  test("disable submit button", () => {
    rerender(<Search disableSubmit={true} />);
    expect(submitBtnEl).toBeDisabled();
  });

  test("enable submit button", () => {
    rerender(<Search disableSubmit={false} />);
    expect(submitBtnEl).not.toBeDisabled();
  });

  test("on load, input value is empty", () => {
    expect(inputEl.value).toBe("");
  });

  test("change value of input works correctly", () => {
    expect(inputEl.value).toBe("");
    fireEvent.change(inputEl, { target: { value: "Some random text input" } });
    expect(inputEl.value).toBe("Some random text input");
  });
});
