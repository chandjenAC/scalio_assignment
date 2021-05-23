import { render, fireEvent } from "@testing-library/react";
import Results from "../Results";

describe("Results Component", () => {
  test("renders correctly without props", () => {
    render(<Results />);
  });

  test("renders no results text when results is empty", () => {
    const { getByTestId } = render(<Results results={{}} />);
    const titleEl = getByTestId("no-results-text");
    expect(titleEl.textContent).toBe("No results found");
  });
});

// describe("clickTest", () => {
//   it("onClick", () => {
//     const { queryByTitle } = render(<Results />);
//     const btn = queryByTitle("dummyButton");
//     expect(btn.innerHTML).toBe("someText");
//     fireEvent.click(btn);
//     expect(btn.innerHTML).toBe("someText after button click");
//   });
// });
