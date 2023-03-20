import React, { useState } from "react";
import instance from "../axiosconfig";
import Header from "./Header";
import { Link } from "react-router-dom";

function BookingForm({ hotel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [noOfGuests, setNoOfGuests] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
    //  hotelId: hotel.id,
      name,
      email,
      checkInDate,
      checkOutDate,
      noOfGuests,
    };
    instance
      .post("/bookings", data)
      .then((response) => {
        console.log("room assigned successfully");
      })
      .catch((error) => {
        console.log("Error adding room:", error);
      });
  };

  return (
    <div>
      <Header/>
      <Link to="/AdminPage" relative="path">
          Back To Admin Page
        </Link>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="checkInDate">Check-in date:</label>
        <input
          type="date"
          id="checkInDate"
          value={checkInDate}
          onChange={(event) => setCheckInDate(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="checkOutDate">Check-out date:</label>
        <input
          type="date"
          id="checkOutDate"
          value={checkOutDate}
          onChange={(event) => setCheckOutDate(event.target.value)}
        />
         <label>
        Number of Guests:
        <input
          type="number"
          value={noOfGuests}
          onChange={(event) => setNoOfGuests(event.target.value)}
        />
      </label>
      </div>
      <button type="submit">Book Now</button>
    </form>
    </div>
  );
}

export default BookingForm;
