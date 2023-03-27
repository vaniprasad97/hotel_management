// import React from "react";
// import { render, fireEvent } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import Search from "../Search";

// describe("Search", () => {
//   it("should render a search input field and button", () => {
//     const { getByLabelText, getByText } = render(
//       <MemoryRouter>
//         <Search />
//       </MemoryRouter>
//     );
//     const searchInput = getByLabelText("Search Hotel");
//     const searchButton = getByText("Search");
//     expect(searchInput).toBeInTheDocument();
//     expect(searchButton).toBeInTheDocument();
//   });

//   it("should call handleSearchResult with the correct search results", () => {
//     const mockHandleSearchResult = jest.fn();
//     const { getByLabelText, getByText } = render(
//       <MemoryRouter>
//         <Search handleSearchResult={mockHandleSearchResult} />
//       </MemoryRouter>
//     );
//     const searchInput = getByLabelText("Search Hotel");
//     const searchButton = getByText("Search");
//     fireEvent.change(searchInput, { target: { value: "test" } });
//     fireEvent.click(searchButton);
//     expect(mockHandleSearchResult).toHaveBeenCalled();
//     expect(mockHandleSearchResult).toHaveBeenCalledWith(expect.any(Array));
//   });
// });
