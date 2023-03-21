import React, { useState, useEffect } from "react";
import instance from "../axiosconfig";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BookingDetails from "../Pages/BookingDetails";
import "../Styles/BookingForm.css"

function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [noOfGuests, setNoOfGuests] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    instance
      .get("/rooms")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedRoom = rooms.find((room) => room.roomName === selectedRoomId);
    console.log(selectedRoomId);
  
    const data = {
      name,
      email,
      checkInDate,
      checkOutDate,
      noOfGuests,
      roomId: selectedRoomId,
    };
  
    instance
      .post("/bookings", data)
      .then((response) => {
        const updatedRooms = rooms.filter((room) => room.roomName !== selectedRoomId);
  
        if (selectedRoom && selectedRoom.roomName === data.roomId) {
          instance
            .delete(`/rooms/${selectedRoomId}`)
            .then(() => {
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

