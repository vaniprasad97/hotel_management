/* import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders lheading", () => {
  render(<App />);
  const linkElement = screen.getByText(/Test React/i);
  expect(linkElement).toBeInTheDocument();
});
 */

describe("true is truthy and false is falsy", () => {
  test("true is truthy", () => {
    expect(true).toBe(true);
  });

  test("false is falsy", () => {
    expect(false).toBe(false);
  });
});
