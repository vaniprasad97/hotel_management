import React, { useState, useEffect } from "react";
import instance from "../axiosconfig";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Styles/BookingForm.css";
import moment from "moment";
import CalendarComponent from "../Pages/Calendar";

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

  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("selectedUser");
  const userObj1 = loggedInUser ? JSON.parse(loggedInUser) : null;
  const userid = userObj1 ? userObj1.id : null;

  useEffect(() => {
    instance.get("/rooms").then((response) => {
      setRooms(response.data);
      // use useefffect hook to get data from rooms api and stored in the state rooms
    });

    if (loggedInUser) {
      const userObj = JSON.parse(loggedInUser);
      setName(userObj.name);
      setUsername(userObj.username);
    }
    // here checks if loggedin user exists. if the user exists store the name name state and
    // username in the username state
  }, []);

  useEffect(() => {
    instance.get("/hotels").then((response) => {
      setHotels(response.data);
    });
    // use effect hook to get data from hotels api and store it in a state variable called Hotels
  }, []);

  useEffect(() => {
    instance.get("/assignhotel").then((response) => {
      setAssignHotels(response.data);
    });
    // use effect hook to get data from assignhotels api and store it in a state variable called assignHotels
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
    // used a use effect hook to get bookings api and set the checkin to checkout dates disabled and stored it in a state
    // called disableddates
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
      setRooms(updatedRooms);
      navigate("/BookingDetails");
    }); // after all the validation, bookings data will post to the bookings api.
  };

  const handleHotelChange = (event) => {
    const hotelName = event.target.value;
    const matcheddetails = assignhotels.find(
      (hoteldetails) => hoteldetails.hotelName == hotelName
    );
    setfilteredRooms(
      rooms.filter((room) => room.created_by == matcheddetails.adminId)
    );
    setSelectedHotel(hotelName);
    setRooms(filteredRooms);
    // its a function to to show the rooms availables in a particular hotel and filter the rooms based on id and stored
    // filtered rooms and hotelname to the state rooms and filtered rooms respectively.
  };

  return (
    <div data-testid="booking-form">
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
