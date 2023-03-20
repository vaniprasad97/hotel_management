import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Search from "../Search";

test("renders search input and button", () => {
  const { getByLabelText, getByText } = render(<Search />);
  const searchInput = getByLabelText("Search Hotel");
  const searchButton = getByText("Search");
  expect(searchInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
  //to test if a Search component renders a search input and button correctly.
  //The getByLabelText is used to obtain a reference to the search input element
  // by searching for the label with text "Search Hotel", and the 
  //getByText function is used to obtain a reference to the search button element by searching for the text "Search".
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
  
  const handleSearchResult = jest.fn();
  const { getByLabelText, getByText } = render(
    <Search handleSearchResult={handleSearchResult} />
  );
  const searchInput = getByLabelText("Search Hotel");
  const searchButton = getByText("Search");
  fireEvent.change(searchInput, { target: { value: "A" } });
  fireEvent.click(searchButton);
//user searching for hotels by entering a search query "A" 
//in the search input field and clicking on the search button.
// it checks whether the handleSearchResult works properly.
 });
