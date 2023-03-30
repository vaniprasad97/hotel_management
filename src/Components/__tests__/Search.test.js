import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../Search";

describe("Search component", () => {
  test("renders search input and button", () => {
    render(<Search handleSearchResult={() => {}} />);
    const searchInput = screen.getByLabelText("Search Hotel");
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByRole("button", { name: "Search" });
    expect(searchButton).toBeInTheDocument();
  });

  test("updates search text state when user types into the search input", () => {
    render(<Search handleSearchResult={() => {}} />);
    const searchInput = screen.getByLabelText("Search Hotel");
    fireEvent.change(searchInput, { target: { value: "new search text" } });
    expect(searchInput.value).toBe("new search text");
  });

  test("calls handleSearchResult with search results when user clicks the search button", () => {
    const handleSearchResult = jest.fn();
    render(<Search handleSearchResult={handleSearchResult} />);
    const searchInput = screen.getByLabelText("Search Hotel");
    fireEvent.change(searchInput, { target: { value: "search text" } });
    const searchButton = screen.getByRole("button", { name: "Search" });
    fireEvent.click(searchButton);
    expect(handleSearchResult).toHaveBeenCalledWith(expect.arrayContaining([]));
  });
});
