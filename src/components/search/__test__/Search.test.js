import { render, fireEvent, cleanup } from "@testing-library/react";
import Search from "../Search";

let getByTestId;

beforeEach(() => {
  const component = render(<Search />);
  getByTestId = component.getByTestId;
});

afterEach(() => {
  cleanup();
});

test("renders input", () => {
  const inputEl = getByTestId("searchInput");
  expect(inputEl).toBeTruthy();
});

test("renders submit btn", () => {
  const submitBtnEl = getByTestId("submit-btn");
  expect(submitBtnEl).toBeTruthy();
});

test("renders submit btn with correct text", () => {
  const submitBtnEl = getByTestId("submit-btn");
  expect(submitBtnEl.textContent).toBe("Submit");
});

test("on load, input value is empty", () => {
  const inputEl = getByTestId("searchInput");
  expect(inputEl.value).toBe("");
});

test("change value of input works correctly", () => {
  const inputEl = getByTestId("searchInput");
  expect(inputEl.value).toBe("");
  fireEvent.change(inputEl, { target: { value: "Some random text input" } });
  expect(inputEl.value).toBe("Some random text input");
});

//test for functions
//import functions.
// test("multiply", () => {
//   expect(multiply(1, 5)).toBe(5);
// });

// describe("changeInput", () => {
//   it("onChange", () => {
//     const { queryByTitle } = render(<Search />);
//     const inputEl = queryByTitle("inputTitle");
//     fireEvent.change(input, { target: { value: "LoginText" } });
//     expect(inputEl.value).toBe("LoginText");
//   });
// });
