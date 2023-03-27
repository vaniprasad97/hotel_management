import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import BookingDetails from "../../Pages/BookingDetails";
import instance from "../../axiosconfig";

// Mocking the Axios instance
jest.mock("../../axiosconfig");

describe("BookingDetails component", () => {
  // Define test data
  const bookingsData = [
    {
      _id: "1",
      name: "John Doe",
      hotelId: "hotel1",
      roomId: "room1",
      noOfGuests: 2,
      checkInDate: "2022-04-01T00:00:00.000Z",
      checkOutDate: "2022-04-05T00:00:00.000Z",
    },
    {
      _id: "2",
      name: "Jane Doe",
      hotelId: "hotel2",
      roomId: "room2",
      noOfGuests: 3,
      checkInDate: "2022-05-01T00:00:00.000Z",
      checkOutDate: "2022-05-05T00:00:00.000Z",
    },
  ];

  beforeEach(() => {
    // Clear the mock implementation before each test
    instance.get.mockClear();
  });

  test("should render BookingDetails component with table", async () => {
    // Mock the response of the Axios instance
    instance.get.mockResolvedValueOnce({ data: bookingsData });

    // Render the BookingDetails component
    render(
      <MemoryRouter>
        <BookingDetails />
      </MemoryRouter>
    );

    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByText("Bookings")).toBeInTheDocument();
    });

    // Check that the table is rendered with the correct data
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("hotel1")).toBeInTheDocument();
    expect(screen.getByText("room1")).toBeInTheDocument();
    const elements = screen.getAllByText("2");
    expect(elements[1]).toBeInTheDocument();
    expect(screen.getByText("Tue Apr 05 2022")).toBeInTheDocument();
    expect(screen.getByText("Tue Apr 05 2022")).toBeInTheDocument();
  });
  test("should handle error from Axios instance", async () => {
    // Define a mock error object
    const mockError = new Error("Network Error");

    // Mock the error response of the Axios instance
    instance.get.mockRejectedValueOnce(mockError);

    // Render the BookingDetails component
    render(
      <MemoryRouter>
        <BookingDetails />
      </MemoryRouter>
    );

    // Wait for the component to load
    await waitFor(() => {
      expect(
        screen.getByText("Hotel Booked successfully.. The booking details are:")
      ).toBeInTheDocument();
    });
  });
});
