import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminPage from "../../Pages/AdminPage";

test("renders AdminPage without crashing", () => {
  render(
    <MemoryRouter>
      <AdminPage />
    </MemoryRouter>
  );
});
test("renders table with functionality links", () => {
  render(
    <MemoryRouter>
      <AdminPage />
    </MemoryRouter>
  );
  const tableElement = screen.getByRole("table");
  expect(tableElement).toBeInTheDocument();
});
test("renders 'See the list of hotels' link", () => {
  render(
    <MemoryRouter>
      <AdminPage />
    </MemoryRouter>
  );
  const hotelsLinkElement = screen.getByText(/See the list of hotels/i);
  expect(hotelsLinkElement).toBeInTheDocument();
});
