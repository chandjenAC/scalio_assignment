import Fallback from "../Fallback";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

test("renders correctly without props", () => {
  render(<Fallback />);
});

test("header renders with correct text", () => {
  const { getByTestId } = render(<Fallback />);
  const headerEl = getByTestId("header");
  expect(headerEl.textContent).toBe("Something went wrong!");
});

test("error message renders with correct text", () => {
  const { getByTestId } = render(
    <Fallback error={{ message: "Some random error message" }} />
  );
  const errorMsgEl = getByTestId("error-msg");
  expect(errorMsgEl.textContent).toBe("Some random error message");
});

test("go to home page button click with mock fn", () => {
  const resetErrorBoundary = jest.fn();
  const { getByTestId } = render(
    <Fallback resetErrorBoundary={resetErrorBoundary} />
  );
  const resetBtnEl = getByTestId("reset-btn");
  fireEvent.click(resetBtnEl);
  expect(resetErrorBoundary).toBeCalled();
});

// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
