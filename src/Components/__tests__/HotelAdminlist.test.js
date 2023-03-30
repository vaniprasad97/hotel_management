import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HotelAdminlist from "../../Pages/HotelAdminlist";
import { MemoryRouter } from "react-router-dom";

describe("HotelAdminlist component", () => {
  test("should render table with assigned hotels", async () => {
    const mockData = [
      { _id: "1", hotelName: "Hotel A" },
      { _id: "2", hotelName: "Hotel B" },
    ];

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    render(
      <MemoryRouter>
        {" "}
        <HotelAdminlist />{" "}
      </MemoryRouter>
    );

    const hotelTable = screen.getByRole("table");
    const hotelTableRows = screen.getAllByRole("row");

    expect(hotelTable).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  test("displays a list of hotels", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              _id: "1",
              hotelName: "Hotel A",
            },
            {
              _id: "2",
              hotelName: "Hotel B",
            },
          ]),
      })
    );

    render(
      <MemoryRouter>
        {" "}
        <HotelAdminlist />{" "}
      </MemoryRouter>
    );

    const hotelTable = screen.getByRole("table");
    expect(hotelTable).toBeInTheDocument();
    global.fetch.mockRestore();
  });
});
