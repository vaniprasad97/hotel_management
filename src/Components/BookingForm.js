import React, { useState, useEffect } from "react";
import instance from "../axiosconfig";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Styles/BookingForm.css";

function BookingForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [noOfGuests, setNoOfGuests] = useState("");
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const [selectedRoomId, setSelectedRoomId] = useState("");
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("selectedUser");
  const { id } = useParams();

  useEffect(() => {
    instance
      .get("/rooms")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    if (loggedInUser) {
      const userObj = JSON.parse(loggedInUser);
      const loggedInUserName = userObj.name;
      const loggedInUserusername = userObj.username;
      setName(loggedInUserName);
      setUsername(loggedInUserusername);
    }
  }, []);
  useEffect(() => {
    instance
      .get("/hotels")
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.log("Error fetching hotels", error);
      });
    //This code uses the useEffect hook to fetch data from a server using an HTTP GET request
    // when the component mounts. The code creates an effect that sets the hotels state variable
    // with the data received from the server using the setHotels function.
    // . If the GET request fails, an error message is logged to the console.
  }, []);
  const handleHotelChange = (event) => {
    setSelectedHotel(event.target.value);
    // function for handling the user input and store the data in the state selectedhotel
    // The function is for handling the userinput updates the state variable selectedHotel with the value of the selected hotel. This function
    // is used for handling the user input and storing the selected hotel data in the state variable selectedHotel.
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if required fields are empty
    if (
      !name ||
      !username ||
      !checkInDate ||
      !checkOutDate ||
      !noOfGuests ||
      !selectedHotel ||
      !selectedRoomId
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    const selectedRoom = rooms.filter(
      (room) => room.roomName === selectedRoomId
    );

    const data = {
      name,
      username,
      checkInDate,
      checkOutDate,
      noOfGuests,
      roomId: selectedRoomId,
    };

    instance
      .post("/bookings", data)
      .then((response) => {
        const updatedRooms = rooms.filter(
          (room) => room.roomName !== selectedRoomId
        );

        if (selectedRoom && selectedRoom[0].roomName === data.roomId) {
          instance
            .delete(`/rooms/${selectedRoom[0]._id}`)
            .then(() => {
              console.log("deleted");
              navigate("/BookingDetails");
            })
            .catch((error) => {
              console.log("Error deleting room", error);
            });
        } else {
          setRooms(updatedRooms);
          navigate("/BookingDetails");
        }
      })
      .catch((error) => {
        console.log("Error creating booking", error);
      });
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
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
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
        </div>
        <div>
          <label htmlFor="noOfGuests">Number of guests:</label>
          <input
            type="number"
            id="noOfGuests"
            value={noOfGuests}
            onChange={(event) => setNoOfGuests(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="hotel">Select a hotel:</label>
          <select id="hotel" name="hotel" onChange={handleHotelChange}>
            <option value="">Select a hotel</option>
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
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
            {rooms.map((room) => (
              <option key={room.roomName} value={room.roomName}>
                {room.roomName}
              </option>
            ))}
          </select>
        </div>
        <button className="BookingButton" type="submit">
          Book Now
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
