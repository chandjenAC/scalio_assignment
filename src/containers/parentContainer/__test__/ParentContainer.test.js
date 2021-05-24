import ParentContainer from "../ParentContainer";
import { fireEvent, render, waitFor } from "@testing-library/react";

describe("Parent Container", () => {
  test("renders without crashing", () => {
    render(<ParentContainer />);
  });
});
