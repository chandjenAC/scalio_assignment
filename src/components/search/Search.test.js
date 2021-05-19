import { render, fireEvent } from "@testing-library/react";
import Search from "./Search";

it("SearchRenderCheck", () => {
  const { queryByTitle } = render(<Search />);
  const input = queryByTitle("someTitle");
  expect(input).toBeTruthy();
});

describe("changeInput", () => {
  it("onChange", () => {
    const { queryByTitle } = render(<Search />);
    const input = queryByTitle("inputTitle");
    fireEvent.change(input, { target: { value: "LoginText" } });
    expect(input.value).toBe("LoginText");
  });
});

//test for functions
//import functions.
test("multiply", () => {
  expect(multiply(1, 5)).toBe(5);
});
