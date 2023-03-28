import React, { useState, useEffect } from "react";
import instance from "../axiosconfig";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Styles/BookingForm.css";
import moment from "moment";
import CalendarComponent from "../Pages/AddUsers";

function BookingForm() {
  const mark = ["04-03-2023", "03-03-2023", "05-03-2023"];

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState("");
  const [noOfGuests, setNoOfGuests] = useState("");
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [assignhotels, setAssignHotels] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [filteredRooms, setfilteredRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(hotels);
  console.log(selectedRoomId);
  console.log(selectedHotel);
  console.log(rooms);
  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("selectedUser");
  console.log(loggedInUser);
  const userObj1 = JSON.parse(loggedInUser);
  const userid = userObj1.id;

  useEffect(() => {
    instance.get("/rooms").then((response) => {
      setRooms(response.data);
    });

    if (loggedInUser) {
      const userObj = JSON.parse(loggedInUser);
      setName(userObj.name);
      setUsername(userObj.username);
    }
  }, []);

  useEffect(() => {
    instance.get("/hotels").then((response) => {
      setHotels(response.data);
    });
  }, []);

  useEffect(() => {
    instance.get("/assignhotel").then((response) => {
      setAssignHotels(response.data);
    });
  }, []);

  useEffect(() => {
    instance.get("/bookings").then((response) => {
      setBookings(response.data);
      const disabledDates = response.data.map((booking) => {
        return {
          from: new Date(booking.checkInDate),
          to: new Date(booking.checkOutDate),
        };
      });
      setDisabledDates(disabledDates);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if check-in and check-out dates are the same
    if (checkInDate === checkOutDate) {
      setErrorMessage("Check-out date cannot be the same as check-in date");
      return;
    }

    // Check if booking conflicts with existing bookings
    const existingBooking = bookings.find(
      (booking) =>
        selectedRoomId === booking.roomId &&
        ((checkInDate >= booking.checkInDate &&
          checkInDate <= booking.checkOutDate) ||
          (checkOutDate >= booking.checkInDate &&
            checkOutDate <= booking.checkOutDate))
    );
    if (existingBooking) {
      setErrorMessage("This room is already booked on that date");
      return;
    }

    const data = {
      name,
      username,
      checkInDate,
      checkOutDate,
      noOfGuests,
      roomId: selectedRoomId,
      hotelId: selectedHotel,
      UserID: userid,
    };

    instance.post("/bookings", data).then(() => {
      const updatedRooms = rooms.filter(
        (room) => room.roomName !== selectedRoomId
      );
      console.log(updatedRooms);
      setRooms(updatedRooms);

      navigate("/BookingDetails");
    });
  };

  const handleHotelChange = (event) => {
    const hotelName = event.target.value;
    console.log(assignhotels);
    const matcheddetails = assignhotels.find(
      (hoteldetails) => hoteldetails.hotelName == hotelName
    );
    console.log(matcheddetails);

    setfilteredRooms(
      rooms.filter((room) => room.created_by == matcheddetails.adminId)
    );

    setSelectedHotel(hotelName);

    setRooms(filteredRooms);
    console.log(filteredRooms);
  };

  return (
    <div>
      <Header />
      <Link to="/UserPage" relative="path">
        Back To User Page
      </Link>
      <form className="BookingForm" onSubmit={handleSubmit}>
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
          <label htmlFor="hotel">Select a hotel:</label>
          <select id="hotel" name="hotel" onChange={handleHotelChange}>
            <option value="">Select a hotel</option>
            {hotels.map((hotel) => (
              <option key={hotel._id} value={hotel.name}>
                {hotel.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="room">Available Rooms:</label>
          <select
            id="room"
            value={selectedRoomId}
            onChange={(event) => setSelectedRoomId(event.target.value)}
          >
            {filteredRooms.map((room) => (
              <option key={room.roomName} value={room.roomName}>
                {room.roomName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>
            Number of Guests:
            <input
              type="number"
              value={noOfGuests}
              onChange={(event) => setNoOfGuests(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="room">checkInDate</label>
          <input
            type="date"
            id="checkInDate"
            value={checkInDate}
            onChange={(event) => setCheckInDate(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="room">checkOutDate:</label>
          <input
            type="date"
            id="checkOutDate"
            value={checkOutDate}
            onChange={(event) => setCheckOutDate(event.target.value)}
          />
        </div>
        <CalendarComponent selectedHotelId={selectedHotel} />

        <button className="BookingButton" type="submit">
          Book Now
        </button>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <Link to={"/BookingDetails"}> Show the booking details</Link>
      </form>
    </div>
  );
}

export default BookingForm;
