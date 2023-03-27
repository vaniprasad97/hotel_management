import React from "react";
import { render, screen, act } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import AdminBookingPage from "../AdminBookingPage";
import instance from "../../axiosconfig";

jest.mock("../../axiosconfig");

const mockedBookingsData = [
  {
    _id: "booking-1",
    name: "John Doe",
    hotelId: "hotel-1",
    roomId: "room-1",
    noOfGuests: 2,
    checkInDate: new Date(2022, 2, 26).toISOString(),
    checkOutDate: new Date(2022, 2, 28).toISOString(),
  },
  {
    _id: "booking-2",
    name: "Jane Smith",
    hotelId: "hotel-2",
    roomId: "room-2",
    noOfGuests: 1,
    checkInDate: new Date(2022, 3, 1).toISOString(),
    checkOutDate: new Date(2022, 3, 3).toISOString(),
  },
];

describe("AdminBookingPage", () => {
  beforeEach(async () => {
    instance.get.mockResolvedValueOnce({ data: mockedBookingsData });
    await act(async () => {
      render(
        <MemoryRouter>
          <AdminBookingPage />
        </MemoryRouter>
      );
    });
  });

  test("renders the bookings table with correct data", async () => {
    await act(async () => {
      const bookingRows = await screen.findAllByRole("row", {
        name: /booking/i,
      });

      mockedBookingsData.forEach((booking, index) => {
        expect(screen.getByText(booking._id)).toBeInTheDocument();
        expect(screen.getByText(booking.name)).toBeInTheDocument();
        expect(screen.getByText(booking.hotelId)).toBeInTheDocument();
        expect(screen.getByText(booking.roomId)).toBeInTheDocument();
        expect(screen.getByText(booking.noOfGuests)).toBeInTheDocument();
        expect(
          screen.getByText(new Date(booking.checkInDate).toDateString())
        ).toBeInTheDocument();
        expect(
          screen.getByText(new Date(booking.checkOutDate).toDateString())
        ).toBeInTheDocument();
      });
    });
  });

  test("renders a link to the admin page", () => {
    const link = screen.getByRole("link", { name: /back to admin page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/AdminPage");
  });
});
