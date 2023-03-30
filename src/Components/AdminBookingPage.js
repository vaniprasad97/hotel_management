import React from "react";
import { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import instance from "../axiosconfig";

function AdminBookingPage() {
  const [bookingsData, setBookingsData] = useState([]);

  useEffect(() => {
    instance
      .get("/bookings")
      .then((response) => {
        setBookingsData(response.data);
      })
      .catch((error) => {
        //  console.error(error);
      });
    // Get the data from the bookings api and store it in a state variable called bookingsData.
  }, []);
  return (
    <div>
      <Header />
      <Link to="/AdminPage" relative="path">
        Back To Admin Page
      </Link>
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

export default AdminBookingPage;
