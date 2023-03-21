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
test("filters hotels based on search text", async() => {
  const hotelsData = [
    {
      "_id": "64197f0a22534003e8c8f319",
      "name": "hayat",
      "description": "c",
      "location": "dfg"
    }
  ];

  const handleSearchResult = jest.fn();
  const { getByLabelText, getByText } = render(
    <Search hotelsData={hotelsData} handleSearchResult={handleSearchResult} />
  );
  const searchInput = getByLabelText("Search Hotel");
  const searchButton = getByText("Search");
  fireEvent.change(searchInput, { target: { value: "hayat" } });
  fireEvent.click(searchButton);
  expect(searchInput).toHaveValue("hayat");
  expect(handleSearchResult).toHaveBeenCalledTimes(1);
  // expect(handleSearchResult).toHaveBeenCalledWith([
  //   {
  //     "_id": "64197f0a22534003e8c8f319",
  //     "name": "hayat",
  //     "location": "dfg"
  //   },
  // ]);
});


