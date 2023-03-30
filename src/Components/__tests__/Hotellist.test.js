import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HotelList from "../Hotellist";
import { MemoryRouter } from "react-router-dom";

describe("HotelList Component", () => {
  let hotels = [];
  let instance;

  beforeEach(() => {
    hotels = [
      {
        id: 1,
        name: "Hotel 1",
        description: "Description 1",
        location: "Location 1",
      },
      {
        id: 2,
        name: "Hotel 2",
        description: "Description 2",
        location: "Location 2",
      },
      {
        id: 3,
        name: "Hotel 3",
        description: "Description 3",
        location: "Location 3",
      },
    ];
    instance = render(
      <MemoryRouter>
        <HotelList />
      </MemoryRouter>
    );
  });

  test("renders HotelList component", () => {
    expect(instance.container).toBeInTheDocument();
  });

  test("displays list of hotels", () => {
    const hotelList = screen.getByTestId("hotel-list");
    expect(hotelList).toBeInTheDocument();
  });
});
