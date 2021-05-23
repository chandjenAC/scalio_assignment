import { render, fireEvent } from "@testing-library/react";
import Results from "../Results";

let getByTestId;
let getByText;
let rerender;

beforeEach(() => {
  const component = render(<Results />);
  getByTestId = component.getByTestId;
  getByText = component.getByText;
  rerender = component.rerender;
});

describe("Results Component", () => {
  test("renders without crashing", () => {});

  test("renders no results text when results is empty", () => {
    rerender(<Results results={{}} />);
    const titleEl = getByTestId("no-results-text");
    expect(titleEl.textContent).toBe("No results found");
  });

  test("sort button click with mock fn", () => {
    const handleClickSortLogin = jest.fn();
    rerender(
      <Results
        results={{
          total_count: 2,
          incomplete_results: false,
          items: [
            {
              login: "Chandjen",
              id: 50048344,
              avatar_url:
                "https://avatars.githubusercontent.com/u/50048344?v=4",
            },
          ],
          sortOrder: "desc",
        }}
        handleClickSortLogin={handleClickSortLogin}
      />
    );
    const sortBtnEl = getByTestId("sort-btn");
    fireEvent.click(sortBtnEl);
    expect(handleClickSortLogin).toBeCalled();
  });

  test("render up arrow for sorting when sort order is desc", () => {
    rerender(
      <Results
        results={{
          total_count: 2,
          incomplete_results: false,
          items: [
            {
              login: "Chandjen",
              id: 50048344,
              avatar_url:
                "https://avatars.githubusercontent.com/u/50048344?v=4",
              type: "User",
            },
          ],
          sortOrder: "desc",
        }}
      />
    );
    const upArrowEl = getByTestId("sort-up-arrow");
    expect(upArrowEl).toBeTruthy;
  });

  test("render down arrow for sorting when sort order is asc", () => {
    rerender(
      <Results
        results={{
          total_count: 2,
          incomplete_results: false,
          items: [
            {
              login: "Chandjen",
              id: 50048344,
              avatar_url:
                "https://avatars.githubusercontent.com/u/50048344?v=4",
              type: "User",
            },
          ],
          sortOrder: "asc",
        }}
      />
    );
    const downArrowEl = getByTestId("sort-down-arrow");
    expect(downArrowEl).toBeTruthy;
  });

  test("results rendered correctly", () => {
    rerender(
      <Results
        results={{
          total_count: 2,
          incomplete_results: false,
          items: [
            {
              login: "Chandjen",
              id: 50048344,
              avatar_url:
                "https://avatars.githubusercontent.com/u/50048344?v=4",
              type: "User",
            },
          ],
          sortOrder: "desc",
        }}
      />
    );
    const tableHeaderEl = getByTestId("table-header");
    const avatarImgEl = getByTestId("avatar-img");
    expect(tableHeaderEl).toBeTruthy();
    expect(avatarImgEl).toBeTruthy();
    expect(getByText("Chandjen")).toBeInTheDocument();
    expect(getByText("User")).toBeInTheDocument();
  });
});
