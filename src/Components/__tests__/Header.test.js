 import { render, screen } from "@testing-library/react";
import Header from "../Header"

test("renders h3", () => {
  render(<Header />);
  const linkElement = screen.getByText(/Logout/i);
  expect(linkElement).toBeInTheDocument();
});
 



