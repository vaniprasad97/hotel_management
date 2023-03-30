import React from "react";
import { render, screen } from "@testing-library/react";
import HotelAdminBookingDetails from "../../Pages/HotelAdminBookingDetails";
import { MemoryRouter } from "react-router-dom";

describe("HotelAdminBookingDetails", () => {
  it("renders bookings data correctly", async () => {
    // Mock the local storage data
    const userObj = { id: 123 };
    localStorage.setItem("selectedUser", JSON.stringify(userObj));

    // Mock the API response data
    const bookingsData = [
      {
        _id: "booking-1",
        name: "John Doe",
        hotelId: "hotel-1",
        roomId: "room-1",
        noOfGuests: 2,
        checkInDate: "2022-04-01T00:00:00.000Z",
        checkOutDate: "2022-04-05T00:00:00.000Z",
        userId: 123,
      },
      {
        _id: "booking-2",
        name: "Jane Doe",
        hotelId: "hotel-2",
        roomId: "room-2",
        noOfGuests: 1,
        checkInDate: "2022-04-10T00:00:00.000Z",
        checkOutDate: "2022-04-15T00:00:00.000Z",
        userId: 123,
      },
    ];
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(bookingsData),
    });

    // Render the component
    render(
      <MemoryRouter>
        <HotelAdminBookingDetails />
      </MemoryRouter>
    );

    // Check that the table headers are displayed correctly
    expect(screen.getByText("Booking ID")).toBeInTheDocument();
    expect(screen.getByText("User Name")).toBeInTheDocument();
    expect(screen.getByText("Hotel ID")).toBeInTheDocument();
    expect(screen.getByText("Room ID")).toBeInTheDocument();
    expect(screen.getByText("No: of Guests")).toBeInTheDocument();
    expect(screen.getByText("Check-in Date")).toBeInTheDocument();
    expect(screen.getByText("Check-out Date")).toBeInTheDocument();
  });
});
