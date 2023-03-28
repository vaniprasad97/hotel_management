import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Search from "../Search";

describe("Search component", () => {
  test("filters hotels based on search text", () => {
    const handleSearchResult = jest.fn();

    const hotelsData = [
      {
        id: 1,
        location: "City A",
        name: "Hotel A",
      },
      {
        id: 2,
        location: "City B",
        name: "Hotel B",
      },
      {
        id: 3,
        location: "City C",
        name: "Hotel C",
      },
    ];

    const { getByLabelText, getByText } = render(
      <Search handleSearchResult={handleSearchResult} hotelsData={hotelsData} />
    );

    // const searchInput = getByText("Search Hotel");
    // fireEvent.change(searchInput, { target: { value: "city" } });

    // const searchButton = getByText("Search");
    // fireEvent.click(searchButton);
    const searchInput = getByLabelText("Search Hotel");
    const searchButton = getByText("Search");

    fireEvent.change(searchInput, { target: { value: "A" } });
    fireEvent.click(searchButton);

    expect(handleSearchResult).toHaveBeenCalledWith([
      {
        id: 1,
        location: "City A",
        name: "Hotel A",
      },
      {
        id: 2,
        location: "City B",
        name: "Hotel B",
      },
      {
        id: 3,
        location: "City C",
        name: "Hotel C",
      },
    ]);
  });
});
