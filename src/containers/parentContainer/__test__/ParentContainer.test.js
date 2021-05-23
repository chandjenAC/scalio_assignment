import ParentContainer from "../ParentContainer";
import { render } from "@testing-library/react";

describe("Parent Container", () => {
  test("renders without crashing", () => {
    render(<ParentContainer />);
  });
});
