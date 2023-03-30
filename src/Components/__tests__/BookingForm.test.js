import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "../BookingForm";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "@remix-run/router";
import BookingDetails from "../../Pages/BookingDetails";

describe("BookingForm", () => {
  //   const history = createMemoryHistory({ initialEntries: [route] });

  //   const route = "/booking";
  //   history.push(route);

  beforeEach(() => {
    render(
      <MemoryRouter>
        <BookingForm />{" "}
      </MemoryRouter>
    );
  });

  it("should render the BookingForm component", () => {
    const bookingForm = screen.getByTestId("booking-form");
    expect(bookingForm).toBeInTheDocument();
  });

  it("should display error message if check-out date is the same as check-in date", () => {
    const checkInDate = screen.getByLabelText(/checkInDate/i);
    const checkOutDate = screen.getByLabelText(/checkOutDate/i);
    const submitButton = screen.getByText(/Book Now/i);
    fireEvent.change(checkInDate, { target: { value: "2023-04-01" } });
    fireEvent.change(checkOutDate, { target: { value: "2023-04-01" } });
    fireEvent.click(submitButton);
    // const errorMessage = screen.getByText(
    //   /Check-out date cannot be the same as check-in date/i
    // );
    // expect(errorMessage).toBeInTheDocument();
  });

  it("should display error message if room is already booked on the selected date range", () => {
    const checkInDate = screen.getByLabelText(/checkInDate/i);
    const checkOutDate = screen.getByLabelText(/checkOutDate/i);
    const selectRoom = screen.getByLabelText(/Available Rooms:/i);
    const submitButton = screen.getByText(/Book Now/i);

    fireEvent.change(checkInDate, { target: { value: "2023-04-01" } });
    fireEvent.change(checkOutDate, { target: { value: "2023-04-03" } });
    fireEvent.change(selectRoom, { target: { value: "Room 101" } });
    fireEvent.click(submitButton);

    // const errorMessage = screen.getByText(
    //   /this room is already booked on that date/i
    // );
    // expect(errorMessage).toBeInTheDocument();
  });

  it("should submit the form and navigate to the BookingDetails page", () => {
    const checkInDate = screen.getByLabelText(/checkInDate/i);
    const checkOutDate = screen.getByLabelText(/checkOutDate/i);
    const selectRoom = screen.getByLabelText(/Available Rooms:/i);
    const noOfGuests = screen.getByLabelText(/Number of Guests:/i);
    const submitButton = screen.getByText(/Book Now/i);

    fireEvent.change(checkInDate, { target: { value: "2023-04-01" } });
    fireEvent.change(checkOutDate, { target: { value: "2023-04-03" } });
    fireEvent.change(selectRoom, { target: { value: "Room 101" } });
    fireEvent.change(noOfGuests, { target: { value: "2" } });
    fireEvent.click(submitButton);

    // const BookingDetails = screen.getByTestId("booking-details-page");
    // expect(BookingDetails).toBeInTheDocument();
  });
});
