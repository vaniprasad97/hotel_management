import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Search from "../Search";

test("renders search input and button", () => {
  const { getByLabelText, getByText } = render(<Search />);
  const searchInput = getByLabelText("Search Hotel");
  const searchButton = getByText("Search");
  expect(searchInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
});

test("filters hotels based on search text", async () => {
  const hotelsData = [
    {
        
      id: 1,
      name: "Hotel A",
      location: "City A",
    },
    {
      id: 2,
      name: "Hotel B",
      location: "City B",
    },
  ];
  
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(hotelsData),
    })
  );

  const handleSearchResult = jest.fn();
  const { getByLabelText, getByText } = render(
    <Search handleSearchResult={handleSearchResult} />
  );
  const searchInput = getByLabelText("Search Hotel");
  const searchButton = getByText("Search");

  fireEvent.change(searchInput, { target: { value: "A" } });
  fireEvent.click(searchButton);

 });
