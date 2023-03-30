import React from "react";
import Header from "../Components/Header";
import instance from "../axiosconfig";
import { useEffect, useState } from "react";

function BookingDetails() {
  const [bookingsData, setBookingsData] = useState([]);

  useEffect(() => {
    instance
      .get("/bookings")
      .then((response) => {
        setBookingsData(response.data);
      })
      .catch((error) => {
        // console.error(error);
      }); // use useeffect hook to get the bookings data and stored in a state called bookings data.
  }, []);
  return (
    <div data-testid="booking-details-page">
      <Header />
      <h1>Hotel Booked successfully.. The booking details are:</h1>
      <h1>Bookings</h1>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User Name</th>
            <th>Hotel Name</th>
            <th> Room ID</th>
            <th> No: of Guests</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
          </tr>
        </thead>
        <tbody>
          {bookingsData.map((booking) => (
            <tr key={booking._id}>
              <td>{booking._id}</td>
              <td>{booking.name}</td>
              <td>{booking.hotelId}</td>
              <td>{booking.roomId}</td>
              <td>{booking.noOfGuests}</td>
              <td>{new Date(booking.checkInDate).toDateString()}</td>
              <td>{new Date(booking.checkOutDate).toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingDetails;
