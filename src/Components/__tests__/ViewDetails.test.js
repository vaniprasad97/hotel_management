import React from "react";
import { render, screen } from "@testing-library/react";
import ViewDetails from "../../Pages/ViewDetails";
import instance from "../../axiosconfig";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock("../../axiosconfig");

describe("ViewDetails component", () => {
  test("renders hotel details correctly", async () => {
    const mockHotel = {
      _id: "1",
      name: "Mock Hotel",
      description: "Mock description",
      location: "Mock location",
    };
    const mockBookings = [
      {
        _id: "1",
        hotelId: "1",
        checkInDate: "2023-04-01T00:00:00.000Z",
        checkOutDate: "2023-04-05T00:00:00.000Z",
      },
    ];
    instance.get.mockImplementation((url) => {
      switch (url) {
        case "/hotels":
          return Promise.resolve({ data: [mockHotel] });
        case "/bookings?hotelId=1":
          return Promise.resolve({ data: mockBookings });
        default:
          return Promise.reject(new Error("not found"));
      }
    });
    render(
      <MemoryRouter initialEntries={["/view/1"]}>
        <Routes>
          <Route path="/view/:id" element={<ViewDetails />} />
        </Routes>
      </MemoryRouter>
    );
    expect(await screen.findByText(mockHotel.name)).toBeInTheDocument();
    expect(screen.getByText(mockHotel.description)).toBeInTheDocument();
    expect(screen.getByText(mockHotel.location)).toBeInTheDocument();
  });
});
