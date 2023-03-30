import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import instance from "../axiosconfig";
import Header from "../Components/Header";
import "../Styles/HotelAdminPage.css";

function HotelAdminPage() {
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [guests, setGuests] = useState("");
  const [assignhotel, setAssignhotel] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    instance
      .get("/assignhotel")
      .then((response) => {
        setAssignhotel(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // useEffect hook that makes a Get request to retrieve data from the api/assignhotel.
    //And stores it in the AssignhotelAPI
  }, []);

  const adminId = JSON.parse(localStorage.getItem("UserId"));
  const now = new Date();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      roomName,
      roomType,
      price,
      guests,
      created_by: adminId,
      created_at: now.toISOString(),
    };
    // Check if the roomName already exists in the Assignhotel array ans stores the error message in the state setmessage.
    const roomExists = assignhotel.find((hotel) => hotel.roomName === roomName);
    if (roomExists) {
      setMessage("Hotel with the same name already exists.");
      return;
    }
    instance
      .post("/rooms", data)
      .then((response) => {
        console.log("room assigned successfully");
        setMessage("Room added successfully");
        setRoomName("");
        setRoomType("");
        setPrice("");
        setGuests("");
      })
      .catch((error) => {
        console.log("Error adding room:", error);
      });
    // The function handleSubmit is called when a form is submitted.
    //creates an object containing the data entered in the form fields and the user ID retrieved
    // from local storage, and then sends this data to the rooms api using POST method. After submitting
    // the function clears the form fields.
  };

  return (
    <div>
      <Header />
      <form className="Addroomform" onSubmit={handleSubmit}>
        <label>
          Room name:
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Room type:
          <input
            type="text"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          No. of guests:
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </label>
        <br />
        <button className="Addroom" type="submit">
          Add room
        </button>
        <p style={{ color: "red" }}>{message}</p>
        <Link to={`/RoomList`}>
          Click here to see the previously added list of hotels{" "}
        </Link>
        <Link to="/HotelAdminBookingDetails" relative="path">
          Click here to see list of bookings
        </Link>
      </form>
    </div>
  );
}

export default HotelAdminPage;
