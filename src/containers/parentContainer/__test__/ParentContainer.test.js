import ParentContainer from "../ParentContainer";
import { fireEvent, render, waitFor } from "@testing-library/react";

describe("Parent Container", () => {
  test("renders without crashing", () => {
    render(<ParentContainer />);
  });

//   test("fetch user data for entered keyword", async () => {
//     const fetchUsersData = jest.fn();
//     fetchUsersData.mockResolvedValueOnce({});
//     const { getByTestId, getByText } = render(<ParentContainer />);
//     const inputEl = getByTestId("searchInput");
//     const submitBtnEl = getByTestId("submit-btn");
//     fireEvent.change(inputEl, { target: { value: "Test Username" } });
//     fireEvent.click(submitBtnEl);
//     await waitFor(() => getByText());
//   });
});
