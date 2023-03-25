import React, { useEffect, useState } from "react";
import instance from "../axiosconfig";
import Header from "../Components/Header";

function HotelAdminBookingDetails() {
  const loggedInUser = localStorage.getItem("selectedUser");
  const userObj = JSON.parse(loggedInUser);
  const [bookingsData, setBookingsData] = useState([]);

  useEffect(() => {
    instance
      .get("/bookings")
      .then((response) => {
        // Filter out the bookings data based on the user ID
        const filteredBookings = response.data.filter(
          (booking) => booking.userId === userObj.id
        );
        setBookingsData(filteredBookings);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userObj.id]);

  return (
    <div>
      <Header />
      <h1>Bookings</h1>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User Name</th>
            <th>Hotel ID</th>
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

export default HotelAdminBookingDetails;
