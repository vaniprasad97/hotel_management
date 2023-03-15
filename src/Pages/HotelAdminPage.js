import React, { useState } from "react";
import instance from "../axiosconfig";
import Header from "../Components/Header";
import "../Styles/HotelAdminPage.css";

function HotelAdminPage() {
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [pricePerNight, setPricePerNight] = useState();
  const [Guest, SetGuest] = useState("");

  const hotelId = JSON.parse(localStorage.getItem("UserId"));
  console.log(hotelId);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      roomName,
      roomType,
      pricePerNight,
      hotelId,
    };
    instance
      .post("/rooms", data)
      .then((response) => {
        console.log("room assigned successfully");
      })
      .catch((error) => {
        console.log("Error adding room:", error);
      });
    // by clicking the button it will pass the user inputs- roomname, roomtype, price and also passes the hotelid
    //    of the loggedin user.
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
          Price per night:
          <input
            type="number"
            value={pricePerNight}
            onChange={(e) => setPricePerNight(e.target.value)}
          />
        </label>
        <label>
          Guest
          <input
            type="text"
            value={Guest}
            onChange={(e) => SetGuest(e.target.value)}
          />
        </label>
        <br />
        <button className="Addroom" type="submit">
          Add room
        </button>
      </form>
    </div>
  );
}

export default HotelAdminPage;
