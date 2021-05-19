import { render, fireEvent } from "@testing-library/react";
import Results from "./Results";

it("checkResultsRender", () => {
  const { queryByTitle } = render(<Results />);
  const btn = queryByTitle("dummyButton");
  expect(btn).toBeTruthy();
});

describe("clickTest", () => {
  it("onClick", () => {
    const { queryByTitle } = render(<Results />);
    const btn = queryByTitle("dummyButton");
    expect(btn.innerHTML).toBe("someText");
    fireEvent.click(btn);
    expect(btn.innerHTML).toBe("someText after button click");
  });
});
