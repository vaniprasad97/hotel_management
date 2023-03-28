import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import HotelAdminBookingDetails from "../../Pages/HotelAdminBookingDetails";
import instance from "../../axiosconfig";

// Mock the axios module to simulate API calls made by the component
jest.mock("../../axiosconfig");

describe("HotelAdminBookingDetails", () => {
  test("renders the bookings data for the selected user", async () => {
    // Mock the response from the axios module
    instance.get.mockResolvedValueOnce({
      data: [
        {
          _id: "booking123",
          name: "John Doe",
          userId: "user123",
          hotelId: "hotel123",
          roomId: "room123",
          noOfGuests: 2,
          checkInDate: "2023-04-01T00:00:00.000Z",
          checkOutDate: "2023-04-03T00:00:00.000Z",
        },
      ],
    });

    // Render the component within a MemoryRouter
    render(
      <MemoryRouter>
        <HotelAdminBookingDetails />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Bookings")).toBeInTheDocument();
    });

    // Wait for the asynchronous data to load

    expect(screen.getByText("cell", { name: /hotel123/i })).toBeInTheDocument();

    expect(screen.getByText("room123")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Sat Apr 01 2023")).toBeInTheDocument();
    expect(screen.getByText("Mon Apr 03 2023")).toBeInTheDocument();
    expect(screen.getByText("Apr 1 2023")).toBeInTheDocument();
    expect(screen.getByText("Apr 3 2023")).toBeInTheDocument();
  });
});
